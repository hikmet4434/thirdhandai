import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ServerCog, Code, Scissors, ArrowRight, Check, Camera, Video, Sparkles, MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";

export default function ServicesSection() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };



  const defaultServices = [
    {
      icon: Brain,
      titleKey: 'services.ai.title',
      descriptionKey: 'services.ai.description',
      featureKeys: [
        'services.ai.feature1',
        'services.ai.feature2',
        'services.ai.feature3'
      ],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverBg: "group-hover:bg-blue-600"
    },
    {
      icon: ServerCog,
      titleKey: 'services.automation.title',
      descriptionKey: 'services.automation.description',
      featureKeys: [
        'services.automation.feature1',
        'services.automation.feature2',
        'services.automation.feature3'
      ],
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      hoverBg: "group-hover:bg-green-600"
    },
    {
      icon: Code,
      titleKey: 'services.development.title',
      descriptionKey: 'services.development.description',
      featureKeys: [
        'services.development.feature1',
        'services.development.feature2',
        'services.development.feature3'
      ],
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBg: "group-hover:bg-purple-600"
    },
    {
      icon: Scissors,
      titleKey: 'services.media.title',
      descriptionKey: 'services.media.description',
      featureKeys: [
        'services.media.feature1',
        'services.media.feature2',
        'services.media.feature3'
      ],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBg: "group-hover:bg-orange-600"
    },
    {
      icon: Globe,
      titleKey: 'services.export.title',
      descriptionKey: 'services.export.description',
      featureKeys: [
        'services.export.feature1',
        'services.export.feature2',
        'services.export.feature3',
        'services.export.feature4',
        'services.export.feature5',
        'services.export.feature6',
        'services.export.feature7'
      ],
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverBg: "group-hover:bg-emerald-600"
    },
    {
      icon: Camera,
      titleKey: 'services.image.title',
      descriptionKey: 'services.image.description',
      featureKeys: [
        'services.image.feature1',
        'services.image.feature2',
        'services.image.feature3',
        'services.image.feature4',
        'services.image.feature5',
        'services.image.feature6'
      ],
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      hoverBg: "group-hover:bg-pink-600"
    },
    {
      icon: Video,
      titleKey: 'services.video.title',
      descriptionKey: 'services.video.description',
      featureKeys: [
        'services.video.feature1',
        'services.video.feature2',
        'services.video.feature3',
        'services.video.feature4',
        'services.video.feature5',
        'services.video.feature6'
      ],
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      hoverBg: "group-hover:bg-indigo-600"
    },
    {
      icon: MessageSquare,
      titleKey: 'services.chatbot.title',
      descriptionKey: 'services.chatbot.description',
      featureKeys: [
        'services.chatbot.feature1',
        'services.chatbot.feature2',
        'services.chatbot.feature3',
        'services.chatbot.feature4',
        'services.chatbot.feature5',
        'services.chatbot.feature6',
        'services.chatbot.feature7'
      ],
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      hoverBg: "group-hover:bg-cyan-600"
    }
  ];



  return (
    <section id="hizmetler" className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white mb-6" style={{fontFamily: 'Inter', fontWeight: 900}}>{t('services.title')}</h2>
          <p className="text-xl font-sans text-slate-300 max-w-3xl mx-auto" style={{fontWeight: 500}}>
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultServices.map((service, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-2xl">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 ${service.hoverBg} transition-colors`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor} group-hover:text-white transition-colors`} />
                </div>
                <h3 className="text-xl font-heading text-white mb-4" style={{fontWeight: 700}}>{t(service.titleKey)}</h3>
                <p className="font-sans text-slate-300 mb-6" style={{fontWeight: 500}}>{t(service.descriptionKey)}</p>
                <ul className="space-y-2 text-sm text-slate-300 mb-6" style={{fontWeight: 500}}>
                  {service.featureKeys.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {typeof feature === 'string' && feature.includes('.') ? t(feature) : feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="link" 
                  className="text-blue-400 font-semibold hover:text-blue-300 p-0"
                  onClick={() => scrollToSection("iletisim")}
                >
                  {t('services.cta')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  );
}
