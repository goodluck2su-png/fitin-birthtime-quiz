function Button({ children, onClick, primary = false, className = '' }) {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer';
  const primaryStyles = 'bg-fitin-primary text-white hover:bg-fitin-primary/90 shadow-lg';
  const secondaryStyles = 'bg-white text-fitin-dark border-2 border-gray-200 hover:border-fitin-primary';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${primary ? primaryStyles : secondaryStyles} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
