export type RiskLevel = "Low" | "Medium" | "High";
export type UserRole = "patient" | "doctor";
export type ChatMode = "general" | "triage" | "second_opinion";

export interface SehatAIResponse {
  analysis_id: string;
  timestamp: string;
  risk_level: RiskLevel;
  confidence_score: number;
  clinical_summary: string;
  actionable_recommendations: string[];
  rag_sources: string[];
  processing_time_ms: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  thoughts?: string[];
  mode?: ChatMode;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremium?: boolean;
}
