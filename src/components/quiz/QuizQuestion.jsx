import { useState } from 'react';
import { questions } from '../../data/questions';
import { calculateTimeFromAnswers } from '../../utils/calculateScore';
import ProgressBar from '../common/ProgressBar';

function QuizQuestion({ answers, onAnswer, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState(answers || []);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionIndex) => {
    setSelectedOption(optionIndex);

    setTimeout(() => {
      const newAnswers = [...localAnswers, optionIndex];
      setLocalAnswers(newAnswers);
      onAnswer(optionIndex);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        const result = calculateTimeFromAnswers(newAnswers);
        onComplete(result);
      }
    }, 300);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
      <div className="w-full max-w-md mt-8 mb-6">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
        <p className="text-sm text-fitin-primary font-semibold mb-1">
          Q{currentIndex + 1}. {currentQuestion.type === 'filter' ? '📍 범위 좁히기' : '🎯 상세 확인'}
        </p>
        <h2 className="text-xl font-bold text-fitin-dark mb-2 leading-relaxed">
          {currentQuestion.question}
        </h2>
        {currentQuestion.subtitle && (
          <p className="text-sm text-gray-500 mb-4">{currentQuestion.subtitle}</p>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selectedOption !== null}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200
                ${selectedOption === index
                  ? 'border-fitin-primary bg-fitin-light scale-[0.98]'
                  : 'border-gray-200 hover:border-fitin-primary hover:bg-fitin-light'}
                ${selectedOption !== null && selectedOption !== index ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{option.emoji}</span>
                <div className="flex-1">
                  <span className="text-fitin-dark font-medium">{option.text}</span>
                  {option.subtext && (
                    <p className="text-xs text-gray-500 mt-0.5">{option.subtext}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        {currentQuestion.type === 'filter' ? '기억나는 대로 선택해주세요' : '직감적으로 선택해주세요 ✨'}
      </p>
    </div>
  );
}

export default QuizQuestion;
