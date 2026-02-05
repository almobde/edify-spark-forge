 import { useEffect, useState } from "react";
 import AdminLayout from "@/components/admin/AdminLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { supabase } from "@/integrations/supabase/client";
 import {
   BookOpen,
   Lightbulb,
   MonitorPlay,
   BarChart3,
   Image,
   FileText,
 } from "lucide-react";
 
 interface Stats {
   programs: number;
   initiatives: number;
   platforms: number;
   stats: number;
 }
 
 export default function AdminDashboard() {
   const [stats, setStats] = useState<Stats>({
     programs: 0,
     initiatives: 0,
     platforms: 0,
     stats: 0,
   });
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const fetchStats = async () => {
       try {
         const [programsRes, initiativesRes, platformsRes, statsRes] = await Promise.all([
           supabase.from("programs").select("id", { count: "exact", head: true }),
           supabase.from("initiatives").select("id", { count: "exact", head: true }),
           supabase.from("media_platforms").select("id", { count: "exact", head: true }),
           supabase.from("site_stats").select("id", { count: "exact", head: true }),
         ]);
 
         setStats({
           programs: programsRes.count || 0,
           initiatives: initiativesRes.count || 0,
           platforms: platformsRes.count || 0,
           stats: statsRes.count || 0,
         });
       } catch (error) {
         console.error("Error fetching stats:", error);
       } finally {
         setIsLoading(false);
       }
     };
 
     fetchStats();
   }, []);
 
   const statCards = [
     { label: "البرامج والدورات", value: stats.programs, icon: BookOpen, color: "bg-blue-500" },
     { label: "المبادرات النوعية", value: stats.initiatives, icon: Lightbulb, color: "bg-amber-500" },
     { label: "المنصات الرقمية", value: stats.platforms, icon: MonitorPlay, color: "bg-purple-500" },
     { label: "الإحصائيات", value: stats.stats, icon: BarChart3, color: "bg-green-500" },
   ];
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div>
           <h1 className="text-2xl font-cairo font-bold">لوحة التحكم</h1>
           <p className="text-muted-foreground">مرحباً بك في لوحة إدارة الموقع</p>
         </div>
 
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {statCards.map((stat, index) => (
             <Card key={index}>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium text-muted-foreground">
                   {stat.label}
                 </CardTitle>
                 <div className={`p-2 rounded-lg ${stat.color}`}>
                   <stat.icon className="h-4 w-4 text-white" />
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="text-3xl font-bold">
                   {isLoading ? "..." : stat.value}
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
 
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <FileText className="h-5 w-5" />
                 الإجراءات السريعة
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
               <p className="text-muted-foreground text-sm">
                 استخدم القائمة الجانبية للوصول إلى أقسام الإدارة المختلفة:
               </p>
               <ul className="space-y-2 text-sm">
                 <li className="flex items-center gap-2">
                   <BookOpen className="h-4 w-4 text-primary" />
                   إضافة وتعديل البرامج والدورات التدريبية
                 </li>
                 <li className="flex items-center gap-2">
                   <Lightbulb className="h-4 w-4 text-primary" />
                   إدارة المبادرات النوعية التسعة
                 </li>
                 <li className="flex items-center gap-2">
                   <Image className="h-4 w-4 text-primary" />
                   رفع وإدارة الصور والملفات
                 </li>
                 <li className="flex items-center gap-2">
                   <BarChart3 className="h-4 w-4 text-primary" />
                   تحديث الإحصائيات والأرقام
                 </li>
               </ul>
             </CardContent>
           </Card>
 
           <Card>
             <CardHeader>
               <CardTitle>نصائح</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3 text-sm text-muted-foreground">
               <p>• يمكنك إخفاء أي عنصر من الموقع دون حذفه</p>
               <p>• جميع التغييرات تظهر مباشرة على الموقع</p>
               <p>• استخدم مكتبة الصور لرفع صور جديدة</p>
               <p>• يمكنك تغيير ترتيب العناصر بسهولة</p>
             </CardContent>
           </Card>
         </div>
       </div>
     </AdminLayout>
   );
 }