 import { motion } from "framer-motion";
 import {
   Settings,
   FileText,
   BarChart3,
   ClipboardList,
   Presentation,
   Monitor,
   Users,
   Handshake,
   UserCheck,
   Sparkles,
 } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 
 const adminTasks = [
   {
     category: "الإشراف والتنظيم",
     icon: Settings,
     tasks: [
       {
         title: "إدارة المركز التدريبي",
         description: "الإشراف العام على المركز، وجدولة ومتابعة تنفيذ جميع البرامج والورش التدريبية لتطوير منسوبي الشركة والطلاب",
       },
       {
         title: "تحليل الاحتياجات التدريبية",
         description: "إجراء دراسات لتحليل الاحتياجات التدريبية وتصميم استبيانات ومقابلات لتقييم المهارات الحالية وتحديد الفجوات",
       },
       {
         title: "إعداد التقارير",
         description: "تقديم تقارير دورية شاملة للإدارة حول تقدم البرامج، وتحليل نقاط القوة والضعف، واقتراح الحلول التطويرية",
       },
       {
         title: "بناء الخطط",
         description: "إعداد خطط تدريبية شاملة واستراتيجية تتناسب مع الأهداف التعليمية للمنظمة",
       },
     ],
   },
   {
     category: "تصميم وتطوير البرامج",
     icon: Presentation,
     tasks: [
       {
         title: "تصميم المحتوى",
         description: "تصميم برامج ودورات تدريبية عالية الجودة تلبي الاحتياجات المحددة للمعلمين والطلاب والإداريين",
       },
       {
         title: "التنفيذ المباشر",
         description: "إدارة وتنفيذ الجلسات التدريبية وفق جدول زمني محدد، سواء كانت مباشرة أو أونلاين، واستقطاب أبرز المدربين",
       },
     ],
   },
   {
     category: "الدعم والتوجيه",
     icon: UserCheck,
     tasks: [
       {
         title: "الاستشارات الفردية",
         description: "تقديم استشارات وتوجيه فردي للمعلمين لتحسين أدائهم وتطوير أساليبهم التدريسية",
       },
       {
         title: "التوظيف التقني",
         description: "توجيه المعلمين في الاستخدام الأمثل للتقنيات الحديثة ودمج أدوات الذكاء الاصطناعي لتحسين تجربتهم الصفية",
       },
     ],
   },
   {
     category: "بناء الشراكات والتعاون",
     icon: Handshake,
     tasks: [
       {
         title: "التعاون المؤسسي",
         description: "بناء شبكات تعاون مع جهات تدريبية متخصصة محلياً وعالمياً لتعزيز جودة البرامج",
       },
       {
         title: "استقطاب الخبرات",
         description: "دعوة خبراء ومختصين لتقديم جلسات تدريبية وورش عمل نوعية",
       },
       {
         title: "تحفيز المعلمين",
         description: "تشجيع المعلمين على تقديم عدد من الورش والدورات التدريبية للزملاء وذلك لتلاقح الأفكار والتطوير المستمر",
       },
     ],
   },
 ];
 
 const Tasks = () => {
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
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">المهام الإدارية</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               منظومة إدارية متكاملة تشمل الإشراف والتنظيم وتصميم البرامج والدعم والتوجيه وبناء الشراكات
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Tasks Sections */}
       <section className="section-padding">
         <div className="container-custom">
           <div className="space-y-16">
             {adminTasks.map((section, sectionIndex) => (
               <motion.div
                 key={sectionIndex}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5 }}
               >
                 {/* Section Header */}
                 <div className="flex items-center gap-4 mb-8">
                   <div className="icon-container">
                     <section.icon className="w-7 h-7" />
                   </div>
                   <h2 className="text-2xl md:text-3xl font-cairo font-bold text-foreground">
                     {section.category}
                   </h2>
                 </div>
 
                 {/* Tasks Grid */}
                 <div className="grid md:grid-cols-2 gap-6">
                   {section.tasks.map((task, taskIndex) => (
                     <motion.div
                       key={taskIndex}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.4, delay: taskIndex * 0.1 }}
                       className="bg-card rounded-2xl p-6 shadow-lg border border-border/30 card-hover"
                     >
                       <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                           <span className="text-primary font-bold">{taskIndex + 1}</span>
                         </div>
                         <div>
                           <h3 className="text-lg font-cairo font-bold text-foreground mb-2">
                             {task.title}
                           </h3>
                           <p className="text-muted-foreground leading-relaxed text-sm">
                             {task.description}
                           </p>
                         </div>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Tasks;