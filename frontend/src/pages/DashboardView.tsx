// src/pages/DashboardView.tsx
import { useContext, useState } from "react";
import { Activity, Clock, Zap } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function DashboardView() {
  const { state, dispatch } = useContext(AppContext);
  const { user, diagnoses } = state;
  const [quickQuery, setQuickQuery] = useState("");

  function handleQuickAsk(e: any) {
    e.preventDefault();
    if (!quickQuery.trim()) return;

    dispatch({ type: "SET_INITIAL_QUERY", payload: quickQuery });
    dispatch({ type: "SET_VIEW", payload: "chat" });
    setQuickQuery("");
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 pb-20">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Hello, <span className="text-cyan-400">{user?.name}</span>
        </h1>
        <p className="text-slate-400">Your health command center.</p>
      </header>

      {/* Quick Ask */}
      <Card className="p-4 mb-10">
        <form onSubmit={handleQuickAsk} className="flex gap-3">
          <input
            value={quickQuery}
            onChange={e => setQuickQuery(e.target.value)}
            placeholder="Ask SehatAI anything..."
            className="flex-1 bg-black/40 px-4 py-3 rounded-xl text-white outline-none"
          />
          <Button>Ask AI</Button>
        </form>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <Button onClick={() => dispatch({ type: "SET_VIEW", payload: "diagnosis" })} icon={Zap}>
          Check Symptoms
        </Button>
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: "SET_VIEW", payload: "history" })}
          icon={Clock}
        >
          History
        </Button>
      </div>

      {/* Recent Diagnoses */}
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Activity size={18} /> Recent Logs
      </h3>

      {diagnoses.length === 0 ? (
        <Card className="p-10 text-center text-slate-400">
          No diagnoses yet. Start a check-up.
        </Card>
      ) : (
        <div className="space-y-4">
          {diagnoses.slice(0, 3).map(d => (
            <Card
              key={d.analysis_id}
              className="cursor-pointer hover:border-cyan-500/30"
              onClick={() => {
                dispatch({ type: "SET_DIAGNOSIS", payload: d });
                dispatch({ type: "SET_VIEW", payload: "results" });
              }}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold text-white">
                    {d.risk_level} Risk
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {d.clinical_summary}
                  </p>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(d.timestamp).toLocaleDateString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
