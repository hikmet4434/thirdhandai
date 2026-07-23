import { eq } from "drizzle-orm";
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
      // Gerçek veri var. Seed listesi sıralama için kaynak kabul edilir:
      //  - Seed'de olup DB'de olmayan projeler eklenir.
      //  - Var olan projelerin orderIndex'i seed sırasına hizalanır (ör. yeni
      //    "-ist" ürünlerinin öne alınması). İçerik (başlık/açıklama/görsel)
      //    korunur; sadece sıra güncellenir.
      const byLink = new Map(existing.map((p) => [p.link, p]));
      const seedRows = realProjectRows(); // index = hedef orderIndex
      let inserted = 0;
      let reordered = 0;
      for (const row of seedRows) {
        const cur = byLink.get(row.link);
        if (!cur) {
          await db.insert(projects).values(row);
          inserted++;
        } else if ((cur.orderIndex ?? -1) !== row.orderIndex) {
          await db
            .update(projects)
            .set({ orderIndex: row.orderIndex })
            .where(eq(projects.id, cur.id));
          reordered++;
        }
      }
      console.log(
        `🔄 [projects] senkron: +${inserted} yeni, ${reordered} sıralama güncellendi (seed sırasına hizalandı).`,
      );
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
