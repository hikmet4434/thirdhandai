import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppSettings {
  phoneNumber: string;
  welcomeMessage: string;
  enabled: boolean;
}

// Site teması ile uyumlu zümrüt gradyanı
const EMERALD = "linear-gradient(135deg,#10b981,#059669)";
const FONT = "'Plus Jakarta Sans',sans-serif";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function WhatsAppWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<WhatsAppSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/whatsapp-settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("WhatsApp ayarları yüklenemedi:", error);
      }
    };
    fetchSettings();
  }, []);

  if (!settings?.enabled || !settings?.phoneNumber) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      settings.welcomeMessage ||
        (language === "TR" ? "Merhaba, yardımcı olabilir misiniz?" : "Hello, can you help me?"),
    );
    const phoneNumber = settings.phoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="WhatsApp"
          className="text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110 relative"
          style={{ background: EMERALD, boxShadow: "0 10px 28px rgba(16,185,129,.45)" }}
        >
          <WhatsAppIcon className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
          </span>
        </button>
      </div>

      {/* Popup */}
      {isOpen && (
        <div
          className="fixed bottom-28 right-6 z-50 w-[22rem] max-w-[calc(100vw-3rem)] rounded-3xl overflow-hidden animate-fadeIn"
          style={{
            background: "rgba(255,255,255,.92)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,.7)",
            boxShadow: "0 20px 60px rgba(16,185,129,.28)",
          }}
        >
          {/* Header */}
          <div className="text-white p-5 flex items-center justify-between" style={{ background: EMERALD }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full grid place-items-center bg-white/20 backdrop-blur-sm">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div className="leading-tight">
                <div className="font-extrabold text-base">Third Hand AI</div>
                <div className="text-[12px] text-white/90 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-200" />
                  {language === "TR" ? "Çevrimiçi • genelde hemen yanıtlar" : "Online • usually replies instantly"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={language === "TR" ? "Kapat" : "Close"}
              className="hover:bg-white/15 rounded-lg p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6" style={{ color: "#1a1f2e" }}>
            <div
              className="text-[15px] leading-relaxed mb-5 px-4 py-3 rounded-2xl rounded-tl-sm"
              style={{ background: "rgba(16,185,129,.08)", color: "#1a1f2e" }}
            >
              {settings.welcomeMessage ||
                (language === "TR"
                  ? "Merhaba! Size nasıl yardımcı olabiliriz?"
                  : "Hello! How can we help you?")}
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full text-white py-3 rounded-full text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: EMERALD, boxShadow: "0 8px 24px rgba(16,185,129,.4)" }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              {language === "TR" ? "WhatsApp'ta Sohbet Et" : "Chat on WhatsApp"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
