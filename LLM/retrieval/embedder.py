from sentence_transformers import SentenceTransformer

_model = SentenceTransformer("all-MiniLM-L6-v2")

def embed(text: str):
    return _model.encode(text).tolist()
