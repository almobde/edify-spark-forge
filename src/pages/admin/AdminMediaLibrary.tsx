 import { useEffect, useState } from "react";
 import AdminLayout from "@/components/admin/AdminLayout";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 import { Upload, Trash2, Loader2, Copy, Check, Image as ImageIcon } from "lucide-react";
 
 interface MediaFile {
   name: string;
   id: string;
   url: string;
   created_at: string;
 }
 
 export default function AdminMediaLibrary() {
   const [files, setFiles] = useState<MediaFile[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isUploading, setIsUploading] = useState(false);
   const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
   const { toast } = useToast();
 
   const fetchFiles = async () => {
     try {
       const { data, error } = await supabase.storage
         .from("media")
         .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
 
       if (error) throw error;
 
       const filesWithUrls = await Promise.all(
         (data || []).map(async (file) => {
           const { data: urlData } = supabase.storage
             .from("media")
             .getPublicUrl(file.name);
 
           return {
             name: file.name,
             id: file.id,
             url: urlData.publicUrl,
             created_at: file.created_at,
           };
         })
       );
 
       setFiles(filesWithUrls);
     } catch (error) {
       console.error("Error fetching files:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل الملفات",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchFiles();
   }, []);
 
   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (!file) return;
 
     // Validate file type
     if (!file.type.startsWith("image/")) {
       toast({
         title: "خطأ",
         description: "يرجى اختيار ملف صورة فقط",
         variant: "destructive",
       });
       return;
     }
 
     // Validate file size (max 5MB)
     if (file.size > 5 * 1024 * 1024) {
       toast({
         title: "خطأ",
         description: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
         variant: "destructive",
       });
       return;
     }
 
     setIsUploading(true);
     try {
       const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
       
       const { error } = await supabase.storage
         .from("media")
         .upload(fileName, file);
 
       if (error) throw error;
 
       toast({ title: "تم الرفع", description: "تم رفع الصورة بنجاح" });
       fetchFiles();
     } catch (error) {
       console.error("Error uploading file:", error);
       toast({
         title: "خطأ",
         description: "فشل في رفع الملف",
         variant: "destructive",
       });
     } finally {
       setIsUploading(false);
       e.target.value = "";
     }
   };
 
   const handleDelete = async (fileName: string) => {
     if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
 
     try {
       const { error } = await supabase.storage
         .from("media")
         .remove([fileName]);
 
       if (error) throw error;
 
       toast({ title: "تم الحذف", description: "تم حذف الصورة بنجاح" });
       fetchFiles();
     } catch (error) {
       console.error("Error deleting file:", error);
       toast({
         title: "خطأ",
         description: "فشل في حذف الملف",
         variant: "destructive",
       });
     }
   };
 
   const copyUrl = async (url: string) => {
     try {
       await navigator.clipboard.writeText(url);
       setCopiedUrl(url);
       setTimeout(() => setCopiedUrl(null), 2000);
       toast({ title: "تم النسخ", description: "تم نسخ الرابط" });
     } catch (error) {
       console.error("Error copying URL:", error);
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">مكتبة الصور</h1>
             <p className="text-muted-foreground">رفع وإدارة صور الموقع</p>
           </div>
           <div className="relative">
             <Input
               type="file"
               accept="image/*"
               onChange={handleUpload}
               disabled={isUploading}
               className="absolute inset-0 opacity-0 cursor-pointer"
             />
             <Button disabled={isUploading}>
               {isUploading ? (
                 <>
                   <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                   جاري الرفع...
                 </>
               ) : (
                 <>
                   <Upload className="ml-2 h-4 w-4" />
                   رفع صورة
                 </>
               )}
             </Button>
           </div>
         </div>
 
         <Card>
           <CardHeader>
             <CardTitle>الصور المرفوعة</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex justify-center py-8">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
               </div>
             ) : files.length === 0 ? (
               <div className="text-center py-12 text-muted-foreground">
                 <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                 <p>لا توجد صور حالياً</p>
                 <p className="text-sm">ارفع صورتك الأولى!</p>
               </div>
             ) : (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {files.map((file) => (
                   <div
                     key={file.id}
                     className="group relative aspect-square rounded-lg overflow-hidden border bg-muted"
                   >
                     <img
                       src={file.url}
                       alt={file.name}
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <Button
                         variant="secondary"
                         size="icon"
                         onClick={() => copyUrl(file.url)}
                       >
                         {copiedUrl === file.url ? (
                           <Check className="h-4 w-4" />
                         ) : (
                           <Copy className="h-4 w-4" />
                         )}
                       </Button>
                       <Button
                         variant="destructive"
                         size="icon"
                         onClick={() => handleDelete(file.name)}
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </CardContent>
         </Card>
       </div>
     </AdminLayout>
   );
 }