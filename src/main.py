# src/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from src.database import engine, Base
from src.routes.auth_routes import router as auth_router

# 1. Lifespan (Ömür Döngüsü) Yönetimi: 
# Uygulama başlarken veritabanı tablolarını otomatik oluşturur.
@asynccontextmanager
async def lifespan(app: FastAPI):
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
app.include_router(auth_router)

# 4. Ana Sayfa (Root) Endpoint'i (Sağlık kontrolü için)
@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "online",
        "message": "SupportAgent.AI API başarıyla çalışıyor!",
        "version": "1.0.0"
    }