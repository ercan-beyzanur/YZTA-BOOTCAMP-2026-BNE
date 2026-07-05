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

### 🚀 Sprint 2: Altyapı, RAG Pipeline ve Ajan Zekası (3. - 4. Hafta) - [GELECEK SPRINT]
*Bu sprintteki ana odağımız, sistemin veritabanı altyapısını kurmak, veriyi işlemek ve yapay zeka ajanının karar mekanizmasını backend seviyesinde tamamlamaktır.*
* [ ] PostgreSQL ve `pgvector` eklentisini içeren Docker container altyapısının ayağa kaldırılması.
* [ ] Şirket politikalarını ve SSS verilerini içeren yapılandırılmış Markdown (`.md`) bilgi tabanının kod ortamına hazırlanması.
* [ ] Dokümanların anlamlı parçalara bölünerek (Chunking) PostgreSQL üzerine vektör olarak kaydedilmesi (RAG Pipeline).
* [ ] FastAPI üzerinde JWT tabanlı Kullanıcı Kayıt (Register) ve Giriş (Login) servislerinin kodlanması.
* [ ] LangGraph üzerinde Router (Yönlendirici) düğümünün kurulması ve `PostgresSaver` mimarisiyle kullanıcıya özel `thread_id` tabanlı izole sohbet geçmişinin (Memory) entegre edilmesi.

### 🐳 Sprint 3: API Entegrasyonu, Client Arayüzü ve Canlıya Dağıtım (5. - 6. Hafta) - [SON SPRINT]
*Bu sprintteki ana odağımız, backend'deki zekayı arayüze bağlamak, sistemi kullanıcı dostu hale getirmek ve projeyi canlı sunucuya taşımaktır.*
* [ ] FastAPI üzerinde dış dünyadan kullanıcı token'ı ve mesaj kabul eden güvenli `/api/chat` ucunun (endpoint) yazılması.
* [ ] Streamlit üzerinde kullanıcıyı karşılayan Güvenli Giriş/Kayıt ekranlarının tasarlanması.
* [ ] Giriş yapan kullanıcıların oturum bilgilerinin (`session_state`) korunarak akışkan bir chatbot arayüzünün tamamlanması.
* [ ] Projenin OOP (Nesne Yönelimli Programlama) prensiplerine göre modüler hale getirilmesi ve temiz kod (Clean Code) revizyonunun yapılması.
* [ ] `backend` (FastAPI), `frontend` (Streamlit) ve `db` (Postgres) servislerinin `docker-compose.yml` altında birleştirilerek uzak bir sunucuya (VPS) deploy edilmesi.

---

## 🛠️ Kurulum ve Canlıya Alım Prensipleri
Proje geliştirilirken "On-Premises" (Şirket içi) veya "Cloud" (Bulut) ortamlarda doğrudan çalışabilecek şekilde tasarlanmıştır. `docker-compose up --build` komutuyla tüm mikroservisler birbiriyle izole ve güvenli bir ağ köprüsü üzerinden haberleşecek şekilde ayağa kalkmaktadır.