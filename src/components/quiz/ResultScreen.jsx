import { timeResults } from '../../data/timeResults';
import { getConfidenceText } from '../../utils/calculateScore';
import { shareToTwitter, copyLink } from '../../utils/shareUtils';
import Button from '../common/Button';

function ResultScreen({ birthDate, result, analysisType, onRestart, onMorePrecise }) {
  const primaryResult = timeResults[result.primary.sign];
  const secondaryResult = result.secondary ? timeResults[result.secondary.sign] : null;
  const confidenceInfo = getConfidenceText(result.confidence);

  if (!primaryResult) {
    return <div className="flex items-center justify-center min-h-screen"><p>결과를 불러오는 중...</p></div>;
  }

  const isExact = analysisType === 'exact';
  const showMorePrecise = !isExact && result.confidence !== 'high';

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-fitin-light via-white to-fitin-light">

      <div className="text-center mt-8 mb-4">
        {isExact ? (
          <p className="text-sm text-green-600 font-medium mb-2">✅ 직접 입력한 출생 시간</p>
        ) : (
          <p className="text-sm text-fitin-secondary font-medium mb-2">🎯 추정 결과</p>
        )}
      </div>

      {/* 1순위 */}
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-fitin-primary/20 text-fitin-primary px-2 py-1 rounded-full font-medium">1순위</span>
          <span className="text-2xl font-bold text-fitin-primary">{result.primary.probability}%</span>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-5xl mr-4">{primaryResult.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold text-fitin-dark">{primaryResult.timeKorean}</h2>
            <p className="text-gray-500">{primaryResult.timeRange}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-bold text-fitin-dark mb-2">"{primaryResult.title}"</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{primaryResult.description}</p>
        </div>
      </div>

      {/* 2순위 */}
      {secondaryResult && result.secondary.probability >= 10 && (
        <div className="bg-white/70 rounded-2xl p-4 shadow w-full max-w-md mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium mr-3">2순위</span>
              <span className="text-2xl mr-2">{secondaryResult.emoji}</span>
              <div>
                <p className="font-medium text-fitin-dark">{secondaryResult.timeKorean}</p>
                <p className="text-xs text-gray-500">{secondaryResult.timeRange}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-gray-500">{result.secondary.probability}%</span>
          </div>
        </div>
      )}

      {/* 신뢰도 */}
      {!isExact && (
        <div className="bg-gray-50 rounded-xl p-4 w-full max-w-md mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">분석 신뢰도</span>
            <div className="flex items-center">
              <span className={`text-sm font-medium ${confidenceInfo.color} mr-2`}>{confidenceInfo.text}</span>
              <span>{confidenceInfo.stars}</span>
            </div>
          </div>
        </div>
      )}

      {/* 패션 운명 */}
      <div className="bg-gradient-to-br from-fitin-primary/10 to-fitin-secondary/10 rounded-2xl p-5 w-full max-w-md mb-6">
        <h3 className="text-lg font-bold text-fitin-dark mb-3 flex items-center">
          <span className="mr-2">👔</span>{primaryResult.timeKorean.split(' ')[0]}생의 패션 운명
        </h3>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{primaryResult.fashionHint}</p>
        <div className="flex flex-wrap gap-2">
          {primaryResult.keywords.map((keyword, index) => (
            <span key={index} className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-fitin-primary shadow-sm">#{keyword}</span>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="w-full max-w-md space-y-3">
        <Button primary className="w-full text-lg py-4" onClick={() => alert('FIT IN 메인 서비스 연결 예정!')}>
          ✨ 이 결과로 내 스타일 찾기
        </Button>
        {showMorePrecise && (
          <Button className="w-full" onClick={onMorePrecise}>🔍 더 정밀하게 분석하기</Button>
        )}
      </div>

      {/* 공유 */}
      <div className="flex gap-4 mt-6 mb-4">
        <button onClick={() => shareToTwitter(primaryResult)} className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl hover:bg-blue-500">𝕏</button>
        <button onClick={copyLink} className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-gray-300">🔗</button>
      </div>

      <button onClick={onRestart} className="text-gray-500 underline hover:text-fitin-primary">처음부터 다시하기</button>
      <p className="mt-6 text-xs text-gray-400">운명처럼 딱 맞는 옷, FIT IN</p>
    </div>
  );
}

export default ResultScreen;
