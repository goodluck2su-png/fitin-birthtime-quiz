import { useState } from 'react';
import { questions } from '../../data/questions';
import { calculateTimeFromAnswers } from '../../utils/calculateScore';
import Header from '../common/Header';
import ProgressBar from '../common/ProgressBar';
import FeedbackToast from '../common/FeedbackToast';

function QuizQuestion({ answers, setAnswers, onComplete, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(answers?.length || 0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);

    setTimeout(() => {
      const newAnswers = [...(answers || []), optionIndex];
      setAnswers(newAnswers);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        const result = calculateTimeFromAnswers(newAnswers);
        onComplete(result);
      }
    }, 500);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    } else {
      onBack();
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-fitin-light to-white">
      <Header
        title={`질문 ${currentIndex + 1}/${questions.length}`}
        onBack={handleBack}
        progress={{ current: currentIndex + 1, total: questions.length }}
      />

      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md mb-6">
          <ProgressBar current={currentIndex + 1} total={questions.length} showLabel={false} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md animate-fadeIn">
          <div className="flex items-center mb-3">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              currentQuestion.type === 'filter'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-purple-100 text-purple-600'
            }`}>
              {currentQuestion.type === 'filter' ? '📍 범위 좁히기' : '🎯 상세 확인'}
            </span>
          </div>

          <h2 className="text-xl font-bold text-fitin-dark mb-2 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {currentQuestion.subtitle && (
            <p className="text-sm text-gray-500 mb-5">{currentQuestion.subtitle}</p>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selectedOption !== null}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? 'border-fitin-primary bg-fitin-light scale-[0.98] shadow-md'
                    : 'border-gray-200 hover:border-fitin-primary hover:bg-fitin-light/50'
                } ${selectedOption !== null && selectedOption !== index ? 'opacity-40' : ''}`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <div className="flex-1">
                    <span className="text-fitin-dark font-medium">{option.text}</span>
                    {option.subtext && (
                      <p className="text-xs text-gray-500 mt-0.5">{option.subtext}</p>
                    )}
                  </div>
                  {selectedOption === index && (
                    <span className="text-fitin-primary text-lg">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          {currentQuestion.type === 'filter' ? '기억나는 대로 선택해주세요' : '직감적으로 선택해주세요 ✨'}
        </p>
      </div>

      <FeedbackToast
        show={showFeedback}
        message={currentIndex < questions.length - 1 ? '좋아요! 다음 질문으로...' : '마지막 질문이에요!'}
      />
    </div>
  );
}

export default QuizQuestion;
