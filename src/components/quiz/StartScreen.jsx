import Button from '../common/Button';

function StartScreen({ onNext }) {
  const previewCards = [
    { emoji: '🌅', time: '묘시생', trait: '활기찬 아침형', color: 'bg-orange-100' },
    { emoji: '☀️', time: '오시생', trait: '열정 넘치는', color: 'bg-yellow-100' },
    { emoji: '🌙', time: '자시생', trait: '깊은 사색가', color: 'bg-indigo-100' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white overflow-hidden">
      {/* 로고 영역 */}
      <div className="text-center animate-fadeIn">
        <div className="text-7xl mb-6 animate-pulse-custom">
          <span role="img" aria-label="crystal ball">🔮</span>
        </div>

        <h1 className="text-3xl font-bold text-fitin-dark mb-2">
          FIT IN
        </h1>

        <p className="text-fitin-primary font-medium mb-2">
          운명처럼 딱 맞는 옷
        </p>

        <p className="text-gray-500 text-sm mb-8">
          태어난 시간으로 알아보는 나의 패션 운명
        </p>
      </div>

      {/* 프리뷰 카드 영역 */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 px-2 hide-scrollbar">
        {previewCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-2xl p-4 min-w-[120px] text-center shadow-sm animate-fadeInUp`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-3xl">{card.emoji}</span>
            <p className="font-bold text-fitin-dark mt-2 text-sm">{card.time}</p>
            <p className="text-xs text-gray-600">{card.trait}</p>
          </div>
        ))}
      </div>

      {/* 시작 버튼 */}
      <div className="w-full max-w-xs space-y-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
        <Button primary size="lg" className="w-full" onClick={onNext}>
          내 패션 운명 알아보기
        </Button>

        <p className="text-center text-xs text-gray-400">
          약 1~3분 소요
        </p>
      </div>

      {/* 푸터 */}
      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-gray-300">
          Powered by FIT IN
        </p>
      </div>
    </div>
  );
}

export default StartScreen;
