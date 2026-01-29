import { useState } from 'react';
import StartScreen from './components/quiz/StartScreen';
import BirthDateInput from './components/quiz/BirthDateInput';
import TimeKnownCheck from './components/quiz/TimeKnownCheck';
import TimeSelector from './components/quiz/TimeSelector';
import QuizQuestion from './components/quiz/QuizQuestion';
import ResultScreen from './components/quiz/ResultScreen';

function App() {
  const [step, setStep] = useState('start');
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState(null);

  // step: 'start' | 'birthdate' | 'timecheck' | 'timeselect' | 'quiz' | 'result'

  const renderStep = () => {
    switch (step) {
      case 'start':
        return <StartScreen onNext={() => setStep('birthdate')} />;
      case 'birthdate':
        return (
          <BirthDateInput
            onNext={(date) => {
              setBirthDate(date);
              setStep('timecheck');
            }}
          />
        );
      case 'timecheck':
        return (
          <TimeKnownCheck
            onKnow={() => setStep('timeselect')}
            onNotKnow={() => setStep('quiz')}
          />
        );
      case 'timeselect':
        return (
          <TimeSelector
            onSelect={(time) => {
              setBirthTime(time);
              setStep('result');
            }}
          />
        );
      case 'quiz':
        return (
          <QuizQuestion
            answers={answers}
            onAnswer={(answer) => setAnswers([...answers, answer])}
            onComplete={(estimated) => {
              setEstimatedTime(estimated);
              setStep('result');
            }}
          />
        );
      case 'result':
        return (
          <ResultScreen
            birthDate={birthDate}
            birthTime={birthTime || estimatedTime}
            isEstimated={!birthTime}
          />
        );
      default:
        return <StartScreen onNext={() => setStep('birthdate')} />;
    }
  };

  return (
    <div className="min-h-screen bg-fitin-light">
      {renderStep()}
    </div>
  );
}

export default App;
