import React, { createContext, useContext, useState } from 'react';

type Language = 'TR' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  TR: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.services': 'Hizmetler',
    'nav.projects': 'Örnek Projeler',
    'nav.videos': 'Video Projeler',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.admin': 'Admin Giriş',
    
    // Hero Section
    'hero.title1': 'Yapay Zeka',
    'hero.title2': 'ile İşinizi',
    'hero.title3': 'İleriye Taşıyın',
    'hero.subtitle': 'Third Hand AI Agency olarak şirketinize özel, terzi usulü AI çözümleri ve otomasyonları ile rekabette öne geçmenizi sağlıyoruz.',
    'hero.cta1': 'Hizmetlerimizi Keşfedin',
    'hero.cta2': 'İletişime Geçin',
    
    // Services Section
    'services.title': 'Hizmetlerimiz',
    'services.subtitle': 'İşletmenizin ihtiyaçlarına özel, modern yapay zeka çözümleri sunuyoruz. İster küçük bir işletme olun, ister kurumsal bir firma - size uygun AI çözümlerimiz var.',
    'services.cta': 'Detaylı Bilgi',
    
    // Service Items
    'services.ai.title': 'AI Çözümleri',
    'services.ai.description': 'Şirketinize özel yapay zeka çözümleri geliştiriyoruz. Veri analizi, tahmin modelleri ve karar destek sistemleri.',
    'services.ai.feature1': 'Veri analizleri ve tahminleme',
    'services.ai.feature2': 'Doğal dil işleme sistemleri',
    'services.ai.feature3': 'Görüntü ve ses tanıma',
    
    'services.automation.title': 'AI Otomasyonları',
    'services.automation.description': 'Tekrarlayan işleri otomatikleştirin, insan kaynaklarınızı daha değerli alanlara yönlendirin.',
    'services.automation.feature1': 'İş süreçleri otomasyonu',
    'services.automation.feature2': 'Akıllı veri entegrasyonu',
    'services.automation.feature3': 'Zaman ve maliyet tasarrufu',
    
    'services.development.title': 'Yazılım Geliştirme',
    'services.development.description': 'Web sitelerinden mobil uygulamalara, e-ticaret platformlarından özel yazılımlara kadar tüm ihtiyaçlarınız için çözümler.',
    'services.development.feature1': 'Özel web uygulamaları',
    'services.development.feature2': 'Mobil uygulama geliştirme',
    'services.development.feature3': 'API entegrasyonları',
    
    'services.media.title': 'Medya ve İçerik Üretimi',
    'services.media.description': 'Profesyonel medya prodüksiyon hizmetleri ile markanızı öne çıkarın.',
    'services.media.feature1': 'Video montaj ve editörlük',
    'services.media.feature2': 'AI destekli içerik oluşturma',
    'services.media.feature3': 'Sosyal medya içerikleri',
    
    'services.image.title': 'AI ile Görsel Üretim',
    'services.image.description': 'DALL-E 3, Midjourney ve Stable Diffusion ile profesyonel görseller, logolar ve illüstrasyonlar oluşturuyoruz.',
    'services.image.feature1': 'Özel logo ve marka tasarımı',
    'services.image.feature2': 'Ürün görseli oluşturma',
    'services.image.feature3': 'Sosyal medya görselleri',
    'services.image.feature4': 'Reklam ve banner tasarımı',
    'services.image.feature5': '3D modelleme ve render',
    'services.image.feature6': 'İllüstrasyon ve karakter tasarımı',
    
    'services.video.title': 'AI ile Video Prodüksiyon',
    'services.video.description': 'Runway, Pika Labs ve ElevenLabs gibi en gelişmiş AI araçlarıyla profesyonel videolar üretiyoruz.',
    'services.video.feature1': 'Reklam filmi prodüksiyonu',
    'services.video.feature2': 'Ürün tanıtım videoları',
    'services.video.feature3': 'Sosyal medya içerikleri',
    'services.video.feature4': 'Animasyon ve motion graphics',
    'services.video.feature5': 'AI seslendirme hizmetleri',
    'services.video.feature6': 'Video editörlük ve montaj',
    
    'services.automation2.title': 'İş Süreçleri Otomasyonu',
    'services.automation2.description': 'Make.com, Zapier ve n8n ile iş süreçlerinizi otomatikleştirin. API entegrasyonları ve özel otomasyon çözümleri.',
    'services.automation2.feature1': 'CRM ve satış otomasyonları',
    'services.automation2.feature2': 'E-posta ve pazarlama otomasyonları',
    'services.automation2.feature3': 'Muhasebe ve fatura otomasyonları',
    'services.automation2.feature4': 'Sosyal medya yönetimi',
    'services.automation2.feature5': 'Veri toplama ve raporlama',
    'services.automation2.feature6': 'Özel API entegrasyonları',
    
    'services.chatbot.title': 'AI Sesli & Görüntülü Chatbot',
    'services.chatbot.description': 'İşletmeniz için 1-2 gün içinde hazır! Sesli komutları anlayan, görüntü işleyebilen ve video desteği olan akıllı chatbot çözümleri.',
    'services.chatbot.feature1': 'Sesli komut ve yanıt sistemi',
    'services.chatbot.feature2': 'Görüntü tanıma ve işleme',
    'services.chatbot.feature3': 'Görüntülü AI asistan hizmetleri',
    'services.chatbot.feature4': 'Ürün ve hizmetlerinizi tanıtan yapay zeka',
    'services.chatbot.feature5': 'Müşteri sorularına anında yanıt',
    'services.chatbot.feature6': '1-2 günde hızlı teslimat',
    'services.chatbot.feature7': '7/24 müşteri desteği',
    
    'services.export.title': 'Export AI',
    'services.export.description': 'Firmalar GTIP numaralarını verdiğinde, hedef ülkedeki ithalatçı ve potansiyel müşterileri tespit ediyoruz. Yönetici iletişim bilgileri ve firma detaylarıyla hazır raporlar sunuyoruz.',
    'services.export.feature1': 'GTIP bazlı hedef pazar analizi',
    'services.export.feature2': 'İthalatçı firma tespiti ve iletişim bilgileri',
    'services.export.feature3': 'Yönetici ve karar verici kişilerin bilgileri',
    'services.export.feature4': 'Ürün bazlı pazar büyüklüğü analizi',
    'services.export.feature5': 'Rakip analizi ve fiyat araştırması',
    'services.export.feature6': 'Detaylı müşteri listeleri ve segmentasyon',
    'services.export.feature7': 'Hazır iş geliştirme raporları',
    
    // Projects Section
    'projects.title': 'Örnek Projeler',
    'projects.subtitle': 'Third Hand AI Agency olarak gerçekleştirdiğimiz başarılı projelerden bazı örnekler. Farklı sektörlere yönelik yapay zeka çözümlerimizi inceleyebilirsiniz.',
    'projects.visitSite': 'Siteyi Ziyaret Et',
    'projects.cta': 'Projenizi Bize Anlatın',
    
    // Individual Projects - Turkish
    'project.1.title': 'fasheone.com',
    'project.1.description': 'Fashion One için geliştirdiğimiz AI destekli stil danışmanı ve kişiselleştirilmiş alışveriş deneyimi platformu. Müşteri tercihlerini öğrenen ve moda önerileri sunan akıllı sistem.',
    'project.2.title': 'ozgunpetshop.com',
    'project.2.description': 'Pet Shop\'un dijital dönüşüm projesi. AI destekli pet sağlığı takibi, otomatik mama önerisi ve online veteriner randevu sistemi.',
    'project.3.title': 'ozcanneotech.com',
    'project.3.description': 'İleri teknoloji şirketi için geliştirilen kurumsal web sitesi ve AI destekli müşteri destek sistemi. Chatbot entegrasyonu ve akıllı ticket yönetimi.',
    'project.4.title': 'lonelyloversclub.com',
    'project.4.description': 'AI algoritmaları ile eşleştirme yapan modern arkadaşlık ve dating platformu. Kişilik analizi ve uyumluluk tahminleri ile desteklenen akıllı eşleştirme sistemi.',
    
    // Video Projects Section
    'videos.title': 'Video Projelerimiz',
    'videos.subtitle': 'Yapay zeka ve teknoloji projelerimizin tanıtım videolarını inceleyebilirsiniz. AI çözümlerimizin nasıl çalıştığını ve iş süreçlerinize nasıl entegre olduğunu görebilirsiniz.',
    'videos.noDescription': 'Video açıklaması',
    'videos.cta': 'Özel Video Projesi İsteyin',
    
    // Individual Videos - Turkish
    'video.1.title': 'Third Hand AI Agency Tanıtım',
    'video.1.description': 'Yapay zeka çözümlerimiz ve hizmetlerimizin genel tanıtımı. İşletmenizi geleceğe taşıyacak AI teknolojilerini keşfedin.',
    'video.2.title': 'AI Chatbot Demo',
    'video.2.description': 'Sesli ve görüntülü AI chatbot sistemimizin canlı demosu. Müşteri hizmetlerinizi nasıl dönüştürebileceğini görün.',
    'video.3.title': 'Otomasyon Çözümleri',
    'video.3.description': 'İş süreçlerinizi otomatikleştiren AI çözümlerimizin detaylı incelemesi. Verimliliğinizi artırın, maliyetlerinizi düşürün.',
    
    // Work Process Section
    'process.title': 'Çalışma Sürecimiz',
    'process.subtitle': 'Projelerinizi hayata geçirirken izlediğimiz metodoloji ile kaliteli, zamanında ve bütçe dostu çözümler sunuyoruz.',
    'process.step1.title': 'Keşif ve Analiz',
    'process.step1.description': 'İhtiyaçlarınızı detaylı analiz eder, mevcut süreçlerinizi inceleriz.',
    'process.step2.title': 'Çözüm Tasarımı',
    'process.step2.description': 'İhtiyaçlarınıza en uygun AI çözümlerini ve teknolojileri belirleriz.',
    'process.step3.title': 'Geliştirme',
    'process.step3.description': 'En son teknolojileri kullanarak çözümlerinizi geliştiriyoruz.',
    'process.step4.title': 'Test ve Entegrasyon',
    'process.step4.description': 'Çözümlerimizi test eder ve mevcut sistemlerinize entegre ederiz.',
    
    // About Section
    'about.title': 'Hakkımızda',
    'about.intro': 'Third Hand AI Agency olarak 5 yılı aşkın süredir yapay zeka teknolojileri konusunda uzmanlaşmış, yenilikçi çözümler sunan bir teknoloji şirketiyiz.',
    'about.mission': 'Misyonumuz, şirketlerin yapay zeka teknolojilerinden en verimli şekilde faydalanmasını sağlamak ve rekabet avantajı elde etmelerine yardımcı olmaktır.',
    'about.experience': 'Yıl Deneyim',
    'about.features.team.title': 'Profesyonel Ekip',
    'about.features.team.description': '7 kişilik AI uzmanı ekip',
    'about.features.tech.title': 'Modern Teknolojiler',
    'about.features.tech.description': 'En yeni AI teknolojileri',
    'about.features.pricing.title': 'Uygun Fiyatlandırma',
    'about.features.pricing.description': 'Her bütçeye uygun çözümler',
    'about.features.support.title': 'Kesintisiz Destek',
    'about.features.support.description': '7/24 teknik destek',
    
    // Contact Section
    'contact.title': 'İletişime Geçin',
    'contact.subtitle': 'Projeniz hakkında konuşmak veya daha fazla bilgi almak için bize ulaşın.',
    'contact.infoTitle': 'İletişim Bilgileri',
    'contact.sendMessage': 'Mesaj Gönderin',
    'contact.followUs': 'Bizi Takip Edin',
    'contact.success': 'Başarılı!',
    'contact.error': 'Hata!',
    'contact.errorMessage': 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
    'contact.warning': 'Uyarı!',
    'contact.fillFields': 'Lütfen tüm alanları doldurun.',
    'contact.acceptPrivacy': 'Lütfen gizlilik sözleşmesini onaylayın.',
    'contact.info.address': 'Adres',
    'contact.info.addressLine1': 'Zafer Mah. Kumrulu Sok. No: 2/18',
    'contact.info.addressLine2': 'Bahçelievler / İstanbul',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-posta',
    'contact.info.hours': 'Çalışma Saatleri',
    'contact.info.hoursWeekday': 'Pazartesi - Cuma: 09:00 - 18:00',
    'contact.info.hoursWeekend': 'Hafta sonu: Kapalı',
    'contact.form.name': 'İsim',
    'contact.form.namePlaceholder': 'Adınız Soyadınız',
    'contact.form.email': 'E-posta',
    'contact.form.emailPlaceholder': 'email@ornek.com',
    'contact.form.subject': 'Konu',
    'contact.form.subjectPlaceholder': 'Mesaj konusu',
    'contact.form.message': 'Mesaj',
    'contact.form.messagePlaceholder': 'Mesajınızı buraya yazın...',
    'contact.form.privacyText': 'Kişisel verilerin işlenmesine dair aydınlatma metnini okudum ve onaylıyorum.',
    'contact.form.send': 'Gönder',
    'contact.form.sending': 'Gönderiliyor...',
    
    // Testimonials
    'testimonials.title': 'Müşteri Görüşleri',
    'testimonials.subtitle': 'Müşterilerimizin AI çözümlerimiz hakkındaki düşünceleri',
    
    // CTA Section
    'cta.title': 'İşinizi Dönüştürmeye Hazır mısınız?',
    'cta.subtitle': 'Yapay zeka teknolojileri ile işinizi geliştirmek, verimliliğinizi artırmak ve rekabette öne geçmek için hemen iletişime geçin.',
    'cta.button': 'Ücretsiz Danışmanlık Alın',
    
    // Footer
    'footer.tagline': 'Yapay zeka teknolojileri ile işinizi geleceğe taşıyoruz.',
    'footer.quickLinks': 'Hızlı Linkler',
    'footer.follow': 'Bizi Takip Edin',
    'footer.rights': '© 2025 Third Hand AI Agency. Tüm hakları saklıdır.'
  },
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Sample Projects',
    'nav.videos': 'Video Projects',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Login',
    
    // Hero Section
    'hero.title1': 'Artificial Intelligence',
    'hero.title2': 'to Move Your Business',
    'hero.title3': 'Forward',
    'hero.subtitle': 'As Third Hand AI Agency, we help you get ahead of the competition with custom-tailored AI solutions and automations for your company.',
    'hero.cta1': 'Explore Our Services',
    'hero.cta2': 'Get in Touch',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'We offer modern artificial intelligence solutions tailored to your business needs. Whether you are a small business or a corporate company - we have the right AI solutions for you.',
    'services.cta': 'Learn More',
    
    // Service Items
    'services.ai.title': 'AI Solutions',
    'services.ai.description': 'We develop artificial intelligence solutions specific to your company. Data analysis, prediction models and decision support systems.',
    'services.ai.feature1': 'Data analysis and forecasting',
    'services.ai.feature2': 'Natural language processing systems',
    'services.ai.feature3': 'Image and voice recognition',
    
    'services.automation.title': 'AI Automations',
    'services.automation.description': 'Automate repetitive tasks, redirect your human resources to more valuable areas.',
    'services.automation.feature1': 'Business process automation',
    'services.automation.feature2': 'Smart data integration',
    'services.automation.feature3': 'Time and cost savings',
    
    'services.development.title': 'Software Development',
    'services.development.description': 'Solutions for all your needs from websites to mobile applications, e-commerce platforms to custom software.',
    'services.development.feature1': 'Custom web applications',
    'services.development.feature2': 'Mobile app development',
    'services.development.feature3': 'API integrations',
    
    'services.media.title': 'Media & Content Production',
    'services.media.description': 'Make your brand stand out with professional media production services.',
    'services.media.feature1': 'Video editing and editing',
    'services.media.feature2': 'AI-powered content creation',
    'services.media.feature3': 'Social media content',
    
    'services.image.title': 'AI Image Generation',
    'services.image.description': 'We create professional images, logos and illustrations with DALL-E 3, Midjourney and Stable Diffusion.',
    'services.image.feature1': 'Custom logo and brand design',
    'services.image.feature2': 'Product image creation',
    'services.image.feature3': 'Social media visuals',
    'services.image.feature4': 'Ad and banner design',
    'services.image.feature5': '3D modeling and rendering',
    'services.image.feature6': 'Illustration and character design',
    
    'services.video.title': 'AI Video Production',
    'services.video.description': 'We produce professional videos with the most advanced AI tools like Runway, Pika Labs and ElevenLabs.',
    'services.video.feature1': 'Commercial film production',
    'services.video.feature2': 'Product promotional videos',
    'services.video.feature3': 'Social media content',
    'services.video.feature4': 'Animation and motion graphics',
    'services.video.feature5': 'AI voice-over services',
    'services.video.feature6': 'Video editing and montage',
    
    'services.automation2.title': 'Business Process Automation',
    'services.automation2.description': 'Automate your business processes with Make.com, Zapier and n8n. API integrations and custom automation solutions.',
    'services.automation2.feature1': 'CRM and sales automations',
    'services.automation2.feature2': 'Email and marketing automations',
    'services.automation2.feature3': 'Accounting and billing automations',
    'services.automation2.feature4': 'Social media management',
    'services.automation2.feature5': 'Data collection and reporting',
    'services.automation2.feature6': 'Custom API integrations',
    
    'services.chatbot.title': 'AI Voice & Video Chatbot',
    'services.chatbot.description': 'Ready for your business in 1-2 days! Smart chatbot solutions that understand voice commands, process images and support video.',
    'services.chatbot.feature1': 'Voice command and response system',
    'services.chatbot.feature2': 'Image recognition and processing',
    'services.chatbot.feature3': 'Video AI assistant services',
    'services.chatbot.feature4': 'AI that promotes your products and services',
    'services.chatbot.feature5': 'Instant response to customer queries',
    'services.chatbot.feature6': 'Fast delivery in 1-2 days',
    'services.chatbot.feature7': '24/7 customer support',
    
    'services.export.title': 'Export AI',
    'services.export.description': 'When companies provide GTIP codes, we identify importers and potential customers in target countries. We deliver ready reports with executive contact information and company details.',
    'services.export.feature1': 'GTIP-based target market analysis',
    'services.export.feature2': 'Importer identification and contact information',
    'services.export.feature3': 'Executive and decision maker details',
    'services.export.feature4': 'Product-based market size analysis',
    'services.export.feature5': 'Competitor analysis and price research',
    'services.export.feature6': 'Detailed customer lists and segmentation',
    'services.export.feature7': 'Ready business development reports',
    
    // Projects Section
    'projects.title': 'Sample Projects',
    'projects.subtitle': 'Some examples of successful projects we have completed as Third Hand AI Agency. You can explore our AI solutions for different sectors.',
    'projects.visitSite': 'Visit Site',
    'projects.cta': 'Tell Us About Your Project',
    
    // Individual Projects - English
    'project.1.title': 'fasheone.com',
    'project.1.description': 'AI-powered style advisor and personalized shopping experience platform developed for Fashion One. Smart system that learns customer preferences and offers fashion recommendations.',
    'project.2.title': 'ozgunpetshop.com',
    'project.2.description': 'Pet Shop\'s digital transformation project. AI-powered pet health tracking, automatic food recommendation and online veterinary appointment system.',
    'project.3.title': 'ozcanneotech.com',
    'project.3.description': 'Corporate website and AI-powered customer support system developed for high-tech company. Chatbot integration and smart ticket management.',
    'project.4.title': 'lonelyloversclub.com',
    'project.4.description': 'Modern friendship and dating platform that matches with AI algorithms. Smart matching system supported by personality analysis and compatibility predictions.',
    
    // Video Projects Section
    'videos.title': 'Our Video Projects',
    'videos.subtitle': 'You can watch promotional videos of our artificial intelligence and technology projects. See how our AI solutions work and integrate into your business processes.',
    'videos.noDescription': 'Video description',
    'videos.cta': 'Request Custom Video Project',
    
    // Individual Videos - English
    'video.1.title': 'Third Hand AI Agency Introduction',
    'video.1.description': 'General introduction to our AI solutions and services. Discover AI technologies that will take your business to the future.',
    'video.2.title': 'AI Chatbot Demo',
    'video.2.description': 'Live demo of our voice and video AI chatbot system. See how it can transform your customer service.',
    'video.3.title': 'Automation Solutions',
    'video.3.description': 'Detailed review of our AI solutions that automate your business processes. Increase efficiency, reduce costs.',
    
    // Work Process Section
    'process.title': 'Our Work Process',
    'process.subtitle': 'We deliver quality, timely and budget-friendly solutions with the methodology we follow while bringing your projects to life.',
    'process.step1.title': 'Discovery & Analysis',
    'process.step1.description': 'We analyze your needs in detail and examine your current processes.',
    'process.step2.title': 'Solution Design',
    'process.step2.description': 'We identify the most suitable AI solutions and technologies for your needs.',
    'process.step3.title': 'Development',
    'process.step3.description': 'We develop your solutions using the latest technologies.',
    'process.step4.title': 'Testing & Integration',
    'process.step4.description': 'We test our solutions and integrate them into your existing systems.',
    
    // About Section
    'about.title': 'About Us',
    'about.intro': 'As Third Hand AI Agency, we are a technology company that has been specializing in artificial intelligence technologies for over 5 years, offering innovative solutions.',
    'about.mission': 'Our mission is to enable companies to benefit from artificial intelligence technologies in the most efficient way and help them gain a competitive advantage.',
    'about.experience': 'Years of Experience',
    'about.features.team.title': 'Professional Team',
    'about.features.team.description': '7-person AI expert team',
    'about.features.tech.title': 'Modern Technologies',
    'about.features.tech.description': 'Latest AI technologies',
    'about.features.pricing.title': 'Affordable Pricing',
    'about.features.pricing.description': 'Solutions for every budget',
    'about.features.support.title': 'Continuous Support',
    'about.features.support.description': '24/7 technical support',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Contact us to talk about your project or get more information.',
    'contact.infoTitle': 'Contact Information',
    'contact.sendMessage': 'Send Message',
    'contact.followUs': 'Follow Us',
    'contact.success': 'Success!',
    'contact.error': 'Error!',
    'contact.errorMessage': 'Message could not be sent. Please try again.',
    'contact.warning': 'Warning!',
    'contact.fillFields': 'Please fill in all fields.',
    'contact.acceptPrivacy': 'Please accept the privacy policy.',
    'contact.info.address': 'Address',
    'contact.info.addressLine1': 'Zafer Mah. Kumrulu Sok. No: 2/18',
    'contact.info.addressLine2': 'Bahçelievler / Istanbul',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Working Hours',
    'contact.info.hoursWeekday': 'Monday - Friday: 09:00 - 18:00',
    'contact.info.hoursWeekend': 'Weekend: Closed',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'email@example.com',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Message subject',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Write your message here...',
    'contact.form.privacyText': 'I have read and accept the privacy policy regarding the processing of personal data.',
    'contact.form.send': 'Send',
    'contact.form.sending': 'Sending...',
    
    // Testimonials
    'testimonials.title': 'Customer Reviews',
    'testimonials.subtitle': 'What our customers think about our AI solutions',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Business?',
    'cta.subtitle': 'Contact us now to improve your business with artificial intelligence technologies, increase your efficiency and stay ahead of the competition.',
    'cta.button': 'Get Free Consultation',
    
    // Footer
    'footer.tagline': 'We take your business to the future with artificial intelligence technologies.',
    'footer.quickLinks': 'Quick Links',
    'footer.follow': 'Follow Us',
    'footer.rights': '© 2025 Third Hand AI Agency. All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'thirdhand.lang';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'TR';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'EN' || saved === 'TR' ? saved : 'TR';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  React.useEffect(() => {
    document.documentElement.lang = language === 'TR' ? 'tr' : 'en';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['TR']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};