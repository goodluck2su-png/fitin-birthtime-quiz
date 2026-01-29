import { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import {
  isApiKeySet,
  getInitialQuestion,
  chatWithGemini,
  requestFinalAnalysis,
  resetConversation
} from '../../utils/geminiApi';

function PreciseAnalysis({ birthDate, previousResult, onComplete, onBack }) {
  const [stage, setStage] = useState('intro'); // intro, chat, analyzing, error
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef(null);

  const MAX_QUESTIONS = 5;

  // 메시지 끝으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // API 키 확인
  const apiKeyAvailable = isApiKeySet();

  // 분석 시작
  const startAnalysis = async () => {
    if (!apiKeyAvailable) {
      setError('API 키가 설정되지 않았습니다. .env.local 파일에 VITE_GEMINI_API_KEY를 설정해주세요.');
      setStage('error');
      return;
    }

    setStage('chat');
    setIsLoading(true);
    resetConversation();

    try {
      const initialQuestion = await getInitialQuestion({
        birthDate,
        previousResult
      });

      setMessages([{ role: 'ai', content: initialQuestion }]);
      setQuestionCount(1);
    } catch (err) {
      setError(err.message);
      setStage('error');
    } finally {
      setIsLoading(false);
    }
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // 충분한 질문을 했으면 최종 분석 요청
      if (questionCount >= MAX_QUESTIONS) {
        setStage('analyzing');
        const analysis = await requestFinalAnalysis({
          birthDate,
          previousResult
        });

        // 결과 변환
        const result = {
          primary: {
            sign: analysis.primary.sign,
            score: analysis.primary.probability,
            probability: analysis.primary.probability
          },
          secondary: analysis.secondary ? {
            sign: analysis.secondary.sign,
            score: analysis.secondary.probability,
            probability: analysis.secondary.probability
          } : null,
          confidence: analysis.confidence,
          summary: analysis.summary,
          reason: analysis.primary.reason
        };

        onComplete(result);
        return;
      }

      // 일반 대화 계속
      const aiResponse = await chatWithGemini(userMessage, {
        birthDate,
        previousResult
      });

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setQuestionCount(prev => prev + 1);

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: '죄송합니다, 응답 중 오류가 발생했습니다. 다시 시도해주세요.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 최종 분석 요청
  const requestAnalysis = async () => {
    setStage('analyzing');
    setIsLoading(true);

    try {
      const analysis = await requestFinalAnalysis({
        birthDate,
        previousResult
      });

      const result = {
        primary: {
          sign: analysis.primary.sign,
          score: analysis.primary.probability,
          probability: analysis.primary.probability
        },
        secondary: analysis.secondary ? {
          sign: analysis.secondary.sign,
          score: analysis.secondary.probability,
          probability: analysis.secondary.probability
        } : null,
        confidence: analysis.confidence,
        summary: analysis.summary,
        reason: analysis.primary.reason
      };

      onComplete(result);
    } catch (err) {
      setError(err.message);
      setStage('error');
    } finally {
      setIsLoading(false);
    }
  };

  // 인트로 화면
  if (stage === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
        <div className="text-6xl mb-6">🔮</div>
        <h2 className="text-2xl font-bold text-fitin-dark text-center mb-4">AI 정밀 분석</h2>

        <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md mb-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-xl mr-3">💬</span>
              <div>
                <p className="font-medium text-fitin-dark">AI와 대화하기</p>
                <p className="text-sm text-gray-500">출생 관련 기억을 자유롭게 이야기해주세요</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-xl mr-3">🤖</span>
              <div>
                <p className="font-medium text-fitin-dark">맞춤 질문</p>
                <p className="text-sm text-gray-500">AI가 핵심적인 질문을 해드립니다</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-xl mr-3">📊</span>
              <div>
                <p className="font-medium text-fitin-dark">종합 분석</p>
                <p className="text-sm text-gray-500">대화 내용을 바탕으로 시간대 추정</p>
              </div>
            </div>
          </div>
        </div>

        {!apiKeyAvailable && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 w-full max-w-md">
            ⚠️ API 키가 설정되지 않았습니다.<br />
            <code className="text-xs">.env.local</code> 파일에 <code className="text-xs">VITE_GEMINI_API_KEY</code>를 추가해주세요.
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 w-full max-w-md mb-6">
          <p className="text-sm text-gray-600 text-center">
            <strong>예상 정확도:</strong> 85~95%<br />
            <strong>소요 시간:</strong> 3~5분<br />
            <strong>질문 수:</strong> 약 {MAX_QUESTIONS}개
          </p>
        </div>

        <div className="w-full max-w-md space-y-3">
          <Button
            primary
            className="w-full"
            onClick={startAnalysis}
          >
            {apiKeyAvailable ? '🔮 AI 분석 시작하기' : '⚠️ API 키 필요'}
          </Button>
          <Button className="w-full" onClick={onBack}>← 다른 방법으로 분석하기</Button>
        </div>
      </div>
    );
  }

  // 에러 화면
  if (stage === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
        <div className="text-6xl mb-6">😢</div>
        <h2 className="text-2xl font-bold text-fitin-dark text-center mb-4">오류가 발생했습니다</h2>

        <div className="bg-red-50 rounded-xl p-4 w-full max-w-md mb-6">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>

        <div className="w-full max-w-md space-y-3">
          <Button primary className="w-full" onClick={() => setStage('intro')}>다시 시도하기</Button>
          <Button className="w-full" onClick={onBack}>← 돌아가기</Button>
        </div>
      </div>
    );
  }

  // 분석 중 화면
  if (stage === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
        <div className="text-6xl mb-6 animate-pulse">🔮</div>
        <h2 className="text-2xl font-bold text-fitin-dark text-center mb-4">분석 중...</h2>
        <p className="text-gray-500 text-center">
          대화 내용을 종합하여<br />
          출생 시간을 추정하고 있습니다
        </p>
        <div className="mt-8 flex space-x-2">
          <div className="w-3 h-3 bg-fitin-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-fitin-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-fitin-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  // 채팅 화면
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-fitin-light to-white">
      {/* 헤더 */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-500 hover:text-fitin-primary">
          ← 뒤로
        </button>
        <div className="text-center">
          <p className="font-bold text-fitin-dark">🔮 AI 정밀 분석</p>
          <p className="text-xs text-gray-500">질문 {questionCount}/{MAX_QUESTIONS}</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-fitin-primary text-white rounded-br-md'
                  : 'bg-white shadow-md rounded-bl-md'
              }`}
            >
              {msg.role === 'ai' && <span className="text-lg mr-2">🔮</span>}
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-md rounded-2xl rounded-bl-md p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 진행 상태 */}
      {questionCount >= MAX_QUESTIONS - 1 && (
        <div className="px-4 py-2 bg-purple-50">
          <button
            onClick={requestAnalysis}
            disabled={isLoading}
            className="w-full py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50"
          >
            ✨ 지금까지 내용으로 분석하기
          </button>
        </div>
      )}

      {/* 입력 영역 */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="답변을 입력해주세요..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fitin-primary focus:outline-none disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-fitin-primary text-white rounded-xl font-medium hover:bg-fitin-primary/90 disabled:opacity-50"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreciseAnalysis;
