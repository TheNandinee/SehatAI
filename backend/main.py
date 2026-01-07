import os
import time
import random
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

# Initialize FastAPI
app = FastAPI(
    title="SehatAI API",
    description="Advanced Healthcare Intelligence Platform API",
    version="1.0.0"
)

# CORS - Allow connection from Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models ---

class AnalyzeRequest(BaseModel):
    patient_id: str
    symptoms: List[str]
    duration_days: str

class SehatAIResponse(BaseModel):
    analysis_id: str
    timestamp: str
    risk_level: str
    confidence_score: float
    clinical_summary: str
    actionable_recommendations: List[str]
    rag_sources: List[str]
    processing_time_ms: int

class ChatRequest(BaseModel):
    query: str
    mode: str = "general" # 'general', 'triage', 'second_opinion'
    context_id: Optional[str] = None

class ChatResponse(BaseModel):
    id: str
    role: str
    content: str
    sources: List[str]
    thoughts: List[str]
    timestamp: str

# --- Core Logic Engine (Simulating LLM & Analyzer Modules) ---

class SehatEngine:
    def analyze_risk(self, symptoms: List[str]) -> dict:
        # Simulate 'analyzer/risk_assessor.py' logic
        symptoms_text = " ".join(symptoms).lower()
        critical_keywords = ['chest pain', 'shortness of breath', 'severe', 'heart', 'stroke']
        
        is_high_risk = any(k in symptoms_text for k in critical_keywords)
        
        if is_high_risk:
            return {
                "risk": "High",
                "summary": "SEHATAI ENGINE: Detected pattern correlation with acute cardiovascular distress vectors. Immediate intervention protocols recommended.",
                "recs": ["Initiate Emergency Protocol (Code Red)", "Avoid Exertion", "Contact 911"],
                "confidence": 0.94
            }
        else:
            return {
                "risk": "Low",
                "summary": "SEHATAI ENGINE: Symptom cluster aligns with seasonal viral markers (ICD-10-J00). No acute anomalies detected in vector space.",
                "recs": ["Hydration Protocol: +20% Intake", "Rest Cycle: 8h Minimum", "Monitor Thermal Output"],
                "confidence": 0.88
            }

    def process_chat(self, query: str, mode: str) -> dict:
        # Simulate 'llm/inference' logic with different context modes
        if mode == 'triage':
            content = f"Based on the Triage Protocols, '{query}' warrants monitoring. Please track body temperature and hydration levels every 4 hours."
            thoughts = [
                "Parsing symptom entities...",
                "Mapping to SNOMED-CT codes...",
                " retrieving triage protocols from Vector Store...",
                "Calculating urgency score..."
            ]
            sources = ["SehatAI Triage Protocols v2.1", "Mayo Clinic Symptom Checker"]
        
        elif mode == 'second_opinion':
            content = f"Reviewing '{query}' against differential diagnosis models. Consider possibilities of X or Y. Consult a specialist for confirmation."
            thoughts = [
                "Analyzing clinical context...",
                "Searching PubMed for recent studies (2024)...",
                "Comparing differential diagnoses...",
                "Verifying safety contraindications..."
            ]
            sources = ["PubMed (2024)", "JAMA Network Open"]
            
        else: # General
            content = f"Regarding '{query}': This is typically a physiological response. Maintain current health protocols and monitor for changes."
            thoughts = [
                "Understanding natural language query...",
                "Accessing General Health Knowledge Graph...",
                "Filtering for safety guardrails...",
                "Generating response..."
            ]
            sources = ["Healthline Medical Review", "SehatAI General Knowledge Base"]

        return {"content": content, "thoughts": thoughts, "sources": sources}

engine = SehatEngine()

# --- Routes ---

@app.get("/")
def health_check():
    return {"status": "online", "system": "SehatAI Core"}

@app.post("/api/v1/analyze", response_model=SehatAIResponse)
async def analyze(request: AnalyzeRequest):
    start = time.time()
    time.sleep(1.5) # Simulate processing delay
    
    result = engine.analyze_risk(request.symptoms)
    
    return {
        "analysis_id": f"REQ-{random.randint(10000,99999)}",
        "timestamp": datetime.now().isoformat(),
        "risk_level": result["risk"],
        "confidence_score": result["confidence"],
        "clinical_summary": result["summary"],
        "actionable_recommendations": result["recs"],
        "rag_sources": ["CDC Clinical DB v4.2", "SehatAI Vector Store"],
        "processing_time_ms": int((time.time() - start) * 1000)
    }

@app.post("/api/v1/llm/query", response_model=ChatResponse)
async def chat(request: ChatRequest):
    time.sleep(2) # Simulate LLM inference delay
    
    result = engine.process_chat(request.query, request.mode)
    
    return {
        "id": f"MSG-{random.randint(10000,99999)}",
        "role": "assistant",
        "content": result["content"],
        "sources": result["sources"],
        "thoughts": result["thoughts"],
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)