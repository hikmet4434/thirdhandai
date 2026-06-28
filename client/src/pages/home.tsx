import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/queryClient";
import "@/styles/aurora-home.css";

type Project = {
  n: string;
  u: string;
  tr: { t: string; d: string };
  en: { t: string; d: string };
};

const PROJECTS: Project[] = [
  { n: "fasheone.com", u: "https://fasheone.com/", tr: { t: "E-ticaret", d: "Moda e-ticaret için AI destekli kişiselleştirilmiş alışveriş deneyimi." }, en: { t: "E-commerce", d: "AI-powered personalized shopping experience for fashion e-commerce." } },
  { n: "PodcastYap.com", u: "https://podcastyap.com", tr: { t: "Medya", d: "AI destekli ses düzenleme, transkripsiyon ve içerik önerili podcast platformu." }, en: { t: "Media", d: "Podcast platform with AI-powered audio editing, transcription and content suggestions." } },
  { n: "Doc2Podcast", u: "https://doc2podcast.com", tr: { t: "AI Araç", d: "PDF dosyalarını doğal, akıcı bir podcast'e dönüştüren AI teknolojisi." }, en: { t: "AI Tool", d: "AI technology that turns PDF files into a natural, fluent podcast." } },
  { n: "Uygulama Deposu", u: "https://uygulamadeposu.netlify.app/", tr: { t: "Platform", d: "100+ AI aracını keşfet ve yönet — kapsamlı AI araç platformu." }, en: { t: "Platform", d: "Discover and manage 100+ AI tools — a comprehensive AI tool platform." } },
  { n: "Akıllı Müşteri Asistanı", u: "#", tr: { t: "Chatbot", d: "WhatsApp ve web'e entegre 7/24 destek botu." }, en: { t: "Chatbot", d: "24/7 support bot integrated with WhatsApp and the web." } },
  { n: "Restoran Rezervasyon Botu", u: "#", tr: { t: "Otomasyon", d: "Sesli ve yazılı otomatik rezervasyon sistemi." }, en: { t: "Automation", d: "Automated voice and text reservation system." } },
  { n: "Ürün Öneri Motoru", u: "#", tr: { t: "E-ticaret", d: "Kullanıcı davranışına göre kişiselleştirilmiş öneriler." }, en: { t: "E-commerce", d: "Personalized recommendations based on user behavior." } },
  { n: "Otomatik Fatura İşleme", u: "#", tr: { t: "Otomasyon", d: "Faturadan veri çıkarma ve muhasebeye kayıt." }, en: { t: "Automation", d: "Data extraction from invoices and accounting entry." } },
  { n: "Emlak Değerleme Modeli", u: "#", tr: { t: "Veri Analizi", d: "Konum ve piyasa verisiyle fiyat tahmini." }, en: { t: "Data Analytics", d: "Price prediction using location and market data." } },
  { n: "Hukuki Belge Özetleyici", u: "#", tr: { t: "NLP", d: "Sözleşmeleri sade dile çeviren NLP çözümü." }, en: { t: "NLP", d: "NLP solution that translates contracts into plain language." } },
  { n: "Sağlık Randevu Asistanı", u: "#", tr: { t: "Sağlık", d: "Klinikler için akıllı randevu planlama." }, en: { t: "Healthcare", d: "Smart appointment scheduling for clinics." } },
  { n: "Sosyal Medya İçerik Üretici", u: "#", tr: { t: "İçerik", d: "Marka diline uygun otomatik gönderi üretimi." }, en: { t: "Content", d: "Automated post generation that fits your brand voice." } },
  { n: "Çağrı Merkezi Analizi", u: "#", tr: { t: "Veri Analizi", d: "Konuşma duygu ve kalite analizi paneli." }, en: { t: "Data Analytics", d: "Conversation sentiment and quality analytics dashboard." } },
  { n: "Stok Tahmin Sistemi", u: "#", tr: { t: "Perakende", d: "Talep tahmini ve otomatik sipariş önerisi." }, en: { t: "Retail", d: "Demand forecasting and automatic reorder suggestions." } },
  { n: "CV Tarama & Eşleştirme", u: "#", tr: { t: "İK", d: "İK için aday değerlendirme ve sıralama." }, en: { t: "HR", d: "Candidate evaluation and ranking for HR." } },
  { n: "Görsel Ürün Etiketleme", u: "#", tr: { t: "Görüntü İşleme", d: "Katalog için otomatik görsel etiketleme." }, en: { t: "Computer Vision", d: "Automatic image tagging for catalogs." } },
  { n: "Finansal Rapor Botu", u: "#", tr: { t: "Finans", d: "Aylık finansal özet ve yorum üretimi." }, en: { t: "Finance", d: "Monthly financial summary and commentary generation." } },
  { n: "Eğitim Koçu Chatbot", u: "#", tr: { t: "Eğitim", d: "Öğrencilere 7/24 akıllı öğrenme desteği." }, en: { t: "Education", d: "24/7 smart learning support for students." } },
  { n: "Sesli Sipariş Sistemi", u: "#", tr: { t: "Ses", d: "Telefonla AI üzerinden sipariş alma." }, en: { t: "Voice", d: "Taking orders over the phone via AI." } },
  { n: "Müşteri Segmentasyon Paneli", u: "#", tr: { t: "Veri Analizi", d: "Davranışsal kümeleme ve hedefleme." }, en: { t: "Data Analytics", d: "Behavioral clustering and targeting." } },
  { n: "Otel Yorum Analizi", u: "#", tr: { t: "NLP", d: "Şikayet ve memnuniyet temalarını çıkarır." }, en: { t: "NLP", d: "Extracts complaint and satisfaction themes." } },
  { n: "Lojistik Rota Optimizasyonu", u: "#", tr: { t: "Otomasyon", d: "Teslimat planlama ve maliyet düşürme." }, en: { t: "Automation", d: "Delivery planning and cost reduction." } },
  { n: "Marka İzleme Aracı", u: "#", tr: { t: "İzleme", d: "Web ve sosyal medyada marka takibi." }, en: { t: "Monitoring", d: "Brand tracking across web and social media." } },
  { n: "Akıllı E-posta Yanıtlayıcı", u: "#", tr: { t: "Otomasyon", d: "Gelen kutusu için otomatik yanıt taslakları." }, en: { t: "Automation", d: "Automatic reply drafts for your inbox." } },
  { n: "Üretim Hata Tespiti", u: "#", tr: { t: "Görüntü İşleme", d: "Görüntüden otomatik kusur tespiti." }, en: { t: "Computer Vision", d: "Automatic defect detection from images." } },
  { n: "Anket Sonuç Özetleyici", u: "#", tr: { t: "NLP", d: "Açık uçlu yanıtların tematik analizi." }, en: { t: "NLP", d: "Thematic analysis of open-ended responses." } },
  { n: "Dinamik Fiyatlandırma", u: "#", tr: { t: "E-ticaret", d: "Talebe göre gerçek zamanlı fiyat." }, en: { t: "E-commerce", d: "Real-time pricing based on demand." } },
  { n: "Belge Soru-Cevap (RAG)", u: "#", tr: { t: "RAG", d: "Şirket bilgisinden anlık, kaynaklı yanıt." }, en: { t: "RAG", d: "Instant, sourced answers from company knowledge." } },
  { n: "Toplantı Notu Çıkarıcı", u: "#", tr: { t: "Verimlilik", d: "Ses kaydından özet ve görev listesi." }, en: { t: "Productivity", d: "Summary and task list from audio recordings." } },
  { n: "Müşteri Kaybı Tahmini", u: "#", tr: { t: "Veri Analizi", d: "Churn (kayıp) riskini önceden öngörür." }, en: { t: "Data Analytics", d: "Predicts churn risk in advance." } },
  { n: "Akıllı Form Doldurma", u: "#", tr: { t: "Otomasyon", d: "Belgeden otomatik alan tanıma ve doldurma." }, en: { t: "Automation", d: "Automatic field recognition and filling from documents." } },
  { n: "Çok Dilli Çeviri Asistanı", u: "#", tr: { t: "NLP", d: "İş yazışmaları için anlık çeviri." }, en: { t: "NLP", d: "Instant translation for business correspondence." } },
  { n: "Reklam Metni Üretici", u: "#", tr: { t: "Pazarlama", d: "A/B test için varyantlı reklam metni." }, en: { t: "Marketing", d: "Variant ad copy for A/B testing." } },
  { n: "Görsel Üretim Stüdyosu", u: "#", tr: { t: "Görüntü İşleme", d: "Ürün görseli ve banner üretimi." }, en: { t: "Computer Vision", d: "Product image and banner generation." } },
  { n: "Bordro Otomasyonu", u: "#", tr: { t: "İK", d: "Maaş, izin ve puantaj hesaplama." }, en: { t: "HR", d: "Payroll, leave and timesheet calculation." } },
  { n: "Tedarikçi Risk Skoru", u: "#", tr: { t: "Finans", d: "Tedarik zinciri risk analizi." }, en: { t: "Finance", d: "Supply chain risk analysis." } },
  { n: "Akıllı SSS Botu", u: "#", tr: { t: "Chatbot", d: "Site içi yardım merkezi asistanı." }, en: { t: "Chatbot", d: "On-site help center assistant." } },
  { n: "Video Altyazı & Transkript", u: "#", tr: { t: "Medya", d: "Otomatik altyazı ve transkript üretimi." }, en: { t: "Media", d: "Automatic subtitle and transcript generation." } },
  { n: "Kişisel Finans Koçu", u: "#", tr: { t: "Finans", d: "Harcama analizi ve tasarruf önerisi." }, en: { t: "Finance", d: "Spending analysis and savings suggestions." } },
  { n: "Akıllı Belge Arşivi", u: "#", tr: { t: "Otomasyon", d: "Otomatik sınıflandırma ve akıllı arama." }, en: { t: "Automation", d: "Automatic classification and smart search." } },
];

const SHOW = 12;

const ICONS = ["🤖", "💬", "📊", "🧠", "🔗", "🎯"];

const CONTENT = {
  TR: {
    nav: { solutions: "Çözümler", projects: "Projeler", process: "Süreç", blog: "Blog", contact: "İletişim", admin: "Admin", cta: "Görüşme Ayarla" },
    hero: {
      pill: "✦ Terzi usulü yapay zeka ajansı",
      h1a: "İşinizi büyüten", h1b: "akıllı asistanlar", h1c: "kuruyoruz",
      sub: "Third Hand, şirketinize özel AI çözümleri ve otomasyonlarla tekrar eden işleri devralır; ekibinizi değer üreten işe odaklar.",
      cta1: "Ücretsiz keşif görüşmesi →", cta2: "Çözümleri gör",
    },
    stats: [
      { b: "%70", s: "zaman tasarrufu", up: "▲ otomasyonla" },
      { b: "3 hafta", s: "ilk canlı sistem", up: "▲ hızlı kurulum" },
      { b: "7/24", s: "çalışan AI gücü", up: "▲ kesintisiz" },
    ],
    solutions: {
      eyebrow: "Çözümler", title: "Hazır kalıp değil, size özel sistemler",
      sub: "İş akışınızı dinler, ölçer ve tam ihtiyacınıza göre kurarız.",
      items: [
        { h: "Akıllı Otomasyon", p: "Teklif, fatura ve raporlama gibi tekrar eden işleri uçtan uca otomatikleştiririz." },
        { h: "Müşteri Asistanı", p: "Web ve WhatsApp'a entegre, markanızın dilini konuşan 7/24 destek asistanı." },
        { h: "Karar Panelleri", p: "Dağınık verinizi tek panele toplar, anlık ve okunabilir hale getiririz." },
        { h: "Özel AI Agent'lar", p: "Şirket bilginizle eğitilmiş, görevi kendi tamamlayan dijital çalışanlar." },
        { h: "Entegrasyon", p: "CRM, e-ticaret ve muhasebe araçlarınızı AI ile bağlarız." },
        { h: "AI Danışmanlık", p: "Yol haritanızı bütçenize uygun şekilde birlikte çıkarırız." },
      ],
    },
    process: {
      eyebrow: "Süreç", title: "Fikirden çalışan sisteme",
      items: [
        { b: "1", h: "Keşif", p: "İş akışınızı ve darboğazları haritalandırırız." },
        { b: "2", h: "Tasarım", p: "Size özel çözüm mimarisini çıkarırız." },
        { b: "3", h: "Kurulum", p: "İlk otomasyonu hızla canlıya alırız." },
        { b: "4", h: "Ölçek", p: "Sonuçları ölçer, tüm şirkete yayarız." },
      ],
    },
    projectsSec: {
      eyebrow: "Projelerimiz", title: "Hayata geçirdiğimiz 40+ proje",
      sub: "Farklı sektörlerde geliştirdiğimiz yapay zeka çözümlerinden bazıları.",
      more: "Daha Fazla Gör ↓", visit: "Siteyi Ziyaret Et →", details: "Detaylar →",
    },
    final: { h2a: "Ekibinize", h2b: "üçüncü eli", h2c: "ekleyelim mi?", p: "30 dakikalık ücretsiz keşif görüşmesinde işiniz için somut bir AI fırsatı belirleyelim.", btn: "Görüşme ayarla →" },
    contact: {
      eyebrow: "İletişim", title: "Projenizi konuşalım", sub: "Sorularınız için formu doldurun, en kısa sürede dönüş yapalım.",
      info: { addr: "Adres", addrVal: "Levent / İstanbul", phone: "Telefon", phoneVal: "+90 (212) 555 66 77", email: "E-posta", emailVal: "merhaba@thirdhand.com.tr", hours: "Çalışma Saatleri", hoursVal: "Pzt - Cuma: 09:00 - 18:00" },
      name: "İsim", namePh: "Adınız Soyadınız",
      mail: "E-posta", mailPh: "email@ornek.com",
      subject: "Konu", subjectPh: "Mesaj konusu",
      message: "Mesaj", messagePh: "Mesajınızı buraya yazın...",
      privacy: "Kişisel verilerin işlenmesine dair aydınlatma metnini okudum ve onaylıyorum.",
      send: "Gönder", sending: "Gönderiliyor...",
      ok: "Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.",
      err: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      fill: "Lütfen tüm alanları doldurun ve onay kutusunu işaretleyin.",
    },
    footer: { left: "© 2026 Third Hand AI Agency · Levent / İstanbul" },
  },
  EN: {
    nav: { solutions: "Solutions", projects: "Projects", process: "Process", blog: "Blog", contact: "Contact", admin: "Admin", cta: "Book a Call" },
    hero: {
      pill: "✦ Tailor-made AI agency",
      h1a: "We build smart", h1b: "assistants", h1c: "that grow your business",
      sub: "Third Hand takes over repetitive work with custom AI solutions and automations, so your team can focus on work that creates value.",
      cta1: "Free discovery call →", cta2: "See solutions",
    },
    stats: [
      { b: "70%", s: "time saved", up: "▲ with automation" },
      { b: "3 weeks", s: "first live system", up: "▲ fast setup" },
      { b: "24/7", s: "working AI power", up: "▲ non-stop" },
    ],
    solutions: {
      eyebrow: "Solutions", title: "Not off-the-shelf — systems built for you",
      sub: "We listen to your workflow, measure it and build exactly what you need.",
      items: [
        { h: "Smart Automation", p: "We automate repetitive tasks like quotes, invoicing and reporting end to end." },
        { h: "Customer Assistant", p: "A 24/7 support assistant integrated with web and WhatsApp that speaks your brand's voice." },
        { h: "Decision Dashboards", p: "We bring your scattered data into a single, instant, readable dashboard." },
        { h: "Custom AI Agents", p: "Digital workers trained on your company knowledge that complete tasks on their own." },
        { h: "Integration", p: "We connect your CRM, e-commerce and accounting tools with AI." },
        { h: "AI Consulting", p: "We build your roadmap together, tailored to your budget." },
      ],
    },
    process: {
      eyebrow: "Process", title: "From idea to a working system",
      items: [
        { b: "1", h: "Discovery", p: "We map your workflow and bottlenecks." },
        { b: "2", h: "Design", p: "We design a solution architecture just for you." },
        { b: "3", h: "Setup", p: "We quickly take the first automation live." },
        { b: "4", h: "Scale", p: "We measure results and roll out across the company." },
      ],
    },
    projectsSec: {
      eyebrow: "Our Projects", title: "40+ projects we have delivered",
      sub: "A selection of the AI solutions we have built across different sectors.",
      more: "Show More ↓", visit: "Visit Site →", details: "Details →",
    },
    final: { h2a: "Shall we add", h2b: "a third hand", h2c: "to your team?", p: "In a 30-minute free discovery call, let's identify a concrete AI opportunity for your business.", btn: "Book a call →" },
    contact: {
      eyebrow: "Contact", title: "Let's talk about your project", sub: "Fill in the form with your questions and we'll get back to you shortly.",
      info: { addr: "Address", addrVal: "Levent / Istanbul", phone: "Phone", phoneVal: "+90 (212) 555 66 77", email: "Email", emailVal: "merhaba@thirdhand.com.tr", hours: "Working Hours", hoursVal: "Mon - Fri: 09:00 - 18:00" },
      name: "Name", namePh: "Your full name",
      mail: "Email", mailPh: "email@example.com",
      subject: "Subject", subjectPh: "Message subject",
      message: "Message", messagePh: "Write your message here...",
      privacy: "I have read and accept the privacy notice on the processing of personal data.",
      send: "Send", sending: "Sending...",
      ok: "Your message has been sent! We'll get back to you shortly.",
      err: "Message could not be sent. Please try again.",
      fill: "Please fill in all fields and check the consent box.",
    },
    footer: { left: "© 2026 Third Hand AI Agency · Levent / Istanbul" },
  },
} as const;

function initials(name: string) {
  return name
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[ ._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function ProjectCard({ p, index, lang, visit, details }: { p: Project; index: number; lang: "TR" | "EN"; visit: string; details: string }) {
  const isLink = p.u !== "#";
  const hue = (index * 53) % 360;
  const hue2 = (hue + 40) % 360;
  const loc = lang === "TR" ? p.tr : p.en;
  return (
    <a className="pjt" href={p.u} {...(isLink ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="pthumb">
        <span className="pph" style={{ background: `linear-gradient(135deg,hsl(${hue},68%,55%),hsl(${hue2},70%,45%))` }}>
          {initials(p.n)}
        </span>
        {isLink && (
          <img
            loading="lazy"
            alt={p.n}
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.u)}?w=600&h=380`}
            onError={(e) => e.currentTarget.remove()}
          />
        )}
      </span>
      <span className="ptag">{loc.t}</span>
      <h4>{p.n}</h4>
      <p>{loc.d}</p>
      <span className="go">{isLink ? visit : details}</span>
    </a>
  );
}

type FormState = { name: string; email: string; subject: string; message: string; privacy: boolean };
const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "", privacy: false };

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const c = CONTENT[language];
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, SHOW);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message || !form.privacy) {
      setStatus({ type: "err", text: c.contact.fill });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      await apiRequest("POST", "/api/contact", {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        privacyAccepted: form.privacy,
      });
      setStatus({ type: "ok", text: c.contact.ok });
      setForm(EMPTY_FORM);
    } catch {
      setStatus({ type: "err", text: c.contact.err });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="aurora-page">
      <div className="aurora">
        <i className="a1" />
        <i className="a2" />
        <i className="a3" />
      </div>

      <div className="content">
        <div className="wrap">
          <nav className="glass">
            <div className="logo">
              <span className="m">3H</span> Third Hand{" "}
              <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: 13 }}>AI</span>
            </div>
            <div className="nav-links">
              <a href="#cozumler">{c.nav.solutions}</a>
              <a href="#projeler">{c.nav.projects}</a>
              <a href="#surec">{c.nav.process}</a>
              <Link href="/blog">{c.nav.blog}</Link>
              <a href="#iletisim">{c.nav.contact}</a>
            </div>
            <div className="nav-right">
              <Link href="/admin" className="nav-admin">{c.nav.admin}</Link>
              <div className="lang-toggle" role="group" aria-label="Language">
                <button className={language === "TR" ? "active" : ""} onClick={() => setLanguage("TR")}>TR</button>
                <button className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button>
              </div>
              <a href="#iletisim" className="btn btn-pri">{c.nav.cta}</a>
              <button
                className={`hamburger${menuOpen ? " open" : ""}`}
                aria-label="Menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </nav>

          <div className={`mobile-menu glass${menuOpen ? " open" : ""}`}>
            <a href="#cozumler" onClick={() => setMenuOpen(false)}>{c.nav.solutions}</a>
            <a href="#projeler" onClick={() => setMenuOpen(false)}>{c.nav.projects}</a>
            <a href="#surec" onClick={() => setMenuOpen(false)}>{c.nav.process}</a>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>{c.nav.blog}</Link>
            <a href="#iletisim" onClick={() => setMenuOpen(false)}>{c.nav.contact}</a>
            <Link href="/admin" onClick={() => setMenuOpen(false)}>{c.nav.admin}</Link>
            <a href="#iletisim" className="btn btn-pri" onClick={() => setMenuOpen(false)}>{c.nav.cta}</a>
          </div>

          <header className="hero">
            <span className="pill glass">{c.hero.pill}</span>
            <h1>
              {c.hero.h1a}
              <br />
              <span className="g">{c.hero.h1b}</span> {c.hero.h1c}
            </h1>
            <p>{c.hero.sub}</p>
            <div className="cta">
              <a href="#iletisim" className="btn btn-pri">{c.hero.cta1}</a>
              <a href="#cozumler" className="btn btn-soft">{c.hero.cta2}</a>
            </div>

            <div className="hero-card glass">
              <div className="bar">
                <i />
                <i />
                <i />
              </div>
              <div className="body">
                {c.stats.map((s) => (
                  <div className="mini" key={s.b}>
                    <b>{s.b}</b>
                    <br />
                    <span>{s.s}</span>
                    <div className="up">{s.up}</div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <section id="cozumler" className="center">
            <span className="eyebrow">{c.solutions.eyebrow}</span>
            <h2 className="sech">{c.solutions.title}</h2>
            <p className="secsub">{c.solutions.sub}</p>
            <div className="cards">
              {c.solutions.items.map((s, i) => (
                <div className="card glass" style={{ textAlign: "left" }} key={s.h}>
                  <div className="ic">{ICONS[i]}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="surec" className="center">
            <span className="eyebrow">{c.process.eyebrow}</span>
            <h2 className="sech">{c.process.title}</h2>
            <div className="steps">
              {c.process.items.map((s) => (
                <div className="step glass" key={s.b}>
                  <div className="b">{s.b}</div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="projeler" className="center">
            <span className="eyebrow">{c.projectsSec.eyebrow}</span>
            <h2 className="sech">{c.projectsSec.title}</h2>
            <p className="secsub">{c.projectsSec.sub}</p>
            <div className="pjt-grid">
              {visible.map((p, i) => (
                <ProjectCard p={p} index={i} lang={language} visit={c.projectsSec.visit} details={c.projectsSec.details} key={p.n} />
              ))}
            </div>
            {!showAll && PROJECTS.length > SHOW && (
              <div style={{ marginTop: 34 }}>
                <button className="btn btn-soft" onClick={() => setShowAll(true)}>
                  {c.projectsSec.more}
                </button>
              </div>
            )}
          </section>

          <section id="iletisim" className="center">
            <span className="eyebrow">{c.contact.eyebrow}</span>
            <h2 className="sech">{c.contact.title}</h2>
            <p className="secsub">{c.contact.sub}</p>
            <div className="contact-grid">
              <div className="cinfo glass">
                <div className="row">
                  <div className="ci">📍</div>
                  <div><b>{c.contact.info.addr}</b><span>{c.contact.info.addrVal}</span></div>
                </div>
                <div className="row">
                  <div className="ci">📞</div>
                  <div><b>{c.contact.info.phone}</b><span>{c.contact.info.phoneVal}</span></div>
                </div>
                <div className="row">
                  <div className="ci">✉️</div>
                  <div><b>{c.contact.info.email}</b><span>{c.contact.info.emailVal}</span></div>
                </div>
                <div className="row">
                  <div className="ci">🕑</div>
                  <div><b>{c.contact.info.hours}</b><span>{c.contact.info.hoursVal}</span></div>
                </div>
              </div>

              <form className="cform glass" onSubmit={handleSubmit}>
                <div className="frow">
                  <div>
                    <label htmlFor="cf-name">{c.contact.name}</label>
                    <input id="cf-name" type="text" placeholder={c.contact.namePh}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="cf-email">{c.contact.mail}</label>
                    <input id="cf-email" type="email" placeholder={c.contact.mailPh}
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-subject">{c.contact.subject}</label>
                  <input id="cf-subject" type="text" placeholder={c.contact.subjectPh}
                    value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="cf-message">{c.contact.message}</label>
                  <textarea id="cf-message" placeholder={c.contact.messagePh}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <label className="check">
                  <input type="checkbox" checked={form.privacy}
                    onChange={(e) => setForm({ ...form, privacy: e.target.checked })} />
                  <span>{c.contact.privacy}</span>
                </label>
                {status && <div className={`cstatus ${status.type}`}>{status.text}</div>}
                <button type="submit" className="btn btn-pri" disabled={submitting}>
                  {submitting ? c.contact.sending : c.contact.send}
                </button>
              </form>
            </div>
          </section>

          <div className="final glass">
            <h2>
              {c.final.h2a} <span className="g">{c.final.h2b}</span> {c.final.h2c}
            </h2>
            <p>{c.final.p}</p>
            <a href="mailto:merhaba@thirdhand.com.tr" className="btn btn-pri">{c.final.btn}</a>
          </div>

          <footer>
            <div>{c.footer.left}</div>
            <div>merhaba@thirdhand.com.tr · +90 (212) 555 66 77</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
