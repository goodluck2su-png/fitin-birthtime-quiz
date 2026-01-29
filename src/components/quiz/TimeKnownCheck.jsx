function TimeKnownCheck({ onExact, onQuick, onPrecise }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">⏰</div>
        <h2 className="text-2xl font-bold text-fitin-dark">
          태어난 시간,<br />어느 정도 알고 계신가요?
        </h2>
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* 옵션 A: 정확히 알아요 */}
        <div
          className="bg-white rounded-2xl p-5 shadow-lg cursor-pointer hover:ring-2 hover:ring-fitin-primary transition-all active:scale-[0.98]"
          onClick={onExact}
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">✅</span>
            <div className="flex-1">
              <p className="font-bold text-fitin-dark">정확히 알아요</p>
              <p className="text-sm text-gray-500">시간을 직접 입력할게요</p>
            </div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              100% 정확
            </span>
          </div>
        </div>

        {/* 옵션 B: 대충/애매해요 */}
        <div
          className="bg-white rounded-2xl p-5 shadow-lg cursor-pointer hover:ring-2 hover:ring-fitin-secondary transition-all active:scale-[0.98]"
          onClick={onQuick}
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">🤔</span>
            <div className="flex-1">
              <p className="font-bold text-fitin-dark">대충 알아요 / 애매해요</p>
              <p className="text-sm text-gray-500">간단한 질문 7개로 맞춰볼게요</p>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
              1~2분
            </span>
          </div>
        </div>

        {/* 옵션 C: 전혀 몰라요 */}
        <div
          className="bg-white rounded-2xl p-5 shadow-lg cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all active:scale-[0.98]"
          onClick={onPrecise}
        >
          <div className="flex items-center">
            <span className="text-3xl mr-4">🔮</span>
            <div className="flex-1">
              <p className="font-bold text-fitin-dark">전혀 몰라요</p>
              <p className="text-sm text-gray-500">AI 정밀 분석으로 찾아볼게요</p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
              3~5분
            </span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 text-center">
        정확한 시간을 모르셔도 괜찮아요!<br />
        단계별로 가장 가까운 시간대를 찾아드립니다 ✨
      </p>
    </div>
  );
}

export default TimeKnownCheck;
