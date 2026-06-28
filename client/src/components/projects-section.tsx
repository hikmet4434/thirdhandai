import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { t, language } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projeler" className="py-20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projeler" className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading text-white mb-4" style={{fontWeight: 800}}>{t('projects.title')}</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" style={{fontWeight: 500}}>
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  {language === 'TR' ? project.title : t(`project.${project.id}.title`) || project.title}
                </h3>
                <p className="text-slate-300 font-semibold mb-6">
                  {language === 'TR' ? project.description : t(`project.${project.id}.description`) || project.description}
                </p>
                {project.link && (
                  <Button 
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={() => project.link && window.open(project.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('projects.visitSite')}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg transition-all"
            onClick={() => scrollToSection("iletisim")}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {t('projects.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}
