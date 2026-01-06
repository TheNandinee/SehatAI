import glob
import json
import os

from retrieval.embedder import embed
from retrieval.vector_store import VectorStore

CACHE_PATH = "data/embeddings_cache.json"


def load_documents():
    documents = []

    # WHO files
    who_files = glob.glob("data/who/*.txt") + glob.glob("data/stress/who_*/*.txt")
    for file in who_files:
        topic = file.split("/")[-1].replace(".txt", "")
        with open(file, "r") as f:
            text = f.read()

        chunks = [c.strip() for c in text.split("---") if len(c.strip()) > 50]
        for chunk in chunks:
            documents.append({
                "text": chunk,
                "source": "WHO",
                "topic": topic
            })

    # CDC files
    cdc_files = glob.glob("data/cdc/*.txt") + glob.glob("data/stress/cdc_*/*.txt")
    for file in cdc_files:
        topic = file.split("/")[-1].replace(".txt", "")
        with open(file, "r") as f:
            text = f.read()

        chunks = [c.strip() for c in text.split("---") if len(c.strip()) > 50]
        for chunk in chunks:
            documents.append({
                "text": chunk,
                "source": "CDC",
                "topic": topic
            })

    return documents


def build_vector_store():
    documents = load_documents()

    # Load from cache if available
    if os.path.exists(CACHE_PATH) and os.path.getsize(CACHE_PATH) > 0:
        with open(CACHE_PATH, "r") as f:
            cached = json.load(f)

        embeddings = cached["embeddings"]
        docs = cached["documents"]

        store = VectorStore(dim=len(embeddings[0]))
        store.add(embeddings, docs)
        return store

    # Otherwise compute embeddings ONCE
    embeddings = [embed(doc["text"]) for doc in documents]

    with open(CACHE_PATH, "w") as f:
        json.dump(
            {
                "embeddings": embeddings,
                "documents": documents
            },
            f
        )

    store = VectorStore(dim=len(embeddings[0]))
    store.add(embeddings, documents)
    return store
