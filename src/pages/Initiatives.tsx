 import { motion } from "framer-motion";
 import {
   Presentation,
   Heart,
   Video,
   Globe,
   Mail,
   FileEdit,
   Image,
   FileText,
   Lightbulb,
   Sparkles,
 } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 import InitiativeCard from "@/components/shared/InitiativeCard";
 
 const initiatives = [
   {
     icon: Presentation,
     title: "100 عرض تقديمي تعليمي",
     description: "إنشاء 100 عرض بوربوينت يقدمها المعلمون أو الطلاب، تُستخدم في الدروس وتُتاح للجميع",
     impact: "ارتفاع جودة الشرح والتفاعل داخل الصف وتعزيز التعلم التشاركي",
   },
   {
     icon: Heart,
     title: "100 مشروع تطوعي",
     description: "طلاب المدرسة ينفذون 100 مشروع تطوعي بسيط (تنظيم، تنظيف، مساعدة، توعية، دعم…)",
     impact: "مدرسة متعاونة يسودها احترام وانتماء قوي وروح المسؤولية المجتمعية",
   },
   {
     icon: Video,
     title: "100 مقطع فيديو توعوي",
     description: "إنتاج مقاطع قصيرة من الطلاب حول موضوعات أخلاقية، تربوية، اجتماعية، وصحية",
     impact: "رفع مستوى الوعي والسلوكيات الإيجابية داخل المدرسة",
   },
   {
     icon: Globe,
     title: "100 موقع ويب إبداعي",
     description: "الطلاب والمعلمون يصممون مواقع بسيطة عبر أدوات AI في موضوعات من اختيارهم",
     impact: "مدرسة مواكبة للتحول الرقمي وتنتج محتوى عالي الجودة",
   },
   {
     icon: Mail,
     title: "100 رسالة شكر",
     description: "الطلاب يكتبون رسالة تقدير 100 لمعلميهم، أولياء أمورهم، أصدقائهم وزملائهم",
     impact: "أجواء إيجابية تخفف السلوكيات السلبية وترفع الاحترام المتبادل",
   },
   {
     icon: FileEdit,
     title: "100 مقال مفيد",
     description: "مقالات يكتبها الطلاب بأنفسهم في منصة مدرسية خاصة، مع التأكد من أصالتها عبر أدوات كشف الذكاء الاصطناعي",
     impact: "جيل قارئ وواعٍ قادر على التعبير والتحليل",
   },
   {
     icon: FileText,
     title: "100 سيرة ذاتية احترافية",
     description: "كل طالب يصمم سيرته الذاتية بصيغة PDF أو موقع شخصي يوضح مهاراته وشهاداته وأهدافه المستقبلية",
     impact: "بناء الهوية المهنية ورفع جاهزية الطالب للفرص الجامعية والتطوعية",
   },
   {
     icon: Lightbulb,
     title: "100 فكرة ابتكارية",
     description: "الطلاب والمعلمون يقدمون فكرة 100 لتحسين التعليم والأنشطة والبيئة المدرسية وتُعرض في معرض الابتكار المئوي",
     impact: "أفكار تُطبق فعلياً وتساهم في رفع جودة المدرسة",
   },
   {
     icon: Image,
     title: "100 صورة احترافية",
     description: "يصنع الطلاب صورة احترافية 100 (تصوير – تصميم – تعديل) تعبر عن رسائل، مشاعر، أو مفاهيم تربوية وجمالية",
     impact: "معرض بصري مذهل يبرز مواهب المدرسة الفنية",
   },
 ];
 
 const Initiatives = () => {
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
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">المبادرات النوعية</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               مبادرات مئوية مبتكرة تسهم في تطوير مهارات الطلاب وإثراء البيئة التعليمية وتعزيز روح المشاركة والإبداع
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Intro Section */}
       <section className="section-padding bg-muted/30">
         <div className="container-custom">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border/30 max-w-4xl mx-auto"
           >
             <div className="flex items-center gap-4 mb-6">
               <div className="icon-container">
                 <Sparkles className="w-7 h-7" />
               </div>
               <h2 className="text-2xl font-cairo font-bold text-foreground">فكرة المبادرات المئوية</h2>
             </div>
             <p className="text-muted-foreground leading-relaxed mb-4">
               تتركز هذه المشاريع على تعزيز التميّز في ريادة الأعمال، والإنتاج الفني والإبداع التقني. حيث تمنح الطلاب فرصة حقيقية لاكتساب مهارة الإلقاء، وتعزيز الثقة بالنفس، وتنمية قدرتهم على التعبير والعرض أمام الآخرين.
             </p>
             <p className="text-muted-foreground leading-relaxed">
               مما يجعل التجربة التعليمية أعمق وأكثر تأثيراً في شخصياتهم ومستقبلهم.
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Initiatives Grid */}
       <section className="section-padding">
         <div className="container-custom">
           <SectionHeader
             title="المبادرات التسع"
             subtitle="كل مبادرة تستهدف 100 منجز لتحقيق أثر ملموس ومستدام"
           />
 
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {initiatives.map((initiative, index) => (
               <InitiativeCard
                 key={index}
                 icon={initiative.icon}
                 title={initiative.title}
                 description={initiative.description}
                 impact={initiative.impact}
                 delay={index * 0.1}
               />
             ))}
           </div>
         </div>
       </section>
 
       {/* Impact Section */}
       <section className="section-padding bg-edu-navy">
         <div className="container-custom">
           <SectionHeader
             title="الأثر المتوقع"
             subtitle="نتائج ملموسة تسهم في تطوير البيئة التعليمية بشكل شامل"
             light
           />
 
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               {
                 title: "الارتقاء بجودة التعليم",
                 description: "تطوير أداء المعلمين والطلاب عبر برامج تدريبية وورش ومبادرات عملية",
               },
               {
                 title: "بناء محتوى رقمي أصيل",
                 description: "إنتاج المواقع والمقاطع والكتب لتشكل مكتبة رقمية ثرية تعكس تميز المدرسة",
               },
               {
                 title: "تعزيز الانتماء والتحفيز",
                 description: "إبراز منجزات العاملين والطلاب يمنح الجميع دافعاً عميقاً للعطاء",
               },
               {
                 title: "دعم التحول التقني",
                 description: "من المواقع الإلكترونية إلى الشات بوت التعليمي لتصبح المدرسة نموذجاً حديثاً",
               },
             ].map((item, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
               >
                 <h3 className="text-xl font-cairo font-bold text-white mb-3">{item.title}</h3>
                 <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Initiatives;