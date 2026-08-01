# SupportAgent.AI - Dashboard

**The Last AIBenders** tarafindan **Google Yapay Zeka Akademisi YZTA Bootcamp 2026** icin gelistirilen SupportAgent.AI yonetim paneli.

Modern, minimalist ve kurumsal tasarim diliyle hazirlanmis, SaaS ve is akisi odaklı bir dashboard arayuzu.

---

## Takim

| Ad | Rol |
|---|---|
| Beyza Nur Ercan | Scrum Master & Product Owner |
| Tolunay YILMAZ | Frontend Gelistirici |

---

## Gorev Dagilimi

### Beyza Nur Ercan (Scrum Master & Product Owner)
- Proje yonetimi ve sprint planlamasi
- Backend altyapisi ve API gelistirme
- Veritabani tasarimi (PostgreSQL + pgvector)
- Docker ve mikroservis mimarisi
- LangGraph ajan orkestrasyonu

### Tolunay YILMAZ (Frontend Gelistirici)
- Dashboard arayuzu tasarimi ve gelistirmesi
- React + Vite kurulumu ve mimarisi
- Tailwind CSS v4 ile SaaS/Minimalist tema olusturma
- Redux state yonetimi ve API entegrasyonu
- Kimlik dogrulama akisi (JWT tabanli giris/kayit)
- Grafik ve gorsellestirme (Recharts)
- Responsive tasarim ve UX optimizasyonu

---

## Onizleme

```
SupportAgent.AI Dashboard
├── Giris / Kayit   → JWT tabanli kimlik dogrulama
├── Dashboard       → Istatistikler, grafikler, son aktiviteler
├── Kullanicilar    → Kullanici listesi, arama, sayfalama
└── Ayarlar         → Genel, bildirim, guvenlik ayarlari
```

---

## Teknoloji Yigini

### Frontend

| Teknoloji | Surum | Amac |
|---|---|---|
| React | 19.2.6 | UI kutuphanelesi |
| Vite | 8.0.12 | Build araci ve dev sunucusu |
| Tailwind CSS | 4.3.1 | Utility-first stillendirme |
| React Router DOM | 7.18.0 | Client-side rota yonetimi |
| Redux + Thunk | 5.0.1 / 3.1.0 | Global state yonetimi |
| Axios | 1.18.0 | HTTP istemcisi |
| Recharts | 3.8.1 | Grafik ve gorsellestirme |
| Lucide React | 1.20.0 | Vektor ikon kutuphanesi |
| react-hot-toast | 2.6.0 | Bildirim toast'lari |

### Backend (FastAPI)

| Teknoloji | Amac |
|---|---|
| FastAPI | Asenkron API katmani |
| SQLAlchemy 2.x (Async) | ORM ve veritabani erisimi |
| PostgreSQL + pgvector | Relational + vektor veritabani |
| JWT (python-jose) | Guvenli kimlik dogrulama |
| Ollama (Llama 3 / Mistral) | Acik kaynakli LLM |
| LangGraph | Ajan orkestrasyonu ve hafiza yonetimi |
| Docker Compose | Mikroservis dagitim altyapisi |

---

## Renk Paleti & Tasarim Sistemi

Proje **3. Temiz ve Minimalist (SaaS ve Is Akisi)** paleti uzerine insa edilmistir.

| Degisken | Renk | Kullanim |
|---|---|---|
| `--color-cloud` | `#F9FAFB` | Ana arka plan (Bulut Beyazi) |
| `--color-coal` | `#1F2937` | Ana metin rengi (Koyu Komur) |
| `--color-emerald` | `#10B981` | AI aksan rengi (Soft Zumrut Yesili) |
| `--color-emerald-dark` | `#059669` | Hover ve aktif durumlar |
| `--color-emerald-light` | `#D1FAE5` | Arka plan vurgulari |

**Tasarim Prensipleri:**
- **Beyaz kartlar** uzerinde **ince border** ile bilgi hiyerarsisi
- **Rounded-2xl** koseler ile yumusak, kurumsal gorunum
- **Backdrop-blur** header ile modern saydam etkisi
- **Emerald tonlari** ile AI ve teknoloji hissi
- **Minimal ikonografi** ile temiz bilgi sunumu

---

## Sayfalar ve Ozellikler

### Kimlik Dogrulama

| Sayfa | Rota | Aciklama |
|---|---|---|
| Giris | `/login` | E-posta ve sifre ile JWT giris |
| Kayit | `/register` | Kullanici adi, e-posta, sifre ile kayit |

- JWT token `localStorage`'da saklanir
- Her API istegine `Authorization: Bearer` header'i eklenir
- 401 hatalarinda otomatik giris sayfasina yonlendirme

### Dashboard (Genel Bakis)

| Bilesen | Aciklama |
|---|---|
| StatCard (x4) | Toplam Kullanici, Aktif Oturum, Islenen Belge, AI Yanit |
| AreaChart | Haftalik kullanici ve AI yanit trendleri |
| BarChart | Gunluk oturum dagilimi |
| Son Aktiviteler | Zaman cizelgesinde son islemler |

### Kullanicilar

- Tablo gorunumu ile kullanici listesi
- Kullanici adi / e-posta ile arama
- Sayfalama (pagination)
- Kullanici avatarlari (ilk harf bazli)

### Ayarlar

| Kategori | Ayarlar |
|---|---|
| Genel | Site adi, dil secenegi |
| Bildirim | E-posta ve push bildirim toggle'lari |
| Guvenlik | Iki faktorlu dogrulama, API hiz limiti |

---

## Proje Yapisi

```
src/
├── main.jsx                    # Uygulama giris noktasi
├── index.css                   # Tailwind v4 + ozel tema tanimi
├── App.jsx                     # Rota tanimlamalari
│
├── api/
│   ├── axiosInstance.js        # JWT interceptor'lu axios ornegi
│   └── authApi.js              # Backend API fonksiyonlari
│
├── store/
│   ├── index.js                # Redux store, reducer'lar, action tipleri
│   └── actions/
│       └── authActions.js      # login, register, logout, restoreSession
│
├── context/
│   └── AuthContext.jsx         # Kullanici oturum durumu (React Context)
│
├── components/
│   ├── ProtectedRoute.jsx      # Token dogrulama korumasi
│   ├── layout/
│   │   ├── Sidebar.jsx         # Katlanabilir sol menu
│   │   ├── Header.jsx          # Ust bar (arama, bildirim, profil)
│   │   └── PageContent.jsx     # Ana layout sarmalayici
│   ├── ui/
│   │   ├── Logo.jsx            # Bot ikonlu logo bileseni
│   │   ├── FormInput.jsx       # Icon'lu, sifre destekli input
│   │   └── SectionHeading.jsx  # Baslik + ikon + aksiyon
│   └── cards/
│       └── StatCard.jsx        # Istatistik karti bileseni
│
└── pages/
    ├── Login.jsx               # Giris sayfasi
    ├── Register.jsx            # Kayit sayfasi
    ├── Dashboard.jsx           # Genel bakis paneli
    ├── UsersPage.jsx           # Kullanici yonetimi
    └── Settings.jsx            # Ayarlar sayfasi
```

---

## Backend API Entegrasyonu

Dashboard, FastAPI backend'i ile asagidaki endpoint uzerinden haberlesir:

```bash
# .env
VITE_API_URL=http://localhost:8000
```

| Method | Endpoint | Aciklama |
|---|---|---|
| GET | `/` | Saglik kontrolu |
| POST | `/auth/register` | Kullanici kaydi |
| POST | `/auth/login` | Giris ve JWT token alma |

**Token Akisi:**
1. Kullanici e-posta + sifre ile giris yapar
2. Backend `access_token` dondurur
3. Token `localStorage`'a kaydedilir
4. Her istekte `Authorization: Bearer <token>` header'i eklenir
5. 401 hatalarinda token temizlenir ve `/login`'e yonlendirilir

---

## Kurulum

### On kosullar
- Node.js 18+
- npm veya yarn
- Backend (FastAPI) `localhost:8000` uzerinde calisir durumda olmali

### Adimlar

```bash
# 1. Bagimlilikalari yukleyin
npm install

# 2. Gelistirme sunucusunu baslatin
npm run dev

# 3. Tarayicida acin
# → http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Backend ile Birlikte Calistirma

```bash
# Terminal 1 - Backend
cd YZTA-BOOTCAMP-2026-BNE-main
docker-compose up -d
uvicorn src.main:app --reload

# Terminal 2 - Dashboard
cd YZTA-BOOTCAMP-2026-Dashboard
npm run dev
```

---

## Lisans

Bu proje **Google Yapay Zeka Akademisi YZTA Bootcamp 2026** kapsaminda **The Last AIBenders** tarafindan gelistirilmistir.
