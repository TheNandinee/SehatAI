// src/App.tsx
import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";

import GridBackground from "./components/ui/GridBackground";
import Sidebar from "./components/layout/Sidebar";

import AuthView from "./pages/AuthView";
import DashboardView from "./pages/DashboardView";
import HistoryView from "./pages/HistoryView";
import DiagnosisWizard from "./components/diagnosis/DiagnosisWizard";
import ResultsView from "./components/diagnosis/ResultsView";
import ChatView from "./components/chat/ChatView";

function Router() {
  const { state } = useContext(AppContext);

  switch (state.currentView) {
    case "auth":
      return <AuthView />;
    case "dashboard":
      return <DashboardView />;
    case "diagnosis":
      return <DiagnosisWizard />;
    case "results":
      return <ResultsView />;
    case "chat":
      return <ChatView />;
    case "history":
      return <HistoryView />;
    default:
      return <DashboardView />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#020617] text-slate-100">
        <GridBackground />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Router />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
// src/App.tsx
import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";

import GridBackground from "./components/ui/GridBackground";
import Sidebar from "./components/layout/Sidebar";

import AuthView from "./pages/AuthView";
import DashboardView from "./pages/DashboardView";
import HistoryView from "./pages/HistoryView";
import DiagnosisWizard from "./components/diagnosis/DiagnosisWizard";
import ResultsView from "./components/diagnosis/ResultsView";
import ChatView from "./components/chat/ChatView";

function Router() {
  const { state } = useContext(AppContext);

  switch (state.currentView) {
    case "auth":
      return <AuthView />;
    case "dashboard":
      return <DashboardView />;
    case "diagnosis":
      return <DiagnosisWizard />;
    case "results":
      return <ResultsView />;
    case "chat":
      return <ChatView />;
    case "history":
      return <HistoryView />;
    default:
      return <DashboardView />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#020617] text-slate-100">
        <GridBackground />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">
            <Router />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
