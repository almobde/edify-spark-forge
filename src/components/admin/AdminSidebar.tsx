 import { Link, useLocation } from "react-router-dom";
 import { cn } from "@/lib/utils";
 import {
   LayoutDashboard,
   BookOpen,
   Lightbulb,
   MonitorPlay,
   FileText,
   BarChart3,
   Settings,
   Image,
   LogOut,
   X,
 } from "lucide-react";
 import { useAuth } from "@/contexts/AuthContext";
 import { Button } from "@/components/ui/button";
 import logo from "@/assets/logo.png";
 
 const menuItems = [
   { path: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
   { path: "/admin/programs", label: "البرامج والدورات", icon: BookOpen },
   { path: "/admin/initiatives", label: "المبادرات النوعية", icon: Lightbulb },
   { path: "/admin/media", label: "المنصات الرقمية", icon: MonitorPlay },
   { path: "/admin/content", label: "المحتوى العام", icon: FileText },
   { path: "/admin/stats", label: "الإحصائيات", icon: BarChart3 },
   { path: "/admin/media-library", label: "مكتبة الصور", icon: Image },
   { path: "/admin/settings", label: "الإعدادات", icon: Settings },
 ];
 
 interface AdminSidebarProps {
   isOpen: boolean;
   onClose: () => void;
 }
 
 export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
   const location = useLocation();
   const { signOut } = useAuth();
 
   const handleSignOut = async () => {
     await signOut();
   };
 
   return (
     <>
       {/* Mobile overlay */}
       {isOpen && (
         <div
           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
           onClick={onClose}
         />
       )}
 
       {/* Sidebar */}
       <aside
         className={cn(
           "fixed top-0 right-0 h-full w-64 bg-card border-l shadow-lg z-50 transition-transform duration-300 lg:translate-x-0",
           isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
         )}
       >
         <div className="flex flex-col h-full">
           {/* Header */}
           <div className="flex items-center justify-between p-4 border-b">
             <Link to="/admin" className="flex items-center gap-3">
               <img src={logo} alt="Logo" className="w-10 h-10" />
               <span className="font-cairo font-bold text-lg">لوحة الإدارة</span>
             </Link>
             <Button
               variant="ghost"
               size="icon"
               className="lg:hidden"
               onClick={onClose}
             >
               <X className="h-5 w-5" />
             </Button>
           </div>
 
           {/* Navigation */}
           <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
             {menuItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
                 <Link
                   key={item.path}
                   to={item.path}
                   onClick={onClose}
                   className={cn(
                     "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                     isActive
                       ? "bg-primary text-primary-foreground"
                       : "hover:bg-muted"
                   )}
                 >
                   <item.icon className="h-5 w-5" />
                   <span className="font-medium">{item.label}</span>
                 </Link>
               );
             })}
           </nav>
 
           {/* Footer */}
           <div className="p-4 border-t space-y-2">
             <Link
               to="/"
               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
             >
               <span className="text-sm">العودة للموقع</span>
             </Link>
             <button
               onClick={handleSignOut}
               className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 transition-colors text-destructive w-full"
             >
               <LogOut className="h-5 w-5" />
               <span className="font-medium">تسجيل الخروج</span>
             </button>
           </div>
         </div>
       </aside>
     </>
   );
 }