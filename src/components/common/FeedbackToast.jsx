import { useEffect, useState } from 'react';

const feedbackMessages = [
  { text: "좋아요!", emoji: "💫" },
  { text: "알겠어요!", emoji: "✨" },
  { text: "좋은 단서예요!", emoji: "🔍" },
  { text: "거의 다 왔어요!", emoji: "🎯" },
  { text: "잘하고 있어요!", emoji: "👍" },
];

function FeedbackToast({ show, questionIndex }) {
  const [message, setMessage] = useState(feedbackMessages[0]);

  useEffect(() => {
    if (show) {
      // 마지막 질문 근처면 특별 메시지
      if (questionIndex >= 5) {
        setMessage({ text: "거의 다 왔어요!", emoji: "🎯" });
      } else {
        const randomIndex = Math.floor(Math.random() * feedbackMessages.length);
        setMessage(feedbackMessages[randomIndex]);
      }
    }
  }, [show, questionIndex]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-2xl px-6 py-4 shadow-xl animate-fadeIn">
        <div className="text-center">
          <span className="text-3xl block mb-1">{message.emoji}</span>
          <span className="text-fitin-dark font-medium">{message.text}</span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackToast;
