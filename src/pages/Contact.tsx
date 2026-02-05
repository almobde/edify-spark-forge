 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { toast } from "@/hooks/use-toast";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 
 const Contact = () => {
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     subject: "",
     message: "",
   });
 
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
 
     // Simulate form submission
     await new Promise((resolve) => setTimeout(resolve, 1000));
 
     toast({
       title: "تم إرسال رسالتك بنجاح",
       description: "سنتواصل معك في أقرب وقت ممكن",
     });
 
     setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
     setIsSubmitting(false);
   };
 
   return (
     <Layout>
       {/* Hero Section */}
       <section className="bg-gradient-edu py-20">
         <div className="container-custom px-4 md:px-8">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-center text-white max-w-3xl mx-auto"
           >
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">تواصل معنا</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               نسعد بتواصلكم واستفساراتكم. لا تترددوا في التواصل معنا
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Contact Section */}
       <section className="section-padding">
         <div className="container-custom">
           <div className="grid lg:grid-cols-3 gap-12">
             {/* Contact Info */}
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="lg:col-span-1"
             >
               <h2 className="text-2xl font-cairo font-bold text-foreground mb-6">معلومات التواصل</h2>
 
               <div className="space-y-6 mb-8">
                 <div className="flex items-start gap-4">
                   <div className="icon-container flex-shrink-0">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">الهاتف</h3>
                     <p className="text-muted-foreground" dir="ltr">0555255837</p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4">
                   <div className="icon-container flex-shrink-0">
                     <Mail className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">البريد الإلكتروني</h3>
                     <p className="text-muted-foreground">info@reyada-initiative.sa</p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4">
                   <div className="icon-container flex-shrink-0">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">الموقع</h3>
                     <p className="text-muted-foreground">المملكة العربية السعودية</p>
                   </div>
                 </div>
 
                 <div className="flex items-start gap-4">
                   <div className="icon-container flex-shrink-0">
                     <Clock className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground mb-1">أوقات العمل</h3>
                     <p className="text-muted-foreground">الأحد - الخميس: 8 ص - 4 م</p>
                   </div>
                 </div>
               </div>
 
               {/* WhatsApp Button */}
               <a
                 href="https://wa.me/966555255837"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn-gradient w-full inline-flex items-center justify-center gap-2"
               >
                 <MessageSquare className="w-5 h-5" />
                 تواصل عبر واتساب
               </a>
             </motion.div>
 
             {/* Contact Form */}
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="lg:col-span-2"
             >
               <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/30">
                 <h2 className="text-2xl font-cairo font-bold text-foreground mb-6">أرسل رسالتك</h2>
 
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-foreground mb-2">
                         الاسم الكامل
                       </label>
                       <Input
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                         placeholder="أدخل اسمك الكامل"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-foreground mb-2">
                         البريد الإلكتروني
                       </label>
                       <Input
                         name="email"
                         type="email"
                         value={formData.email}
                         onChange={handleChange}
                         placeholder="example@email.com"
                         required
                       />
                     </div>
                   </div>
 
                   <div className="grid md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-foreground mb-2">
                         رقم الهاتف
                       </label>
                       <Input
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         placeholder="05XXXXXXXX"
                         dir="ltr"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-foreground mb-2">
                         الموضوع
                       </label>
                       <Input
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         placeholder="موضوع الرسالة"
                         required
                       />
                     </div>
                   </div>
 
                   <div>
                     <label className="block text-sm font-medium text-foreground mb-2">
                       الرسالة
                     </label>
                     <Textarea
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                       placeholder="اكتب رسالتك هنا..."
                       rows={6}
                       required
                     />
                   </div>
 
                   <Button
                     type="submit"
                     className="btn-gradient w-full gap-2"
                     disabled={isSubmitting}
                   >
                     {isSubmitting ? (
                       "جاري الإرسال..."
                     ) : (
                       <>
                         <Send className="w-5 h-5" />
                         إرسال الرسالة
                       </>
                     )}
                   </Button>
                 </form>
               </div>
             </motion.div>
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Contact;