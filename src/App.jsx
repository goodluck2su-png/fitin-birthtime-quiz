import { useState } from 'react';
import StartScreen from './components/quiz/StartScreen';
import BirthDateInput from './components/quiz/BirthDateInput';
import TimeKnownCheck from './components/quiz/TimeKnownCheck';
import TimeSelector from './components/quiz/TimeSelector';
import QuizQuestion from './components/quiz/QuizQuestion';
import PreciseAnalysis from './components/quiz/PreciseAnalysis';
import LoadingScreen from './components/quiz/LoadingScreen';
import ResultScreen from './components/quiz/ResultScreen';

function App() {
  const [step, setStep] = useState('start');
  const [birthDate, setBirthDate] = useState(null);
  const [, setBirthTime] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [analysisType, setAnalysisType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 뒤로가기 핸들러
  const handleBack = () => {
    switch (step) {
      case 'birthdate': setStep('start'); break;
      case 'timecheck': setStep('birthdate'); break;
      case 'timeselect': setStep('timecheck'); break;
      case 'quiz':
        if (answers.length > 0) {
          setAnswers(answers.slice(0, -1));
        } else {
          setStep('timecheck');
        }
        break;
      case 'precise': setStep('timecheck'); break;
      case 'result':
        if (analysisType === 'exact') setStep('timeselect');
        else if (analysisType === 'quick') setStep('quiz');
        else setStep('timecheck');
        break;
      default: break;
    }
  };

  // 결과 화면으로 이동 (로딩 포함)
  const goToResult = (resultData, type) => {
    setIsLoading(true);
    setResult(resultData);
    setAnalysisType(type);

    setTimeout(() => {
      setIsLoading(false);
      setStep('result');
    }, 2000);
  };

  // 재시작
  const handleRestart = () => {
    setStep('start');
    setBirthDate(null);
    setBirthTime(null);
    setAnswers([]);
    setResult(null);
    setAnalysisType(null);
  };

  // 더 정밀하게
  const handleMorePrecise = () => {
    setStep('precise');
  };

  // 로딩 화면
  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderStep = () => {
    switch (step) {
      case 'start':
        return <StartScreen onNext={() => setStep('birthdate')} />;

      case 'birthdate':
        return (
          <BirthDateInput
            onNext={(date) => { setBirthDate(date); setStep('timecheck'); }}
            onBack={handleBack}
          />
        );

      case 'timecheck':
        return (
          <TimeKnownCheck
            onExact={() => { setAnalysisType('exact'); setStep('timeselect'); }}
            onQuick={() => { setAnalysisType('quick'); setAnswers([]); setStep('quiz'); }}
            onPrecise={() => { setAnalysisType('precise'); setStep('precise'); }}
            onBack={handleBack}
          />
        );

      case 'timeselect':
        return (
          <TimeSelector
            onSelect={(time) => {
              setBirthTime(time);
              goToResult({
                primary: { sign: time, score: 100, probability: 100 },
                secondary: null,
                confidence: 'exact'
              }, 'exact');
            }}
            onBack={handleBack}
          />
        );

      case 'quiz':
        return (
          <QuizQuestion
            answers={answers}
            setAnswers={setAnswers}
            onComplete={(calcResult) => goToResult(calcResult, 'quick')}
            onBack={handleBack}
          />
        );

      case 'precise':
        return (
          <PreciseAnalysis
            birthDate={birthDate}
            previousResult={result}
            onBack={handleBack}
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
