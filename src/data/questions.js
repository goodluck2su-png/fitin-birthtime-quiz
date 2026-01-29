export const questions = [
  {
    id: 1,
    question: "월요일 아침, 알람이 울렸다. 당신의 첫 반응은?",
    options: [
      { text: "5분만... (이불 속으로 파고듦)", timeWeight: { 자: 2, 축: 2, 해: 1 } },
      { text: "바로 일어나서 오늘 할 일 체크", timeWeight: { 묘: 2, 진: 2, 인: 1 } },
      { text: "핸드폰부터 확인 (SNS, 메시지)", timeWeight: { 사: 2, 오: 1, 미: 1 } },
      { text: "알람 끄고 다시 맞춰놓음", timeWeight: { 신: 1, 유: 2, 술: 2 } }
    ]
  },
  {
    id: 2,
    question: "친구들 사이에서 당신의 역할은?",
    options: [
      { text: "분위기 메이커 (에너지 담당)", timeWeight: { 오: 2, 미: 2, 사: 1 } },
      { text: "계획러 (일정 정리 담당)", timeWeight: { 묘: 2, 진: 2, 인: 1 } },
      { text: "상담러 (고민 들어주는 사람)", timeWeight: { 유: 2, 술: 2, 해: 1 } },
      { text: "관찰러 (조용히 지켜보는 편)", timeWeight: { 자: 2, 축: 2, 신: 1 } }
    ]
  },
  {
    id: 3,
    question: "가장 집중이 잘 되는 시간대는?",
    options: [
      { text: "이른 아침 (해 뜨기 전후)", timeWeight: { 인: 3, 묘: 2 } },
      { text: "오전~점심 시간", timeWeight: { 진: 2, 사: 3 } },
      { text: "오후~저녁 시간", timeWeight: { 오: 2, 미: 2, 신: 2 } },
      { text: "밤~새벽 시간", timeWeight: { 유: 2, 술: 2, 해: 2, 자: 2 } }
    ]
  },
  {
    id: 4,
    question: "스트레스 받을 때 당신의 해소법은?",
    options: [
      { text: "운동이나 산책 (몸을 움직임)", timeWeight: { 인: 2, 묘: 2, 진: 1 } },
      { text: "수다 떨기 (누군가와 대화)", timeWeight: { 사: 2, 오: 2, 미: 1 } },
      { text: "혼자만의 시간 (명상, 독서)", timeWeight: { 유: 2, 술: 2, 해: 1 } },
      { text: "잠 (일단 자고 본다)", timeWeight: { 자: 3, 축: 2 } }
    ]
  },
  {
    id: 5,
    question: "새로운 일을 시작할 때 당신은?",
    options: [
      { text: "일단 바로 시작 (즉흥적)", timeWeight: { 오: 2, 미: 2, 사: 1 } },
      { text: "충분히 계획 후 실행 (신중함)", timeWeight: { 축: 2, 인: 2, 묘: 1 } },
      { text: "다른 사람 먼저 해보는 거 관찰", timeWeight: { 신: 2, 유: 2, 술: 1 } },
      { text: "느낌 오면 그때 한다", timeWeight: { 자: 2, 해: 2 } }
    ]
  },
  {
    id: 6,
    question: "파티나 모임에서 당신은?",
    options: [
      { text: "중심에서 분위기 리드", timeWeight: { 오: 3, 미: 2 } },
      { text: "이것저것 준비하고 챙김", timeWeight: { 진: 2, 사: 2, 묘: 1 } },
      { text: "친한 사람들이랑만 대화", timeWeight: { 신: 2, 유: 2 } },
      { text: "구석에서 조용히 즐김", timeWeight: { 술: 2, 해: 2, 자: 2, 축: 1 } }
    ]
  },
  {
    id: 7,
    question: "당신이 가장 좋아하는 하늘은?",
    options: [
      { text: "해 뜨는 새벽 하늘", timeWeight: { 인: 3, 묘: 2, 축: 1 } },
      { text: "맑고 파란 한낮의 하늘", timeWeight: { 사: 2, 오: 3, 진: 1 } },
      { text: "노을 지는 저녁 하늘", timeWeight: { 미: 2, 신: 2, 유: 2 } },
      { text: "별이 빛나는 밤하늘", timeWeight: { 술: 2, 해: 2, 자: 3 } }
    ]
  }
];
