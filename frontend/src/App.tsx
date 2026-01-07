import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  Activity, 
  Shield, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  ChevronUp,
  Check, 
  AlertCircle, 
  FileText, 
  User, 
  LogOut, 
  Moon, 
  Sun, 
  Search, 
  Send, 
  Sparkles,
  ArrowRight,
  Info,
  X,
  Zap,
  Cpu,
  Database,
  BarChart3,
  Globe,
  Heart,
  Stethoscope,
  Users,
  ClipboardList,
  Video,
  CheckCircle2,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Settings,
  Bell,
  Fingerprint,
  TrendingUp,
  Calendar,
  Server,
  BrainCircuit,
  Lightbulb,
  BookOpen,
  CheckCircle
} from 'lucide-react';

// --- CONFIGURATION ---
// Set this to true if you are running the python backend
const USE_REAL_API = false; 
const API_BASE_URL = "http://localhost:8000/api/v1";

// --- TYPES ---

type RiskLevel = 'Low' | 'Medium' | 'High';
type UserRole = 'patient' | 'doctor';
type ViewState = 
  | 'auth' 
  | 'dashboard' 
  | 'diagnosis' 
  | 'results' 
  | 'chat' 
  | 'history'
  | 'profile'
  | 'video-call'
  | 'doctor-dashboard'
  | 'patient-detail'
  | 'reports'
  | 'staff';

type ChatMode = 'general' | 'triage' | 'second_opinion';

interface SehatAIResponse {
  analysis_id: string;
  timestamp: string;
  risk_level: RiskLevel;
  confidence_score: number;
  clinical_summary: string;
  actionable_recommendations: string[];
  rag_sources: string[];
  processing_time_ms: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  thoughts?: string[];
  mode?: ChatMode;
  timestamp: Date;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium?: boolean;
  avatar?: string;
}

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  lastCheckup: string;
  status: RiskLevel;
  symptoms: string[];
  aiNotes: string;
  history: { date: string; diagnosis: string }[];
  vitals: { hr: number; bp: string; spo2: number };
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'busy' | 'offline';
  department: string;
}

// --- API LAYER ---

const SehatAI_API = {
  analyzeSymptoms: async (payload: { patient_id: string; symptoms: string[]; duration_days: string }): Promise<SehatAIResponse> => {
    if (USE_REAL_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('API Error');
        return await response.json();
      } catch (error) {
        console.error("Backend offline, falling back to simulation.", error);
      }
    }
    
    // FALLBACK SIMULATION
    return new Promise((resolve) => {
      setTimeout(() => {
        const seriousKeywords = ['chest', 'breath', 'faint', 'severe', 'heart'];
        const isHighRisk = payload.symptoms.some(s => seriousKeywords.some(k => s.toLowerCase().includes(k)));
        
        resolve({
          analysis_id: `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          timestamp: new Date().toISOString(),
          risk_level: isHighRisk ? 'High' : 'Low',
          confidence_score: 0.94, 
          clinical_summary: isHighRisk 
            ? "SEHATAI ENGINE: Detected pattern correlation with acute cardiovascular distress vectors. Immediate intervention protocols recommended."
            : "SEHATAI ENGINE: Symptom cluster aligns with seasonal viral markers (ICD-10-J00). No acute anomalies detected in vector space.",
          actionable_recommendations: isHighRisk 
            ? ["Initiate Emergency Protocol (Code Red)", "Avoid Exertion", "Contact 911"]
            : ["Hydration Protocol: +20% Intake", "Rest Cycle: 8h Minimum", "Monitor Thermal Output"],
          rag_sources: ["CDC Clinical DB v4.2", "Emergency Medicine Journal (2024)", "SehatAI Vector Store"],
          processing_time_ms: 340
        });
      }, 2500); 
    });
  },

  chatQuery: async (query: string, mode: ChatMode, contextId?: string): Promise<ChatMessage> => {
    if (USE_REAL_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/llm/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, mode, context_id: contextId })
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return { ...data, timestamp: new Date(data.timestamp) };
      } catch (error) {
        console.error("Backend offline, falling back to simulation.", error);
      }
    }

    // FALLBACK SIMULATION
    return new Promise((resolve) => {
      const delay = 2500; 
      setTimeout(() => {
        let responseContent = "";
        let thoughts = [];
        let sources = [];

        if (mode === 'triage') {
            responseContent = `Based on your described symptoms of "${query}", it sounds like you might be experiencing acute inflammation. \n\n**Recommended Actions:**\n1. Monitor temperature every 4 hours.\n2. Avoid NSAIDs until further diagnosis.\n3. If pain exceeds 7/10, visit ER.`;
            thoughts = ["Identifying main symptoms...", "Checking medical triage protocols...", "Calculating urgency level...", "Formulating safe recommendations..."];
            sources = ["SehatAI Triage Protocols", "Mayo Clinic Symptom Checker"];
        } else if (mode === 'second_opinion') {
            responseContent = `I have reviewed the query "${query}" against the latest clinical literature. While the initial diagnosis seems plausible, there are a few other possibilities we should consider: \n- *Condition A* (Common)\n- *Condition B* (Less common)\n\nIt would be best to consult a specialist to be sure.`;
            thoughts = ["Analyzing clinical context...", "Reviewing recent medical journals (2024)...", "Comparing similar patient cases...", "Verifying safety contraindications..."];
            sources = ["PubMed (2024)", "JAMA Network Open"];
        } else {
            responseContent = `Here is what I found for: "${query}". \n\nThis typically involves the body's immune response system. It is generally manageable with rest and hydration. \n\n*Would you like me to analyze specific symptoms?*`;
            thoughts = ["Understanding your question...", "Searching verified health databases...", "Filtering for safety...", "Generating response..."];
            sources = ["Healthline Medical Review", "SehatAI Knowledge Base"];
        }

        resolve({
          id: Math.random().toString(36).substr(2, 9),
          role: 'assistant',
          content: responseContent,
          thoughts: thoughts,
          sources: sources,
          mode: mode,
          timestamp: new Date()
        });
      }, delay);
    });
  },

  fetchPatientQueue: async (): Promise<PatientRecord[]> => {
    return [
      { 
        id: 'P-101', name: 'Sarah Connor', age: 34, lastCheckup: '2 hrs ago', status: 'High', symptoms: ['Chest Pain', 'Dyspnea'], aiNotes: 'Risk Assessor: High probability of cardiac event (92%).',
        history: [{ date: '2023-10-12', diagnosis: 'Hypertension' }],
        vitals: { hr: 110, bp: '145/95', spo2: 96 }
      },
      { 
        id: 'P-102', name: 'James Howlett', age: 45, lastCheckup: '1 day ago', status: 'Low', symptoms: ['Arthralgia', 'Fatigue'], aiNotes: 'Symptom Analyzer: Consistent with seasonal flu.',
        history: [{ date: '2023-09-15', diagnosis: 'Trauma' }],
        vitals: { hr: 72, bp: '120/80', spo2: 98 }
      },
      { 
        id: 'P-103', name: 'Diana Prince', age: 29, lastCheckup: '3 days ago', status: 'Medium', symptoms: ['Migraine', 'Photophobia'], aiNotes: 'Trend Detector: Recurrent pattern identified.',
        history: [{ date: '2023-05-20', diagnosis: 'Migraine Aura' }],
        vitals: { hr: 68, bp: '118/76', spo2: 99 }
      },
      { 
        id: 'P-104', name: 'Tony Stark', age: 52, lastCheckup: '5 mins ago', status: 'High', symptoms: ['Arrhythmia', 'Panic'], aiNotes: 'Stress Test: Vital signs unstable.',
        history: [{ date: '2023-11-01', diagnosis: 'Anxiety' }],
        vitals: { hr: 125, bp: '160/100', spo2: 94 }
      },
    ];
  },

  getStaff: async (): Promise<StaffMember[]> => {
    return [
      { id: 'S-1', name: 'Dr. Strange', role: 'Chief of Surgery', status: 'busy', department: 'Surgery' },
      { id: 'S-2', name: 'Dr. House', role: 'Diagnostician', status: 'active', department: 'Internal Med' },
      { id: 'S-3', name: 'Nurse Joy', role: 'Head Nurse', status: 'active', department: 'ER' },
    ];
  }
};

// --- STATE MANAGEMENT ---

interface AppState {
  user: UserProfile | null;
  theme: 'light' | 'dark';
  currentView: ViewState;
  diagnoses: SehatAIResponse[];
  currentDiagnosis: SehatAIResponse | null;
  chatHistory: ChatMessage[];
  patients: PatientRecord[];
  selectedPatient: PatientRecord | null;
  chatMode: ChatMode;
  initialChatQuery?: string;
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({ state: {} as any, dispatch: () => {} });

// --- TECH DESIGN SYSTEM ---

const Button = ({ children, variant = 'primary', className = '', onClick, disabled, icon: Icon, fullWidth }: any) => {
  const baseStyle = "group relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  const variants = {
    primary: "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] border border-transparent",
    secondary: "bg-white/5 backdrop-blur-md text-slate-300 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400",
    ghost: "text-slate-400 hover:text-cyan-400 hover:bg-white/5",
    danger: "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/50",
    gold: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]",
    success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className} ${fullWidth ? 'w-full' : ''}`}>
      <span className="relative z-10 flex items-center gap-2">{children}{Icon && <Icon size={18} className="transition-transform group-hover:translate-x-1" />}</span>
      {variant === 'primary' && <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
    </button>
  );
};

const Card = ({ children, className = '', onClick }: any) => (
  <div onClick={onClick} className={`bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-black/50 hover:border-cyan-500/30 transition-all duration-300 ${className}`}>{children}</div>
);

const TechBadge = ({ children, color = 'cyan', icon: Icon }: any) => (
  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-mono font-bold bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>{Icon && <Icon size={10} />}{children}</span>
);

const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]"></div>
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]"></div>
  </div>
);

const EKGAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let x = 0; let y = 0; let animationFrameId: number;
    const draw = () => {
      ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.shadowBlur = 10; ctx.shadowColor = '#06b6d4';
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath(); ctx.moveTo(x, y + canvas.height / 2);
      x += 2; y = (x % 50 < 10) ? (Math.random() - 0.5) * 50 : (Math.random() - 0.5) * 5;
      ctx.lineTo(x, y + canvas.height / 2); ctx.stroke();
      if (x > canvas.width) { x = 0; ctx.clearRect(0,0, canvas.width, canvas.height); }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  return <canvas ref={canvasRef} width={300} height={60} className="w-full h-[60px] rounded-lg bg-black/20" />;
};

// --- VIEWS ---

const AuthView = () => {
  const { dispatch } = useContext(AppContext);
  const [role, setRole] = useState<UserRole>('patient');
  const [isLogin, setIsLogin] = useState(true);
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = { id: role === 'doctor' ? 'D-1' : 'P-1', name: role === 'doctor' ? 'Dr. Sarah Smith' : 'Alex Johnson', email: role === 'doctor' ? 'dr.sarah@sehatai.ai' : 'alex@sehatai.ai', role: role, isPremium: false };
    dispatch({ type: 'LOGIN', payload: user });
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center"><div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] mb-6 backdrop-blur-md"><Activity className="text-cyan-400" size={40} /></div><h1 className="text-4xl font-bold text-white mb-2 tracking-tight">SEHAT<span className="text-cyan-500">AI</span></h1><p className="text-cyan-200/60 font-medium text-sm tracking-wide">{role === 'doctor' ? 'Clinical Decision Support System' : 'Your Personal Health Companion'}</p></div>
        <Card className="p-8">
          <div className="flex gap-2 mb-6 p-1 bg-black/40 rounded-xl border border-white/5">{['patient', 'doctor'].map((r) => (<button key={r} onClick={() => setRole(r as UserRole)} className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${role === r ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'text-slate-500 hover:text-slate-300'}`}>{r === 'patient' ? 'Patient Portal' : 'Clinician'}</button>))}</div>
          <form onSubmit={handleAuth} className="space-y-4"><div className="space-y-1"><label className="text-[10px] font-bold text-cyan-200/50 uppercase tracking-wider pl-1">{role === 'doctor' ? 'Medical ID' : 'Email Address'}</label><div className="relative group"><User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} /><input type="email" className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder-slate-600" placeholder={role === 'doctor' ? 'ID-88492' : 'alex@sehatai.ai'} /></div></div><div className="space-y-1"><label className="text-[10px] font-bold text-cyan-200/50 uppercase tracking-wider pl-1">Password</label><div className="relative group"><Shield className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} /><input type="password" className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder-slate-600" placeholder="••••••••" /></div></div><Button className="w-full mt-6" icon={ArrowRight}>{isLogin ? 'Initialize Session' : 'Create Profile'}</Button></form>
        </Card>
      </div>
    </div>
  );
};

const LoadingMatrix = () => {
  const [log, setLog] = useState<string[]>([]);
  const logs = ["Connecting to SehatAI Core...", "Loading Vector Embeddings...", "Initializing Symptom Analyzer...", "Querying MedicalLLM...", "Running Risk Assessor...", "Finalizing Clinical Report..."];
  useEffect(() => { let i = 0; const interval = setInterval(() => { if (i < logs.length) { setLog(prev => [...prev, logs[i]]); i++; } else { clearInterval(interval); } }, 400); return () => clearInterval(interval); }, []);
  return <div className="flex flex-col items-center justify-center h-full font-mono"><div className="relative w-32 h-32 mb-8"><div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin"></div><div className="absolute inset-2 border-r-2 border-violet-500 rounded-full animate-spin direction-reverse duration-700"></div><div className="absolute inset-0 flex items-center justify-center"><Cpu className="text-cyan-500 animate-pulse" size={40} /></div></div><div className="w-full max-w-sm bg-black/40 backdrop-blur-md rounded-lg p-4 border border-cyan-500/20 font-mono text-xs text-cyan-400 h-40 overflow-hidden relative"><div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0f172a] to-transparent z-10"></div><div className="space-y-1">{log.map((l, i) => (<div key={i} className="flex gap-2 animate-in slide-in-from-left-2 fade-in duration-300"><span className="text-slate-500">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span><span>{l}</span></div>))}</div></div></div>;
};

const VideoConsultView = () => { const { dispatch } = useContext(AppContext); const [status, setStatus] = useState('connecting'); const [duration, setDuration] = useState(0); useEffect(() => { const timer = setTimeout(() => setStatus('connected'), 2000); return () => clearTimeout(timer); }, []); useEffect(() => { let interval: any; if (status === 'connected') { interval = setInterval(() => setDuration(d => d + 1), 1000); } return () => clearInterval(interval); }, [status]); const formatTime = (s: number) => { const mins = Math.floor(s / 60); const secs = s % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; }; return (<div className="h-full flex flex-col pt-4 pb-4"><div className="mb-4 flex items-center justify-between"><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"><ChevronLeft size={20} /> <span className="ml-1 font-medium text-sm">End Call</span></button><div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`}></span><span className="text-xs font-mono uppercase text-slate-400">{status === 'connected' ? 'REC' : 'Connecting...'}</span></div></div><div className="flex-1 bg-black rounded-3xl relative overflow-hidden shadow-2xl border border-white/10 group">{status === 'connected' ? (<div className="absolute inset-0 bg-slate-800 flex items-center justify-center"><div className="text-center"><div className="w-32 h-32 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center"><User size={64} className="text-slate-500" /></div><h3 className="text-xl font-bold text-white">Dr. Sarah Smith</h3><p className="text-cyan-400 text-sm">General Practitioner</p></div><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div></div>) : (<div className="absolute inset-0 flex items-center justify-center flex-col"><div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div><p className="text-cyan-400 font-mono text-sm animate-pulse">ESTABLISHING SECURE LINK...</p></div>)}<div className="absolute bottom-6 right-6 w-48 h-36 bg-slate-900 rounded-2xl border border-white/20 shadow-xl overflow-hidden"><div className="w-full h-full bg-slate-800 flex items-center justify-center"><User size={32} className="text-slate-600" /></div></div><div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 p-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"><button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"><Mic size={20} /></button><button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"><Video size={20} /></button><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} className="p-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white"><PhoneOff size={20} /></button></div><div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur rounded-lg border border-white/5 text-xs font-mono text-white">{formatTime(duration)}</div></div></div>); };

const PatientDetailView = () => { const { state, dispatch } = useContext(AppContext); const patient = state.selectedPatient; if (!patient) return null; return (<div className="max-w-6xl mx-auto pt-4 pb-20 animate-in slide-in-from-right-4 duration-500"><div className="mb-6 flex items-center justify-between"><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'doctor-dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"><ChevronLeft size={20} /> <span className="ml-1 font-medium text-sm">Back to Queue</span></button><div className="flex gap-2"><Button variant="secondary" className="text-xs py-2 px-4" icon={FileText}>Generate Report</Button><Button variant="primary" className="text-xs py-2 px-4" icon={MessageSquare}>Message Patient</Button></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><Card className="p-6 md:col-span-1 h-fit"><div className="flex flex-col items-center text-center mb-6"><div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-400 mb-4 border-4 border-slate-600">{patient.name.charAt(0)}</div><h2 className="text-2xl font-bold text-white">{patient.name}</h2><p className="text-slate-400 text-sm">Age: {patient.age} • ID: {patient.id}</p><div className="mt-4 flex gap-2"><TechBadge color={patient.status === 'High' ? 'rose' : patient.status === 'Medium' ? 'amber' : 'emerald'}>{patient.status} Priority</TechBadge></div></div><div className="space-y-4 border-t border-white/5 pt-6"><div className="flex justify-between text-sm"><span className="text-slate-500">Blood Pressure</span><span className="text-white font-mono">{patient.vitals.bp}</span></div><div className="flex justify-between text-sm"><span className="text-slate-500">Heart Rate</span><span className="text-white font-mono">{patient.vitals.hr} bpm</span></div><div className="flex justify-between text-sm"><span className="text-slate-500">SpO2</span><span className="text-white font-mono">{patient.vitals.spo2}%</span></div></div></Card><div className="md:col-span-2 space-y-6"><Card className="p-6"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-white flex items-center gap-2"><Activity size={18} className="text-cyan-500" /> Live Telemetry</h3><div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span><span className="text-xs text-cyan-500 font-mono uppercase">Live</span></div></div><EKGAnimation /><div className="grid grid-cols-3 gap-4 mt-6"><div className="p-3 bg-black/20 rounded-lg text-center"><div className="text-xs text-slate-500 uppercase font-bold">AVG HR</div><div className="text-xl font-mono text-white">72</div></div><div className="p-3 bg-black/20 rounded-lg text-center"><div className="text-xs text-slate-500 uppercase font-bold">HRV</div><div className="text-xl font-mono text-white">45ms</div></div><div className="p-3 bg-black/20 rounded-lg text-center"><div className="text-xs text-slate-500 uppercase font-bold">Resp</div><div className="text-xl font-mono text-white">16</div></div></div></Card><Card className="p-6"><h3 className="font-bold text-white mb-4 flex items-center gap-2"><Sparkles size={18} className="text-violet-500" /> SehatAI Clinical Assessment</h3><div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 mb-4"><p className="text-indigo-100 text-sm leading-relaxed">{patient.aiNotes}</p></div><h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Medical History</h4><div className="space-y-2">{patient.history.map((h, i) => (<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"><span className="text-white text-sm">{h.diagnosis}</span><span className="text-slate-500 text-xs font-mono">{h.date}</span></div>))}</div></Card></div></div></div>); };

const DoctorDashboard = () => { const { dispatch } = useContext(AppContext); const [patients, setPatients] = useState<PatientRecord[]>([]); useEffect(() => { SehatAI_API.fetchPatientQueue().then(setPatients); }, []); return (<div className="max-w-7xl mx-auto pt-8 pb-20 animate-in fade-in"><header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"><div><div className="flex items-center gap-2 mb-2"><span className="flex h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span><span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Clinical Dashboard</span></div><h1 className="text-4xl font-bold text-white tracking-tight">Dr. Smith</h1><p className="text-slate-400">Triage Queue & Patient Management</p></div><div className="flex gap-3"><Button variant="secondary" icon={BarChart3} onClick={() => dispatch({ type: 'SET_VIEW', payload: 'reports' })}>Reports</Button><Button variant="primary" icon={Users} onClick={() => dispatch({ type: 'SET_VIEW', payload: 'staff' })}>Staff</Button></div></header><div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">{[{ label: 'Critical', val: '2', color: 'rose' }, { label: 'Review', val: '14', color: 'amber' }, { label: 'Stable', val: '45', color: 'emerald' }, { label: 'Accuracy', val: '99%', color: 'cyan' }].map((stat, i) => (<Card key={i} className="p-4 flex flex-col items-center justify-center text-center"><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</span><span className={`text-3xl font-mono font-bold text-${stat.color}-400`}>{stat.val}</span></Card>))}</div><div className="space-y-4">{patients.map(p => (<Card key={p.id} className={`p-6 border-l-4 ${p.status === 'High' ? 'border-l-rose-500 bg-rose-500/5' : p.status === 'Medium' ? 'border-l-amber-500' : 'border-l-emerald-500'} hover:border-white/20 cursor-pointer group transition-all`} onClick={() => { dispatch({ type: 'SET_SELECTED_PATIENT', payload: p }); dispatch({ type: 'SET_VIEW', payload: 'patient-detail' }); }}><div className="flex flex-col md:flex-row md:items-center justify-between gap-6"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-lg text-slate-300">{p.name.charAt(0)}</div><div><h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{p.name} <span className="text-slate-500 text-sm font-normal">({p.age}y)</span></h3><div className="flex items-center gap-2 mt-1"><span className="text-xs font-mono text-slate-500">ID: {p.id}</span></div></div></div><div className="flex-1 max-w-xl"><p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{p.aiNotes}</p></div><div className="flex flex-col items-end gap-2 min-w-[100px]"><TechBadge color={p.status === 'High' ? 'rose' : p.status === 'Medium' ? 'amber' : 'emerald'}>{p.status} Risk</TechBadge><span className="text-xs text-slate-500">{p.lastCheckup}</span></div></div></Card>))}</div></div>); };

const ReportsView = () => { const { dispatch } = useContext(AppContext); return (<div className="max-w-5xl mx-auto pt-8"><div className="mb-6"><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'doctor-dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors mb-4"><ChevronLeft size={20} /> <span className="ml-1 font-medium text-sm">Back to Dashboard</span></button><h2 className="text-3xl font-bold text-white">Department Analytics</h2></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Card className="p-6 h-64 flex flex-col items-center justify-center border-dashed border-2 border-slate-700 bg-transparent"><BarChart3 size={48} className="text-slate-600 mb-4" /><p className="text-slate-400">Patient Volume Chart Placeholder</p></Card><Card className="p-6 h-64 flex flex-col items-center justify-center border-dashed border-2 border-slate-700 bg-transparent"><TrendingUp size={48} className="text-slate-600 mb-4" /><p className="text-slate-400">Risk Distribution Chart Placeholder</p></Card></div></div>) };

const StaffView = () => { const { dispatch } = useContext(AppContext); const [staff, setStaff] = useState<StaffMember[]>([]); useEffect(() => { SehatAI_API.getStaff().then(setStaff); }, []); return (<div className="max-w-5xl mx-auto pt-8"><div className="mb-6"><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'doctor-dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors mb-4"><ChevronLeft size={20} /> <span className="ml-1 font-medium text-sm">Back to Dashboard</span></button><h2 className="text-3xl font-bold text-white">Medical Staff</h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{staff.map(s => (<Card key={s.id} className="p-6"><div className="flex items-start justify-between mb-4"><div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">{s.name.charAt(0)}</div><span className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${s.status === 'active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' : s.status === 'busy' ? 'text-rose-500 border-rose-500/20 bg-rose-500/10' : 'text-slate-500 border-slate-500/20'}`}>{s.status}</span></div><h3 className="text-lg font-bold text-white">{s.name}</h3><p className="text-sm text-cyan-400">{s.role}</p><p className="text-xs text-slate-500 mt-1">{s.department}</p></Card>))}</div></div>) };

const HistoryView = () => { const { state, dispatch } = useContext(AppContext); return (<div className="max-w-4xl mx-auto pt-8 pb-20"><div className="mb-8"><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors mb-4"><ChevronLeft size={20} /> <span className="ml-1 font-medium text-sm">Dashboard</span></button><h2 className="text-3xl font-bold text-white">Medical History</h2></div><div className="relative border-l-2 border-slate-800 ml-4 space-y-8">{state.diagnoses.length === 0 && <p className="ml-8 text-slate-500">No history found.</p>}{state.diagnoses.map((d, i) => (<div key={d.analysis_id} className="relative ml-8"><div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-[#020617] ${d.risk_level === 'High' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div><Card className="p-6 hover:border-white/20 transition-colors cursor-pointer" onClick={() => { dispatch({ type: 'SET_DIAGNOSIS', payload: d }); dispatch({ type: 'SET_VIEW', payload: 'results' }); }}><div className="flex justify-between items-start mb-2"><h3 className="text-xl font-bold text-white">{d.clinical_summary.substring(0, 30)}...</h3><span className="text-xs font-mono text-slate-500">{new Date(d.timestamp).toLocaleDateString()}</span></div><p className="text-slate-400 text-sm mb-4 line-clamp-2">{d.clinical_summary}</p><TechBadge color={d.risk_level === 'High' ? 'rose' : 'emerald'}>{d.risk_level} Risk</TechBadge></Card></div>))}</div></div>) };

const ProfileView = () => { const { state, dispatch } = useContext(AppContext); const [notifications, setNotifications] = useState(true); const [sensors, setSensors] = useState(true); return (<div className="max-w-2xl mx-auto pt-8"><h2 className="text-3xl font-bold text-white mb-8">System Settings</h2><Card className="p-8 space-y-8"><div className="flex items-center gap-6 pb-8 border-b border-white/5"><div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/20">{state.user?.name.charAt(0)}</div><div><h3 className="text-xl font-bold text-white">{state.user?.name}</h3><p className="text-slate-400">{state.user?.email}</p><div className="mt-2 inline-block px-2 py-0.5 bg-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-slate-300">ID: {state.user?.id}</div></div></div><div className="space-y-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="p-2 bg-violet-500/10 rounded-lg text-violet-400"><Bell size={20} /></div><div><h4 className="font-bold text-white">Notifications</h4><p className="text-xs text-slate-400">Receive alerts for check-ups</p></div></div><button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-cyan-500' : 'bg-slate-700'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications ? 'left-7' : 'left-1'}`}></div></button></div><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Fingerprint size={20} /></div><div><h4 className="font-bold text-white">Bio-Metric Sensors</h4><p className="text-xs text-slate-400">Allow access to wearable data</p></div></div><button onClick={() => setSensors(!sensors)} className={`w-12 h-6 rounded-full transition-colors relative ${sensors ? 'bg-cyan-500' : 'bg-slate-700'}`}><div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${sensors ? 'left-7' : 'left-1'}`}></div></button></div></div><div className="pt-6 border-t border-white/5"><Button variant="ghost" fullWidth icon={LogOut} onClick={() => dispatch({ type: 'LOGOUT' })}>Sign Out</Button></div></Card></div>) };

const DashboardView = () => {
  const { state, dispatch } = useContext(AppContext);
  const { user, diagnoses } = state;
  const [upgrading, setUpgrading] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  const handleUpgrade = () => {
    setUpgrading(true);
    setTimeout(() => {
        dispatch({ type: 'UPGRADE_ACCOUNT' });
        setUpgrading(false);
    }, 2000);
  };

  const handleQuickAsk = (e: React.FormEvent) => {
      e.preventDefault();
      if(quickQuery.trim()) {
          dispatch({ type: 'SET_INITIAL_QUERY', payload: quickQuery });
          dispatch({ type: 'SET_VIEW', payload: 'chat' });
      }
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 pb-20 animate-in fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span><span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">System Online</span></div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">{user?.name.split(' ')[0]}</span></h1>
          <p className="text-slate-400">Your health command center.</p>
        </div>
        <div className="flex gap-3"><Button variant="secondary" icon={Clock} onClick={() => dispatch({ type: 'SET_VIEW', payload: 'history' })}>History</Button><Button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'diagnosis' })} icon={Zap}>Check Symptoms</Button></div>
      </header>

      {/* Quick Ask Bar */}
      <div className="mb-12">
          <Card className="p-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-500/30">
              <form onSubmit={handleQuickAsk} className="relative flex items-center bg-[#0f172a] rounded-xl overflow-hidden">
                  <Search className="absolute left-4 text-slate-400" size={20} />
                  <input type="text" value={quickQuery} onChange={(e) => setQuickQuery(e.target.value)} placeholder="Ask SehatAI anything (e.g. 'Is my headache serious?', 'Side effects of aspirin')" className="w-full py-4 pl-12 pr-20 bg-transparent text-white placeholder-slate-500 outline-none text-lg" />
                  <button type="submit" className="absolute right-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors">Ask AI</button>
              </form>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2"><h3 className="font-bold text-white flex items-center gap-2"><Activity size={18} className="text-cyan-500" /> Recent Logs</h3></div>
          {diagnoses.length === 0 ? (
            <Card className="p-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10 bg-transparent shadow-none"><div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-500"><BarChart3 size={32} /></div><h3 className="text-lg font-bold text-white mb-2">No Records Yet</h3><p className="text-slate-500 max-w-xs mb-8">Start a new symptom check to see your results here.</p><Button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'diagnosis' })}>Start Check-up</Button></Card>
          ) : (
            diagnoses.slice(0, 3).map((d) => (
              <Card key={d.analysis_id} className="p-6 flex items-center justify-between group cursor-pointer border-l-4 hover:border-l-cyan-500 transition-all" onClick={() => { dispatch({ type: 'SET_DIAGNOSIS', payload: d }); dispatch({ type: 'SET_VIEW', payload: 'results' }); }}>
                <div className="flex items-center gap-5"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${d.risk_level === 'High' ? 'bg-rose-500/20 text-rose-400 shadow-rose-500/10' : 'bg-emerald-500/20 text-emerald-400 shadow-emerald-500/10'}`}>{d.risk_level === 'High' ? <AlertCircle size={28} /> : <Check size={28} />}</div><div><h4 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{d.clinical_summary.substring(0, 30)}...</h4><div className="flex items-center gap-2 mt-1"><span className="text-xs font-mono text-slate-500">{new Date(d.timestamp).toLocaleDateString()}</span><span className="text-slate-700">•</span><span className="text-xs font-mono text-slate-500">ID: {d.analysis_id}</span></div></div></div><div className="flex flex-col items-end gap-2"><TechBadge color={d.risk_level === 'High' ? 'rose' : 'emerald'}>{d.risk_level} Risk</TechBadge><ArrowRight size={20} className="text-slate-500 group-hover:text-white transition-colors" /></div>
              </Card>
            ))
          )}
        </div>
        <div className="space-y-6">
            {!user?.isPremium ? (
              <Card className="p-0 overflow-hidden border-0 relative h-64 group bg-[#020617]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-indigo-900/50"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div><div className="flex items-center gap-2 mb-2 text-white/80 text-xs font-bold uppercase tracking-widest"><Sparkles size={12} /> SehatAI Plus</div><h3 className="text-2xl font-bold text-white mb-2">Speak to a Doctor</h3><p className="text-indigo-200 text-sm">Connect with a real specialist in minutes.</p></div><Button className="w-full bg-white text-indigo-950 hover:bg-white/90 border-none shadow-none" onClick={handleUpgrade} disabled={upgrading}>{upgrading ? 'Processing...' : 'Upgrade Now'}</Button>
                </div>
              </Card>
            ) : (
                <Card className="p-0 overflow-hidden border border-amber-500/50 relative h-64 group bg-[#020617] shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-900/20"></div><div className="absolute top-0 right-0 p-4"><div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/40"><CheckCircle2 className="text-white" size={16} /></div></div><div className="relative z-10 p-8 h-full flex flex-col justify-between"><div><div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold uppercase tracking-widest"><Zap size={12} /> Premium Active</div><h3 className="text-2xl font-bold text-white mb-2">You are covered.</h3><p className="text-amber-100/80 text-sm">Unlimited specialist consultations enabled.</p></div><Button variant="gold" className="w-full" icon={Video} onClick={() => dispatch({ type: 'SET_VIEW', payload: 'video-call' })}>Start Video Consult</Button></div>
                </Card>
            )}
          <Card className="p-6"><h3 className="font-bold text-white mb-4 flex items-center gap-2"><Heart size={18} className="text-rose-500" /> Daily Insights</h3><div className="space-y-3">{[{ title: "Hydration", desc: "Drinking water boosts focus by 30%." }, { title: "Rest", desc: "Aim for 8 hours of sleep tonight." }].map((tip, i) => (<div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5"><div className="w-1 h-full rounded-full bg-slate-700 shrink-0"></div><div><h4 className="text-sm font-bold text-slate-200">{tip.title}</h4><p className="text-xs text-slate-400 mt-1">{tip.desc}</p></div></div>))}</div></Card>
        </div>
      </div>
    </div>
  );
};

const DiagnosisWizard = () => {
    const { dispatch } = useContext(AppContext);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ age: '', gender: '', primarySymptom: '', duration: '', severity: 5, additionalSymptoms: [] as string[] });
    const questions = [
        { title: "About You", description: "Basic bio-metrics for SehatAI calibration.", icon: User },
        { title: "Symptoms", description: "Describe the primary anomaly.", icon: Activity },
        { title: "Details", description: "Duration and severity metrics.", icon: BarChart3 }
    ];
    const handleNext = async () => {
        if (step < questions.length - 1) setStep(step + 1);
        else {
            setLoading(true);
            const result = await SehatAI_API.analyzeSymptoms({ patient_id: 'CURRENT_USER', symptoms: [formData.primarySymptom], duration_days: formData.duration });
            dispatch({ type: 'ADD_DIAGNOSIS', payload: result });
            dispatch({ type: 'SET_VIEW', payload: 'results' });
        }
    };
    if (loading) return <LoadingMatrix />;
    return (
        <div className="max-w-3xl mx-auto pt-8">
            <div className="mb-8 flex justify-between items-end">
                <div><h2 className="text-xs font-mono font-bold text-cyan-500 mb-2 uppercase tracking-widest">Step {step + 1} / {questions.length}</h2><div className="flex gap-1">{questions.map((_, i) => (<div key={i} className={`h-1 w-12 rounded-full transition-all duration-500 ${i <= step ? 'bg-cyan-500' : 'bg-white/10'}`} />))}</div></div>
                <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} className="p-2 hover:bg-white/5 rounded-full text-slate-400"><X size={20} /></button>
            </div>
            <Card className="p-8 min-h-[400px] flex flex-col justify-between">
                <div>
                     <div className="flex items-center gap-4 mb-8"><div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 border border-cyan-500/20">{React.createElement(questions[step].icon, { size: 28 })}</div><div><h2 className="text-3xl font-bold text-white">{questions[step].title}</h2><p className="text-slate-400 text-sm mt-1">{questions[step].description}</p></div></div>
                     {step === 0 && <div className="grid grid-cols-2 gap-6"><div><label className="text-[10px] font-bold text-cyan-500/50 uppercase">Age</label><input type="number" value={formData.age} onChange={e=>setFormData({...formData, age: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500" placeholder="25" /></div><div><label className="text-[10px] font-bold text-cyan-500/50 uppercase">Sex</label><select className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500" value={formData.gender} onChange={e=>setFormData({...formData, gender: e.target.value})}><option value="">Select</option><option value="M">Male</option><option value="F">Female</option></select></div></div>}
                     {step === 1 && <div><label className="text-[10px] font-bold text-cyan-500/50 uppercase">Description</label><textarea value={formData.primarySymptom} onChange={e=>setFormData({...formData, primarySymptom: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500 min-h-[160px]" placeholder="Describe your symptoms..." /></div>}
                     {step === 2 && <div className="space-y-6"><div><label className="text-[10px] font-bold text-cyan-500/50 uppercase">Duration</label><select className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500" value={formData.duration} onChange={e=>setFormData({...formData, duration: e.target.value})}><option value="">Select</option><option>Just started</option><option>Days</option><option>Weeks</option></select></div><div><label className="text-[10px] font-bold text-cyan-500/50 uppercase">Pain: {formData.severity}/10</label><input type="range" min="1" max="10" value={formData.severity} onChange={e=>setFormData({...formData, severity: parseInt(e.target.value)})} className="w-full h-2 bg-slate-800 rounded-lg accent-cyan-500" /></div></div>}
                </div>
                <div className="flex justify-between mt-8"><Button variant="ghost" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}>Back</Button><Button onClick={handleNext} icon={ChevronRight}>Next</Button></div>
            </Card>
        </div>
    );
};

const ResultsView = () => {
    const { state, dispatch } = useContext(AppContext);
    const d = state.currentDiagnosis;
    if (!d) return null;
    return (
        <div className="max-w-5xl mx-auto pt-8 pb-20">
            <div className="mb-8 flex justify-between items-center"><button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400"><ChevronLeft size={20} /> Dashboard</button><TechBadge>{d.risk_level} Risk</TechBadge></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={`col-span-2 p-8 border-l-4 ${d.risk_level === 'High' ? 'border-l-rose-500' : 'border-l-emerald-500'}`}>
                    <div className="flex gap-4 mb-4"><div className="p-3 bg-white/5 rounded-xl text-white"><AlertCircle /></div><div><h2 className="text-2xl font-bold text-white">{d.risk_level} Risk Detected</h2><p className="text-slate-400 text-sm mt-1">{d.clinical_summary}</p></div></div>
                    <div className="space-y-2 mt-6">{d.actionable_recommendations.map((r,i)=>(<div key={i} className="p-3 bg-black/20 rounded border border-white/5 text-slate-300 text-sm">{i+1}. {r}</div>))}</div>
                </Card>
                <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-indigo-900 to-violet-900 border-none"><h3 className="text-white font-bold mb-2">Questions?</h3><Button fullWidth onClick={() => dispatch({ type: 'SET_VIEW', payload: 'chat' })}>Chat AI</Button></Card>
                    <Card className="p-6"><h3 className="text-white font-bold mb-4 text-xs uppercase">Meta Data</h3><div className="space-y-2 text-xs text-slate-400"><div>Confidence: {(d.confidence_score * 100).toFixed(0)}%</div><div>Model: SehatAI v1.0</div><div>Time: {d.processing_time_ms}ms</div></div></Card>
                </div>
            </div>
        </div>
    )
}

// --- NEW ENHANCED CHAT COMPONENT ---

const ChatView = () => {
  const { state, dispatch } = useContext(AppContext);
  const [input, setInput] = useState(state.initialChatQuery || '');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('general');
  // Default to FALSE (hidden) for the thought process to reduce cognitive load on patients
  const [showThinking, setShowThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (state.initialChatQuery && state.chatHistory.length === 0) {
          handleSend(undefined, state.initialChatQuery);
          dispatch({ type: 'SET_INITIAL_QUERY', payload: '' }); 
      }
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [state.chatHistory, loading]);

  const handleSend = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const text = overrideInput || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg });
    setInput('');
    setLoading(true);

    const response = await SehatAI_API.chatQuery(userMsg.content, mode, state.currentDiagnosis?.analysis_id);
    dispatch({ type: 'ADD_MESSAGE', payload: response });
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col max-w-6xl mx-auto pt-2 relative">
       {/* Header & Mode Switcher */}
       <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 z-10">
        <div className="flex items-center gap-4">
            <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} className="flex items-center text-slate-400 hover:text-cyan-400"><ChevronLeft size={20} /></button>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20"><BrainCircuit size={20} /></div>
                <div>
                    <h2 className="text-lg font-bold text-white leading-none">SehatAI Assistant</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LLM Online • {mode.replace('_', ' ')}</span>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Mode Selector */}
        <div className="flex p-1 bg-black/40 border border-white/10 rounded-xl">
            {(['general', 'triage', 'second_opinion'] as ChatMode[]).map((m) => (
                <button 
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${mode === m ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
                >
                    {m.replace('_', ' ')}
                </button>
            ))}
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-2xl border-white/10 z-10 bg-[#0f172a]/95 backdrop-blur-xl relative">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar" ref={scrollRef}>
           {state.chatHistory.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                   <BrainCircuit size={64} className="text-cyan-500 mb-6 animate-pulse" />
                   <h3 className="text-2xl font-bold text-white mb-2">How can SehatAI help?</h3>
                   <p className="text-slate-400 max-w-md">Our advanced LLM is connected to medical databases. Ask about symptoms, medications, or general health advice.</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
                       {["What are the symptoms of dengue?", "Interpret my blood test results", "Is 98% SpO2 normal?", "Remedies for migraine"].map(q => (
                           <button key={q} onClick={() => setInput(q)} className="p-4 bg-white/5 border border-white/5 rounded-xl text-left text-sm text-slate-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all">{q}</button>
                       ))}
                   </div>
               </div>
           )}

           {state.chatHistory.map((msg) => (
             <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-2xl rounded-br-none p-4 shadow-lg shadow-cyan-500/10' : 'w-full'}`}>
                 
                 {/* AI Message Structure */}
                 {msg.role === 'assistant' ? (
                     <div className="space-y-4">
                         {/* Chain of Thought Block - HIDDEN BY DEFAULT FOR BETTER UX */}
                         {msg.thoughts && msg.thoughts.length > 0 && (
                             <div className="bg-black/30 rounded-xl border border-white/5 overflow-hidden">
                                 <button 
                                    onClick={() => setShowThinking(!showThinking)}
                                    className="w-full flex items-center justify-between px-4 py-2 bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-white/10"
                                 >
                                     <span className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500" /> Analysis Complete</span>
                                     <span className="flex items-center gap-1 text-cyan-500">View Steps {showThinking ? <ChevronUp size={12} /> : <ChevronDown size={12} />}</span>
                                 </button>
                                 {showThinking && (
                                     <div className="p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                         {msg.thoughts.map((t, i) => (
                                             <div key={i} className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div> {t}
                                             </div>
                                         ))}
                                     </div>
                                 )}
                             </div>
                         )}

                         {/* Main Content */}
                         <div className="text-slate-200 leading-relaxed text-sm whitespace-pre-wrap pl-2 border-l-2 border-cyan-500/50">
                             {msg.content}
                         </div>

                         {/* Sources */}
                         {msg.sources && (
                             <div className="flex flex-wrap gap-2 pt-2">
                                 {msg.sources.map((s, i) => (
                                     <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md border border-white/5 text-[10px] text-slate-400">
                                         <BookOpen size={10} /> {s}
                                     </div>
                                 ))}
                             </div>
                         )}
                     </div>
                 ) : (
                     <p className="text-sm">{msg.content}</p>
                 )}
               </div>
             </div>
           ))}

           {/* Loading State */}
           {loading && (
             <div className="w-full max-w-lg">
                 <div className="flex items-center gap-2 text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2 animate-pulse">
                     <Cpu size={14} /> SehatAI is Thinking...
                 </div>
                 <div className="p-4 bg-black/30 rounded-xl border border-white/5 space-y-2">
                     <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse"></div>
                     <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse delay-75"></div>
                     <div className="h-2 w-2/3 bg-white/10 rounded animate-pulse delay-150"></div>
                 </div>
             </div>
           )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex-1 bg-[#1e293b] rounded-xl border border-white/10 flex items-center px-4 focus-within:border-cyan-500/50 transition-colors">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder={mode === 'triage' ? "Describe your symptoms in detail..." : "Message SehatAI..."}
                    className="flex-1 bg-transparent py-4 text-white placeholder-slate-500 outline-none" 
                />
            </div>
            <button 
                type="submit" 
                disabled={!input.trim() || loading} 
                className="relative px-6 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
            >
              <Send size={20} />
            </button>
          </form>
          <div className="text-center mt-2">
              <span className="text-[10px] text-slate-500">SehatAI LLM can make mistakes. Verify important information.</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ... (Sidebar, AppReducer, etc. same as before) ...
const Sidebar = () => {
  const { state, dispatch } = useContext(AppContext);
  const isDoctor = state.user?.role === 'doctor';
  const links = isDoctor 
    ? [{ id: 'doctor-dashboard', label: 'Dashboard', icon: Activity }, { id: 'reports', label: 'Analytics', icon: BarChart3 }, { id: 'staff', label: 'Staff', icon: Users }]
    : [{ id: 'dashboard', label: 'Home', icon: Activity }, { id: 'chat', label: 'AI Assistant', icon: MessageSquare }, { id: 'history', label: 'History', icon: Database }, { id: 'profile', label: 'Settings', icon: Settings }];

  return (
    <div className="hidden md:flex flex-col w-72 bg-[#020617]/90 backdrop-blur-xl border-r border-white/5 h-screen sticky top-0 p-6 z-50">
      <div className="flex items-center gap-3 mb-10 pl-2"><div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">{isDoctor ? <Stethoscope className="text-white" size={20} /> : <Activity className="text-white" size={24} />}</div><div><span className="text-xl font-bold text-white tracking-tight block">SEHAT<span className="text-cyan-500">AI</span></span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isDoctor ? 'Clinician' : 'Patient'}</span></div></div>
      <nav className="flex-1 space-y-2">{links.map((link) => {
          const Icon = link.icon;
          return (
            <button key={link.id} onClick={() => dispatch({ type: 'SET_VIEW', payload: link.id })} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${state.currentView === link.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}>
                <Icon size={20} className={`relative z-10 transition-colors ${state.currentView === link.id ? 'text-cyan-400' : 'group-hover:text-white'}`} />
                <span className="font-medium relative z-10">{link.label}</span>
                {state.currentView === link.id && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>}
            </button>
          );
      })}</nav>
      <div className="pt-6 border-t border-white/5 space-y-3"><div className="px-4 py-3 bg-black/20 rounded-xl border border-white/5"><div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1"><span>System Uptime</span><span className="text-emerald-500">99.9%</span></div><div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full w-[99%] bg-emerald-500"></div></div></div><button onClick={() => dispatch({ type: 'LOGOUT' })} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"><LogOut size={18} /><span className="text-sm font-medium">Log Out</span></button></div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const auraReducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload, currentView: action.payload.role === 'doctor' ? 'doctor-dashboard' : 'dashboard' };
    case 'LOGOUT': return { ...state, user: null, currentView: 'auth' };
    case 'SET_VIEW': return { ...state, currentView: action.payload };
    case 'UPGRADE_ACCOUNT': return { ...state, user: { ...state.user!, isPremium: true } };
    case 'ADD_DIAGNOSIS': return { ...state, diagnoses: [action.payload, ...state.diagnoses], currentDiagnosis: action.payload };
    case 'SET_DIAGNOSIS': return { ...state, currentDiagnosis: action.payload, chatHistory: [] };
    case 'ADD_MESSAGE': return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    case 'SET_SELECTED_PATIENT': return { ...state, selectedPatient: action.payload };
    case 'SET_INITIAL_QUERY': return { ...state, initialChatQuery: action.payload };
    default: return state;
  }
};

const initialState: AppState = {
  user: null, theme: 'dark', currentView: 'auth', diagnoses: [], currentDiagnosis: null, chatHistory: [], patients: [], selectedPatient: null, chatMode: 'general'
};

export default function SehatAIApp() {
  const [state, dispatch] = React.useReducer(auraReducer, initialState);
  useEffect(() => { document.documentElement.classList.add('dark'); }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <GridBackground />
        {state.currentView === 'auth' ? <AuthView /> : (
          <div className="flex relative z-10">
            <Sidebar />
            <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto custom-scrollbar">
              {state.currentView === 'dashboard' && <DashboardView />}
              {state.currentView === 'doctor-dashboard' && <DoctorDashboard />}
              {state.currentView === 'diagnosis' && <DiagnosisWizard />}
              {state.currentView === 'results' && <ResultsView />}
              {state.currentView === 'chat' && <ChatView />}
              {state.currentView === 'history' && <HistoryView />}
              {state.currentView === 'profile' && <ProfileView />}
              {state.currentView === 'video-call' && <VideoConsultView />}
              {state.currentView === 'patient-detail' && <PatientDetailView />}
              {state.currentView === 'reports' && <ReportsView />}
              {state.currentView === 'staff' && <StaffView />}
            </main>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}