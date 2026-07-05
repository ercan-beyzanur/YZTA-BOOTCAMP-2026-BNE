# SupportAgent.AI - Proje Yol Haritası ve Sprint Planı

Bu döküman, **SupportAgent.AI** (Akıllı Müşteri Destek ve Talep Yönetim Ajanı) projemizin 4 haftalık sıkıştırılmış geliştirme planını, mimari kararlarını ve sprint hedeflerini içermektedir. Takım olarak hedefimiz; tamamen açık kaynaklı araçlar kullanarak, kurumsal standartlarda, güvenli ve canlıya alınmaya hazır bir MVP (Minimum Uygulanabilir Ürün) üretmektir.

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

## 📅 4 Haftalık Güncellenmiş Sprint Planı

Geliştirme sürecimizi 2 ana sprinte (her biri 2 hafta) bölerek çevik (Agile) bir yaklaşım benimsedik.

### 🚀 Sprint 1: Veri Altyapısı, RAG Pipeline ve Ajan Zekası (1. - 2. Hafta)
*Bu sprintteki ana odağımız, sistemin veritabanı altyapısını kurmak ve yapay zeka ajanının karar mekanizmasını tamamlamaktır.*

* **1. Hafta: Altyapı Kurulumu ve Vektör Veritabanı (RAG)**
    * [ ] PostgreSQL ve `pgvector` eklentisini içeren Docker container mimarisinin ayağa kaldırılması.
    * [ ] Ollama entegrasyonunun tamamlanması ve lokal embedding modelinin test edilmesi.
    * [ ] Şirket politikalarını ve SSS verilerini içeren yapılandırılmış Markdown (`.md`) veri setinin hazırlanması.
    * [ ] Dokümanların anlamlı parçalara bölünerek (Chunking) PostgreSQL üzerine vektör olarak kaydedilmesi (RAG Pipeline).
* **2. Hafta: LangGraph Ajanı ve Çoklu Kullanıcı Hafızası (Memory)**
    * [ ] FastAPI üzerinde JWT tabanlı Kullanıcı Kayıt (Register) ve Giriş (Login) servislerinin yazılması.
    * [ ] LangGraph üzerinde "Router" (Yönlendirici) düğümünün kurulması (Gelen talebin bilgi sorgusu mu yoksa şikayet mi olduğunun ayrıştırılması).
    * [ ] LangGraph `PostgresSaver` mimarisi kullanılarak her kullanıcıya özel `thread_id` tabanlı izole sohbet geçmişinin (Memory) entegre edilmesi.

### 🐳 Sprint 2: API Entegrasyonu, Client Arayüzü ve Canlıya Dağıtım (3. - 4. Hafta)
*Bu sprintteki ana odağımız, arka planda çalışan yapay zeka zekasını bir API ile dış dünyaya açmak, kullanıcı arayüzünü giydirmek ve tüm sistemi canlı sunucuya taşımaktır.*

* **3. Hafta: API Uçları ve Streamlit İstemci Geliştirme**
    * [ ] FastAPI üzerinde dış dünyadan kullanıcı token'ı ve mesaj kabul eden `/api/chat` ucunun (endpoint) yazılması.
    * [ ] Streamlit üzerinde kullanıcıyı karşılayan Güvenli Giriş/Kayıt ekranlarının kodlanması.
    * [ ] Giriş yapan kullanıcıların oturum bilgilerinin (`session_state`) korunarak akışkan bir chatbot arayüzünün tamamlanması.
* **4. Hafta: Dockerize Etme, Temiz Kod Revizyonu ve Canlıya Alım (Deployment)**
    * [ ] Projenin OOP (Nesne Yönelimli Programlama) prensiplerine göre modüler hale getirilmesi, spagetti kodların temizlenmesi ve kod içi dökümantasyonun tamamlanması.
    * [ ] `backend` (FastAPI), `frontend` (Streamlit) ve `db` (Postgres) servislerinin `docker-compose.yml` altında birleştirilmesi.
    * [ ] Projenin uzak bir VPS (Ubuntu Sanal Sunucu) üzerine taşınarak Docker Compose ile canlıya (Production) alınması ve test senaryolarının jüri sunumu için hazır hale getirilmesi.

---

## 🛠️ Kurulum ve Canlıya Alım Prensipleri
Proje geliştirilirken "On-Premises" (Şirket içi) veya "Cloud" (Bulut) ortamlarda doğrudan çalışabilecek şekilde tasarlanmıştır. `docker-compose up --build` komutuyla tüm mikroservisler birbiriyle izole ve güvenli bir ağ köprüsü üzerinden haberleşecek şekilde ayağa kalkmaktadır.