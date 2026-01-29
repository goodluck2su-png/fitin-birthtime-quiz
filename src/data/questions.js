export const questions = [
  {
    id: 1,
    type: 'filter',
    question: "태어난 시간대, 대략 어느 때쯤이라고 알고 계세요?",
    subtitle: "부모님이나 가족에게 들은 기억을 떠올려보세요",
    options: [
      { text: "새벽 (01:00~05:00)", subtext: "한밤중~동트기 전", filter: ["축", "인"], emoji: "🌃" },
      { text: "아침 (05:00~09:00)", subtext: "해 뜰 무렵~출근 시간", filter: ["묘", "진"], emoji: "🌅" },
      { text: "오전~점심 (09:00~13:00)", subtext: "아침 식사 후~점심때", filter: ["사", "오"], emoji: "☀️" },
      { text: "오후 (13:00~17:00)", subtext: "점심 후~해 지기 전", filter: ["미", "신"], emoji: "🌤️" },
      { text: "저녁 (17:00~21:00)", subtext: "퇴근 시간~저녁 식사 후", filter: ["유", "술"], emoji: "🌇" },
      { text: "밤 (21:00~01:00)", subtext: "밤늦게~자정 무렵", filter: ["해", "자"], emoji: "🌙" },
      { text: "전혀 감이 없어요", subtext: "아무것도 들은 적 없어요", filter: null, emoji: "❓" }
    ]
  },
  {
    id: 2,
    type: 'adjust',
    question: "부모님이 말씀하신 기억 중 해당하는 게 있나요?",
    subtitle: "출산 당시 상황에 대해 들은 이야기",
    options: [
      { text: "해 뜨기 전/새벽이었대요", subtext: "아직 어두울 때", adjust: { 자: 2, 축: 3, 인: 3 }, emoji: "🌃" },
      { text: "아침밥 먹을 때쯤/출근 전", subtext: "아침 시간대", adjust: { 묘: 3, 진: 3 }, emoji: "🍳" },
      { text: "낮/점심 전후였대요", subtext: "한낮 시간대", adjust: { 사: 3, 오: 3, 미: 2 }, emoji: "☀️" },
      { text: "저녁/퇴근할 때쯤", subtext: "해 질 무렵", adjust: { 신: 2, 유: 3, 술: 3 }, emoji: "🌆" },
      { text: "밤늦게/뉴스 볼 때쯤", subtext: "저녁 식사 이후", adjust: { 술: 2, 해: 3, 자: 3 }, emoji: "📺" },
      { text: "들은 적 없어요", subtext: "기억나는 게 없어요", adjust: {}, emoji: "🤷" }
    ]
  },
  {
    id: 3,
    type: 'adjust',
    question: "출산 상황에 대해 들은 게 있나요?",
    subtitle: "출산 장소나 상황",
    options: [
      { text: "병원에서 예정대로", subtext: "계획된 출산", adjust: { 사: 1, 오: 2, 미: 2 }, emoji: "🏥" },
      { text: "병원에서 응급으로/예정보다 빨리", subtext: "급하게 병원 감", adjust: { 자: 2, 축: 2, 인: 1, 해: 1 }, emoji: "🚑" },
      { text: "집/조산원에서", subtext: "병원 외 장소", adjust: { 묘: 1, 진: 1, 유: 1 }, emoji: "🏠" },
      { text: "잘 모르겠어요", subtext: "들은 적 없어요", adjust: {}, emoji: "🤷" }
    ]
  },
  {
    id: 4,
    type: 'adjust',
    question: "출산 당시 에피소드로 들은 게 있나요?",
    subtitle: "가족들이 말해준 출산 관련 이야기",
    options: [
      { text: "아버지가 출근 전/출근길에 태어남", subtext: "아침 일찍", adjust: { 묘: 3, 진: 3, 인: 1 }, emoji: "👔" },
      { text: "아버지가 퇴근 후에 오셨대요", subtext: "저녁~밤", adjust: { 유: 2, 술: 3, 해: 2 }, emoji: "🚶" },
      { text: "가족들 다 자고 있을 때", subtext: "한밤중~새벽", adjust: { 자: 3, 축: 3 }, emoji: "😴" },
      { text: "밥 먹다가/식사 시간에", subtext: "식사 시간대", adjust: { 묘: 1, 오: 2, 유: 1 }, emoji: "🍚" },
      { text: "TV 보다가 (뉴스, 드라마)", subtext: "저녁~밤 시간", adjust: { 술: 2, 해: 3, 자: 1 }, emoji: "📺" },
      { text: "딱히 들은 게 없어요", subtext: "기억나는 이야기 없음", adjust: {}, emoji: "🤷" }
    ]
  },
  {
    id: 5,
    type: 'adjust',
    question: "출생 기록을 확인해본 적 있나요?",
    subtitle: "출생증명서, 산부인과 기록, 예방접종수첩 등",
    options: [
      { text: "확인했는데 새벽~아침이었어요", subtext: "01:00~09:00 사이", adjust: { 축: 5, 인: 5, 묘: 5, 진: 5 }, emoji: "📋" },
      { text: "확인했는데 낮~오후였어요", subtext: "09:00~17:00 사이", adjust: { 사: 5, 오: 5, 미: 5, 신: 5 }, emoji: "📋" },
      { text: "확인했는데 저녁~밤이었어요", subtext: "17:00~01:00 사이", adjust: { 유: 5, 술: 5, 해: 5, 자: 5 }, emoji: "📋" },
      { text: "기록이 없거나 확인 못 했어요", subtext: "확인 불가", adjust: {}, emoji: "❓" }
    ]
  },
  {
    id: 6,
    type: 'adjust',
    question: "평소 에너지가 가장 좋은 시간대는?",
    subtitle: "가장 활력이 넘치고 집중 잘 되는 시간",
    options: [
      { text: "새벽~아침 (일찍 일어나는 게 좋아요)", subtext: "아침형 인간", adjust: { 인: 2, 묘: 2, 진: 1 }, emoji: "🌅" },
      { text: "오전~낮 (활동적인 낮이 좋아요)", subtext: "낮 활동형", adjust: { 사: 2, 오: 2, 미: 1 }, emoji: "☀️" },
      { text: "오후~저녁 (해질 무렵이 편해요)", subtext: "저녁형", adjust: { 신: 2, 유: 2, 술: 1 }, emoji: "🌇" },
      { text: "밤~새벽 (밤에 집중 잘 돼요)", subtext: "야행성", adjust: { 해: 2, 자: 2, 축: 1 }, emoji: "🌙" }
    ]
  },
  {
    id: 7,
    type: 'adjust',
    question: "체질이나 성향 중 해당하는 게 있나요?",
    subtitle: "평소 자주 듣는 말이나 느끼는 특성",
    options: [
      { text: "부지런하고 계획적이에요", subtext: "아침형, 체계적", adjust: { 묘: 2, 진: 2, 사: 1 }, emoji: "📝" },
      { text: "열정적이고 에너지가 넘쳐요", subtext: "활동적, 외향적", adjust: { 오: 3, 미: 1, 사: 1 }, emoji: "🔥" },
      { text: "차분하고 신중해요", subtext: "내성적, 분석적", adjust: { 유: 2, 술: 2, 신: 1 }, emoji: "🧘" },
      { text: "감성적이고 직관적이에요", subtext: "몽상가, 창의적", adjust: { 해: 2, 자: 2, 축: 1 }, emoji: "🎨" },
      { text: "딱히 해당하는 게 없어요", subtext: "보통이에요", adjust: {}, emoji: "😐" }
    ]
  }
];
