 import { useEffect, useState } from "react";
 import AdminLayout from "@/components/admin/AdminLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
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
 
 interface Program {
   id: string;
   title: string;
   description: string | null;
   duration: string | null;
   category: string | null;
   icon: string | null;
   image_url: string | null;
   is_visible: boolean | null;
   order_index: number | null;
 }
 
 export default function AdminPrograms() {
   const [programs, setPrograms] = useState<Program[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingProgram, setEditingProgram] = useState<Program | null>(null);
   const [formData, setFormData] = useState({
     title: "",
     description: "",
     duration: "",
     category: "",
     icon: "BookOpen",
     is_visible: true,
   });
   const [isSaving, setIsSaving] = useState(false);
   const { toast } = useToast();
 
   const fetchPrograms = async () => {
     try {
       const { data, error } = await supabase
         .from("programs")
         .select("*")
         .order("order_index", { ascending: true });
 
       if (error) throw error;
       setPrograms(data || []);
     } catch (error) {
       console.error("Error fetching programs:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل البرامج",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchPrograms();
   }, []);
 
   const resetForm = () => {
     setFormData({
       title: "",
       description: "",
       duration: "",
       category: "",
       icon: "BookOpen",
       is_visible: true,
     });
     setEditingProgram(null);
   };
 
   const handleEdit = (program: Program) => {
     setEditingProgram(program);
     setFormData({
       title: program.title,
       description: program.description || "",
       duration: program.duration || "",
       category: program.category || "",
       icon: program.icon || "BookOpen",
       is_visible: program.is_visible ?? true,
     });
     setIsDialogOpen(true);
   };
 
   const handleSave = async () => {
     if (!formData.title.trim()) {
       toast({
         title: "خطأ",
         description: "يرجى إدخال عنوان البرنامج",
         variant: "destructive",
       });
       return;
     }
 
     setIsSaving(true);
     try {
       if (editingProgram) {
         const { error } = await supabase
           .from("programs")
           .update({
             title: formData.title,
             description: formData.description,
             duration: formData.duration,
             category: formData.category,
             icon: formData.icon,
             is_visible: formData.is_visible,
           })
           .eq("id", editingProgram.id);
 
         if (error) throw error;
         toast({ title: "تم التحديث", description: "تم تحديث البرنامج بنجاح" });
       } else {
         const { error } = await supabase.from("programs").insert({
           title: formData.title,
           description: formData.description,
           duration: formData.duration,
           category: formData.category,
           icon: formData.icon,
           is_visible: formData.is_visible,
           order_index: programs.length,
         });
 
         if (error) throw error;
         toast({ title: "تمت الإضافة", description: "تم إضافة البرنامج بنجاح" });
       }
 
       setIsDialogOpen(false);
       resetForm();
       fetchPrograms();
     } catch (error) {
       console.error("Error saving program:", error);
       toast({
         title: "خطأ",
         description: "فشل في حفظ البرنامج",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm("هل أنت متأكد من حذف هذا البرنامج؟")) return;
 
     try {
       const { error } = await supabase.from("programs").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "تم الحذف", description: "تم حذف البرنامج بنجاح" });
       fetchPrograms();
     } catch (error) {
       console.error("Error deleting program:", error);
       toast({
         title: "خطأ",
         description: "فشل في حذف البرنامج",
         variant: "destructive",
       });
     }
   };
 
   const toggleVisibility = async (id: string, currentValue: boolean) => {
     try {
       const { error } = await supabase
         .from("programs")
         .update({ is_visible: !currentValue })
         .eq("id", id);
 
       if (error) throw error;
       fetchPrograms();
     } catch (error) {
       console.error("Error toggling visibility:", error);
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">البرامج والدورات</h1>
             <p className="text-muted-foreground">إدارة البرامج التدريبية والدورات</p>
           </div>
           <Dialog open={isDialogOpen} onOpenChange={(open) => {
             setIsDialogOpen(open);
             if (!open) resetForm();
           }}>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="ml-2 h-4 w-4" />
                 إضافة برنامج
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-md">
               <DialogHeader>
                 <DialogTitle>
                   {editingProgram ? "تعديل البرنامج" : "إضافة برنامج جديد"}
                 </DialogTitle>
               </DialogHeader>
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="title">عنوان البرنامج *</Label>
                   <Input
                     id="title"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                     placeholder="أدخل عنوان البرنامج"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="description">الوصف</Label>
                   <Textarea
                     id="description"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     placeholder="وصف البرنامج"
                     rows={3}
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="duration">المدة</Label>
                     <Input
                       id="duration"
                       value={formData.duration}
                       onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                       placeholder="مثال: 3 أيام"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="category">التصنيف</Label>
                     <Input
                       id="category"
                       value={formData.category}
                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                       placeholder="مثال: تطوير مهني"
                     />
                   </div>
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
             <CardTitle>قائمة البرامج</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
             ) : programs.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 لا توجد برامج حالياً. أضف برنامجك الأول!
               </div>
             ) : (
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>العنوان</TableHead>
                     <TableHead>التصنيف</TableHead>
                     <TableHead>المدة</TableHead>
                     <TableHead>الحالة</TableHead>
                     <TableHead>الإجراءات</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {programs.map((program) => (
                     <TableRow key={program.id}>
                       <TableCell className="font-medium">{program.title}</TableCell>
                       <TableCell>{program.category || "-"}</TableCell>
                       <TableCell>{program.duration || "-"}</TableCell>
                       <TableCell>
                         <Switch
                           checked={program.is_visible ?? true}
                           onCheckedChange={() => toggleVisibility(program.id, program.is_visible ?? true)}
                         />
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-2">
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleEdit(program)}
                           >
                             <Pencil className="h-4 w-4" />
                           </Button>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleDelete(program.id)}
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