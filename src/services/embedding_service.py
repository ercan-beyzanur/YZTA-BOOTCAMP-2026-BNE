# src/services/embedding_service.py
from sentence_transformers import SentenceTransformer

_MODEL_INSTANCE = None

class EmbeddingService:
    def __init__(self):
        global _MODEL_INSTANCE

        if _MODEL_INSTANCE is None:
            # Türkçe metinlerde 384 boyutlu vektör üreten hafif bir model
            self.model_name = "sentence-transformers/all-MiniLM-L6-v2"
            _MODEL_INSTANCE = SentenceTransformer(self.model_name)

        self.model = _MODEL_INSTANCE

    def get_embedding(self, text: str) -> list[float]:
        embedding = self.model.encode(text, convert_to_numpy=False)
        # pgvector list[float] formatında veri bekler
        return [float(val) for val in embedding]

    def get_embeddings_bulk(self, texts: list[str]) -> list[list[float]]:
        embeddings = self.model.encode(texts, convert_to_numpy=False)
        return [[float(val) for val in enc] for enc in embeddings]