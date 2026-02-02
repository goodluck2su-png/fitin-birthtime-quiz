import Header from '../common/Header';

function TimeKnownCheck({ onExact, onQuick, onPrecise, onBack }) {
  const options = [
    {
      id: 'exact',
      emoji: '✅',
      title: '정확히 알아요',
      subtitle: '시간을 직접 입력할게요',
      badge: { text: '100% 정확', color: 'bg-green-100 text-green-600' },
      onClick: onExact
    },
    {
      id: 'quick',
      emoji: '🤔',
      title: '대충 알아요 / 애매해요',
      subtitle: '간단한 질문 7개로 맞춰볼게요',
      badge: { text: '1~2분', color: 'bg-yellow-100 text-yellow-600' },
      onClick: onQuick
    },
    {
      id: 'precise',
      emoji: '🔮',
      title: '전혀 몰라요',
      subtitle: 'AI 정밀 분석으로 찾아볼게요',
      badge: { text: '3~5분', color: 'bg-purple-100 text-purple-600' },
      onClick: onPrecise
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-fitin-light to-white">
      <Header title="출생 시간" onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="text-5xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-fitin-dark leading-tight">
            태어난 시간,<br />어느 정도 알고 계신가요?
          </h2>
        </div>

        <div className="w-full max-w-md space-y-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="bg-white rounded-2xl p-5 shadow-lg cursor-pointer hover:ring-2 hover:ring-fitin-primary transition-all active:scale-[0.98] animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={option.onClick}
            >
              <div className="flex items-center">
                <span className="text-3xl mr-4">{option.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-fitin-dark">{option.title}</p>
                  <p className="text-sm text-gray-500">{option.subtitle}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${option.badge.color}`}>
                  {option.badge.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center animate-fadeIn" style={{ animationDelay: '400ms' }}>
          정확한 시간을 모르셔도 괜찮아요!<br />
          단계별로 가장 가까운 시간대를 찾아드립니다 ✨
        </p>
      </div>
    </div>
  );
}

export default TimeKnownCheck;
