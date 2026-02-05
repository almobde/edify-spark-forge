 import { useEffect, useState } from "react";
 import AdminLayout from "@/components/admin/AdminLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Switch } from "@/components/ui/switch";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
 
 interface SiteStat {
   id: string;
   label: string;
   value: string;
   icon: string | null;
   order_index: number | null;
   is_visible: boolean | null;
 }
 
 export default function AdminStats() {
   const [stats, setStats] = useState<SiteStat[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingStat, setEditingStat] = useState<SiteStat | null>(null);
   const [formData, setFormData] = useState({
     label: "",
     value: "",
     icon: "TrendingUp",
     is_visible: true,
   });
   const [isSaving, setIsSaving] = useState(false);
   const { toast } = useToast();
 
   const fetchStats = async () => {
     try {
       const { data, error } = await supabase
         .from("site_stats")
         .select("*")
         .order("order_index", { ascending: true });
 
       if (error) throw error;
       setStats(data || []);
     } catch (error) {
       console.error("Error fetching stats:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل الإحصائيات",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchStats();
   }, []);
 
   const resetForm = () => {
     setFormData({
       label: "",
       value: "",
       icon: "TrendingUp",
       is_visible: true,
     });
     setEditingStat(null);
   };
 
   const handleEdit = (stat: SiteStat) => {
     setEditingStat(stat);
     setFormData({
       label: stat.label,
       value: stat.value,
       icon: stat.icon || "TrendingUp",
       is_visible: stat.is_visible ?? true,
     });
     setIsDialogOpen(true);
   };
 
   const handleSave = async () => {
     if (!formData.label.trim() || !formData.value.trim()) {
       toast({
         title: "خطأ",
         description: "يرجى إدخال العنوان والقيمة",
         variant: "destructive",
       });
       return;
     }
 
     setIsSaving(true);
     try {
       if (editingStat) {
         const { error } = await supabase
           .from("site_stats")
           .update({
             label: formData.label,
             value: formData.value,
             icon: formData.icon,
             is_visible: formData.is_visible,
           })
           .eq("id", editingStat.id);
 
         if (error) throw error;
         toast({ title: "تم التحديث", description: "تم تحديث الإحصائية بنجاح" });
       } else {
         const { error } = await supabase.from("site_stats").insert({
           label: formData.label,
           value: formData.value,
           icon: formData.icon,
           is_visible: formData.is_visible,
           order_index: stats.length,
         });
 
         if (error) throw error;
         toast({ title: "تمت الإضافة", description: "تم إضافة الإحصائية بنجاح" });
       }
 
       setIsDialogOpen(false);
       resetForm();
       fetchStats();
     } catch (error) {
       console.error("Error saving stat:", error);
       toast({
         title: "خطأ",
         description: "فشل في حفظ الإحصائية",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm("هل أنت متأكد من حذف هذه الإحصائية؟")) return;
 
     try {
       const { error } = await supabase.from("site_stats").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "تم الحذف", description: "تم حذف الإحصائية بنجاح" });
       fetchStats();
     } catch (error) {
       console.error("Error deleting stat:", error);
       toast({
         title: "خطأ",
         description: "فشل في حذف الإحصائية",
         variant: "destructive",
       });
     }
   };
 
   const toggleVisibility = async (id: string, currentValue: boolean) => {
     try {
       const { error } = await supabase
         .from("site_stats")
         .update({ is_visible: !currentValue })
         .eq("id", id);
 
       if (error) throw error;
       fetchStats();
     } catch (error) {
       console.error("Error toggling visibility:", error);
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">الإحصائيات</h1>
             <p className="text-muted-foreground">إدارة الأرقام والإحصائيات المعروضة</p>
           </div>
           <Dialog open={isDialogOpen} onOpenChange={(open) => {
             setIsDialogOpen(open);
             if (!open) resetForm();
           }}>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="ml-2 h-4 w-4" />
                 إضافة إحصائية
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-md">
               <DialogHeader>
                 <DialogTitle>
                   {editingStat ? "تعديل الإحصائية" : "إضافة إحصائية جديدة"}
                 </DialogTitle>
               </DialogHeader>
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="label">العنوان *</Label>
                   <Input
                     id="label"
                     value={formData.label}
                     onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                     placeholder="مثال: عدد المستفيدين"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="value">القيمة *</Label>
                   <Input
                     id="value"
                     value={formData.value}
                     onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                     placeholder="مثال: +5000"
                   />
                 </div>
                 <div className="flex items-center justify-between">
                   <Label htmlFor="visible">مرئي على الموقع</Label>
                   <Switch
                     id="visible"
                     checked={formData.is_visible}
                     onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                   />
                 </div>
                 <Button onClick={handleSave} className="w-full" disabled={isSaving}>
                   {isSaving ? (
                     <>
                       <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                       جاري الحفظ...
                     </>
                   ) : (
                     "حفظ"
                   )}
                 </Button>
               </div>
             </DialogContent>
           </Dialog>
         </div>
 
         <Card>
           <CardHeader>
             <CardTitle>قائمة الإحصائيات</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
             ) : stats.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 لا توجد إحصائيات حالياً. أضف إحصائيتك الأولى!
               </div>
             ) : (
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>العنوان</TableHead>
                     <TableHead>القيمة</TableHead>
                     <TableHead>الحالة</TableHead>
                     <TableHead>الإجراءات</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {stats.map((stat) => (
                     <TableRow key={stat.id}>
                       <TableCell className="font-medium">{stat.label}</TableCell>
                       <TableCell>{stat.value}</TableCell>
                       <TableCell>
                         <Switch
                           checked={stat.is_visible ?? true}
                           onCheckedChange={() => toggleVisibility(stat.id, stat.is_visible ?? true)}
                         />
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-2">
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleEdit(stat)}
                           >
                             <Pencil className="h-4 w-4" />
                           </Button>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleDelete(stat.id)}
                             className="text-destructive hover:text-destructive"
                           >
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </div>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             )}
           </CardContent>
         </Card>
       </div>
     </AdminLayout>
   );
 }