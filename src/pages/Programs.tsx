 import { useState } from "react";
 import { motion } from "framer-motion";
 import {
   GraduationCap,
   Users,
   Brain,
   Lightbulb,
   Presentation,
   Globe,
   Mic,
   Code,
   Sparkles,
   BookOpen,
 } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 import ProgramCard from "@/components/shared/ProgramCard";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
 const teacherPrograms = [
   {
     icon: Presentation,
     title: "تدريب المدربين TOT",
     description: "برنامج متقدم لتأهيل القادة التربويين وإكسابهم مهارات التدريب الاحترافي",
     duration: "5 أيام",
   },
   {
     icon: Lightbulb,
     title: "استراتيجيات التفكير الإبداعي",
     description: "دورة متخصصة في تطوير مهارات التفكير الإبداعي وتطبيقها في الفصل الدراسي",
     duration: "3 أيام",
   },
   {
     icon: Brain,
     title: "توظيف الذكاء الاصطناعي في التعليم",
     description: "دورة شاملة في استخدام أدوات الذكاء الاصطناعي لتحسين جودة التدريس وتقليل الجهد في الإعداد",
     duration: "3 أيام",
   },
   {
     icon: Sparkles,
     title: "المعلم المبدع والنمو المستدام",
     description: "ورشة عمل تركز على تطوير الذات المهني والنمو المستمر للمعلمين",
     duration: "يومين",
   },
 ];
 
 const studentPrograms = [
   {
     icon: Mic,
     title: "مهارات الإلقاء والخطابة",
     description: "برنامج متكامل لتطوير مهارات التحدث أمام الجمهور والإلقاء المؤثر",
     duration: "4 أيام",
   },
   {
     icon: Lightbulb,
     title: "التفكير الإبداعي وحل المشكلات",
     description: "دورة تفاعلية لتنمية مهارات التفكير الإبداعي والنقدي لدى الطلاب",
     duration: "يومين",
   },
   {
     icon: Code,
     title: "أساسيات الذكاء الاصطناعي والبرمجة",
     description: "مقدمة شاملة في عالم الذكاء الاصطناعي وأساسيات البرمجة للمبتدئين",
     duration: "5 أيام",
   },
   {
     icon: Globe,
     title: "برمجة المواقع وإنشاؤها",
     description: "تعلم أساسيات تطوير المواقع الإلكترونية باستخدام أحدث التقنيات",
     duration: "4 أيام",
   },
 ];
 
 const digitalPrograms = [
   {
     icon: Brain,
     title: "برنامج التحول الذكي في التعليم الأهلي",
     description: "برنامج تطويري متكامل يستهدف الارتقاء بالمدارس عبر دمج التدريب والتقنية",
     duration: "مستمر",
   },
   {
     icon: BookOpen,
     title: "موقع تفاعلي مع شات بوت تعليمي",
     description: "إنشاء موقع تفاعلي يحتوي على شات بوت متخصص لكل تخصص تعليمي",
     duration: "مستمر",
   },
 ];
 
 const Programs = () => {
   const [activeTab, setActiveTab] = useState("teachers");
 
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
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">البرامج والدورات</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               مجموعة متنوعة من البرامج التدريبية المتخصصة للمعلمين والطلاب مع إمكانية إضافة المزيد حسب الاحتياج
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Programs Tabs */}
       <section className="section-padding">
         <div className="container-custom">
           <SectionHeader
             title="اختر الفئة المناسبة"
             subtitle="برامج متخصصة لكل فئة من فئات المستفيدين"
           />
 
           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
             <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-12 bg-muted p-1 rounded-xl">
               <TabsTrigger
                 value="teachers"
                 className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
               >
                 <GraduationCap className="w-4 h-4 ml-2" />
                 للمعلمين
               </TabsTrigger>
               <TabsTrigger
                 value="students"
                 className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
               >
                 <Users className="w-4 h-4 ml-2" />
                 للطلاب
               </TabsTrigger>
               <TabsTrigger
                 value="digital"
                 className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
               >
                 <Brain className="w-4 h-4 ml-2" />
                 التحول الذكي
               </TabsTrigger>
             </TabsList>
 
             <TabsContent value="teachers">
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {teacherPrograms.map((program, index) => (
                   <ProgramCard
                     key={index}
                     icon={program.icon}
                     title={program.title}
                     description={program.description}
                     category="teachers"
                     duration={program.duration}
                     delay={index * 0.1}
                   />
                 ))}
               </div>
             </TabsContent>
 
             <TabsContent value="students">
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {studentPrograms.map((program, index) => (
                   <ProgramCard
                     key={index}
                     icon={program.icon}
                     title={program.title}
                     description={program.description}
                     category="students"
                     duration={program.duration}
                     delay={index * 0.1}
                   />
                 ))}
               </div>
             </TabsContent>
 
             <TabsContent value="digital">
               <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                 {digitalPrograms.map((program, index) => (
                   <ProgramCard
                     key={index}
                     icon={program.icon}
                     title={program.title}
                     description={program.description}
                     category="digital"
                     duration={program.duration}
                     delay={index * 0.1}
                   />
                 ))}
               </div>
             </TabsContent>
           </Tabs>
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="section-padding bg-muted/30">
         <div className="container-custom">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border/30 text-center"
           >
             <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
             <h2 className="text-2xl md:text-3xl font-cairo font-bold text-foreground mb-4">
               لديك احتياج تدريبي خاص؟
             </h2>
             <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
               يمكننا تصميم برامج تدريبية مخصصة تناسب احتياجاتكم. تواصلوا معنا لمناقشة متطلباتكم
             </p>
             <a
               href="https://wa.me/966555255837"
               target="_blank"
               rel="noopener noreferrer"
               className="btn-gradient inline-flex items-center gap-2"
             >
               تواصل معنا عبر واتساب
             </a>
           </motion.div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Programs;