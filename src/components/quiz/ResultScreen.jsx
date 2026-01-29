import { timeResults } from '../../data/timeResults';
import { shareToKakao, shareToTwitter, copyLink } from '../../utils/shareUtils';
import Card from '../common/Card';
import Button from '../common/Button';

function ResultScreen({ birthDate, birthTime, isEstimated }) {
  const result = timeResults[birthTime];

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>결과를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-fitin-light to-white">
      {/* 헤더 */}
      <div className="text-center mt-8 mb-6">
        {isEstimated && (
          <p className="text-sm text-gray-500 mb-2">
            &#x2728; AI가 추정한 당신의 출생 시간
          </p>
        )}
        <h1 className="text-3xl font-bold text-fitin-dark">
          {result.timeKorean}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {result.timeRange}
        </p>
      </div>

      {/* 시간대 이미지/아이콘 */}
      <div className="text-6xl mb-6">
        {result.emoji}
      </div>

      {/* 성향 설명 카드 */}
      <Card className="w-full max-w-md mb-4">
        <h3 className="text-lg font-bold text-fitin-primary mb-3">
          {result.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {result.description}
        </p>
      </Card>

      {/* 패션 스타일 힌트 카드 */}
      <Card className="w-full max-w-md mb-6 bg-fitin-primary/10">
        <h3 className="text-lg font-bold text-fitin-dark mb-3">
          &#x1F454; {result.timeKorean}생의 패션 운명
        </h3>
        <p className="text-gray-700 mb-3">
          {result.fashionHint}
        </p>
        <div className="flex flex-wrap gap-2">
          {result.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white rounded-full text-sm text-fitin-primary"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </Card>

      {/* CTA 버튼 */}
      <Button
        primary
        className="w-full max-w-md mb-4"
        onClick={() => window.location.href = 'https://fitin.app'}
      >
        내 스타일 더 알아보기 &#x2192;
      </Button>

      {/* 공유 버튼들 */}
      <div className="flex gap-3">
        <button
          onClick={shareToKakao}
          className="p-3 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
        >
          &#x1F4F1;
        </button>
        <button
          onClick={shareToTwitter}
          className="p-3 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors"
        >
          &#x1F426;
        </button>
        <button
          onClick={copyLink}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        >
          &#x1F517;
        </button>
      </div>

      {/* 다시하기 */}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 text-gray-500 underline hover:text-fitin-primary"
      >
        다시 테스트하기
      </button>
    </div>
  );
}

export default ResultScreen;
