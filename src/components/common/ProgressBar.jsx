function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Q{current}</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-fitin-primary rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
