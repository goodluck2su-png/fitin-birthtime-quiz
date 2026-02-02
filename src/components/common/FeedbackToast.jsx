function FeedbackToast({ show, message = "좋아요!" }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-2xl px-6 py-4 shadow-xl animate-fadeIn">
        <div className="text-center">
          <span className="text-3xl block mb-1">✨</span>
          <span className="text-fitin-dark font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
}

export default FeedbackToast;
