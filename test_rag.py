# test_rag.py
import asyncio
from sqlalchemy import text
from src.database import AsyncSessionLocal, engine, Base
from src.models.document_vector import DocumentChunk  # Modeli yüklemek için import şart
from src.services.rag_service import RAGService

async def init_db():
    """Vektör eklentisini kurar ve eksik tabloları oluşturur."""
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def main():
    # 1. Önce veritabanı tablolarının hazır olduğundan emin olalım
    await init_db()

    async with AsyncSessionLocal() as db:
        rag_service = RAGService(db)
        
        file_path = "data/aura_tek_data.pdf"
        
        print(f"📄 '{file_path}' işleniyor...")
        chunk_count = await rag_service.process_and_index_file(file_path)
        print(f"✅ Başarılı! Toplam {chunk_count} parça veritabanına eklendi.\n")
        
        # 2. Benzerlik aramasını test et
        test_query = "Aura Tek teknolojisi nedir?"  # Doküman içeriğine uygun bir soru
        print(f"❓ Soru: {test_query}")
        
        context = await rag_service.retrieve_context(test_query, top_k=2)
        print("\n🔍 Bulunan Alakalı Bağlam (Context):\n")
        print(context)

if __name__ == "__main__":
    asyncio.run(main())