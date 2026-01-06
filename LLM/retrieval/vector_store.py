import faiss
import numpy as np

class VectorStore:
    def __init__(self, dim: int):
        self.index = faiss.IndexFlatL2(dim)
        self.documents = []

    def add(self, embeddings, documents):
        self.index.add(np.array(embeddings).astype("float32"))
        self.documents.extend(documents)

    def search(self, query_embedding, k=3):
        distances, indices = self.index.search(
            np.array([query_embedding]).astype("float32"), k
        )
        return [self.documents[i] for i in indices[0]]
