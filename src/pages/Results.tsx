 import { motion } from "framer-motion";
 import {
   Users,
   GraduationCap,
   Lightbulb,
   Award,
   BookOpen,
   TrendingUp,
   Brain,
   Video,
   Globe,
   Target,
 } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 import StatsCard from "@/components/shared/StatsCard";
 
 const expectedResults = [
   {
     category: "تطوير الكوادر",
     items: [
       { label: "رفع كفاءة المعلمين", value: "40%", description: "تجاوز نسبة الكفاءة المهنية" },
       { label: "تحويل المفاهيم النظرية", value: "تطبيقات", description: "دخلت الصفوف المتنوعة" },
       { label: "تنمية مهارات الطلاب", value: "+600", description: "مستفيد من البرامج" },
     ],
   },
   {
     category: "الدورات والورش",
     items: [
       { label: "دورات رئيسية للمعلمين", value: "10", description: "برامج تطويرية متكاملة" },
       { label: "ورش عمل تطبيقية موازية", value: "10", description: "من المعلمين والمشرفين" },
       { label: "دورات تدريبية للطلاب", value: "20", description: "دورية وتربوية" },
     ],
   },
   {
     category: "المبادرات والإنجازات",
     items: [
       { label: "مبادرات مئوية", value: "+400", description: "مبادرة منفذة" },
       { label: "إثراء المكتبة الرقمية", value: "+400", description: "مستفيد من المحتوى" },
       { label: "حلول تقنية مبتكرة", value: "5+", description: "منصات رقمية" },
     ],
   },
   {
     category: "الإعلام والتواصل",
     items: [
       { label: "شات بوت تعليمي", value: "5", description: "تخصصات مختلفة" },
       { label: "برامج إعلامية توعوية", value: "30+", description: "حلقة مباشرة" },
       { label: "إجمالي المستفيدين", value: "+1600", description: "مستفيد مباشر وغير مباشر" },
     ],
   },
 ];
 
 const mainStats = [
   { icon: Users, value: "+600", label: "مستفيد مباشر" },
   { icon: GraduationCap, value: "20", label: "دورة تدريبية" },
   { icon: Lightbulb, value: "+400", label: "مبادرة مئوية" },
   { icon: Award, value: "10", label: "برامج متميزة" },
   { icon: BookOpen, value: "+300", label: "ورشة عمل" },
   { icon: TrendingUp, value: "40%", label: "نسبة تحسن الأداء" },
   { icon: Brain, value: "5", label: "منصات ذكية" },
   { icon: Video, value: "30+", label: "محتوى إعلامي" },
 ];
 
 const Results = () => {
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
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">النتائج المتوقعة</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               أرقام وإنجازات متوقعة خلال عام دراسي واحد بإذن الله
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Main Stats Grid */}
       <section className="section-padding bg-muted/30">
         <div className="container-custom">
           <SectionHeader
             title="الأرقام المتوقعة"
             subtitle="نظرة شاملة على الإنجازات المستهدفة"
           />
 
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {mainStats.map((stat, index) => (
               <StatsCard
                 key={index}
                 icon={stat.icon}
                 value={stat.value}
                 label={stat.label}
                 delay={index * 0.05}
               />
             ))}
           </div>
         </div>
       </section>
 
       {/* Detailed Results */}
       <section className="section-padding">
         <div className="container-custom">
           <SectionHeader
             title="تفاصيل النتائج"
             subtitle="تحليل تفصيلي للنتائج المتوقعة في كل محور"
           />
 
           <div className="grid md:grid-cols-2 gap-8">
             {expectedResults.map((result, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30"
               >
                 {/* Header */}
                 <div className="bg-gradient-edu p-4">
                   <h3 className="text-xl font-cairo font-bold text-white">{result.category}</h3>
                 </div>
 
                 {/* Content */}
                 <div className="p-6">
                   <div className="space-y-4">
                     {result.items.map((item, iIndex) => (
                       <div
                         key={iIndex}
                         className="flex items-center justify-between p-4 bg-muted rounded-xl"
                       >
                         <div className="flex-1">
                           <p className="font-semibold text-foreground text-sm">{item.label}</p>
                           <p className="text-muted-foreground text-xs">{item.description}</p>
                         </div>
                         <div className="text-2xl font-cairo font-bold text-primary">{item.value}</div>
                       </div>
                     ))}
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Benefits Section */}
       <section className="section-padding bg-edu-navy">
         <div className="container-custom">
           <SectionHeader
             title="الفوائد المتوقعة"
             subtitle="كيف ستساهم هذه الأنشطة في تطوير البيئة التعليمية"
             light
           />
 
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               {
                 icon: Target,
                 title: "الارتقاء بجودة التعليم",
                 description: "تطوير أداء المعلمين والطلاب عبر برامج تدريبية وورش ومبادرات تحول المعرفة إلى ممارسة، وتمنح البيئة التعليمية روحاً بالحيوية والإبداع",
               },
               {
                 icon: Globe,
                 title: "بناء محتوى رقمي أصيل",
                 description: "من خلال إنتاج المواقع والمقاطع والكتب، تتشكل مكتبة رقمية ثرية تعكس تميز المدرسة، وتخلق حضوراً متفرداً في الفضاء الإلكتروني",
               },
               {
                 icon: Award,
                 title: "تعزيز الانتماء والتحفيز",
                 description: "إبراز منجزات العاملين والطلاب يمنح الجميع دافعاً عميقاً للعطاء، ويشعرهم بقيمة عطائهم، فينشأ مجتمع مدرسي يعمل بروح الفريق",
               },
               {
                 icon: TrendingUp,
                 title: "دعم التحول التقني",
                 description: "توفر المبادرات منصة متقدمة للابتكار، من المواقع الإلكترونية إلى الشات بوت التعليمي، لتصبح المدرسة نموذجاً حديثاً يواكب تطلعات المستقبل",
               },
               {
                 icon: Users,
                 title: "توسيع أثر المدرسة",
                 description: "عبر البرامج الإعلامية والحلقات التوعوية، ينتقل الأثر من القاعات الدراسية إلى المجتمع، فيتحول المحتوى إلى رسالة نافعة تصل لآلاف داخل وخارج المدرسة",
               },
               {
                 icon: Lightbulb,
                 title: "تحقيق الاستدامة",
                 description: "بناء نظام تعليمي مستدام يعتمد على التطوير المستمر والابتكار، مما يضمن استمرارية التميز على المدى البعيد",
               },
             ].map((benefit, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
               >
                 <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                   <benefit.icon className="w-6 h-6 text-secondary" />
                 </div>
                 <h3 className="text-xl font-cairo font-bold text-white mb-3">{benefit.title}</h3>
                 <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Results;