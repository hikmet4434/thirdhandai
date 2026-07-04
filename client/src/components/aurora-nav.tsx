import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

// Ana sayfa (Aurora) tasarımıyla birebir uyumlu, blog sayfalarında da
// kullanılan paylaşılan üst menü. Bölüm linkleri ana sayfaya gider.
const LABELS = {
  TR: { solutions: "Çözümler", projects: "Projeler", process: "Süreç", blog: "Blog", contact: "İletişim", admin: "Admin", cta: "Görüşme Ayarla" },
  EN: { solutions: "Solutions", projects: "Projects", process: "Process", blog: "Blog", contact: "Contact", admin: "Admin", cta: "Book a Call" },
} as const;

export default function AuroraNav() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const c = LABELS[language] ?? LABELS.TR;

  return (
    <>
      <nav className="glass">
        <Link href="/" className="logo">
          <span className="m">3H</span> Third Hand{" "}
          <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: 13 }}>AI</span>
        </Link>
        <div className="nav-links">
          <a href="/#cozumler">{c.solutions}</a>
          <a href="/#projeler">{c.projects}</a>
          <a href="/#surec">{c.process}</a>
          <Link href="/blog" className="active-link">{c.blog}</Link>
          <a href="/#iletisim">{c.contact}</a>
        </div>
        <div className="nav-right">
          <Link href="/admin" className="nav-admin">{c.admin}</Link>
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={language === "TR" ? "active" : ""} onClick={() => setLanguage("TR")}>TR</button>
            <button className={language === "EN" ? "active" : ""} onClick={() => setLanguage("EN")}>EN</button>
          </div>
          <a href="/#iletisim" className="btn btn-pri">{c.cta}</a>
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
        <a href="/#cozumler" onClick={() => setMenuOpen(false)}>{c.solutions}</a>
        <a href="/#projeler" onClick={() => setMenuOpen(false)}>{c.projects}</a>
        <a href="/#surec" onClick={() => setMenuOpen(false)}>{c.process}</a>
        <Link href="/blog" onClick={() => setMenuOpen(false)}>{c.blog}</Link>
        <a href="/#iletisim" onClick={() => setMenuOpen(false)}>{c.contact}</a>
        <Link href="/admin" onClick={() => setMenuOpen(false)}>{c.admin}</Link>
        <a href="/#iletisim" className="btn btn-pri" onClick={() => setMenuOpen(false)}>{c.cta}</a>
      </div>
    </>
  );
}
