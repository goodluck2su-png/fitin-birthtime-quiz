function ProgressBar({ current, total, showLabel = true }) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">Q{current}</span>
          <span>{current} / {total}</span>
        </div>
      )}

      {/* 도트 스타일 프로그레스 */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i < current
                ? 'w-6 bg-fitin-primary'
                : i === current
                ? 'w-4 bg-fitin-primary/50'
                : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
