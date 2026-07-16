import { db, pool } from "./db";
import { projects } from "@shared/schema";
import { PROJECTS_SEED } from "@shared/projects-seed";

// Eski demo tohumundan (scripts/seed.ts) gelen proje başlıkları.
// Tablo yalnızca bunları içeriyorsa gerçek projelerle değiştirilir.
const DEMO_TITLES = new Set([
  "E-Ticaret Chatbot",
  "Veri Analizi Dashboard",
  "Doğal Dil İşleme Sistemi",
  // Netlify demo veri seti (olur da kullanılmışsa)
  "fasheone.com",
  "AI Müşteri Destek Botu",
]);

function realProjectRows() {
  return PROJECTS_SEED.map((p, index) => ({
    title: p.n,
    titleEn: p.n,
    description: p.tr.d,
    descriptionEn: p.en.d,
    link: p.u,
    image: null,
    category: p.tr.t,
    categoryEn: p.en.t,
    orderIndex: index,
  }));
}

// EN sütunları eksikse ekle (db:push çalıştırılmamış olma ihtimaline karşı,
// güvenli/idempotent). Sütunlar zaten varsa hiçbir şey yapmaz.
async function ensureEnColumns() {
  await pool.query(`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en text;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en text;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS category_en varchar(100);
  `);
}

// Sunucu açılışında çağrılır. Projeler tablosu boşsa ya da yalnızca eski demo
// projelerini içeriyorsa, gerçek 32 projeyi (kullanıcının verdiği sırayla,
// TR/EN) yükler. Kullanıcı kendi projelerini eklediyse / sıralamayı
// değiştirdiyse dokunmaz; böylece admin paneldeki düzenlemeler korunur.
export async function ensureProjectsSeeded() {
  try {
    await ensureEnColumns();

    const existing = await db.select().from(projects);
    const titles = existing.map((p) => p.title);
    console.log(
      `🔍 [projects] ${existing.length} proje bulundu: ${JSON.stringify(titles)}`,
    );

    const isEmpty = existing.length === 0;
    const isDemoOnly =
      existing.length > 0 && existing.every((p) => DEMO_TITLES.has(p.title));

    if (!isEmpty && !isDemoOnly) {
      // Gerçek veri var — mevcut sıralamaya/düzenlemeye dokunma. Sadece seed
      // listesine sonradan eklenen (ör. Çevirist, Konferist) ve veritabanında
      // henüz olmayan projeleri linke göre tespit edip sona ekle.
      const existingLinks = new Set(existing.map((p) => p.link));
      const missing = realProjectRows().filter((r) => !existingLinks.has(r.link));
      if (missing.length > 0) {
        const maxOrder = existing.reduce((m, p) => Math.max(m, p.orderIndex ?? 0), 0);
        await db.insert(projects).values(
          missing.map((r, i) => ({ ...r, orderIndex: maxOrder + 1 + i })),
        );
        console.log(
          `➕ [projects] ${missing.length} yeni proje eklendi: ${JSON.stringify(missing.map((r) => r.title))}`,
        );
      } else {
        console.log(
          "ℹ️  [projects] Gerçek/özelleştirilmiş veri güncel — ekleme yapılmadı.",
        );
      }
      return;
    }

    if (isDemoOnly) {
      console.log("🧹 [projects] Demo projeler siliniyor...");
      await db.delete(projects);
    }

    await db.insert(projects).values(realProjectRows());
    console.log(
      `✅ [projects] ${PROJECTS_SEED.length} gerçek proje yüklendi.`,
    );
  } catch (error) {
    // Açılışı bloklamamak için hatayı yalnızca logla (ama görünür olsun).
    console.error("❌ [projects] Otomatik yükleme başarısız:", error);
  }
}
