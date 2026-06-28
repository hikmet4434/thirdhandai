import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Video, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";
import type { Video as VideoType } from "@shared/schema";

export default function VideoProjectsSection() {
  const { t, language } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { data: videos = [], isLoading } = useQuery<VideoType[]>({
    queryKey: ["/api/videos"],
  });

  const gradients = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-blue-600"
  ];

  return (
    <section id="video-projeler" className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading text-white mb-4" style={{fontWeight: 800}}>{t('videos.title')}</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" style={{fontWeight: 500}}>
            {t('videos.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={video.id} className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl">
                <div className={`aspect-video bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative overflow-hidden`}>
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mb-4 opacity-80 mx-auto" />
                      <p className="text-sm">Video: {video.title}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={video.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {language === 'TR' ? video.title : t(`video.${video.id}.title`) || video.title}
                  </h3>
                  <p className="text-slate-300 font-semibold text-sm">
                    {language === 'TR' ? (video.description || t('videos.noDescription')) : (t(`video.${video.id}.description`) || video.description || t('videos.noDescription'))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            onClick={() => scrollToSection("iletisim")}
          >
            <Video className="w-4 h-4 mr-2" />
            {t('videos.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
