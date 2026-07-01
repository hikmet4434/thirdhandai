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

// Sıra, kullanıcının verdiği listeyle birebir aynıdır.
const PROJECTS: Project[] = [
  { n: "Abhibe", u: "https://abhibe.com", tr: { t: "Hibe & Fon", d: "İşletmeler için AB ve devlet hibelerini, teşvikleri tespit edip başvuru sürecini kolaylaştıran platform." }, en: { t: "Grants & Funding", d: "Platform that finds EU and government grants/incentives for businesses and simplifies applications." } },
  { n: "Hibe Destek", u: "https://hibedestek.com", tr: { t: "Hibe & Fon", d: "KOBİ'leri uygun hibe ve destek programlarıyla eşleştiren danışmanlık platformu." }, en: { t: "Grants & Funding", d: "Advisory platform matching SMEs with suitable grant and support programs." } },
  { n: "SesYaz", u: "https://sesyaz.com", tr: { t: "Sesli AI", d: "Konuşmayı metne çeviren, web sitelerine gömülebilen yapay zeka destekli sesli asistan ve chatbot platformu." }, en: { t: "Voice AI", d: "AI voice assistant and chatbot platform that converts speech to text and embeds into websites." } },
  { n: "Fasheone", u: "https://fasheone.com/", tr: { t: "E-ticaret", d: "Moda e-ticaret için AI destekli kişiselleştirilmiş alışveriş ve stil önerisi platformu." }, en: { t: "E-commerce", d: "AI-powered personalized shopping and styling platform for fashion e-commerce." } },
  { n: "Fasheone Sanal Deneme", u: "https://virtual-try-on.fasheone.com/landing", tr: { t: "Sanal Deneme", d: "Kıyafetleri yapay zeka ile sanal olarak deneyip nasıl durduğunu gösteren virtual try-on deneyimi." }, en: { t: "Virtual Try-On", d: "AI virtual try-on that shows how clothes look on you before buying." } },
  { n: "Fasheone Shoes", u: "https://shoes.fasheone.com/", tr: { t: "Sanal Deneme", d: "Ayakkabılar için AI destekli sanal deneme ve online mağaza deneyimi." }, en: { t: "Virtual Try-On", d: "AI-powered virtual try-on and online store experience for shoes." } },
  { n: "Fasheone Lingerie", u: "https://lingeria.fasheone.com/", tr: { t: "Sanal Deneme", d: "İç giyim koleksiyonu için sanal deneme destekli alışveriş deneyimi." }, en: { t: "Virtual Try-On", d: "Virtual try-on shopping experience for the lingerie collection." } },
  { n: "Fasheone Style", u: "https://style.fasheone.com/login", tr: { t: "Stil Asistanı", d: "Kişiye özel kombin ve stil önerileri sunan yapay zeka moda danışmanı." }, en: { t: "Style Advisor", d: "AI fashion advisor offering personalized outfit and style recommendations." } },
  { n: "Kumaş App", u: "https://kumas.app", tr: { t: "Tekstil", d: "Tekstil sektörü için kumaş arama, listeleme ve B2B ticaret uygulaması." }, en: { t: "Textile", d: "Fabric search, listing and B2B trade app for the textile industry." } },
  { n: "Sektör Ara", u: "https://sektorara.com.tr/", tr: { t: "B2B", d: "Sektörlere göre firma ve tedarikçi bulmayı sağlayan B2B keşif platformu." }, en: { t: "B2B", d: "B2B discovery platform for finding companies and suppliers by sector." } },
  { n: "Soru Merkezi", u: "https://sorumerkezi.com", tr: { t: "Destek", d: "Yapay zeka destekli soru-cevap ve yardım/destek merkezi platformu." }, en: { t: "Support", d: "AI-powered Q&A and help/support center platform." } },
  { n: "Akıllı Buzdolabı", u: "https://akillibuzdolabi.seymata.com/", tr: { t: "AI Uygulama", d: "Buzdolabındaki ürünlere göre tarif öneren ve stok takibi yapan akıllı asistan." }, en: { t: "AI App", d: "Smart assistant that suggests recipes from fridge contents and tracks stock." } },
  { n: "Meta Reklam Yöneticisi", u: "https://a88s0s0wsg8okco8cgoo8og8.seymata.com/", tr: { t: "Reklam / Meta", d: "Meta (Facebook & Instagram) reklam kampanyalarını oluşturup yöneten ve performansını optimize eden özel program." }, en: { t: "Ads / Meta", d: "A custom program to create, manage and optimize Meta (Facebook & Instagram) ad campaigns." } },
  { n: "Reklamix", u: "https://reklamix.app/", tr: { t: "Pazarlama", d: "Yapay zeka ile reklam metni ve görseli üreten dijital pazarlama aracı." }, en: { t: "Marketing", d: "Digital marketing tool that generates ad copy and creatives with AI." } },
  { n: "Tan Akademi", u: "https://tanakademi.com", tr: { t: "Eğitim", d: "Online eğitim ve kurs platformu; uzaktan öğrenme deneyimi." }, en: { t: "Education", d: "Online education and course platform with a remote learning experience." } },
  { n: "Restoran Yönetim Sistemi", u: "https://isgo81479wi4menvmz1ur48s.seymata.com/", tr: { t: "Restoran", d: "Sipariş, rezervasyon, menü ve adisyon yönetimini tek çatıda toplayan hepsi bir arada restoran yönetim uygulaması." }, en: { t: "Restaurant", d: "All-in-one restaurant management app bringing orders, reservations, menu and billing together." } },
  { n: "Reklamo", u: "https://reklamo.app/", tr: { t: "Pazarlama", d: "AI destekli reklam ve kampanya oluşturma/yönetim uygulaması." }, en: { t: "Marketing", d: "AI-powered ad and campaign creation/management app." } },
  { n: "TradeOne", u: "https://tradeone.tr/tr", tr: { t: "Dış Ticaret", d: "İhracat ve dış ticaret için hedef pazar ve potansiyel müşteri bulma platformu." }, en: { t: "Foreign Trade", d: "Export and foreign trade platform for finding target markets and potential customers." } },
  { n: "Verdi Jeans", u: "https://verdijeans.com", tr: { t: "E-ticaret", d: "Denim/jean markası için kurumsal e-ticaret ve ürün vitrini sitesi." }, en: { t: "E-commerce", d: "Corporate e-commerce and product showcase site for a denim brand." } },
  { n: "VideoOne", u: "https://videoone.com.tr", tr: { t: "Video", d: "AI destekli video prodüksiyon ve içerik üretim platformu." }, en: { t: "Video", d: "AI-powered video production and content creation platform." } },
  { n: "VideoTrans", u: "https://videotrans.app/", tr: { t: "Video / NLP", d: "Videoları otomatik çeviren, çok dilli altyazı ve seslendirme üreten yapay zeka aracı." }, en: { t: "Video / NLP", d: "AI tool that auto-translates videos and generates multilingual subtitles and voice-over." } },
  { n: "WaPlus", u: "https://waplus.seymata.com/", tr: { t: "WhatsApp", d: "WhatsApp üzerinden otomatik mesajlaşma, pazarlama ve müşteri yönetimi aracı." }, en: { t: "WhatsApp", d: "Automated messaging, marketing and customer management tool over WhatsApp." } },
  { n: "Zaman Makinesi", u: "https://zamanmakinesi.app/", tr: { t: "AI Uygulama", d: "Yapay zeka ile fotoğraf ve içerikleri farklı dönem/çağ temalarına dönüştüren görsel uygulaması." }, en: { t: "AI App", d: "Visual app that transforms photos and content into different era/period themes with AI." } },
  { n: "Tarım ve Teknoloji Derneği", u: "https://tarimveteknolojidernegi.netlify.app", tr: { t: "Dernek", d: "Tarım ve teknoloji alanında faaliyet gösteren derneğin kurumsal tanıtım sitesi." }, en: { t: "Association", d: "Corporate site for an association working in agriculture and technology." } },
  { n: "Product Analiz", u: "https://productanaliz.netlify.app", tr: { t: "E-ticaret / Analiz", d: "E-ticaret ürünlerini analiz eden, fiyat ve rekabet içgörüsü sunan araç." }, en: { t: "E-commerce / Analytics", d: "Tool that analyzes e-commerce products and surfaces price and competition insights." } },
  { n: "SporToto Optimizasyon", u: "https://sportoto-optimizasyon.netlify.app", tr: { t: "Analiz", d: "Spor Toto kuponlarını veriyle optimize eden tahmin ve analiz aracı." }, en: { t: "Analytics", d: "Prediction and analytics tool that optimizes Spor Toto coupons with data." } },
  { n: "Strateji Danışmanlık", u: "https://stratejidanismanlik.netlify.app", tr: { t: "Kurumsal", d: "İşletmelere strateji ve yönetim danışmanlığı sunan kurumsal tanıtım sitesi." }, en: { t: "Corporate", d: "Corporate site offering strategy and management consulting to businesses." } },
  { n: "Hızlı Fatura", u: "https://hizlifatura.netlify.app", tr: { t: "Otomasyon", d: "KOBİ'ler için hızlı fatura oluşturma ve takip uygulaması." }, en: { t: "Automation", d: "Fast invoicing and tracking app for SMEs." } },
  { n: "API Doküman", u: "https://apidocuman.netlify.app", tr: { t: "Geliştirici", d: "API'ler için otomatik dokümantasyon oluşturan geliştirici aracı." }, en: { t: "Developer", d: "Developer tool that auto-generates documentation for APIs." } },
  { n: "Hikaye Oluşturucu", u: "https://hikayeolusturucu.netlify.app", tr: { t: "AI İçerik", d: "Yapay zeka ile özgün hikâye ve metin üreten içerik aracı." }, en: { t: "AI Content", d: "Content tool that generates original stories and text with AI." } },
  { n: "Logo Anime", u: "https://logoanime.netlify.app", tr: { t: "Tasarım", d: "Statik logoları hareketlendiren, animasyonlu logo üreten tasarım aracı." }, en: { t: "Design", d: "Design tool that animates static logos into motion logos." } },
  { n: "Realtime Translator", u: "https://realtimetranslatorht.netlify.app", tr: { t: "NLP", d: "Konuşmayı gerçek zamanlı çeviren anlık çeviri uygulaması." }, en: { t: "NLP", d: "Real-time speech translation app for instant conversations." } },
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
      eyebrow: "Projelerimiz", title: "Hayata geçirdiğimiz 30+ proje",
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
      eyebrow: "Our Projects", title: "30+ projects we have delivered",
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

// Bir URL için sayfanın hero (üst) ekran görüntüsünü üreten servisler.
// Sırayla denenir; biri başarısız olursa diğerine geçilir, hepsi olmazsa
// renkli baş-harf placeholder'ı görünür.
function shotProviders(url: string): string[] {
  return [
    // wait/8 → JS ile geç yüklenen (SPA) sayfalar render olduktan sonra ekran görüntüsü alınır
    `https://image.thum.io/get/width/800/crop/600/wait/8/noanimate/${url}`,
    `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&meta=false&waitUntil=networkidle2`,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`,
  ];
}

function ProjectCard({ p, index, lang, visit, details }: { p: Project; index: number; lang: "TR" | "EN"; visit: string; details: string }) {
  const isLink = p.u !== "#";
  const hue = (index * 53) % 360;
  const hue2 = (hue + 40) % 360;
  const loc = lang === "TR" ? p.tr : p.en;
  const providers = isLink ? shotProviders(p.u) : [];
  const [shotIdx, setShotIdx] = useState(0);
  const shot = providers[shotIdx];
  return (
    <a className="pjt" href={p.u} {...(isLink ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="pthumb">
        <span className="pph" style={{ background: `linear-gradient(135deg,hsl(${hue},68%,55%),hsl(${hue2},70%,45%))` }}>
          {initials(p.n)}
        </span>
        {shot && (
          <img
            key={shot}
            loading="lazy"
            alt={p.n}
            src={shot}
            onError={() => setShotIdx((i) => i + 1)}
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
