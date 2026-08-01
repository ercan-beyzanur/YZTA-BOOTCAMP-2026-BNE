# 1. Resmi Python imajını temel al
FROM python:3.10-slim

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. Sistem bağımlılıklarını yükle (PostgreSQL ve derleme araçları için)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 4. Bağımlılık dosyasını kopyala ve kütüphaneleri yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Tüm proje kodlarını kopyala
COPY . .

# 6. FastAPI varsayılan portunu dışarı aç
EXPOSE 8000

# 7. Sunucuyu çalıştır
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]