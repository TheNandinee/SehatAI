from fastapi import FastAPI
from pydantic import BaseModel
from pipeline.orchestrator import run_pipeline

app = FastAPI(
    title="SehatAI",
    description="RAG-based medical AI system with adversarial testing and feedback-driven adaptation",
    version="1.0.0",
)

# ---------- Request / Response Schemas ----------

class QueryRequest(BaseModel):
    query: str


class QueryResponse(BaseModel):
    response: str


# ---------- Health Check ----------

@app.get("/")
def root():
    return {
        "service": "SehatAI",
        "status": "running",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


# ---------- Core Inference Endpoint ----------

@app.post("/query", response_model=QueryResponse)
def query_ai(request: QueryRequest):
    answer = run_pipeline(request.query)
    return QueryResponse(response=answer)
