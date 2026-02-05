 import { useState, ReactNode } from "react";
 import AdminSidebar from "./AdminSidebar";
 import AdminHeader from "./AdminHeader";
 
 interface AdminLayoutProps {
   children: ReactNode;
 }
 
 export default function AdminLayout({ children }: AdminLayoutProps) {
   const [sidebarOpen, setSidebarOpen] = useState(false);
 
   return (
     <div className="min-h-screen bg-muted/30" dir="rtl">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
       
       <div className="lg:mr-64">
         <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
         <main className="p-4 lg:p-6">
           {children}
         </main>
       </div>
     </div>
   );
 }