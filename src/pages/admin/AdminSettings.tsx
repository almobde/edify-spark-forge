import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Upload } from "lucide-react";
 
 interface Setting {
   id: string;
   key: string;
   value: string | null;
   type: string | null;
 }
 
  const defaultSettings = [
    { key: "site_name", label: "اسم الموقع", type: "text" },
    { key: "site_description", label: "وصف الموقع", type: "text" },
    { key: "contact_email", label: "البريد الإلكتروني", type: "text" },
    { key: "contact_phone", label: "رقم الهاتف", type: "text" },
    { key: "intro_video_url", label: "رابط الفيديو التعريفي", type: "text" },
    { key: "intro_video_type", label: "نوع الفيديو", type: "text" },
    { key: "whatsapp_url", label: "رابط واتساب", type: "text" },
    { key: "chatgpt_url", label: "رابط تواصل ChatGPT", type: "text" },
    { key: "trainer_website_url", label: "رابط موقع المدرب", type: "text" },
    { key: "facebook_url", label: "رابط فيسبوك", type: "text" },
    { key: "twitter_url", label: "رابط تويتر", type: "text" },
    { key: "instagram_url", label: "رابط انستغرام", type: "text" },
    { key: "youtube_url", label: "رابط يوتيوب", type: "text" },
  ];
 
 export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
 
   const fetchSettings = async () => {
     try {
       const { data, error } = await supabase
         .from("site_settings")
         .select("*");
 
       if (error) throw error;
 
       const settingsMap: Record<string, string> = {};
       data?.forEach((setting: Setting) => {
         settingsMap[setting.key] = setting.value || "";
       });
       setSettings(settingsMap);
     } catch (error) {
       console.error("Error fetching settings:", error);
       toast({
         title: "خطأ",
         description: "فشل في تحميل الإعدادات",
         variant: "destructive",
       });
     } finally {
       setIsLoading(false);
     }
   };
 
   useEffect(() => {
     fetchSettings();
   }, []);
 
   const handleSave = async () => {
     setIsSaving(true);
     try {
       for (const setting of defaultSettings) {
         const value = settings[setting.key] || "";
         
         // Try to update, if not exists, insert
         const { data: existing } = await supabase
           .from("site_settings")
           .select("id")
           .eq("key", setting.key)
           .maybeSingle();
 
         if (existing) {
           await supabase
             .from("site_settings")
             .update({ value, type: setting.type })
             .eq("key", setting.key);
         } else {
           await supabase
             .from("site_settings")
             .insert({ key: setting.key, value, type: setting.type });
         }
       }
 
       toast({ title: "تم الحفظ", description: "تم حفظ الإعدادات بنجاح" });
     } catch (error) {
       console.error("Error saving settings:", error);
       toast({
         title: "خطأ",
         description: "فشل في حفظ الإعدادات",
         variant: "destructive",
       });
     } finally {
       setIsSaving(false);
     }
   };
 
   if (isLoading) {
     return (
       <AdminLayout>
         <div className="flex justify-center py-16">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
         </div>
       </AdminLayout>
     );
   }
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-cairo font-bold">الإعدادات</h1>
             <p className="text-muted-foreground">إعدادات الموقع العامة</p>
           </div>
           <Button onClick={handleSave} disabled={isSaving}>
             {isSaving ? (
               <>
                 <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                 جاري الحفظ...
               </>
             ) : (
               <>
                 <Save className="ml-2 h-4 w-4" />
                 حفظ الإعدادات
               </>
             )}
           </Button>
         </div>
 
         <div className="grid gap-6">
           <Card>
             <CardHeader>
               <CardTitle>معلومات الموقع</CardTitle>
               <CardDescription>المعلومات الأساسية للموقع</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="site_name">اسم الموقع</Label>
                   <Input
                     id="site_name"
                     value={settings.site_name || ""}
                     onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                     placeholder="مبادرة الريادة والإبداع"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="site_description">وصف الموقع</Label>
                   <Input
                     id="site_description"
                     value={settings.site_description || ""}
                     onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                     placeholder="مبادرة نوعية للتطوير المهني"
                   />
                 </div>
               </div>
             </CardContent>
           </Card>
 
           <Card>
             <CardHeader>
               <CardTitle>معلومات التواصل</CardTitle>
               <CardDescription>بيانات الاتصال</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="contact_email">البريد الإلكتروني</Label>
                   <Input
                     id="contact_email"
                     type="email"
                     value={settings.contact_email || ""}
                     onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                     placeholder="info@example.com"
                     dir="ltr"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="contact_phone">رقم الهاتف</Label>
                   <Input
                     id="contact_phone"
                     value={settings.contact_phone || ""}
                     onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                     placeholder="0555255837"
                     dir="ltr"
                   />
                 </div>
               </div>
             </CardContent>
           </Card>

            <Card>
              <CardHeader>
                <CardTitle>روابط التواصل السريع</CardTitle>
                <CardDescription>روابط واتساب وشات جي بي تي وموقع المدرب (تظهر في أسفل الصفحة)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp_url">رابط واتساب</Label>
                    <Input
                      id="whatsapp_url"
                      value={settings.whatsapp_url || ""}
                      onChange={(e) => setSettings({ ...settings, whatsapp_url: e.target.value })}
                      placeholder="https://wa.me/966555255837"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chatgpt_url">رابط تواصل ChatGPT</Label>
                    <Input
                      id="chatgpt_url"
                      value={settings.chatgpt_url || ""}
                      onChange={(e) => setSettings({ ...settings, chatgpt_url: e.target.value })}
                      placeholder="https://chatgpt.com/g/..."
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="trainer_website_url">رابط موقع المدرب</Label>
                    <Input
                      id="trainer_website_url"
                      value={settings.trainer_website_url || ""}
                      onChange={(e) => setSettings({ ...settings, trainer_website_url: e.target.value })}
                      placeholder="https://almobde.com"
                      dir="ltr"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الوسائط</CardTitle>
                <CardDescription>الفيديو التعريفي - يمكنك رفع فيديو مباشرة أو إضافة رابط يوتيوب</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>نوع الفيديو</Label>
                  <RadioGroup
                    value={settings.intro_video_type || "youtube"}
                    onValueChange={(val) => setSettings({ ...settings, intro_video_type: val })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="youtube" id="vt-youtube" />
                      <Label htmlFor="vt-youtube">رابط يوتيوب</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="upload" id="vt-upload" />
                      <Label htmlFor="vt-upload">رفع فيديو</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(settings.intro_video_type || "youtube") === "youtube" ? (
                  <div className="space-y-2">
                    <Label htmlFor="intro_video_url">رابط يوتيوب</Label>
                    <Input
                      id="intro_video_url"
                      value={settings.intro_video_url || ""}
                      onChange={(e) => setSettings({ ...settings, intro_video_url: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      dir="ltr"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>رفع ملف فيديو</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept="video/*"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploading(true);
                          try {
                            const ext = file.name.split(".").pop();
                            const path = `videos/intro-${Date.now()}.${ext}`;
                            const { error: uploadError } = await supabase.storage
                              .from("media")
                              .upload(path, file, { upsert: true });
                            if (uploadError) throw uploadError;
                            const { data: urlData } = supabase.storage
                              .from("media")
                              .getPublicUrl(path);
                            setSettings({ ...settings, intro_video_url: urlData.publicUrl });
                            toast({ title: "تم الرفع", description: "تم رفع الفيديو بنجاح" });
                          } catch (err) {
                            console.error(err);
                            toast({ title: "خطأ", description: "فشل في رفع الفيديو", variant: "destructive" });
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                      />
                      {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                    {settings.intro_video_url && (settings.intro_video_type === "upload") && (
                      <p className="text-sm text-muted-foreground truncate" dir="ltr">{settings.intro_video_url}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
 
           <Card>
             <CardHeader>
               <CardTitle>روابط التواصل الاجتماعي</CardTitle>
               <CardDescription>روابط حسابات التواصل الاجتماعي</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="facebook_url">فيسبوك</Label>
                   <Input
                     id="facebook_url"
                     value={settings.facebook_url || ""}
                     onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                     placeholder="https://facebook.com/..."
                     dir="ltr"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="twitter_url">تويتر</Label>
                   <Input
                     id="twitter_url"
                     value={settings.twitter_url || ""}
                     onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                     placeholder="https://twitter.com/..."
                     dir="ltr"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="instagram_url">انستغرام</Label>
                   <Input
                     id="instagram_url"
                     value={settings.instagram_url || ""}
                     onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                     placeholder="https://instagram.com/..."
                     dir="ltr"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="youtube_url">يوتيوب</Label>
                   <Input
                     id="youtube_url"
                     value={settings.youtube_url || ""}
                     onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                     placeholder="https://youtube.com/..."
                     dir="ltr"
                   />
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
     </AdminLayout>
   );
 }