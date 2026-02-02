function Button({ children, onClick, primary = false, disabled = false, className = '', size = 'md' }) {
  const baseStyles = 'rounded-xl font-medium transition-all duration-200 cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const primaryStyles = 'bg-fitin-primary text-white hover:bg-fitin-primary/90 shadow-lg hover:shadow-xl';
  const secondaryStyles = 'bg-white text-fitin-dark border-2 border-gray-200 hover:border-fitin-primary hover:bg-fitin-light';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${primary ? primaryStyles : secondaryStyles} ${disabled ? disabledStyles : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
