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
 
 interface Initiative {
   id: string;
   title: string;
   short_description: string | null;
   full_description: string | null;
   objectives: string[] | null;
   impact: string | null;
   target_audience: string | null;
   image_url: string | null;
   icon: string | null;
   is_visible: boolean | null;
   order_index: number | null;
 }
 
 export default function AdminInitiatives() {
   const [initiatives, setInitiatives] = useState<Initiative[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingInitiative, setEditingInitiative] = useState<Initiative | null>(null);
   const [formData, setFormData] = useState({
     title: "",
     short_description: "",
     full_description: "",
     objectives: "",
     impact: "",
     target_audience: "",
      icon: "Lightbulb",
      image_url: "",
      is_visible: true,
    });
    const [isSaving, setIsSaving] = useState(false);
   const { toast } = useToast();
 
   const fetchInitiatives = async () => {
     try {
       const { data, error } = await supabase
         .from("initiatives")
         .select("*")
         .order("order_index", { ascending: true });
 
       if (error) throw error;
       setInitiatives(data || []);
     } catch (error) {
       console.error("Error fetching initiatives:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل المبادرات",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchInitiatives();
   }, []);
 
   const resetForm = () => {
     setFormData({
       title: "",
       short_description: "",
       full_description: "",
       objectives: "",
       impact: "",
       target_audience: "",
        icon: "Lightbulb",
        image_url: "",
        is_visible: true,
      });
      setEditingInitiative(null);
   };
 
   const handleEdit = (initiative: Initiative) => {
     setEditingInitiative(initiative);
     setFormData({
       title: initiative.title,
       short_description: initiative.short_description || "",
       full_description: initiative.full_description || "",
       objectives: initiative.objectives?.join("\n") || "",
       impact: initiative.impact || "",
       target_audience: initiative.target_audience || "",
        icon: initiative.icon || "Lightbulb",
        image_url: initiative.image_url || "",
        is_visible: initiative.is_visible ?? true,
     });
     setIsDialogOpen(true);
   };
 
   const handleSave = async () => {
     if (!formData.title.trim()) {
       toast({
         title: "خطأ",
         description: "يرجى إدخال عنوان المبادرة",
         variant: "destructive",
       });
       return;
     }
 
     setIsSaving(true);
     const objectivesArray = formData.objectives
       .split("\n")
       .map((o) => o.trim())
       .filter((o) => o);
 
     try {
       if (editingInitiative) {
         const { error } = await supabase
           .from("initiatives")
           .update({
             title: formData.title,
             short_description: formData.short_description,
             full_description: formData.full_description,
             objectives: objectivesArray,
             impact: formData.impact,
             target_audience: formData.target_audience,
              icon: formData.icon,
              image_url: formData.image_url || null,
              is_visible: formData.is_visible,
            })
            .eq("id", editingInitiative.id);
 
         if (error) throw error;
         toast({ title: "تم التحديث", description: "تم تحديث المبادرة بنجاح" });
       } else {
         const { error } = await supabase.from("initiatives").insert({
           title: formData.title,
           short_description: formData.short_description,
           full_description: formData.full_description,
           objectives: objectivesArray,
           impact: formData.impact,
           target_audience: formData.target_audience,
            icon: formData.icon,
            image_url: formData.image_url || null,
            is_visible: formData.is_visible,
            order_index: initiatives.length,
         });
 
         if (error) throw error;
         toast({ title: "تمت الإضافة", description: "تم إضافة المبادرة بنجاح" });
       }
 
       setIsDialogOpen(false);
       resetForm();
       fetchInitiatives();
     } catch (error) {
       console.error("Error saving initiative:", error);
       toast({
         title: "خطأ",
         description: "فشل في حفظ المبادرة",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm("هل أنت متأكد من حذف هذه المبادرة؟")) return;
 
     try {
       const { error } = await supabase.from("initiatives").delete().eq("id", id);
       if (error) throw error;
       toast({ title: "تم الحذف", description: "تم حذف المبادرة بنجاح" });
       fetchInitiatives();
     } catch (error) {
       console.error("Error deleting initiative:", error);
       toast({
         title: "خطأ",
         description: "فشل في حذف المبادرة",
         variant: "destructive",
       });
     }
   };
 
   const toggleVisibility = async (id: string, currentValue: boolean) => {
     try {
       const { error } = await supabase
         .from("initiatives")
         .update({ is_visible: !currentValue })
         .eq("id", id);
 
       if (error) throw error;
       fetchInitiatives();
     } catch (error) {
       console.error("Error toggling visibility:", error);
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">المبادرات النوعية</h1>
             <p className="text-muted-foreground">إدارة المبادرات النوعية التسعة</p>
           </div>
           <Dialog open={isDialogOpen} onOpenChange={(open) => {
             setIsDialogOpen(open);
             if (!open) resetForm();
           }}>
             <DialogTrigger asChild>
               <Button>
                 <Plus className="ml-2 h-4 w-4" />
                 إضافة مبادرة
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
               <DialogHeader>
                 <DialogTitle>
                   {editingInitiative ? "تعديل المبادرة" : "إضافة مبادرة جديدة"}
                 </DialogTitle>
               </DialogHeader>
               <div className="space-y-4">
                 <div className="space-y-2">
                   <Label htmlFor="title">عنوان المبادرة *</Label>
                   <Input
                     id="title"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                     placeholder="أدخل عنوان المبادرة"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="short_description">وصف مختصر</Label>
                   <Textarea
                     id="short_description"
                     value={formData.short_description}
                     onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                     placeholder="وصف مختصر للمبادرة"
                     rows={2}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="full_description">الوصف الكامل</Label>
                   <Textarea
                     id="full_description"
                     value={formData.full_description}
                     onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                     placeholder="وصف تفصيلي للمبادرة"
                     rows={4}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="objectives">الأهداف (كل هدف في سطر)</Label>
                   <Textarea
                     id="objectives"
                     value={formData.objectives}
                     onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                     placeholder="الهدف الأول&#10;الهدف الثاني&#10;الهدف الثالث"
                     rows={3}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="impact">الأثر المتوقع</Label>
                   <Input
                     id="impact"
                     value={formData.impact}
                     onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                     placeholder="أثر المبادرة"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="target_audience">الفئة المستهدفة</Label>
                   <Input
                     id="target_audience"
                     value={formData.target_audience}
                     onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                     placeholder="مثال: الطلاب والمعلمين"
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
             <CardTitle>قائمة المبادرات</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
             ) : initiatives.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 لا توجد مبادرات حالياً. أضف مبادرتك الأولى!
               </div>
             ) : (
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>العنوان</TableHead>
                     <TableHead>الفئة المستهدفة</TableHead>
                     <TableHead>الحالة</TableHead>
                     <TableHead>الإجراءات</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {initiatives.map((initiative) => (
                     <TableRow key={initiative.id}>
                       <TableCell className="font-medium">{initiative.title}</TableCell>
                       <TableCell>{initiative.target_audience || "-"}</TableCell>
                       <TableCell>
                         <Switch
                           checked={initiative.is_visible ?? true}
                           onCheckedChange={() => toggleVisibility(initiative.id, initiative.is_visible ?? true)}
                         />
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-2">
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleEdit(initiative)}
                           >
                             <Pencil className="h-4 w-4" />
                           </Button>
                           <Button
                             variant="ghost"
                             size="icon"
                             onClick={() => handleDelete(initiative.id)}
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