// src/components/diagnosis/ResultsView.tsx
import { useContext } from "react";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ResultsView() {
  const { state, dispatch } = useContext(AppContext);
  const d = state.currentDiagnosis;
  if (!d) return null;

  return (
    <div className="max-w-5xl mx-auto pt-8 pb-20">
      <button
        onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}
        className="flex items-center text-slate-400 mb-6"
      >
        <ChevronLeft size={18} /> Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-8 border-l-4 border-cyan-500">
          <div className="flex gap-4">
            <AlertCircle className="text-cyan-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {d.risk_level} Risk Detected
              </h2>
              <p className="text-slate-400 mt-2">{d.clinical_summary}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {d.actionable_recommendations.map((r, i) => (
              <div key={i} className="p-3 bg-black/30 rounded text-slate-300">
                {r}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <h4 className="text-xs uppercase text-slate-400">Confidence</h4>
            <p className="text-xl text-white">
              {(d.confidence_score * 100).toFixed(0)}%
            </p>
          </Card>

          <Button
            fullWidth
            onClick={() => dispatch({ type: "SET_VIEW", payload: "chat" })}
          >
            Ask SehatAI
          </Button>
        </div>
      </div>
    </div>
  );
}
