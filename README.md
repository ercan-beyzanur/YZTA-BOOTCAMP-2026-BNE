# 🤖 SupportAgent.AI - Proje Dokümantasyonu

> ℹ️ **Geliştirme ve Sorumluluk Dağılımı:**
> * **Backend & Sistem Mimarisi:** Arka yüz (FastAPI, LangGraph RAG ajan mimarisi, veritabanı/vektör yapılandırması, izole hafıza yönetimi) ve sistem konfigürasyon/Dockerizasyon süreçleri Beyza Nur Ercan tarafından ilerletilmiştir.
> * **Frontend (Arayüz):** Arayüz geliştirme ve kullanıcı deneyimi süreçleri Tolunay Yılmaz tarafından ilerletilmiştir.
> * 🔗 **Frontend Reposu:** https://github.com/TolunayYilmaz/YZTA-BOOTCAMP-2026-Dashboard
> * **Dokümantasyon:** Görkem Bakan proje dokümantasyonu süreçlerini ilerletmiştir.

---

## 👥 Takım Bilgileri (Team Information)
* **Takım İsmi:** The Last AIBenders
* **Takım Rolleri:**
  * **Scrum Master & Product Owner:** Beyza Nur Ercan
  * **Backend & System Architect:** Beyza Nur Ercan
  * **Frontend Developer & UX Designer:** Tolunay Yılmaz

---

## 🎯 Ürün Detayları (Product Details)

### 📌 Ürün İsmi
**SupportAgent.AI**

### 📝 Ürün Açıklaması (Product Description)
SupportAgent.AI; işletmelerin müşteri destek operasyonlarını insan seviyesinde bir doğruluk ve esneklikle otomatikleştiren, yeni nesil bir **Bilişsel Yapay Zeka Ajanı (Cognitive AI Agent)** sistemidir. Geleneksel ve kural tabanlı chatbotların aksine sistemimiz; karmaşık müşteri taleplerini analiz edip yönlendirebilir, işletmenin dinamik bilgi tabanına (Knowledge Base) başvurarak halüsinasyonsuz yanıtlar üretebilir ve kullanıcı geçmişini akıllıca hatırlayarak kişiselleştirilmiş bir destek deneyimi sunar. Tamamen açık kaynaklı modellerle ve veri güvenliği odaklı (On-Premises uyumlu) olarak tasarlanmıştır.

### ✨ Ürün Özellikleri (Core Features)
* **Akıllı Niyet Analizi ve Orkestrasyon (Intent Routing):** Gelen mesajların tonunu ve amacını (soru, şikayet, üyelik iptali vb.) anlar ve süreci doğru alt mekanizmalara otonom olarak yönlendirir.
* **Güvenilir Bilgi Üretimi (RAG - Retrieval-Augmented Generation):** Şirketin kargo, iade politikaları, SSS ve kullanım kılavuzlarını tarayarak müşteriye uydurma değil, her zaman kaynak odaklı ve %100 doğru bilgi sağlar.
* **Kullanıcı Bazlı İzole Hafıza (Multi-User Conversational Memory):** Veritabanı seviyesinde thread tabanlı durum yönetimi sunar. Ahmet'in konuşma geçmişi ile Mehmet'inki asla karışmaz; ajan geçmiş konuşmaları referans alarak sohbeti sürdürür.
* **Güvenli Kimlik Doğrulama (Authentication):** Her kullanıcı için JWT tabanlı güvenli giriş ve kayıt mekanizması barındırır.
* **Mikroservis ve Canlıya Hazır Mimari:** FastAPI, Streamlit ve PostgreSQL bileşenleri Dockerize edilmiş olup, bulut veya yerel sunuculara tek komutla dağıtılabilir (`Production-Ready`).

### 👥 Hedef Kitle (Target Audience)
* **E-Ticaret ve Perakende Şirketleri:** Yoğun kargo, iade ve ürün sorularını 7/24 kesintisiz ve hatasız yanıtlamak isteyen işletmeler.
* **SaaS (Yazılım) Sağlayıcıları:** Kullanıcı kılavuzları ve teknik dokümantasyon yükü fazla olan, müşterilere hızlı teknik self-servis desteği sunmak isteyen teknoloji firmaları.
* **KOBİ'ler ve Dijital Girişimler:** Büyük müşteri hizmetleri bütçeleri olmayan ancak müşteri memnuniyetini kurumsal standartlarda tutmayı hedefleyen büyümekte olan işletmeler.

---

## 🏗️ Mimari ve Teknoloji Seçimleri (Architecture Stack)

Projemizin sürdürülebilir, modüler ve temiz kod (Clean Code) prensiplerine uygun olması adına aşağıdaki teknoloji yığınını seçmiş bulunmaktayız:

* **Büyük Dil Modeli (LLM):** Ollama (Llama 3 / Mistral) & `nomic-embed-text` (Tamamen açık kaynak ve lokal/özel sunucu bağımlı veri güvenliği için).
* **Ajan Orkestrasyonu:** LangGraph (Çoklu kullanıcı senaryolarında durum yönetimini ve thread tabanlı hafızayı en kararlı yöneten framework olduğu için seçilmiştir).
* **API Katmanı:** FastAPI (Asenkron mimarisi, yüksek performansı ve otomatik Swagger dökümantasyonu için).
* **Veritabanı ve Vektör DB:** PostgreSQL + `pgvector` eklentisi. (Ayrı ayrı FAISS ve ilişkisel DB'ler kullanmak yerine; kullanıcı verilerini, sohbet geçmişini ve RAG vektör mimarisini tek bir endüstri standardı veritabanında birleştirerek mimari karmaşıklığı azalttık).
* **Kullanıcı Arayüzü (Client):** React + Vite (Modern, dinamik, bileşen mimarisine dayalı kullanıcı arayüzü ve Nginx tabanlı sunum için).
* **Dağıtım ve Altyapı:** Docker & Docker Compose (Mikroservis mimarisini kutulamak ve canlı ortama tek komutla taşımak için).

---

## 🗂️ Product Backlog (Ürün İş Listesi)

Projemizin geliştirme sürecinde önceliklendirilen ve Sprint'lere dağıtılacak olan ana iş kalemleri (User Stories & Tasks) aşağıdadır:

* **[Epic: Araştırma ve Konsept Tasarımı] - %100 TAMAMLANDI**
  * `TASK-001`: LLM, RAG ve Yapay Zeka Ajanı (AI Agent) kavramlarının literatür araştırması.
  * `TASK-002`: Açık kaynaklı frameworklerin (LangChain, LangGraph, CrewAI) kıyaslanması ve mimari seçimi.
  * `TASK-003`: Veri güvenliği gereksinimleri doğrultusunda Ollama ve yerel veritabanı (PostgreSQL) kullanımının fizibilitesi.

* **[Epic: Altyapı ve Veri Yönetimi]**
  * `TASK-101`: PostgreSQL + `pgvector` veri tabanı Docker ortamının kurulması.
  * `TASK-102`: Ollama entegrasyonu ve lokal embedding/LLM modellerinin ayağa kaldırılması.
  * `TASK-103`: Şirket SSS ve politikalarını içeren Markdown formatlı bilgi tabanının (RAG verisi) oluşturulması.
  * `TASK-104`: Metin parçalama (Chunking) ve vektör veritabanına indeksleme scriptinin yazılması.

* **[Epic: Ajan Zekası ve Backend API]**
  * `TASK-201`: FastAPI üzerinde kullanıcı kayıt (Register) ve giriş (Login) uçlarının kodlanması.
  * `TASK-202`: LangGraph üzerinde Router ve RAG düğümlerinin (Graph Nodes) tasarlanması.
  * `TASK-203`: LangGraph `PostgresSaver` ile kullanıcı bazlı dinamik hafıza (Thread Management) altyapısının kurulması.
  * `TASK-204`: Güvenli token kontrolü yapan `/api/chat` endpoint'inin tamamlanması.

* **[Epic: Kullanıcı Arayüzü ve Dağıtım]**
  * `TASK-301`: React üzerinde Login/Register arayüz ekranlarının tasarlanması.
  * `TASK-302`: React State & Context API ile akışkan chat ekranının entegrasyonu.
  * `TASK-303`: Tüm mikroservislerin (FastAPI, React Frontend, DB) tek bir `docker-compose.yml` altında birleştirilmesi.
  * `TASK-304`: Projenin uzak bir sunucuya (VPS) deploy edilmesi ve canlı ortam testlerinin tamamlanması.

---

## 📅 6 Haftalık Çevik (Agile) Sprint Yol Haritası

Projemiz toplamda 3 Sprint'e bölünmüş olup, ilk sprint başarıyla tamamlanmıştır.

### 🟢 Sprint 1: Öğrenme, Araştırma ve Fizibilite (1. - 2. Hafta) - [TAMAMLANDI]
*Bu sprint tamamen projenin teknik teorisini öğrenme, açık kaynaklı modelleri araştırma ve mimariyi tasarlama odağıyla yürütülmüştür.*
* [x] Büyük Dil Modelleri (LLM) ve RAG (Retrieval-Augmented Generation) çalışma prensiplerinin derinlemesine incelenmesi.
* [x] AI Agent mimarilerinde hafıza (Memory) ve yönlendirme (Orkestrasyon) pratiklerinin araştırılması.
* [x] Projenin tamamen açık kaynak olabilmesi için `Ollama` ve `LangGraph` kütüphanelerinin dökümantasyon analizleri.
* [x] Kullanıcı bazlı izole hafıza yönetimi için `PostgreSQL + pgvector` mimari modelinin tasarlanması.

<img width="4090" height="1964" alt="image" src="https://github.com/user-attachments/assets/c006e323-8cf9-434b-82a9-3684c0344cb7" />

<img width="4090" height="1964" alt="image" src="https://github.com/user-attachments/assets/a76860cc-264a-44b2-bf67-ddf841ec6568" />


## 🟩 SPRINT 2: Altyapı, Yetkilendirme & Belge İşleme (3. - 4. Hafta) - [TAMAMLANDI]

Bu sprint kapsamında projenin temel veri/güvenlik altyapısı kurulmuş ve RAG pipeline'ının ilk aşaması başarıyla kodlanmıştır.

### 1. Kimlik Doğrulama & Kullanıcı Yönetimi (Auth App)
*   [x] `User` modelinin SQLAlchemy (Async) kullanılarak PostgreSQL üzerinde tasarlanması.
*   [x] Şifrelerin güvenli bir şekilde hash'lenmesi (`passlib`, `bcrypt`) mekanizmasının kurulması.
*   [x] Giriş yapan kullanıcılara JWT (`python-jose`) tabanlı `access_token` üretim altyapısının entegre edilmesi.
*   [x] Pydantic v2 kullanılarak istek/yanıt şemalarının (`UserRegisterRequest`, `UserLoginRequest`, `TokenResponse`) yazılması.
*   [x] `/auth/register` ve `/auth/login` API uçlarının (FastAPI Routes) geliştirilmesi ve Repository/Service katmanlarının bağlanması.

### 2. Konteynerizasyon & Çevre Yönetimi
*   [x] Projenin ihtiyaç duyduğu vektör destekli veritabanının `docker-compose.yml` kullanılarak `ankane/pgvector` imajı ile izole edilmesi.
*   [x] Veritabanı port (5432) ve kimlik bilgilerinin `src/config.py` ve Docker konfigürasyonları arasında tam uyumlu hale getirilmesi.
*   [x] FastAPI `lifespan` event'i kullanılarak, sunucu ayağa kalktığı anda veritabanı tablolarının otomatik oluşturulması (Auto-migration).

### 3. Gelişmiş Belge Okuyucu & Parçalayıcı Servis (Document Ingestion)
*   [x] Kurumsal belgelerin okunabilmesi için PDF (`pypdf`) ve Word (`docx2txt`) okuma fonksiyonlarının `DocumentService` içerisine yazılması.
*   [x] Markdown (`.md`) ve düz metin (`.txt`) uzantılı dosyaları okuma desteğinin eklenmesi.
*   [x] Okunan büyük metinlerin anlam bütünlüğünü koruyarak (paragraf ve cümle bazlı) bölünmesi için `langchain-text-splitters` (`RecursiveCharacterTextSplitter`) entegrasyonunun tamamlanması.

<img width="4090" height="1964" alt="image" src="https://github.com/user-attachments/assets/0934a8b5-3af8-4969-9c52-7d0217191a97" />

## 🏁 Kurulum ve Çalıştırma

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Veritabanını Başlatın (Docker):**
    ```bash
    docker-compose up -d
    ```

3.  **Uygulamayı Ayağa Kaldırın:**
    ```bash
    uvicorn src.main:app --reload
    ```

4.  **API Dökümantasyonu:** Sunucu çalıştıktan sonra `http://127.0.0.1:8000/docs` adresinden Swagger UI'a erişebilirsiniz.


 ### 🚀 SPRINT 3: Vektör Veritabanı, RAG, LangGraph Ajan Akışı ve Full-Stack Dockerize Sistem - [TAMAMLANDI]

Bu sprintteki hedefimiz; parçalanan metin verilerini sayısal vektörlere dönüştürerek pgvector veritabanına kaydetmek, RAG mimarisini tamamlamak, LangGraph tabanlı akıllı ajanı Türkçe ve tekrarsız yanıt üretecek şekilde geliştirmek, kullanıcıya özel izole oturum altyapısını kurmak ve tüm sistemi (Frontend + Backend + Veritabanı) Dockerize ederek yayına hazır hale getirmekti.

1. Vektör Veritabanı Katmanı (pgvector)
* [x] Parçalanan metin parçalarının (chunks) saklanacağı `document_chunks` tablosu SQLAlchemy async altyapısıyla oluşturuldu.

* [x] `pgvector.sqlalchemy` modülü kullanılarak metinler için 384 boyutlu vektör (`Vector(384)`) sütunu tabloya eklendi ve veritabanı indekslemesi tamamlandı.

2. Yerel Embedding ve İndeksleme Servisi (Ingestion Pipeline)
* [x] `sentence-transformers` kütüphanesi entegre edilerek metin parçalarının tamamen lokalde ve yüksek hızda vektörleştirilmesi sağlandı.

* [x] PDF, Word, TXT ve MD formatındaki kurumsal belgelerin otomatik okunup parçalanarak vektörleri ile birlikte `document_chunks` tablosuna asenkron kaydedildiği Ingestion Pipeline hattı kuruldu.

3. Vektör Arama & Retrieval Katmanı
* [x] Veritabanı seviyesinde Cosine Similarity (Kosinüs Benzerliği) hesaplayan vektör arama repository metotları kodlandı.

* [x] Müşteri sorusunu vektörleştirip bilgi bankasından en alakalı metin parçalarını (`top_k=3`) getiren `RAGService` ve RAG API katmanı tamamlandı.

4. LangGraph Tabanlı Akıllı Ajan (Agent), Oturum İzolasyonu & Frontend Entegrasyonu
* [x] **LangGraph Ajan Tasarımı:** LangGraph üzerinde `AgentState` kurgulanarak `retrieve` (RAG arama) ve `generate` (LLM yanıt üretimi) düğümleri (nodes) birbirine bağlandı.

* [x] **Dil ve Tekrar Engelleme Mekanizması:** Sistem prompt'u katı Türkçe yanıt kuralları ile güncellendi; `ChatOllama` konfigürasyonuna `repeat_penalty=1.18` ve `temperature=0.1` eklenerek ajanın döngüye girmesi ve tekrarlı cümleler üretmesi engellendi.

* [x] **İzole Hafıza (MemorySaver):** Kullanıcı sohbet geçmişini güvenle saklayan `MemorySaver` entegre edildi.

* [x] **Backend Oturum Yönetimi:** İstemciden `thread_id` isteme bağımlılığı kaldırıldı; backend tarafında `internal_thread_id = f"user_session_{current_user.id}"` mantığı ile kullanıcılar arasında %100 izole oturum hafızası sağlandı.

* [x] **HTTPBearer Auth Entegrasyonu:** FastAPI `/chat/` rotası HTTPBearer standartlarına çekilerek Swagger UI ve Frontend üzerinden yetkili kullanıcıların ajana sorunsuz erişmesi sağlandı.

* [x] **React Frontend & Modern UI:** React + Vite + Nginx mimarisinde modern canlı chat arayüzü, mesaj geçmişi akışı ve kullanıcı yönetim paneli geliştirilerek projeye dahil edildi.

* [x] **Full-Stack Dockerize Sistem & Host Tüneli:** Tüm mikroservisler (React Frontend, FastAPI Backend, pgvector DB) izole bir Docker ağına (`agent_network`) taşındı; konteyner içindeki Backend'in yerelde çalışan Ollama'ya erişmesi için `host.docker.internal` bridge yapılandırması eklendi.

<img width="3448" height="1624" alt="image" src="https://github.com/user-attachments/assets/bbd5679c-b029-4c0e-8478-2be5edbe5786" />
<img width="3438" height="1568" alt="image" src="https://github.com/user-attachments/assets/0bbb05c0-7f9b-4be1-aad4-17f03905aaa1" />
<img width="3466" height="1590" alt="image" src="https://github.com/user-attachments/assets/2b441176-6f2b-4ef4-9b0c-1188379c443a" />
<img width="3490" height="1816" alt="image" src="https://github.com/user-attachments/assets/d39180e3-c93b-4a46-bf3a-b4d88125ccf8" />
<img width="3502" height="1732" alt="image" src="https://github.com/user-attachments/assets/5ca690b5-3d55-4854-95e9-1eaad2ef274a" />

---

### 🛠️ Kurulum ve Canlıya Alım Prensipleri

Projemiz, On-Premises (Şirket İçi) veya Cloud (Bulut) sunucularda veri gizliliğini %100 koruyacak şekilde, bağımsız mikroservis mimarisinde tasarlanmıştır. Tüm sistem iki farklı modda çalıştırılabilir.

#### 📦 1. Gereksinimler (İndirilmesi Gerekenler)

Sistemi ayağa kaldırmadan önce bilgisayarınızda veya sunucunuzda aşağıdaki araçların kurulu olması gerekmektedir:

| Araç | Sürüm | Kullanım Amacı | Link |
| :--- | :--- | :--- | :--- |
| **Python** | 3.10+ | Local ortamda Backend ve Ajan servislerini çalıştırmak için | [İndir](https://www.python.org/downloads/) |
| **Node.js** | 18.x+ | Local ortamda Frontend (React) uygulamasını geliştirmek için | [İndir](https://nodejs.org/) |
| **Docker & Docker Desktop** | 20.10+ | Veritabanı, Backend ve Frontend servislerini konteynerize etmek için | [İndir](https://www.docker.com/products/docker-desktop/) |
| **Ollama** | Latest | Lokal LLM (`llama3`) çalıştırmak ve ajana zeka sağlamak için | [İndir](https://ollama.com/) |

### ⚙️ Ortam Değişkenleri (Environment Variables)

Projenin sorunsuz çalışabilmesi için `.env` dosyalarının oluşturulması gerekmektedir:

1. **Frontend Ortam Değişkeni:**
   `frontend` klasörü altında bir `.env` dosyası oluşturun ve aşağıdaki değişkeni tanımlayın:
   ```env
   VITE_API_URL=http://localhost:8000

---

🚀 2. Uygulamanın Ayağa Kaldırılması

🟢 Seçenek A: Docker Compose ile Tek Komutla Çalıştırma (Önerilen / Production)
PostgreSQL (pgvector), FastAPI Backend ve React Frontend servisleri izole bir ağ köprüsü (agent_network) üzerinden otomatik olarak ayağa kalkar. Backend, host makinenizde çalışan Ollama servisiyle host.docker.internal üzerinden iletişim kurar.

```bash
# 1. Projeyi klonlayın ve proje dizinine geçin
git clone <repository_url>
cd support-agent-ai

# 2. .env dosyanızı oluşturun
cp .env.example .env

# 3. Ollama Llama 3 modelini indirin ve çalıştırın
ollama pull llama3
ollama run llama3

# 4. Tüm mikroservisleri derleyin ve arka planda ayağa kaldırın
docker-compose up -d --build
```

🟡 Seçenek B: Local Geliştirme Modunda Çalıştırma (Development)
Bu modda veritabanı Docker üzerinde çalışırken, Backend ve Frontend local makinada ayağa kaldırılır. Kod değişikliklerinin anlık yansıması (hot-reload) için uygundur.

```bash
# 1. Sadece PostgreSQL (pgvector) veritabanı container'ını başlatın
docker-compose up -d db

# 2. Ollama Llama 3 modelini indirin ve çalıştırın
ollama pull llama3
ollama run llama3

# 3. Backend'i Ayağa Kaldırın (Ayrı bir terminalde)
python -m venv .venv
source .venv/bin/activate  # Windows için: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000

# 4. Frontend'i Ayağa Kaldırın (Ayrı bir terminalde)
cd frontend
npm install
npm run dev
```

🌐 Erişim Adresleri
Sistem ayağa kalktıktan sonra aşağıdaki adreslerden ilgili servislere erişebilirsiniz:

```bash
🎨 Frontend (React UI): http://localhost:3000

⚙️ Backend API (FastAPI / Swagger): http://localhost:8000/docs

🗄️ Database (PostgreSQL): localhost:5432
```
