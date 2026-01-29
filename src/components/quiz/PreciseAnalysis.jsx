import Button from '../common/Button';

function PreciseAnalysis({ birthDate, previousResult, onComplete, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
      <div className="text-6xl mb-6">🔮</div>
      <h2 className="text-2xl font-bold text-fitin-dark text-center mb-4">AI 정밀 분석</h2>

      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md mb-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <span className="text-xl mr-3">📋</span>
            <div>
              <p className="font-medium text-fitin-dark">기록 확인 유도</p>
              <p className="text-sm text-gray-500">출생증명서, 부모님 기억 확인</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-xl mr-3">🤖</span>
            <div>
              <p className="font-medium text-fitin-dark">AI 역질문</p>
              <p className="text-sm text-gray-500">후보 시주별 특성을 역으로 질문</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-xl mr-3">📊</span>
            <div>
              <p className="font-medium text-fitin-dark">베이지안 분석</p>
              <p className="text-sm text-gray-500">답변을 종합해 확률 계산</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        🚧 준비 중 (AI API 연동 예정)
      </div>

      <div className="bg-gray-50 rounded-xl p-4 w-full max-w-md mb-6">
        <p className="text-sm text-gray-600 text-center">
          <strong>예상 정확도:</strong> 85~95%<br />
          <strong>소요 시간:</strong> 3~5분<br />
          <strong>필요:</strong> Google Gemini API
        </p>
      </div>

      <div className="w-full max-w-md space-y-3">
        <Button primary className="w-full" onClick={onBack}>← 다른 방법으로 분석하기</Button>
        <p className="text-xs text-gray-400 text-center">API 연동 후 이 기능이 활성화됩니다</p>
      </div>
    </div>
  );
}

export default PreciseAnalysis;
