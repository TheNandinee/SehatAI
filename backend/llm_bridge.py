# backend/llm_bridge.py

from LLM.api import process_query, analyze_symptoms

def run_llm_query(query: str, mode: str = "general"):
    """
    Backend → LLM/api.py
    """
    return process_query(
        query=query,
        mode=mode
    )


def run_health_analysis(symptoms: list, duration_days: str):
    """
    Backend → LLM/api.py → analyzer
    """
    return analyze_symptoms(
        symptoms=symptoms,
        duration_days=duration_days
    )
