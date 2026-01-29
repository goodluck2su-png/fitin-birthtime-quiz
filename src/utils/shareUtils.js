// 카카오톡 공유 (카카오 SDK 필요)
export function shareToKakao() {
  // 카카오 SDK가 로드되지 않은 경우
  if (typeof window.Kakao === 'undefined') {
    alert('카카오 공유 기능을 준비 중입니다.');
    return;
  }

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: 'FIT IN - 태어난 시간 추정 퀴즈',
      description: '나의 출생 시간을 퀴즈로 알아보세요!',
      imageUrl: window.location.origin + '/og-image.png',
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: window.location.origin,
          webUrl: window.location.origin,
        },
      },
    ],
  });
}

// 트위터(X) 공유
export function shareToTwitter() {
  const text = encodeURIComponent('FIT IN - 태어난 시간 추정 퀴즈로 알아본 나의 패션 운명! ✨');
  const url = encodeURIComponent(window.location.origin);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// 링크 복사
export async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.origin);
    alert('링크가 복사되었습니다!');
  } catch (err) {
    // fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = window.location.origin;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('링크가 복사되었습니다!');
  }
}
