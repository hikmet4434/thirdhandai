import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiRequest } from "@/lib/queryClient";
import { PROJECTS_SEED } from "@shared/projects-seed";
import type { Project as DbProject } from "@shared/schema";
import "@/styles/aurora-home.css";

// Karta çizilecek normalize edilmiş proje şekli. Hem veritabanı satırları
// (admin panelden yönetilen) hem de statik seed listesi bu şekle indirgenir.
type Card = {
  name: string;
  link: string;
  category: string;
  description: string;
  image: string | null;
};

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
  const u = encodeURIComponent(url);
  return [
    `https://s.wordpress.com/mshots/v1/${u}?w=800&h=600`,
    `https://api.microlink.io/?url=${u}&screenshot=true&embed=screenshot.url&meta=false&waitUntil=networkidle2`,
  ];
}

function ProjectCard({ p, index, visit, details }: { p: Card; index: number; visit: string; details: string }) {
  const isLink = !!p.link && p.link !== "#";
  const hue = (index * 53) % 360;
  const hue2 = (hue + 40) % 360;
  // Admin panelde bir görsel tanımlıysa onu kullan; yoksa canlı ekran
  // görüntüsü servislerini sırayla dene, o da olmazsa baş-harf placeholder.
  const providers = p.image ? [p.image] : isLink ? shotProviders(p.link) : [];
  const [shotIdx, setShotIdx] = useState(0);
  const shot = providers[shotIdx];
  return (
    <a className="pjt" href={p.link || "#"} {...(isLink ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="pthumb">
        <span className="pph" style={{ background: `linear-gradient(135deg,hsl(${hue},68%,55%),hsl(${hue2},70%,45%))` }}>
          {initials(p.name)}
        </span>
        {shot && (
          <img
            key={shot}
            loading="lazy"
            alt={p.name}
            src={shot}
            onError={() => setShotIdx((i) => i + 1)}
          />
        )}
      </span>
      <span className="ptag">{p.category}</span>
      <h4>{p.name}</h4>
      <p>{p.description}</p>
      <span className="go">{isLink ? visit : details}</span>
    </a>
  );
}

// Statik seed listesini seçili dile göre Card şekline indirger.
function seedToCards(lang: "TR" | "EN"): Card[] {
  return PROJECTS_SEED.map((p) => {
    const loc = lang === "TR" ? p.tr : p.en;
    return { name: p.n, link: p.u, category: loc.t, description: loc.d, image: null };
  });
}

// Veritabanı satırlarını seçili dile göre Card şekline indirger.
// EN alanları boşsa TR alanlarına düşer.
function dbToCards(rows: DbProject[], lang: "TR" | "EN"): Card[] {
  return rows.map((r) => ({
    name: (lang === "EN" && r.titleEn) || r.title,
    link: r.link || "#",
    category: (lang === "EN" && r.categoryEn) || r.category,
    description: (lang === "EN" && r.descriptionEn) || r.description,
    image: r.image || null,
  }));
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

  // Projeler veritabanından (admin panelde yönetilen) çekilir; boşsa ya da
  // istek başarısızsa statik seed listesine düşülür. Böylece admin panelden
  // sıralama/içerik değiştirildiğinde ön sayfa da güncellenir.
  const { data: dbProjects } = useQuery<DbProject[]>({
    queryKey: ["/api/projects"],
  });
  const allCards: Card[] =
    dbProjects && dbProjects.length > 0
      ? dbToCards(dbProjects, language)
      : seedToCards(language);
  const visible = showAll ? allCards : allCards.slice(0, SHOW);

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
                <ProjectCard p={p} index={i} visit={c.projectsSec.visit} details={c.projectsSec.details} key={`${p.name}-${i}`} />
              ))}
            </div>
            {!showAll && allCards.length > SHOW && (
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
