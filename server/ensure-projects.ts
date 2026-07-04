import { db } from "./db";
import { projects } from "@shared/schema";
import { PROJECTS_SEED } from "@shared/projects-seed";

// Eski demo tohumundan (scripts/seed.ts) gelen proje başlıkları.
// Bunlardan biri veritabanında bulunuyorsa, tablo gerçek projelerle
// yeniden doldurulur.
const DEMO_TITLES = new Set([
  "E-Ticaret Chatbot",
  "Veri Analizi Dashboard",
  "Doğal Dil İşleme Sistemi",
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

// Sunucu açılışında çağrılır. Projeler tablosu boşsa ya da yalnızca eski
// demo projeleri içeriyorsa, gerçek 32 projeyi (kullanıcının verdiği sırayla)
// yükler. Kullanıcı kendi projelerini eklediyse / sıralamayı değiştirdiyse
// hiçbir şey yapmaz; böylece admin panelde yapılan düzenlemeler korunur.
export async function ensureProjectsSeeded() {
  try {
    const existing = await db.select().from(projects);
    const isEmpty = existing.length === 0;
    const isDemoOnly =
      existing.length > 0 && existing.every((p) => DEMO_TITLES.has(p.title));

    if (!isEmpty && !isDemoOnly) {
      return; // Gerçek/özelleştirilmiş veri var — dokunma.
    }

    if (isDemoOnly) {
      await db.delete(projects);
    }
    await db.insert(projects).values(realProjectRows());
    console.log(
      `✅ Projeler otomatik yüklendi (${PROJECTS_SEED.length} gerçek proje).`,
    );
  } catch (error) {
    // Açılışı bloklamamak için hatayı yalnızca logla.
    console.error("⚠️  Proje otomatik yükleme atlandı:", error);
  }
}
