import time
import random
from typing import List, Optional
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 🔗 REAL LLM IMPORT (NO CHANGES TO LLM)
from LLM.api import process_query, analyze_symptoms


# -------------------------
# FastAPI App
# -------------------------
app = FastAPI(
    title="SehatAI API",
    description="Advanced Healthcare Intelligence Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Request / Response Models
# -------------------------
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
    mode: str = "general"
    context_id: Optional[str] = None


class ChatResponse(BaseModel):
    id: str
    role: str
    content: str
    sources: List[str]
    thoughts: List[str]
    timestamp: str


# -------------------------
# Health Check
# -------------------------
@app.get("/")
def health_check():
    return {"status": "online", "system": "SehatAI Core"}


# -------------------------
# Health Analysis Endpoint
# -------------------------
@app.post("/api/v1/analyze", response_model=SehatAIResponse)
async def analyze(request: AnalyzeRequest):
    start = time.time()

    # 👉 REAL LLM + ANALYZER CALL
    result = analyze_symptoms(
        symptoms=request.symptoms,
        duration_days=request.duration_days
    )

    return {
        "analysis_id": f"REQ-{random.randint(10000, 99999)}",
        "timestamp": datetime.now().isoformat(),
        "risk_level": result["risk_level"],
        "confidence_score": result["confidence"],
        "clinical_summary": result["summary"],
        "actionable_recommendations": result["recommendations"],
        "rag_sources": result.get("sources", []),
        "processing_time_ms": int((time.time() - start) * 1000)
    }


# -------------------------
# LLM Query Endpoint
# -------------------------
@app.post("/api/v1/llm/query", response_model=ChatResponse)
async def chat(request: ChatRequest):

    # 👉 REAL LLM CALL
    result = process_query(
        query=request.query,
        mode=request.mode
    )

    return {
        "id": f"MSG-{random.randint(10000, 99999)}",
        "role": "assistant",
        "content": result["response"],
        "sources": result.get("sources", []),
        "thoughts": result.get("thoughts", []),
        "timestamp": datetime.now().isoformat()
    }
