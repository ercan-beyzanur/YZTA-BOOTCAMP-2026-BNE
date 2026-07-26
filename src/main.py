# src/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text
from src.database import engine, Base
from src.routes import auth_routes, chat_routes

# 1. Lifespan (Ömür Döngüsü) Yönetimi: 
# Uygulama başlarken veritabanı tablolarını otomatik oluşturur.
@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Önce vektör eklentisini oluştur ve commit et
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
    
    # 2. Eklenti kurulduktan sonra yeni bir bağlantı açıp tabloları oluştur
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    yield

# 2. FastAPI Uygulamasını Başlatıyoruz
app = FastAPI(
    title="SupportAgent.AI API",
    description="Akıllı Müşteri Destek ve Talep Yönetim Ajanı Yetkilendirme Servisi",
    version="1.0.0",
    lifespan=lifespan
)

# 3. Yazdığımız Rotaları Uygulamaya Kaydediyoruz (Register)
app.include_router(auth_routes.router)
app.include_router(chat_routes.router)

# 4. Ana Sayfa (Root) Endpoint'i (Sağlık kontrolü için)
@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "online",
        "message": "SupportAgent.AI API başarıyla çalışıyor!",
        "version": "1.0.0"
    }