// src/components/layout/Sidebar.tsx
import { useContext } from "react";
import {
  Activity,
  MessageSquare,
  Database,
  Settings,
  LogOut,
  Stethoscope,
  BarChart3,
  Users
} from "lucide-react";
import { AppContext } from "../../context/AppContext";

export default function Sidebar() {
  const { state, dispatch } = useContext(AppContext);
  const isDoctor = state.user?.role === "doctor";

  const links = isDoctor
    ? [
        { id: "doctor-dashboard", label: "Dashboard", icon: Activity },
        { id: "reports", label: "Analytics", icon: BarChart3 },
        { id: "staff", label: "Staff", icon: Users }
      ]
    : [
        { id: "dashboard", label: "Home", icon: Activity },
        { id: "chat", label: "AI Assistant", icon: MessageSquare },
        { id: "history", label: "History", icon: Database },
        { id: "profile", label: "Settings", icon: Settings }
      ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-[#020617]/90 border-r border-white/5 h-screen p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
          {isDoctor ? <Stethoscope className="text-white" /> : <Activity className="text-white" />}
        </div>
        <div>
          <span className="text-xl font-bold text-white block">
            SEHAT<span className="text-cyan-500">AI</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            {isDoctor ? "Clinician" : "Patient"}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => dispatch({ type: "SET_VIEW", payload: link.id })}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition ${
                state.currentView === link.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={() => dispatch({ type: "LOGOUT" })}
        className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl"
      >
        <LogOut size={18} />
        Log Out
      </button>
    </aside>
  );
}
