import { useEffect, useState } from 'react';
import { timeResults } from '../../data/timeResults';
import { getConfidenceText } from '../../utils/calculateScore';
import { shareToTwitter, copyLink } from '../../utils/shareUtils';
import Button from '../common/Button';

function ResultScreen({ result, analysisType, onRestart, onMorePrecise }) {
  const [showContent, setShowContent] = useState(false);
  const primaryResult = timeResults[result.primary.sign];
  const secondaryResult = result.secondary ? timeResults[result.secondary.sign] : null;
  const confidenceInfo = getConfidenceText(result.confidence);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!primaryResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>결과를 불러오는 중...</p>
      </div>
    );
  }

  const isExact = analysisType === 'exact';
  const showMorePrecise = !isExact && result.confidence !== 'high';

  return (
    <div className="min-h-screen bg-gradient-to-b from-fitin-light via-white to-fitin-light overflow-y-auto">
      {/* 히어로 섹션 */}
      <div className={`bg-gradient-to-br from-fitin-primary to-fitin-secondary text-white p-8 pb-16 text-center transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-4">
          {isExact ? (
            <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              ✅ 직접 입력한 출생 시간
            </span>
          ) : (
            <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              🎯 추정 결과 · {result.primary.probability}% 확률
            </span>
          )}
        </div>

        <div className="text-7xl mb-4 animate-pulse-custom">{primaryResult.emoji}</div>

        <h1 className="text-3xl font-bold mb-2">{primaryResult.timeKorean}</h1>
        <p className="text-white/80">{primaryResult.timeRange}</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="px-6 -mt-8">
        {/* 1순위 카드 */}
        <div className={`bg-white rounded-2xl p-6 shadow-xl w-full max-w-md mx-auto mb-4 transition-all duration-500 delay-100 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-xl font-bold text-fitin-dark mb-3">"{primaryResult.title}"</h3>
          <p className="text-gray-600 leading-relaxed">{primaryResult.description}</p>
        </div>

        {/* 2순위 */}
        {secondaryResult && result.secondary.probability >= 10 && (
          <div className={`bg-white/80 rounded-2xl p-4 shadow w-full max-w-md mx-auto mb-4 transition-all duration-500 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
          <div className={`bg-gray-50 rounded-xl p-4 w-full max-w-md mx-auto mb-4 transition-all duration-500 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
        <div className={`bg-gradient-to-br from-fitin-primary/10 to-fitin-secondary/10 rounded-2xl p-6 w-full max-w-md mx-auto mb-6 transition-all duration-500 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-lg font-bold text-fitin-dark mb-3 flex items-center">
            <span className="mr-2">👔</span>{primaryResult.timeKorean.split(' ')[0]}생의 패션 운명
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">{primaryResult.fashionHint}</p>
          <div className="flex flex-wrap gap-2">
            {primaryResult.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-fitin-primary shadow-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className={`w-full max-w-md mx-auto space-y-3 transition-all duration-500 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            primary
            size="lg"
            className="w-full"
            onClick={() => alert('FIT IN 메인 서비스 연결 예정!')}
          >
            ✨ 이 결과로 내 스타일 찾기
          </Button>
          {showMorePrecise && (
            <Button className="w-full" onClick={onMorePrecise}>
              🔮 AI로 더 정밀하게 분석하기
            </Button>
          )}
        </div>

        {/* 공유 */}
        <div className={`flex justify-center gap-4 mt-8 mb-4 transition-all duration-500 delay-600 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => shareToTwitter(primaryResult)}
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-lg hover:bg-gray-800 transition-colors shadow-lg"
          >
            𝕏
          </button>
          <button
            onClick={copyLink}
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-gray-300 transition-colors shadow-lg"
          >
            🔗
          </button>
        </div>

        <div className="text-center pb-8">
          <button
            onClick={onRestart}
            className="text-gray-500 underline hover:text-fitin-primary transition-colors"
          >
            처음부터 다시하기
          </button>
          <p className="mt-4 text-xs text-gray-400">운명처럼 딱 맞는 옷, FIT IN</p>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
