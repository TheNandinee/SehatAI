// src/pages/HistoryView.tsx
import { useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";

export default function HistoryView() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <button
        onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}
        className="flex items-center text-slate-400 mb-6"
      >
        <ChevronLeft size={18} /> Dashboard
      </button>

      <h2 className="text-3xl font-bold text-white mb-8">
        Medical History
      </h2>

      {state.diagnoses.length === 0 ? (
        <p className="text-slate-400">No history available.</p>
      ) : (
        <div className="space-y-4">
          {state.diagnoses.map(d => (
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
                  <h4 className="text-white font-bold">
                    {d.risk_level} Risk
                  </h4>
                  <p className="text-slate-400 text-sm">
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
