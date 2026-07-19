# 🤖 SupportAgent.AI - Proje Dokümantasyonu

## 👥 Takım Bilgileri (Team Information)
* **Takım İsmi:** The Last AIBenders
* **Takım Rolleri:**
  * **Scrum Master & Product Owner:** Beyza Nur Ercan
  * **Developer Team:** Herkes (Cross-functional Team)

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
* **Kullanıcı Arayüzü (Client):** Streamlit (Python tabanlı hızlı prototipleme ve güvenli oturum yönetimi için).
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
  * `TASK-301`: Streamlit üzerinde Login/Register arayüz ekranlarının tasarlanması.
  * `TASK-302`: Streamlit oturum yönetimi (`session_state`) ile akışkan chat ekranının entegrasyonu.
  * `TASK-303`: Tüm mikroservislerin (FastAPI, Streamlit, DB) tek bir `docker-compose.yml` altında birleştirilmesi.
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


## 🟨 SPRINT 3: Vektör Veritabanı, Embedding & LangGraph Ajan Akışı (DEVAM EDİYOR)

Bu sprintteki hedefimiz, parçaladığımız verileri sayısal vektörlere dönüştürerek kalıcı hale getirmek ve akıllı ajan mimarisini (LangGraph) hayata geçirmektir.

### 1. Vektör Veritabanı Katmanı (pgvector)
*   [ ] Parçalanan metinlerin (chunks) saklanacağı `document_chunks` tablosu için SQLAlchemy modelinin oluşturulması.
*   [ ] Tablo içerisine `pgvector.sqlalchemy` modülü kullanılarak 384 boyutlu vektör (`Vector(384)`) sütununun eklenmesi.

### 2. Yerel Embedding ve İndeksleme Servisi
*   [ ] `sentence-transformers` kütüphanesi ve Türkçe dil desteği yüksek yerel bir model kullanılarak metin parçalarının vektörleştirilmesi.
*   [ ] Okunan PDF/Word belgelerinin otomatik olarak parçalanıp, vektörleri üretilerek `document_chunks` tablosuna asenkron kaydedilmesi (Ingestion Pipeline).

### 3. Vektör Arama & Retrieval Katmanı
*   [ ] Veritabanı seviyesinde Cosine Similarity (Kosinüs Benzerliği) veya L2 mesafe fonksiyonları kullanılarak benzerlik araması yapacak repository fonksiyonlarının yazılması.
*   [ ] Müşteri sorusuna en yakın kurumsal doküman parçalarını getiren servis metodunun tamamlanması.

### 4. LangGraph Tabanlı Akıllı Ajan (Agent) Tasarımı
*   [ ] Ajanın durumunu (State) ve belleğini yönetecek LangGraph yapısının kurgulanması.
*   [ ] Gelen kullanıcı talebini analiz eden "Niyet Analizi (Intent Detection)" düğümünün (Node) eklenmesi.
*   [ ] Bilgi bankasından (RAG) beslenen arama düğümünün ve LLM yanıt üretme döngülerinin grafik (Graph) mimarisine bağlanması.
*   [ ] Ajanın ürettiği yanıtların ve işlem adımlarının FastAPI rotaları üzerinden dış dünyaya sunulması.

---

## 🛠️ Kurulum ve Canlıya Alım Prensipleri
Proje geliştirilirken "On-Premises" (Şirket içi) veya "Cloud" (Bulut) ortamlarda doğrudan çalışabilecek şekilde tasarlanmıştır. `docker-compose up --build` komutuyla tüm mikroservisler birbiriyle izole ve güvenli bir ağ köprüsü üzerinden haberleşecek şekilde ayağa kalkmaktadır.
