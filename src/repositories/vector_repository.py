# src/repositories/vector_repository.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.models.document_vector import DocumentChunk

class VectorRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_chunks(self, chunks_data: list[dict]) -> None:
        chunk_objects = [
            DocumentChunk(
                filename=data["filename"],
                chunk_index=data["chunk_index"],
                content=data["content"],
                embedding=data["embedding"]
            )
            for data in chunks_data
        ]
        self.db.add_all(chunk_objects)
        await self.db.commit()

    async def search_similar_chunks(self, query_vector: list[float], limit: int = 3) -> list[DocumentChunk]:
        # pgvector içindeki cosine_distance metodunu kullanarak en yakın mesafedeki parçaları sıralıyoruz
        stmt = (
            select(DocumentChunk)
            .order_by(DocumentChunk.embedding.cosine_distance(query_vector))
            .limit(limit)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())