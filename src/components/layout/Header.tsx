 import { useState } from "react";
 import { Link, useLocation } from "react-router-dom";
 import { Menu, X } from "lucide-react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Button } from "@/components/ui/button";
 import logo from "@/assets/logo.png";
 
 const navLinks = [
   { name: "الرئيسية", path: "/" },
   { name: "عن المبادرة", path: "/about" },
   { name: "المهام الإدارية", path: "/tasks" },
   { name: "البرامج والدورات", path: "/programs" },
   { name: "المبادرات النوعية", path: "/initiatives" },
   { name: "الإعلام الرقمي", path: "/media" },
   { name: "النتائج", path: "/results" },
   { name: "تواصل معنا", path: "/contact" },
 ];
 
 const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const location = useLocation();
 
   return (
     <header className="fixed top-0 right-0 left-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
       <div className="container-custom">
         <div className="flex items-center justify-between h-20 px-4 md:px-8">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-3">
             <img src={logo} alt="مبادرة الريادة والإبداع" className="h-12 w-12" />
             <div className="hidden sm:block">
               <h1 className="font-cairo font-bold text-lg text-foreground leading-tight">مبادرة الريادة</h1>
               <p className="text-xs text-muted-foreground">للتطوير المهني والإبداع</p>
             </div>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => (
               <Link
                 key={link.path}
                 to={link.path}
                 className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                   location.pathname === link.path
                     ? "bg-primary text-primary-foreground"
                     : "text-foreground/80 hover:bg-muted hover:text-primary"
                 }`}
               >
                 {link.name}
               </Link>
             ))}
           </nav>
 
           {/* Mobile Menu Button */}
           <Button
             variant="ghost"
             size="icon"
             className="lg:hidden"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </Button>
         </div>
       </div>
 
       {/* Mobile Navigation */}
       <AnimatePresence>
         {isMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             className="lg:hidden bg-card border-t border-border/50"
           >
             <nav className="container-custom py-4 px-4">
               <div className="flex flex-col gap-2">
                 {navLinks.map((link) => (
                   <Link
                     key={link.path}
                     to={link.path}
                     onClick={() => setIsMenuOpen(false)}
                     className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                       location.pathname === link.path
                         ? "bg-primary text-primary-foreground"
                         : "text-foreground/80 hover:bg-muted"
                     }`}
                   >
                     {link.name}
                   </Link>
                 ))}
               </div>
             </nav>
           </motion.div>
         )}
       </AnimatePresence>
     </header>
   );
 };
 
 export default Header;