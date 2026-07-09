# src/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # 1. Veritabanı (PostgreSQL) Ayarları
    DB_USER: str = "agent_admin"
    DB_PASSWORD: str = "SecretAgentPassword2026"
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"
    DB_NAME: str = "support_agent_prod"

    # 2. Kimlik Doğrulama (JWT & Şifreleme) Ayarları
    # Gerçek canlı sistemlerde bu key çok gizli tutulur.
    SECRET_KEY: str = "THE_LAST_AI_BENDERS_SUPER_SECRET_SECURITY_KEY_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # 3. Yapay Zeka ve RAG (Ollama) Ayarları
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    LLM_MODEL: str = "llama3"
    EMBEDDING_MODEL: str = "nomic-embed-text"

    @property
    def DATABASE_URL(self) -> str:
        """
        SQLAlchemy'nin asenkron sürücüsü (asyncpg) ile 
        PostgreSQL'e bağlanması için gerekli URL'i dinamik üretir.
        """
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    class Config:
        # Eğer proje kökünde bir .env dosyası varsa ayarları oradan okur, 
        # yoksa yukarıdaki varsayılan (default) değerleri kullanır.
        env_file = ".env"
        env_file_encoding = "utf-8"

# Proje genelinde import edip kullanacağımız tekil (singleton) nesne
settings = Settings()