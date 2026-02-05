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
 
 interface SiteContent {
   id: string;
   section_key: string;
   title: string | null;
   content: string | null;
   image_url: string | null;
   order_index: number | null;
   is_visible: boolean | null;
 }
 
 export default function AdminContent() {
   const [contents, setContents] = useState<SiteContent[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingContent, setEditingContent] = useState<SiteContent | null>(null);
   const [formData, setFormData] = useState({
     section_key: "",
     title: "",
     content: "",
     image_url: "",
     is_visible: true,
   });
   const [isSaving, setIsSaving] = useState(false);
   const { toast } = useToast();
 
   const fetchContents = async () => {
     try {
       const { data, error } = await supabase
         .from("site_content")
         .select("*")
         .order("order_index", { ascending: true });
 
       if (error) throw error;
       setContents(data || []);
     } catch (error) {
       console.error("Error fetching contents:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل المحتوى",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchContents();
   }, []);
 
   const resetForm = () => {
     setFormData({
       section_key: "",
       title: "",
       content: "",
       image_url: "",
       is_visible: true,
     });
     setEditingContent(null);
   };
 
   const handleEdit = (content: SiteContent) => {
     setEditingContent(content);
     setFormData({
       section_key: content.section_key,
       title: content.title || "",
       content: content.content || "",
       image_url: content.image_url || "",
       is_visible: content.is_visible ?? true,
     });
     setIsDialogOpen(true);
   };
 
   const handleSave = async () => {
     if (!formData.section_key.trim()) {
       toast({
         title: "خطأ",
         description: "يرجى إدخال مفتاح القسم",
         variant: "destructive",
       });
       return;
     }
 
     setIsSaving(true);
     try {
       if (editingContent) {
         const { error } = await supabase
           .from("site_content")
           .update({
             section_key: formData.section_key,
             title: formData.title,
             content: formData.content,
             image_url: formData.image_url,
             is_visible: formData.is_visible,
           })
           .eq("id", editingContent.id);
 
         if (error) throw error;
         toast({ title: "تم التحديث", description: "تم تحديث المحتوى بنجاح" });
       } else {
         const { error } = await supabase.from("site_content").insert({
           section_key: formData.section_key,
           title: formData.title,
           content: formData.content,
           image_url: formData.image_url,
           is_visible: formData.is_visible,
           order_index: contents.length,
         });
 
         if (error) throw error;
         toast({ title: "تمت الإضافة", description: "تم إضافة المحتوى بنجاح" });
       }
 
       setIsDialogOpen(false);
       resetForm();
       fetchContents();
     } catch (error) {
       console.error("Error saving content:", error);
       toast({
         title: "خطأ",
         description: "فشل في حفظ المحتوى",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm("هل أنت متأكد من حذف هذا المحتوى؟")) return;
 
     try {
       const { error } = await supabase.from("site_content").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "تم الحذف", description: "تم حذف المحتوى بنجاح" });
       fetchContents();
     } catch (error) {
       console.error("Error deleting content:", error);
       toast({
         title: "خطأ",
         description: "فشل في حذف المحتوى",
         variant: "destructive",
       });
     }
   };
 
   const toggleVisibility = async (id: string, currentValue: boolean) => {
     try {
       const { error } = await supabase
         .from("site_content")
         .update({ is_visible: !currentValue })
         .eq("id", id);
 
       if (error) throw error;
       fetchContents();
     } catch (error) {
       console.error("Error toggling visibility:", error);
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">المحتوى العام</h1>
             <p className="text-muted-foreground">إدارة نصوص وصور أقسام الموقع</p>
           </div>
           <Dialog open={isDialogOpen} onOpenChange={(open) => {
             setIsDialogOpen(open);
             if (!open) resetForm();
           }}>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="ml-2 h-4 w-4" />
                 إضافة محتوى
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-lg">
               <DialogHeader>
                 <DialogTitle>
                   {editingContent ? "تعديل المحتوى" : "إضافة محتوى جديد"}
                 </DialogTitle>
               </DialogHeader>
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="section_key">مفتاح القسم *</Label>
                   <Input
                     id="section_key"
                     value={formData.section_key}
                     onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                     placeholder="مثال: hero_title, about_description"
                     dir="ltr"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="title">العنوان</Label>
                   <Input
                     id="title"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                     placeholder="عنوان القسم"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="content">المحتوى</Label>
                   <Textarea
                     id="content"
                     value={formData.content}
                     onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                     placeholder="محتوى القسم"
                     rows={4}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="image_url">رابط الصورة</Label>
                   <Input
                     id="image_url"
                     value={formData.image_url}
                     onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                     placeholder="https://..."
                     dir="ltr"
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
             <CardTitle>قائمة المحتوى</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
             ) : contents.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 لا يوجد محتوى حالياً. أضف محتواك الأول!
               </div>
             ) : (
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>مفتاح القسم</TableHead>
                     <TableHead>العنوان</TableHead>
                     <TableHead>الحالة</TableHead>
                     <TableHead>الإجراءات</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {contents.map((content) => (
                     <TableRow key={content.id}>
                       <TableCell className="font-mono text-sm" dir="ltr">
                         {content.section_key}
                       </TableCell>
                       <TableCell className="font-medium">
                         {content.title || "-"}
                       </TableCell>
                       <TableCell>
                         <Switch
                           checked={content.is_visible ?? true}
                           onCheckedChange={() => toggleVisibility(content.id, content.is_visible ?? true)}
                         />
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-2">
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleEdit(content)}
                           >
                             <Pencil className="h-4 w-4" />
                           </Button>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleDelete(content.id)}
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