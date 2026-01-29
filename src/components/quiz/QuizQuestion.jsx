import { useState } from 'react';
import { questions } from '../../data/questions';
import { calculateTimeFromAnswers } from '../../utils/calculateScore';
import ProgressBar from '../common/ProgressBar';
import Card from '../common/Card';

function QuizQuestion({ answers, onAnswer, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers, optionIndex];
    onAnswer(optionIndex);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const estimatedTime = calculateTimeFromAnswers(newAnswers);
      onComplete(estimatedTime);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <Card className="mt-8 w-full max-w-md">
        <p className="text-sm text-fitin-primary mb-2">
          Q{currentIndex + 1}.
        </p>
        <h2 className="text-xl font-bold text-fitin-dark mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className="w-full p-4 text-left rounded-xl border-2 border-gray-200
                         hover:border-fitin-primary hover:bg-fitin-light
                         transition-all duration-200"
            >
              <span className="font-medium text-fitin-primary mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option.text}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default QuizQuestion;
