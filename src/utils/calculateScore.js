import { questions } from '../data/questions';

const TIME_SIGNS = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

export function calculateTimeFromAnswers(answers) {
  // 12시진별 점수 초기화
  const scores = {};
  TIME_SIGNS.forEach(sign => scores[sign] = 0);

  // 각 답변에 대해 가중치 합산
  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    const selectedOption = question.options[answerIndex];
    const weights = selectedOption.timeWeight;

    Object.entries(weights).forEach(([sign, weight]) => {
      scores[sign] += weight;
    });
  });

  // 가장 높은 점수의 시간대 찾기
  let maxSign = '오'; // 기본값
  let maxScore = 0;

  Object.entries(scores).forEach(([sign, score]) => {
    if (score > maxScore) {
      maxScore = score;
      maxSign = sign;
    }
  });

  return maxSign;
}
