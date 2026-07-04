import { useRoute, Link } from "wouter";
import { useEffect } from "react";
import AuroraNav from "@/components/aurora-nav";
import { BLOG_POSTS, getPostBySlug, formatBlogDate } from "@/data/blog-posts";
import "@/styles/aurora-home.css";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getPostBySlug(params.slug) : undefined;

  // Yeni yazıya geçildiğinde sayfanın en üstünden başla.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  const related = BLOG_POSTS.filter((p) => p.slug !== post?.slug).slice(0, 3);

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

          {!post ? (
            <div className="hero center" style={{ paddingTop: 80 }}>
              <h1>Yazı bulunamadı</h1>
              <p>Aradığınız blog yazısı mevcut değil.</p>
              <div className="cta">
                <Link href="/blog" className="btn btn-pri">← Blog'a dön</Link>
              </div>
            </div>
          ) : (
            <>
              <article className="article">
                <Link href="/blog" className="article-back">← Tüm yazılar</Link>

                <span className="eyebrow">{post.category}</span>
                <h1 className="article-title">{post.title}</h1>

                <div className="blog-meta article-meta">
                  <span>{formatBlogDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readMinutes} dk okuma</span>
                </div>

                <div className="article-cover">
                  <img src={post.coverImage} alt={post.title} />
                </div>

                <p className="article-lead">{post.excerpt}</p>

                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {post.tags.length > 0 && (
                  <div className="article-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-chip">#{tag}</span>
                    ))}
                  </div>
                )}
              </article>

              {/* İlgili yazılar */}
              <section className="center" style={{ paddingTop: 20 }}>
                <span className="eyebrow">Devamı</span>
                <h2 className="sech">Diğer yazılar</h2>
                <div className="blog-grid" style={{ marginTop: 34 }}>
                  {related.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="pjt blog-card">
                      <span className="pthumb">
                        <img src={p.coverImage} alt={p.title} loading="lazy" />
                      </span>
                      <span className="ptag">{p.category}</span>
                      <h4>{p.title}</h4>
                      <p>{p.excerpt}</p>
                      <span className="go">Yazıyı oku →</span>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}

          <footer>
            <div>© 2026 Third Hand AI Agency · Levent / İstanbul</div>
            <div>merhaba@thirdhand.com.tr · +90 (212) 555 66 77</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
