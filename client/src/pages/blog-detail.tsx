import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { SocialShare } from "@/components/SocialShare";
import type { BlogPost } from "../../../shared/schema";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${params?.slug}`],
    enabled: !!params?.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Blog yazısı bulunamadı</h1>
          <Link href="/blog">
            <Button>{t('blog.backToBlog')}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = currentLang === 'tr' ? post.titleTr : post.titleEn;
  const content = currentLang === 'tr' ? post.contentTr : post.contentEn;
  const excerpt = currentLang === 'tr' ? post.excerptTr : post.excerptEn;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 text-white hover:text-blue-400">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.backToBlog')}
          </Button>
        </Link>

        <Card className="max-w-4xl mx-auto">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={title}
              className="w-full h-96 object-cover rounded-t-lg"
            />
          )}
          
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.publishedAt), 'dd MMMM yyyy', { locale: tr })}
                </div>
              )}
              
              {post.category && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {post.category}
                </div>
              )}
            </div>

            {excerpt && (
              <p className="text-xl text-gray-600 mb-6 italic">
                {excerpt}
              </p>
            )}

            <div className="prose max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{t('blog.tags')}:</h3>
                <div className="flex flex-wrap gap-2">
                  {(post.tags as string[]).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">{t('blog.share')}:</h3>
              <SocialShare
                url={`/blog/${post.slug}`}
                title={title}
                description={excerpt || ''}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
