import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, Settings, MessageSquare, Cpu, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { isAdmin, isLoading } = useAuth();
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s) => { if (s.value) map[s.key] = s.value; });
        setSettings(map);
      }
    };
    fetchSettings();
  }, []);

  const phone = settings.contact_phone || "0555255837";
  const email = settings.contact_email || "info@reyada-initiative.sa";
  const whatsappUrl = settings.whatsapp_url || `https://wa.me/966${phone.replace(/^0/, "")}`;
  const chatgptUrl = settings.chatgpt_url || "";
  const trainerUrl = settings.trainer_website_url || "";

  const socialLinks = [
    { icon: Twitter, href: settings.twitter_url },
    { icon: Facebook, href: settings.facebook_url },
    { icon: Instagram, href: settings.instagram_url },
    { icon: Youtube, href: settings.youtube_url },
  ].filter((s) => s.href);

  return (
    <footer className="bg-edu-navy text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="مبادرة الريادة والإبداع" className="h-14 w-14" />
              <div>
                <h3 className="font-cairo font-bold text-xl">مبادرة الريادة</h3>
                <p className="text-sm text-white/70">للتطوير المهني والإبداع</p>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              مبادرة نوعية تهدف إلى تطوير المهارات التربوية والشخصية لدى الطلاب والمعلمين ضمن بيئة تعليمية محفزة على الإبداع والتميز
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cairo font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { name: "عن المبادرة", path: "/about" },
                { name: "البرامج والدورات", path: "/programs" },
                { name: "المبادرات النوعية", path: "/initiatives" },
                { name: "تواصل معنا", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-secondary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cairo font-bold text-lg mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Phone size={18} className="text-secondary" />
                <span dir="ltr">{phone}</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <Mail size={18} className="text-secondary" />
                <span>{email}</span>
              </li>
              <li className="flex items-center gap-3 text-white/80 text-sm">
                <MapPin size={18} className="text-secondary" />
                <span>المملكة العربية السعودية</span>
              </li>
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm">
                    <MessageSquare size={18} className="text-secondary" />
                    <span>واتساب</span>
                  </a>
                </li>
              )}
              {chatgptUrl && (
                <li>
                  <a href={chatgptUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm">
                    <Cpu size={18} className="text-secondary" />
                    <span>تواصل معي ChatGPT</span>
                  </a>
                </li>
              )}
              {trainerUrl && (
                <li>
                  <a href={trainerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-secondary transition-colors text-sm">
                    <Globe size={18} className="text-secondary" />
                    <span>موقع المدرب</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-cairo font-bold text-lg mb-6">تابعنا</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-edu-navy transition-all duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} مبادرة الريادة والإبداع. جميع الحقوق محفوظة
          </p>
          
          <Link 
            to={!isLoading && isAdmin ? "/admin" : "/admin/login"}
            className="inline-flex items-center justify-center mt-4 p-2 rounded-full hover:bg-white/10 transition-all"
            title="لوحة الإدارة"
          >
            <Settings className="h-4 w-4 text-white/30 hover:text-white/70 transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
