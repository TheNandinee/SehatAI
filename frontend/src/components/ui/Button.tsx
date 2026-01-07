export default function Button({
  children,
  onClick,
  disabled,
  className = ""
}: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition ${className}`}
    >
      {children}
    </button>
  );
}
