# src/services/embedding_service.py
from sentence_transformers import SentenceTransformer

class EmbeddingService:
    def __init__(self):
        # Türkçe metinlerde 384 boyutlu vektör üreten hafif bir model
        self.model_name = "sentence-transformers/all-MiniLM-L6-v2"
        self.model = SentenceTransformer(self.model_name)

    def get_embedding(self, text: str) -> list[float]:
        embedding = self.model.encode(text, convert_to_numpy=False)
        # pgvector list[float] formatında veri bekler
        return [float(val) for val in embedding]

    def get_embeddings_bulk(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.model.encode(texts, convert_to_numpy=False)
        return [[float(val) for val in enc] for enc in embeddings]