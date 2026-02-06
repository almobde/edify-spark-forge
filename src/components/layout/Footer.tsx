 import { Link } from "react-router-dom";
 import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram, Settings } from "lucide-react";
 import { useAuth } from "@/contexts/AuthContext";
 import logo from "@/assets/logo.png";
 
 const Footer = () => {
   const { isAdmin, isLoading } = useAuth();
 
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
                 <span dir="ltr">0555255837</span>
               </li>
               <li className="flex items-center gap-3 text-white/80 text-sm">
                 <Mail size={18} className="text-secondary" />
                 <span>info@reyada-initiative.sa</span>
               </li>
               <li className="flex items-center gap-3 text-white/80 text-sm">
                 <MapPin size={18} className="text-secondary" />
                 <span>المملكة العربية السعودية</span>
               </li>
             </ul>
           </div>
 
           {/* Social Links */}
           <div>
             <h4 className="font-cairo font-bold text-lg mb-6">تابعنا</h4>
             <div className="flex gap-4">
               {[
                 { icon: Twitter, href: "#" },
                 { icon: Facebook, href: "#" },
                 { icon: Instagram, href: "#" },
                 { icon: Youtube, href: "#" },
               ].map((social, index) => (
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
           
          {/* Hidden Admin Icon - visible to admins only */}
            {!isLoading && isAdmin && (
              <Link 
                to="/admin" 
                className="inline-flex items-center justify-center mt-3 p-1.5 rounded opacity-20 hover:opacity-80 transition-opacity"
                title="لوحة الإدارة"
              >
                <Settings className="h-4 w-4 text-white/40" />
              </Link>
            )}
            {/* Fallback: always show a tiny dot for admin login access */}
            {!isLoading && !isAdmin && (
              <Link
                to="/admin/login"
                className="inline-block mt-3 w-2 h-2 rounded-full opacity-10 hover:opacity-50 transition-opacity"
                title="دخول"
              />
            )}
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;