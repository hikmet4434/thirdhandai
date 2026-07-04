import { Link } from "wouter";
import AuroraNav from "@/components/aurora-nav";
import { BLOG_POSTS, formatBlogDate } from "@/data/blog-posts";
import "@/styles/aurora-home.css";

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="aurora-page">
      <div className="aurora">
        <i className="a1" />
        <i className="a2" />
        <i className="a3" />
      </div>

      <div className="content">
        <div className="wrap">
          <AuroraNav />

          <header className="hero blog-hero">
            <span className="pill glass">✦ Third Hand Blog</span>
            <h1>
              Yapay zeka üzerine{" "}
              <span className="g">güncel yazılar</span>
            </h1>
            <p>
              Yapay zeka, otomasyon ve dijital dönüşüm dünyasından işinize
              dokunacak pratik bilgiler ve güncel içerikler.
            </p>
          </header>

          {/* Öne çıkan yazı */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-featured glass">
              <div className="bf-thumb">
                <img src={featured.coverImage} alt={featured.title} loading="lazy" />
              </div>
              <div className="bf-body">
                <span className="ptag">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="blog-meta">
                  <span>{formatBlogDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readMinutes} dk okuma</span>
                </div>
                <span className="go">Yazıyı oku →</span>
              </div>
            </Link>
          )}

          {/* Diğer yazılar */}
          <div className="blog-grid">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="pjt blog-card">
                <span className="pthumb">
                  <img src={post.coverImage} alt={post.title} loading="lazy" />
                </span>
                <span className="ptag">{post.category}</span>
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{formatBlogDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readMinutes} dk</span>
                </div>
                <span className="go">Yazıyı oku →</span>
              </Link>
            ))}
          </div>

          <div className="final glass" style={{ marginTop: 56 }}>
            <h2>
              İşiniz için bir <span className="g">AI fırsatı</span> mı arıyorsunuz?
            </h2>
            <p>30 dakikalık ücretsiz keşif görüşmesinde somut bir çözüm birlikte belirleyelim.</p>
            <a href="/#iletisim" className="btn btn-pri">Görüşme ayarla →</a>
          </div>

          <footer>
            <div>© 2026 Third Hand AI Agency · Levent / İstanbul</div>
            <div>merhaba@thirdhand.com.tr · +90 (212) 555 66 77</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
