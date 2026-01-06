from retrieval.embedder import embed
from retrieval.retriever import build_vector_store
from retrieval.query_expander import expand_query, conservative_expand_query
from pipeline.query_analyzer import is_abstract_or_indirect
from feedback.feedback_analyzer import analyze_failures

# Build vector store once (cached embeddings)
VECTOR_STORE = build_vector_store()

def build_context(user_input: str) -> str:
    """
    Builds a grounded context for the LLM using:
    - metadata-aware RAG (WHO + CDC)
    - GPT-assisted query expansion
    - feedback-driven conservative fallback
    """

    # --- FEEDBACK ANALYSIS ---
    # Analyze past failures to determine hallucination risk
    failure_stats = analyze_failures()
    hallucination_count = failure_stats["flag_frequency"].get("hallucination", 0)

    # --- QUERY INTERPRETATION ---
    if is_abstract_or_indirect(user_input):
        # If hallucinations have occurred frequently,
        # switch to a conservative expansion strategy
        if hallucination_count > 3:
            search_query = conservative_expand_query(user_input)
        else:
            search_query = expand_query(user_input)
    else:
        search_query = user_input

    # --- RETRIEVAL ---
    query_embedding = embed(search_query)
    retrieved_docs = VECTOR_STORE.search(query_embedding, k=4)

    # --- CONTEXT CONSTRUCTION ---
    context = (
        "You must answer ONLY using the information below.\n"
        "If the information is insufficient, explicitly say so.\n"
        "Do NOT speculate or invent facts.\n\n"
    )

    for doc in retrieved_docs:
        context += f"[SOURCE: {doc['source']} | TOPIC: {doc['topic']}]\n"
        context += doc["text"] + "\n\n"

    context += f"User question: {user_input}"

    return context
