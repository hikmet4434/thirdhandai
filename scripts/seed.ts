import { db } from "../server/db";
import { users, projects, videos, aiModels, whatsappSettings, blogPosts } from "../shared/schema";

async function seed() {
  console.log("🚀 Starting database seeding...");

  try {
    // 1. Admin kullanıcıları oluştur
    console.log("👤 Creating admin users...");
    await db.insert(users).values([
      { username: "admin", password: "admin123" }, // Production'da hash'lenmiş şifre kullanın!
      { username: "hikmettanriverdi", password: "Tanriverdi4462!" },
    ]);
    console.log("✅ Admin users created (admin / hikmettanriverdi)");

    // 2. Örnek projeler
    console.log("📁 Creating sample projects...");
    await db.insert(projects).values([
      {
        title: "E-Ticaret Chatbot",
        description: "Müşteri hizmetleri için 7/24 destek veren yapay zeka chatbot çözümü.",
        link: "https://example.com/eticaret-chatbot",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
        category: "Chatbot",
        orderIndex: 0,
      },
      {
        title: "Veri Analizi Dashboard",
        description: "İş verilerinizi görselleştiren ve analiz eden akıllı dashboard sistemi.",
        link: "https://example.com/veri-analizi",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        category: "Data Analytics",
        orderIndex: 1,
      },
      {
        title: "Doğal Dil İşleme Sistemi",
        description: "Türkçe doğal dil işleme ve duygu analizi çözümü.",
        link: "https://example.com/nlp-sistemi",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
        category: "NLP",
        orderIndex: 2,
      },
    ]);
    console.log("✅ Sample projects created");

    // 3. Örnek videolar
    console.log("🎥 Creating sample videos...");
    await db.insert(videos).values([
      {
        title: "Chatbot Demo - Müşteri Hizmetleri",
        description: "E-ticaret chatbot'unun canlı demonstrasyonu",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
        orderIndex: 0,
      },
      {
        title: "AI Dashboard Tanıtımı",
        description: "Veri analizi dashboard'unun özellikleri ve kullanımı",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        orderIndex: 1,
      },
    ]);
    console.log("✅ Sample videos created");

    // 4. AI Modelleri
    console.log("🤖 Creating AI models...");
    await db.insert(aiModels).values([
      {
        name: "GPT-4 Integration",
        description: "OpenAI GPT-4 tabanlı doğal dil işleme çözümü",
        features: ["Doğal dil anlama", "Bağlam hafızası", "Çoklu dil desteği"],
        icon: "brain",
        orderIndex: 0,
      },
      {
        name: "Custom NLP Engine",
        description: "Özel geliştirilmiş Türkçe NLP motoru",
        features: ["Türkçe dil desteği", "Duygu analizi", "Varlık tanıma"],
        icon: "cpu",
        orderIndex: 1,
      },
      {
        name: "Computer Vision API",
        description: "Görüntü işleme ve nesne tanıma sistemi",
        features: ["Nesne tanıma", "Yüz tanıma", "OCR"],
        icon: "eye",
        orderIndex: 2,
      },
    ]);
    console.log("✅ AI models created");

    // 5. WhatsApp Ayarları
    console.log("💬 Creating WhatsApp settings...");
    await db.insert(whatsappSettings).values({
      phoneNumber: "+905551234567",
      welcomeMessage: "Merhaba! Size nasıl yardımcı olabilirim?",
      enabled: true,
    });
    console.log("✅ WhatsApp settings created");

    // 6. Blog Yazıları
    console.log("📝 Creating blog posts...");
    await db.insert(blogPosts).values([
      {
        titleTr: "Yapay Zeka ve İş Dünyası",
        titleEn: "Artificial Intelligence and Business",
        contentTr: `<h2>Giriş</h2>
<p>Yapay zeka, modern iş dünyasında devrim yaratıyor. Bu yazıda, AI'ın işletmelere sağladığı faydaları inceleyeceğiz.</p>
<h3>AI'ın İş Dünyasındaki Rolü</h3>
<p>Yapay zeka teknolojileri, işletmelerin verimliliğini artırıyor ve maliyetleri düşürüyor. Müşteri hizmetlerinden veri analizine kadar birçok alanda kullanılıyor.</p>
<h3>Başarı Hikayeleri</h3>
<p>Birçok büyük şirket, AI ile operasyonlarını optimize etti ve rekabet avantajı elde etti.</p>`,
        contentEn: `<h2>Introduction</h2>
<p>Artificial Intelligence is revolutionizing the modern business world. In this article, we will explore the benefits AI brings to businesses.</p>
<h3>AI's Role in Business</h3>
<p>AI technologies are increasing business efficiency and reducing costs. They are used in many areas from customer service to data analysis.</p>
<h3>Success Stories</h3>
<p>Many large companies have optimized their operations with AI and gained competitive advantage.</p>`,
        excerptTr: "Yapay zekanın iş dünyasında nasıl kullanıldığını ve sağladığı faydaları keşfedin.",
        excerptEn: "Discover how AI is used in business and the benefits it provides.",
        slug: "yapay-zeka-ve-is-dunyasi",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
        category: "AI & Business",
        tags: ["yapay zeka", "iş dünyası", "teknoloji", "AI", "business"],
        published: true,
        publishedAt: new Date(),
        orderIndex: 0,
      },
      {
        titleTr: "Chatbot Nasıl Geliştirilir?",
        titleEn: "How to Develop a Chatbot?",
        contentTr: `<h2>Chatbot Geliştirme Süreci</h2>
<p>Modern chatbot'lar, doğal dil işleme ve makine öğrenmesi kullanarak kullanıcılarla etkileşime girer.</p>
<h3>Adım 1: Planlama</h3>
<p>Chatbot'unuzun amacını ve hedef kitlesini belirleyin.</p>
<h3>Adım 2: Teknoloji Seçimi</h3>
<p>Uygun AI modelini ve platformu seçin.</p>
<h3>Adım 3: Geliştirme ve Test</h3>
<p>Chatbot'u geliştirin ve kapsamlı testler yapın.</p>`,
        contentEn: `<h2>Chatbot Development Process</h2>
<p>Modern chatbots interact with users using natural language processing and machine learning.</p>
<h3>Step 1: Planning</h3>
<p>Define the purpose and target audience of your chatbot.</p>
<h3>Step 2: Technology Selection</h3>
<p>Choose the appropriate AI model and platform.</p>
<h3>Step 3: Development and Testing</h3>
<p>Develop the chatbot and conduct comprehensive tests.</p>`,
        excerptTr: "Baştan sona chatbot geliştirme sürecini öğrenin.",
        excerptEn: "Learn the end-to-end chatbot development process.",
        slug: "chatbot-nasil-gelistirilir",
        coverImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200",
        category: "Development",
        tags: ["chatbot", "geliştirme", "NLP", "AI", "development"],
        published: true,
        publishedAt: new Date(),
        orderIndex: 1,
      },
      {
        titleTr: "Veri Güvenliği ve Yapay Zeka",
        titleEn: "Data Security and Artificial Intelligence",
        contentTr: `<h2>AI ve Güvenlik</h2>
<p>Yapay zeka sistemlerinde veri güvenliği kritik öneme sahiptir.</p>
<h3>Güvenlik Tehditleri</h3>
<p>AI sistemlerinin karşılaştığı güvenlik riskleri ve çözümleri.</p>
<h3>Best Practices</h3>
<p>Güvenli AI sistemleri geliştirmek için en iyi uygulamalar.</p>`,
        contentEn: `<h2>AI and Security</h2>
<p>Data security is critical in artificial intelligence systems.</p>
<h3>Security Threats</h3>
<p>Security risks faced by AI systems and their solutions.</p>
<h3>Best Practices</h3>
<p>Best practices for developing secure AI systems.</p>`,
        excerptTr: "AI sistemlerinde veri güvenliğinin önemini ve best practice'leri keşfedin.",
        excerptEn: "Discover the importance of data security in AI systems and best practices.",
        slug: "veri-guvenligi-ve-yapay-zeka",
        coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200",
        category: "Security",
        tags: ["güvenlik", "veri güvenliği", "AI", "security", "privacy"],
        published: false, // Taslak
        publishedAt: null,
        orderIndex: 2,
      },
    ]);
    console.log("✅ Blog posts created (2 published, 1 draft)");

    console.log("\n✨ Database seeding completed successfully!\n");
    console.log("📊 Summary:");
    console.log("  • 1 admin user (username: admin, password: admin123)");
    console.log("  • 3 sample projects");
    console.log("  • 2 sample videos");
    console.log("  • 3 AI models");
    console.log("  • 1 WhatsApp settings");
    console.log("  • 3 blog posts (2 published, 1 draft)");
    console.log("\n🔗 Access your site:");
    console.log("  • Frontend: http://localhost:3000");
    console.log("  • Admin: http://localhost:3000/admin");
    console.log("  • Blog: http://localhost:3000/blog");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("\n👋 Seeding complete! Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  });
