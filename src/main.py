import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from src.database import engine, Base, AsyncSessionLocal
from src.routes import auth_routes, chat_routes
from src.services.rag_service import RAGService

# 1. Lifespan (Ömür Döngüsü) Yönetimi: 
# Uygulama başlarken veritabanı tablolarını ve vektör verilerini otomatik hazırlar.
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Önce vektör eklentisini oluştur ve commit et
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
    
    # 2. Eklenti kurulduktan sonra yeni bir bağlantı açıp tabloları oluştur
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    # 3. Otomatik PDF İndeksleme (Eğer veritabanı boşsa)
    pdf_path = os.path.join("data", "aura_tek_data.pdf")
    if os.path.exists(pdf_path):
        try:
            async with AsyncSessionLocal() as db:
                rag_service = RAGService(db)
                # Tabloda veri var mı kontrol et
                existing_chunks = await rag_service.vector_repo.search_similar_chunks([0.0] * 384, limit=1)
                
                if not existing_chunks:
                    print(f"⏳ [RAG] Veritabanı boş. '{pdf_path}' okunuyor ve indeksleniyor...")
                    chunks_count = await rag_service.process_and_index_file(pdf_path)
                    print(f"✅ [RAG] Başarılı! {chunks_count} metin parçası veritabanına kaydedildi.")
                else:
                    print("ℹ️ [RAG] Veritabanında doküman parçaları zaten mevcut.")
        except Exception as e:
            print(f"⚠️ [RAG] Otomatik indeksleme sırasında bir hata oluştu: {e}")
    else:
        print(f"⚠️ [RAG] İndekslenecek PDF bulunamadı: {pdf_path}")
        
    yield

# 2. FastAPI Uygulamasını Başlatıyoruz
app = FastAPI(
    title="SupportAgent.AI API",
    description="Akıllı Müşteri Destek ve Talep Yönetim Ajanı Yetkilendirme Servisi",
    version="1.0.0",
    lifespan=lifespan
)

# 3. CORS Ayarları ile fe & be arası tarayıcı engeli çıkmasının önüne geçiyoruz
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme ortamı için tüm kökenlere izin ver
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Yazdığımız Rotaları Uygulamaya Kaydediyoruz (Register)
app.include_router(auth_routes.router)
app.include_router(chat_routes.router)

# 5. Ana Sayfa (Root) Endpoint'i (Sağlık kontrolü için)
@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "online",
        "message": "SupportAgent.AI API başarıyla çalışıyor!",
        "version": "1.0.0"
    }