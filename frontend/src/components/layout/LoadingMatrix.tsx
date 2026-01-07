// src/components/layout/LoadingMatrix.tsx
import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

export default function LoadingMatrix() {
  const logs = [
    "Connecting to SehatAI Core...",
    "Loading Vector Embeddings...",
    "Initializing Symptom Analyzer...",
    "Querying MedicalLLM...",
    "Running Risk Assessor...",
    "Finalizing Clinical Report..."
  ];

  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full font-mono">
      <Cpu className="text-cyan-500 animate-pulse mb-6" size={48} />

      <div className="w-full max-w-sm bg-black/40 rounded-lg p-4 border border-cyan-500/20 text-xs text-cyan-400 h-40 overflow-hidden">
        {log.map((l, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
