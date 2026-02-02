function Header({ onBack, step, totalSteps, showProgress = true }) {
  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
      {/* 네비게이션 */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-xl text-gray-600">←</span>
        </button>

        {showProgress && (
          <span className="text-sm text-gray-400 font-medium">{step}/{totalSteps}</span>
        )}

        <div className="w-10"></div>
      </div>

      {/* 프로그레스 바 */}
      {showProgress && (
        <div className="px-6 pb-4">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fitin-primary to-fitin-secondary rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
