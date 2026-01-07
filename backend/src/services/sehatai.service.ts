import axios from "axios";

const BASE_URL = process.env.SEHATAI_URL || "http://localhost:8000";

/* ---------- HEALTH ANALYSIS ---------- */
export async function analyzeSymptoms(payload: {
  patient_id: string;
  symptoms: string[];
  duration_days: number;
  severity: "mild" | "moderate" | "severe";
  medical_history: string[];
}) {
  const { data } = await axios.post(
    `${BASE_URL}/api/v1/analyze`,
    payload
  );
  return data;
}

/* ---------- LLM QUERY (CHAT) ---------- */
export async function queryLLM(payload: {
  query: string;
  context?: string;
  conversation_id?: string;
}) {
  const { data } = await axios.post(
    `${BASE_URL}/api/v1/llm/query`,
    payload
  );
  return data;
}
