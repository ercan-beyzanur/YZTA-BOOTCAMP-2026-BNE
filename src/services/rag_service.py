# src/services/rag_service.py
import os
from sqlalchemy.ext.asyncio import AsyncSession
from src.services.document_service import DocumentService
from src.services.embedding_service import EmbeddingService
from src.repositories.vector_repository import VectorRepository

class RAGService:
    def __init__(self, db: AsyncSession):
        self.doc_service = DocumentService()
        self.embed_service = EmbeddingService()
        self.vector_repo = VectorRepository(db)

    async def process_and_index_file(self, file_path: str) -> int:
        """
        1. Dosyadan metni okur
        2. Metni LangChain ile parçalara (chunks) böler
        3. Her parçanın vektörünü çıkarır
        4. Veritabanına kaydeder
        """
        filename = os.path.basename(file_path)
        
        full_text = self.doc_service.extract_text_from_file(file_path)
        chunks = self.doc_service.split_text_into_chunks(full_text)
        
        if not chunks:
            return 0

        embeddings = self.embed_service.get_embeddings_bulk(chunks)
        
        chunks_data = []
        for idx, (chunk_text, vector) in enumerate(zip(chunks, embeddings)):
            chunks_data.append({
                "filename": filename,
                "chunk_index": idx,
                "content": chunk_text,
                "embedding": vector
            })
            
        await self.vector_repo.save_chunks(chunks_data)
        return len(chunks_data)

    async def retrieve_context(self, query: str, top_k: int = 3) -> str:
        query_vector = self.embed_service.get_embedding(query)
        similar_chunks = await self.vector_repo.search_similar_chunks(query_vector, limit=top_k)
        
        context = "\n---\n".join([chunk.content for chunk in similar_chunks])
        return context