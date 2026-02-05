 import { motion } from "framer-motion";
 import {
   Radio,
   FileText,
   Mic,
   Settings,
   PenTool,
   Monitor,
   ExternalLink,
 } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 import { Button } from "@/components/ui/button";
 
 const platforms = [
   {
     icon: Radio,
     title: "موقع الإذاعة المدرسية بالذكاء الاصطناعي",
     description: "منصة متطورة لإنتاج المحتوى الإذاعي المدرسي باستخدام تقنيات الذكاء الاصطناعي",
     features: ["إنتاج نصوص إذاعية", "توليد صوتي", "جدولة البث"],
     link: "#",
   },
   {
     icon: Settings,
     title: "نظام أتمتة الدورات والبرامج التعليمية",
     description: "نظام احترافي لتنسيق الدورات والبرامج التعليمية بشكل آلي",
     features: ["جدولة تلقائية", "إدارة المشاركين", "إصدار الشهادات"],
     link: "#",
   },
   {
     icon: FileText,
     title: "موقع ديوان المراسلات",
     description: "منصة متخصصة لكتابة الخطابات المتنوعة بشكل احترافي",
     features: ["قوالب جاهزة", "تخصيص المحتوى", "تصدير PDF"],
     link: "#",
   },
   {
     icon: Monitor,
     title: "منصة تنسيق الدورات التدريبية والإدارية",
     description: "أداة متكاملة لإدارة وتنسيق الدورات التدريبية والإدارية",
     features: ["تتبع الحضور", "تقييم الأداء", "تقارير شاملة"],
     link: "#",
   },
   {
     icon: PenTool,
     title: "موقع جرافولوجيا لتحليل الخط",
     description: "أداة متخصصة في تحليل الشخصية من خلال الخط اليدوي",
     features: ["تحليل فوري", "تقارير تفصيلية", "نصائح تطويرية"],
     link: "#",
   },
 ];
 
 const Media = () => {
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
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">الإعلام والمحتوى الرقمي</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               منصات ومشاريع رقمية مبتكرة تخدم العملية التعليمية وتعزز التحول الرقمي
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Platforms Section */}
       <section className="section-padding">
         <div className="container-custom">
           <SectionHeader
             title="المنصات الرقمية"
             subtitle="حلول تقنية مبتكرة تم تطويرها لتلبية احتياجات المؤسسات التعليمية"
           />
 
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {platforms.map((platform, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 card-hover flex flex-col"
               >
                 {/* Header */}
                 <div className="bg-gradient-edu p-6">
                   <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                     <platform.icon className="w-7 h-7 text-white" />
                   </div>
                   <h3 className="text-xl font-cairo font-bold text-white">{platform.title}</h3>
                 </div>
 
                 {/* Content */}
                 <div className="p-6 flex-1 flex flex-col">
                   <p className="text-muted-foreground leading-relaxed mb-4">{platform.description}</p>
                   
                   <div className="mb-6 flex-1">
                     <h4 className="font-semibold text-foreground text-sm mb-2">المميزات:</h4>
                     <ul className="space-y-2">
                       {platform.features.map((feature, fIndex) => (
                         <li key={fIndex} className="flex items-center gap-2 text-muted-foreground text-sm">
                           <div className="w-2 h-2 rounded-full bg-primary" />
                           {feature}
                         </li>
                       ))}
                     </ul>
                   </div>
 
                   <Button variant="outline" className="w-full gap-2" disabled>
                     <ExternalLink className="w-4 h-4" />
                     زيارة المنصة
                   </Button>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Content Production Section */}
       <section className="section-padding bg-muted/30">
         <div className="container-custom">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
             >
               <div className="flex items-center gap-4 mb-6">
                 <div className="icon-container">
                   <Mic className="w-7 h-7" />
                 </div>
                 <h2 className="text-3xl font-cairo font-bold text-foreground">إنتاج المحتوى الإعلامي</h2>
               </div>
               <p className="text-muted-foreground leading-relaxed mb-6">
                 تقديم برامج إعلامية توعوية وإنتاج محتوى إيجابي للشباب عامة وللطلاب خاصة، ونشرها من خلال وسائل التواصل (على شكل حلقات بشكل دوري) مما يعزز من صورة الشركة ورسالتها التعليمية.
               </p>
 
               <div className="space-y-4">
                 <h3 className="font-cairo font-bold text-foreground">ويشمل ذلك:</h3>
                 <ul className="space-y-3">
                   {[
                     "تجهيز أدوات التصوير (الاستديو والكاميرا والمايك والإضاءة)",
                     "جمع وإعداد وكتابة الفكرة والمعلومات",
                     "التصوير والمونتاج وتحسين الصوت والمؤثرات والإخراج",
                     "حفظ الفيديو بجودة مناسبة للسوشال ميديا",
                     "النشر ورفع الفيديو، كتابة الوصف، المتابعة والرد على الجمهور",
                   ].map((item, index) => (
                     <li key={index} className="flex items-start gap-3 text-muted-foreground">
                       <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                         <span className="text-primary text-xs font-bold">{index + 1}</span>
                       </div>
                       {item}
                     </li>
                   ))}
                 </ul>
               </div>
             </motion.div>
 
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="bg-gradient-edu rounded-2xl p-8 text-white"
             >
               <h3 className="text-2xl font-cairo font-bold mb-6">مشاريع مستقبلية</h3>
               <div className="space-y-6">
                 {[
                   {
                     title: "بودكاست تعليمي",
                     description: "سلسلة حلقات صوتية تناقش موضوعات تربوية وتعليمية",
                   },
                   {
                     title: "قناة يوتيوب تعليمية",
                     description: "محتوى مرئي متنوع يستهدف الطلاب والمعلمين",
                   },
                   {
                     title: "منصة تفاعلية للطلاب",
                     description: "بيئة رقمية تفاعلية لتبادل المعرفة والخبرات",
                   },
                 ].map((project, index) => (
                   <div key={index} className="bg-white/10 rounded-xl p-4">
                     <h4 className="font-bold mb-2">{project.title}</h4>
                     <p className="text-white/80 text-sm">{project.description}</p>
                   </div>
                 ))}
               </div>
             </motion.div>
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Media;