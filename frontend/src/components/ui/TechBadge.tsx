export default function TechBadge({
  children,
  color = "cyan"
}: {
  children: React.ReactNode;
  color?: "cyan" | "emerald" | "rose" | "amber";
}) {
  const colors: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  };

  return (
    <span
      className={`px-2 py-1 text-[10px] uppercase font-bold border rounded ${colors[color]}`}
    >
      {children}
    </span>
  );
}
