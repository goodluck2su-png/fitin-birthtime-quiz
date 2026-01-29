import Card from '../common/Card';

function TimeKnownCheck({ onKnow, onNotKnow }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">&#x23F0;</span>
          <h2 className="text-xl font-bold text-fitin-dark mt-4">
            태어난 시간을 알고 계신가요?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            정확한 사주 분석을 위해 시간이 필요해요
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onKnow}
            className="w-full p-4 text-left rounded-xl border-2 border-gray-200
                       hover:border-fitin-primary hover:bg-fitin-light
                       transition-all duration-200"
          >
            <span className="font-medium text-fitin-dark">
              네, 알고 있어요 &#x2705;
            </span>
          </button>

          <button
            onClick={onNotKnow}
            className="w-full p-4 text-left rounded-xl border-2 border-gray-200
                       hover:border-fitin-secondary hover:bg-fitin-secondary/10
                       transition-all duration-200"
          >
            <span className="font-medium text-fitin-dark">
              아니요, 모르겠어요 &#x1F914;
            </span>
            <p className="text-sm text-gray-500 mt-1">
              재미있는 퀴즈로 추정해볼게요!
            </p>
          </button>
        </div>
      </Card>
    </div>
  );
}

export default TimeKnownCheck;
