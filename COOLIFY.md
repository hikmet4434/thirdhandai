# Coolify Kurulum Rehberi (Full-stack + PostgreSQL)

Bu proje artık Coolify'da **backend + veritabanı** ile tam çalışacak şekilde
hazır. Netlify Drop'un aksine burada admin paneli, iletişim formu, WhatsApp
ayarları ve sıralama **gerçekten** çalışır ve her push otomatik deploy olur.

## 1) Veritabanı oluştur
Coolify → **+ New** → **Database → PostgreSQL** oluştur.
- Oluşunca Coolify sana bir **bağlantı dizesi (connection string)** verir, örn:
  `postgres://user:pass@<host>:5432/dbname`
- Bu değeri not al; uygulamanın `DATABASE_URL`'i olacak.

## 2) Uygulamayı oluştur
Coolify → **+ New** → **Application** →
- **Source:** Git reposu (`hiktan44/thirdhandai-website`, branch `main`).
  - GitHub OAuth sorun çıkarırsa repoyu **public** yapıp "Public Repository (URL)"
    ile de bağlayabilirsin; Coolify klonlar.
- **Build Pack:** **Dockerfile** (repo kökündeki `Dockerfile` otomatik bulunur).
- **Port:** `5001` (uygulama bu portu dinler).

## 3) Ortam değişkenleri (Environment Variables)
Uygulama → **Environment Variables** kısmına ekle:

| Anahtar | Değer |
|--------|-------|
| `DATABASE_URL` | 1. adımdaki Postgres bağlantı dizesi |
| `SESSION_SECRET` | uzun rastgele bir metin (oturum güvenliği) |
| `NODE_ENV` | `production` |
| `PORT` | `5001` |
| `ADMIN_USERNAME` | `hikmettanriverdi` |
| `ADMIN_PASSWORD` | `Tanriverdi4462!` |
| `WHATSAPP_PHONE` | `90538961294444` |
| `WHATSAPP_MESSAGE` | karşılama mesajın |
| `WHATSAPP_ENABLED` | `true` |

> Coolify'ın kendi Postgres'i genelde SSL istemez; Neon gibi harici bir DB
> kullanırsan bağlantı dizesinde `?sslmode=require` olsun (kod bunu otomatik
> algılar).

## 4) İlk deploy + veritabanı şeması
1. **Deploy** et. Build biter, uygulama ayağa kalkar.
2. Şemayı **bir kez** oluştur: Coolify'da uygulamanın **Terminal / Execute Command**
   bölümünden şunu çalıştır:
   ```
   npm run db:setup
   ```
   Bu, tabloları oluşturur (`db:push`) ve örnek veriyi ekler (`seed`).

## 5) Domain
Uygulamaya **thirdhand.com.tr** (veya istediğin alan adı) domainini bağla
(Coolify → Domains). SSL sertifikasını Coolify otomatik alır.

---

## Sonuç
- **Admin paneli:** `/(alanadı)/admin` → `hikmettanriverdi` / `Tanriverdi4462!`
- İletişim formu mesajları veritabanına düşer, admin panelde görünür.
- Projeler/videolar/sıralama admin panelden yönetilebilir (backend artık canlı).
- Her `main` push'unda Coolify otomatik yeniden derleyip deploy eder.

## Notlar
- Anasayfadaki proje listesi şu an kodda **statik** (hızlı ve bağımsız). İstenirse
  ayrı bir adımda `/api/projects` üzerinden veritabanına bağlanıp admin'den tam
  yönetilebilir hale getirilebilir.
- `pg` sürücüsü hem Coolify Postgres hem Neon ile çalışır.
