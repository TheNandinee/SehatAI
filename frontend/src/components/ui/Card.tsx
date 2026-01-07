export default function Card({ children, className = "" }: any) {
  return (
    <div className={`bg-[#0f172a]/80 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}
