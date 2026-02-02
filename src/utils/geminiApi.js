import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

function initializeGemini() {
  if (!API_KEY) {
    console.error('Gemini API key is not set');
    return false;
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    // gemini-pro 모델 사용 (더 안정적)
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }
  return true;
}

// 시스템 프롬프트: 사주 전문가 역할
const SYSTEM_PROMPT = `당신은 한국의 전통 사주명리학 전문가이자 출생 시간 추정 전문가입니다.
사용자의 답변을 바탕으로 출생 시간(12시진)을 추정하는 것이 목표입니다.

12시진 정보:
- 자시(子時): 23:00~01:00, 쥐, 지혜와 은밀함
- 축시(丑時): 01:00~03:00, 소, 근면과 인내
- 인시(寅時): 03:00~05:00, 호랑이, 용맹과 리더십
- 묘시(卯時): 05:00~07:00, 토끼, 활발함과 희망
- 진시(辰時): 07:00~09:00, 용, 야망과 카리스마
- 사시(巳時): 09:00~11:00, 뱀, 지혜와 신중함
- 오시(午時): 11:00~13:00, 말, 열정과 활동성
- 미시(未時): 13:00~15:00, 양, 온화함과 예술성
- 신시(申時): 15:00~17:00, 원숭이, 재치와 적응력
- 유시(酉時): 17:00~19:00, 닭, 완벽주의와 디테일
- 술시(戌時): 19:00~21:00, 개, 충성심과 신뢰
- 해시(亥時): 21:00~23:00, 돼지, 낭만과 여유

응답 규칙:
1. 항상 친근하고 따뜻한 말투로 대화하세요
2. 질문은 한 번에 하나씩만 하세요
3. 사용자의 답변을 경청하고 공감하세요
4. 최종 분석 시 JSON 형식으로 결과를 제공하세요`;

// 대화 기록 저장
let conversationHistory = [];

// 대화 초기화
export function resetConversation() {
  conversationHistory = [];
}

// AI와 대화하기
export async function chatWithGemini(userMessage, context = {}) {
  if (!initializeGemini()) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  // 대화 기록에 사용자 메시지 추가
  conversationHistory.push({ role: 'user', content: userMessage });

  // 전체 대화 맥락 구성
  const fullPrompt = `${SYSTEM_PROMPT}

생년월일: ${context.birthDate ? `${context.birthDate.year}년 ${context.birthDate.month}월 ${context.birthDate.day}일` : '미입력'}
이전 분석 결과: ${context.previousResult ? `1순위 ${context.previousResult.primary?.sign}시 (${context.previousResult.primary?.probability}%)` : '없음'}

대화 기록:
${conversationHistory.map(msg => `${msg.role === 'user' ? '사용자' : 'AI'}: ${msg.content}`).join('\n')}

위 대화를 바탕으로 적절히 응답하세요.
아직 충분한 정보가 없다면 추가 질문을 하세요.
충분한 정보가 모였다면 분석 결과를 제공하세요.`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // AI 응답을 대화 기록에 추가
    conversationHistory.push({ role: 'assistant', content: text });

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    console.error('Error details:', error.message, error.stack);
    throw new Error(`AI 응답 오류: ${error.message || '알 수 없는 오류'}`);
  }
}

// 최종 분석 요청
export async function requestFinalAnalysis(context = {}) {
  if (!initializeGemini()) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  const analysisPrompt = `${SYSTEM_PROMPT}

생년월일: ${context.birthDate ? `${context.birthDate.year}년 ${context.birthDate.month}월 ${context.birthDate.day}일` : '미입력'}
이전 퀵 분석 결과: ${context.previousResult ? `1순위 ${context.previousResult.primary?.sign}시 (${context.previousResult.primary?.probability}%)` : '없음'}

지금까지의 대화 기록:
${conversationHistory.map(msg => `${msg.role === 'user' ? '사용자' : 'AI'}: ${msg.content}`).join('\n')}

위 모든 정보를 종합하여 최종 출생 시간 분석을 진행하세요.

반드시 아래 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{
  "analysis": {
    "primary": {
      "sign": "시진한글(자/축/인/묘/진/사/오/미/신/유/술/해 중 하나)",
      "probability": 확률(숫자),
      "reason": "이 시간대로 추정한 이유"
    },
    "secondary": {
      "sign": "2순위 시진",
      "probability": 확률(숫자),
      "reason": "2순위 이유"
    },
    "confidence": "high/medium/low 중 하나",
    "summary": "종합 분석 요약 (2-3문장)"
  }
}`;

  try {
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = response.text();

    // JSON 파싱 시도
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.analysis;
    }

    throw new Error('분석 결과를 파싱할 수 없습니다.');
  } catch (error) {
    console.error('Final Analysis Error:', error);
    console.error('Error details:', error.message, error.stack);
    throw new Error(`최종 분석 오류: ${error.message || '알 수 없는 오류'}`);
  }
}

// 첫 질문 생성
export async function getInitialQuestion(context = {}) {
  if (!initializeGemini()) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  resetConversation();

  const initialPrompt = `${SYSTEM_PROMPT}

생년월일: ${context.birthDate ? `${context.birthDate.year}년 ${context.birthDate.month}월 ${context.birthDate.day}일` : '미입력'}
이전 퀵 분석 결과: ${context.previousResult ? `1순위 ${context.previousResult.primary?.sign}시 (${context.previousResult.primary?.probability}%), 2순위 ${context.previousResult.secondary?.sign}시` : '없음'}

사용자의 출생 시간을 더 정확히 추정하기 위해 첫 번째 질문을 해주세요.
부모님이나 가족에게 들은 출산 관련 이야기를 물어보는 것이 좋습니다.
친근하고 따뜻한 말투로 질문하세요.
한국어로 답변하세요.`;

  try {
    console.log('Calling Gemini API with key:', API_KEY ? 'Key exists' : 'No key');
    const result = await model.generateContent(initialPrompt);
    const response = await result.response;
    const text = response.text();

    conversationHistory.push({ role: 'assistant', content: text });

    return text;
  } catch (error) {
    console.error('Initial Question Error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // 더 자세한 에러 메시지 제공
    let errorMsg = '첫 질문 생성 오류';
    if (error.message?.includes('API_KEY')) {
      errorMsg = 'API 키가 유효하지 않습니다. Google AI Studio에서 키를 확인해주세요.';
    } else if (error.message?.includes('quota')) {
      errorMsg = 'API 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.';
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      errorMsg = '네트워크 연결을 확인해주세요.';
    } else {
      errorMsg = `오류: ${error.message || '알 수 없는 오류'}`;
    }

    throw new Error(errorMsg);
  }
}

// API 키 확인
export function isApiKeySet() {
  return !!API_KEY;
}

// API 연결 테스트
export async function testApiConnection() {
  if (!initializeGemini()) {
    return { success: false, error: 'API 키가 설정되지 않았습니다.' };
  }

  try {
    const result = await model.generateContent('안녕하세요. 테스트입니다. "연결 성공"이라고만 답해주세요.');
    const response = await result.response;
    const text = response.text();
    return { success: true, response: text };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
