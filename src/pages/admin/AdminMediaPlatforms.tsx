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
import ImageUpload from "@/components/admin/ImageUpload";
 
interface MediaPlatform {
    id: string;
    title: string;
    description: string | null;
    features: string[] | null;
    link: string | null;
    icon: string | null;
    image_url: string | null;
    is_visible: boolean | null;
    order_index: number | null;
  }
 
 export default function AdminMediaPlatforms() {
   const [platforms, setPlatforms] = useState<MediaPlatform[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingPlatform, setEditingPlatform] = useState<MediaPlatform | null>(null);
   const [formData, setFormData] = useState({
     title: "",
     description: "",
     features: "",
     link: "",
      icon: "Globe",
      image_url: "",
      is_visible: true,
    });
    const [isSaving, setIsSaving] = useState(false);
   const { toast } = useToast();
 
   const fetchPlatforms = async () => {
     try {
       const { data, error } = await supabase
         .from("media_platforms")
         .select("*")
         .order("order_index", { ascending: true });
 
       if (error) throw error;
       setPlatforms(data || []);
     } catch (error) {
       console.error("Error fetching platforms:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل المنصات",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchPlatforms();
   }, []);
 
   const resetForm = () => {
     setFormData({
       title: "",
       description: "",
       features: "",
       link: "",
        icon: "Globe",
        image_url: "",
        is_visible: true,
      });
      setEditingPlatform(null);
   };
 
   const handleEdit = (platform: MediaPlatform) => {
     setEditingPlatform(platform);
     setFormData({
       title: platform.title,
       description: platform.description || "",
       features: platform.features?.join("\n") || "",
       link: platform.link || "",
        icon: platform.icon || "Globe",
        image_url: platform.image_url || "",
        is_visible: platform.is_visible ?? true,
     });
     setIsDialogOpen(true);
   };
 
   const handleSave = async () => {
     if (!formData.title.trim()) {
       toast({
         title: "خطأ",
         description: "يرجى إدخال عنوان المنصة",
         variant: "destructive",
       });
       return;
     }
 
     setIsSaving(true);
     const featuresArray = formData.features
       .split("\n")
       .map((f) => f.trim())
       .filter((f) => f);
 
     try {
       if (editingPlatform) {
         const { error } = await supabase
           .from("media_platforms")
           .update({
             title: formData.title,
             description: formData.description,
             features: featuresArray,
             link: formData.link,
              icon: formData.icon,
              image_url: formData.image_url || null,
              is_visible: formData.is_visible,
            })
            .eq("id", editingPlatform.id);
 
         if (error) throw error;
         toast({ title: "تم التحديث", description: "تم تحديث المنصة بنجاح" });
       } else {
         const { error } = await supabase.from("media_platforms").insert({
           title: formData.title,
           description: formData.description,
           features: featuresArray,
           link: formData.link,
            icon: formData.icon,
            image_url: formData.image_url || null,
            is_visible: formData.is_visible,
            order_index: platforms.length,
         });
 
         if (error) throw error;
         toast({ title: "تمت الإضافة", description: "تم إضافة المنصة بنجاح" });
       }
 
       setIsDialogOpen(false);
       resetForm();
       fetchPlatforms();
     } catch (error) {
       console.error("Error saving platform:", error);
       toast({
         title: "خطأ",
         description: "فشل في حفظ المنصة",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm("هل أنت متأكد من حذف هذه المنصة؟")) return;
 
     try {
       const { error } = await supabase.from("media_platforms").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "تم الحذف", description: "تم حذف المنصة بنجاح" });
       fetchPlatforms();
     } catch (error) {
       console.error("Error deleting platform:", error);
       toast({
         title: "خطأ",
         description: "فشل في حذف المنصة",
         variant: "destructive",
       });
     }
   };
 
   const toggleVisibility = async (id: string, currentValue: boolean) => {
     try {
       const { error } = await supabase
         .from("media_platforms")
         .update({ is_visible: !currentValue })
         .eq("id", id);
 
       if (error) throw error;
       fetchPlatforms();
     } catch (error) {
       console.error("Error toggling visibility:", error);
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">المنصات الرقمية</h1>
             <p className="text-muted-foreground">إدارة المنصات والقنوات الرقمية</p>
           </div>
           <Dialog open={isDialogOpen} onOpenChange={(open) => {
             setIsDialogOpen(open);
             if (!open) resetForm();
           }}>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="ml-2 h-4 w-4" />
                 إضافة منصة
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-md">
               <DialogHeader>
                 <DialogTitle>
                   {editingPlatform ? "تعديل المنصة" : "إضافة منصة جديدة"}
                 </DialogTitle>
               </DialogHeader>
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="title">عنوان المنصة *</Label>
                   <Input
                     id="title"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                     placeholder="أدخل عنوان المنصة"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="description">الوصف</Label>
                   <Textarea
                     id="description"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     placeholder="وصف المنصة"
                     rows={3}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="features">المميزات (كل ميزة في سطر)</Label>
                   <Textarea
                     id="features"
                     value={formData.features}
                     onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                     placeholder="الميزة الأولى&#10;الميزة الثانية"
                     rows={3}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="link">الرابط</Label>
                   <Input
                     id="link"
                     value={formData.link}
                     onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
             <CardTitle>قائمة المنصات</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
             ) : platforms.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 لا توجد منصات حالياً. أضف منصتك الأولى!
               </div>
             ) : (
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>العنوان</TableHead>
                     <TableHead>الرابط</TableHead>
                     <TableHead>الحالة</TableHead>
                     <TableHead>الإجراءات</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {platforms.map((platform) => (
                     <TableRow key={platform.id}>
                       <TableCell className="font-medium">{platform.title}</TableCell>
                       <TableCell dir="ltr" className="text-left">
                         {platform.link ? (
                           <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                             {platform.link.slice(0, 30)}...
                           </a>
                         ) : "-"}
                       </TableCell>
                       <TableCell>
                         <Switch
                           checked={platform.is_visible ?? true}
                           onCheckedChange={() => toggleVisibility(platform.id, platform.is_visible ?? true)}
                         />
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-2">
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleEdit(platform)}
                           >
                             <Pencil className="h-4 w-4" />
                           </Button>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleDelete(platform.id)}
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