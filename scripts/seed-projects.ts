import { db } from "../server/db";
import { projects } from "../shared/schema";
import { PROJECTS_SEED } from "../shared/projects-seed";

// Ön sayfadaki gerçek projeleri veritabanına yükler.
// Mevcut (demo) projeleri temizler ve kullanıcının verdiği sırayla,
// TR/EN başlık-kategori-açıklama alanlarıyla birlikte yeniden ekler.
// Sıralama orderIndex ile korunur; admin panelden sürükle-bırak ile değişebilir.
async function seedProjects() {
  console.log("🧹 Clearing existing projects...");
  await db.delete(projects);

  console.log(`📁 Inserting ${PROJECTS_SEED.length} real projects...`);
  await db.insert(projects).values(
    PROJECTS_SEED.map((p, index) => ({
      title: p.n,
      titleEn: p.n,
      description: p.tr.d,
      descriptionEn: p.en.d,
      link: p.u,
      image: null,
      category: p.tr.t,
      categoryEn: p.en.t,
      orderIndex: index,
    }))
  );

  console.log("✅ Projects seeded successfully!");
}

seedProjects()
  .then(() => {
    console.log("\n👋 Done! Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Project seeding failed:", error);
    process.exit(1);
  });
