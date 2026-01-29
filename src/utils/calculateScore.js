import { questions } from '../data/questions';

const TIME_SIGNS = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

export function calculateTimeFromAnswers(answers) {
  const scores = {};
  const active = {};

  TIME_SIGNS.forEach(sign => {
    scores[sign] = 0;
    active[sign] = true;
  });

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question || answerIndex === undefined || answerIndex === null) return;

    const selectedOption = question.options[answerIndex];
    if (!selectedOption) return;

    if (question.type === 'filter' && selectedOption.filter) {
      TIME_SIGNS.forEach(sign => {
        if (!selectedOption.filter.includes(sign)) {
          active[sign] = false;
        }
      });
    }

    if (selectedOption.adjust) {
      Object.entries(selectedOption.adjust).forEach(([sign, weight]) => {
        scores[sign] += weight;
      });
    }
  });

  const activeScores = TIME_SIGNS
    .filter(sign => active[sign])
    .map(sign => ({ sign, score: scores[sign] }))
    .sort((a, b) => b.score - a.score);

  const finalScores = activeScores.length > 0 ? activeScores :
    TIME_SIGNS.map(sign => ({ sign, score: scores[sign] }))
      .sort((a, b) => b.score - a.score);

  const totalScore = finalScores.reduce((sum, item) => sum + Math.max(item.score, 0) + 1, 0);
  const withProbability = finalScores.map(item => ({
    ...item,
    probability: Math.round(((Math.max(item.score, 0) + 1) / totalScore) * 100)
  }));

  const probSum = withProbability.reduce((sum, item) => sum + item.probability, 0);
  if (probSum !== 100 && withProbability.length > 0) {
    withProbability[0].probability += (100 - probSum);
  }

  const confidence = calculateConfidence(withProbability);

  return {
    primary: withProbability[0] || { sign: '오', score: 0, probability: 50 },
    secondary: withProbability[1] || null,
    tertiary: withProbability[2] || null,
    confidence,
    allScores: withProbability
  };
}

function calculateConfidence(sortedScores) {
  if (sortedScores.length < 2) return 'low';

  const first = sortedScores[0].probability;
  const second = sortedScores[1].probability;
  const diff = first - second;

  if (first >= 70 && diff >= 30) return 'high';
  if (first >= 50 && diff >= 20) return 'medium';
  return 'low';
}

export function getConfidenceText(confidence) {
  switch (confidence) {
    case 'high': return { text: '높음', stars: '⭐⭐⭐⭐⭐', color: 'text-green-600' };
    case 'medium': return { text: '보통', stars: '⭐⭐⭐☆☆', color: 'text-yellow-600' };
    case 'low': return { text: '낮음', stars: '⭐⭐☆☆☆', color: 'text-red-500' };
    case 'exact': return { text: '확실', stars: '✅', color: 'text-green-600' };
    default: return { text: '보통', stars: '⭐⭐⭐☆☆', color: 'text-yellow-600' };
  }
}
