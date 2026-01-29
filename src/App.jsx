import { useState } from 'react';
import StartScreen from './components/quiz/StartScreen';
import BirthDateInput from './components/quiz/BirthDateInput';
import TimeKnownCheck from './components/quiz/TimeKnownCheck';
import TimeSelector from './components/quiz/TimeSelector';
import QuizQuestion from './components/quiz/QuizQuestion';
import PreciseAnalysis from './components/quiz/PreciseAnalysis';
import ResultScreen from './components/quiz/ResultScreen';

function App() {
  const [step, setStep] = useState('start');
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [analysisType, setAnalysisType] = useState(null);

  const handleRestart = () => {
    setStep('start');
    setBirthDate(null);
    setBirthTime(null);
    setAnswers([]);
    setResult(null);
    setAnalysisType(null);
  };

  const handleMorePrecise = () => {
    setStep('precise');
  };

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
            onExact={() => {
              setAnalysisType('exact');
              setStep('timeselect');
            }}
            onQuick={() => {
              setAnalysisType('quick');
              setStep('quiz');
            }}
            onPrecise={() => {
              setAnalysisType('precise');
              setStep('precise');
            }}
          />
        );

      case 'timeselect':
        return (
          <TimeSelector
            onSelect={(time) => {
              setBirthTime(time);
              setResult({
                primary: { sign: time, score: 100, probability: 100 },
                secondary: null,
                confidence: 'exact'
              });
              setStep('result');
            }}
          />
        );

      case 'quiz':
        return (
          <QuizQuestion
            answers={answers}
            onAnswer={(answer) => setAnswers([...answers, answer])}
            onComplete={(calculatedResult) => {
              setResult(calculatedResult);
              setStep('result');
            }}
          />
        );

      case 'precise':
        return (
          <PreciseAnalysis
            birthDate={birthDate}
            previousResult={result}
            onComplete={(preciseResult) => {
              setResult(preciseResult);
              setStep('result');
            }}
            onBack={() => setStep('timecheck')}
          />
        );

      case 'result':
        return (
          <ResultScreen
            birthDate={birthDate}
            result={result}
            analysisType={analysisType}
            onRestart={handleRestart}
            onMorePrecise={handleMorePrecise}
          />
        );

      default:
        return <StartScreen onNext={() => setStep('birthdate')} />;
    }
  };

  return <div className="min-h-screen bg-fitin-light">{renderStep()}</div>;
}

export default App;
