// src/components/chat/ChatView.tsx
import { useContext, useEffect, useRef, useState } from "react";
import { ChevronLeft, Send, Cpu } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { sendChatMessage } from "../../api/chat.api";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ChatView() {
  const { state, dispatch } = useContext(AppContext);
  const [input, setInput] = useState(state.initialChatQuery || "");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"general" | "triage" | "second_opinion">(
    "general"
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.chatHistory, loading]);

  async function handleSend(e?: any, override?: string) {
    if (e) e.preventDefault();
    const text = override ?? input;
    if (!text.trim()) return;

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: Date.now().toString(),
        role: "user",
        content: text,
        timestamp: new Date()
      }
    });

    setInput("");
    setLoading(true);

    const res = await sendChatMessage({
      message: text,
      mode,
      context_id: state.currentDiagnosis?.analysis_id
    });

    dispatch({ type: "ADD_MESSAGE", payload: res });
    setLoading(false);
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}
          className="flex items-center text-slate-400 hover:text-cyan-400"
        >
          <ChevronLeft size={20} /> Dashboard
        </button>

        <div className="flex gap-2">
          {["general", "triage", "second_opinion"].map(m => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${
                mode === m
                  ? "bg-cyan-500 text-white"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {m.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {state.chatHistory.length === 0 && (
            <div className="text-center text-slate-400 mt-20">
              Ask SehatAI about symptoms, medications, or reports.
            </div>
          )}

          {state.chatHistory.map(msg => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white"
                    : "bg-black/40 text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {msg.sources && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.sources.map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-white/5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-cyan-400">
              <Cpu className="animate-pulse" size={16} />
              SehatAI is thinking…
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-white/10 flex gap-3"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Message SehatAI…"
            className="flex-1 bg-black/40 px-4 py-3 rounded-xl text-white outline-none"
          />
          <Button disabled={!input || loading}>
            <Send size={18} />
          </Button>
        </form>
      </Card>
    </div>
  );
}
