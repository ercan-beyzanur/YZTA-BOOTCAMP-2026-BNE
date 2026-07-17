# src/database.py
from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from src.config import settings

# 1. Asenkron veritabanı motorunu (Engine) oluşturuyoruz
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False, 
    future=True
)

# 2. Her istekte yeni bir asenkron session üretecek fabrikayı kuruyoruz
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# 3. Tüm ORM modellerimizin (User, Chat vb.) türeyeceği Base sınıfı
class Base(DeclarativeBase):
    pass

# 4. Dependency Injection (Bağımlılık Enjeksiyonu) için Session üreteci
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()