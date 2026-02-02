import { useState, useEffect } from 'react';

function LoadingScreen() {
  const [step, setStep] = useState(0);

  const steps = [
    { emoji: "🔮", text: "사주 데이터 분석 중..." },
    { emoji: "📊", text: "패션 스타일 매칭 중..." },
    { emoji: "✨", text: "결과 생성 중..." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
      {/* 로딩 애니메이션 */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-fitin-light flex items-center justify-center">
          <span className="text-5xl animate-pulse-custom">{steps[step].emoji}</span>
        </div>
        {/* 회전하는 원 */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-fitin-primary rounded-full animate-spin"></div>
      </div>

      {/* 텍스트 */}
      <p className="text-fitin-dark font-medium text-lg mb-2 animate-fadeIn" key={step}>
        {steps[step].text}
      </p>

      {/* 진행 바 */}
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-fitin-primary transition-all duration-500 rounded-full"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <p className="mt-8 text-xs text-gray-400">잠시만 기다려주세요...</p>
    </div>
  );
}

export default LoadingScreen;
