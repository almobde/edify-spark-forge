 import { motion } from "framer-motion";
 import { Target, BookOpen, Lightbulb, Award, Users, Heart, Shield, Zap } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
 import FeatureCard from "@/components/shared/FeatureCard";
 
 const objectives = [
   {
     icon: Users,
     title: "تطوير كفاءة المعلمين",
     description: "رفع كفاءة المعلمين من خلال برامج تدريبية متخصصة وورش عمل تطبيقية",
   },
   {
     icon: Lightbulb,
     title: "تنمية الإبداع لدى الطلاب",
     description: "تحفيز التفكير الابتكاري وتشجيع الطلاب على تنفيذ مشاريع إبداعية",
   },
   {
     icon: Zap,
     title: "توظيف التقنية الحديثة",
     description: "دمج الذكاء الاصطناعي وأدوات التقنية الحديثة في العملية التعليمية",
   },
   {
     icon: Award,
     title: "تحقيق التميز التعليمي",
     description: "الارتقاء بجودة المخرجات التعليمية على المستوى المحلي والعالمي",
   },
 ];
 
 const values = [
   {
     icon: Lightbulb,
     title: "الإبداع",
     description: "نؤمن بأن الإبداع هو محرك التطوير والتميز في كل ما نقوم به",
   },
   {
     icon: Shield,
     title: "الجودة",
     description: "نلتزم بأعلى معايير الجودة في جميع برامجنا وخدماتنا",
   },
   {
     icon: Users,
     title: "التعاون",
     description: "نبني شراكات فعالة مع الجهات التعليمية والتدريبية المتخصصة",
   },
   {
     icon: Heart,
     title: "التميز",
     description: "نسعى دائماً للتميز في كل تفاصيل عملنا وتقديم الأفضل",
   },
 ];
 
 const About = () => {
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
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">عن المبادرة</h1>
             <p className="text-lg text-white/90 leading-relaxed">
               مبادرة نوعية تهدف إلى الارتقاء بجودة البرامج التدريبية والاستشارات التربوية، وتعزيز تميز وريادة الشركة من خلال مجموعة من الأفكار والبرامج المبتكرة
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Introduction */}
       <section className="section-padding">
         <div className="container-custom">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
             >
               <h2 className="text-3xl font-cairo font-bold text-foreground mb-6">المقدمة</h2>
               <div className="space-y-4 text-muted-foreground leading-relaxed">
                 <p>
                   نقدم هذا المقترح التطويري الذي يهدف إلى الارتقاء بجودة البرامج التدريبية والاستشارات التربوية لديكم في الشركة. يتضمن المقترح مجموعة من الأفكار والبرامج المبتكرة التي نطمح من خلالها لتعزيز تميز وريادة الشركة.
                 </p>
                 <p>
                   في حال اعتماد هذا المقترح، سأعمل بمشيئة الله على تنفيذه من خلال تشكيل وإدارة فريق عمل متعاون يساعدني لتحقيق الأهداف المرجوة ورفع كفاءة العملية التعليمية والتدريبية.
                 </p>
               </div>
             </motion.div>
 
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="relative"
             >
               <div className="bg-muted rounded-2xl p-8 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-edu" />
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                     <Award className="w-8 h-8 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-cairo font-bold text-xl text-foreground">مستشار في تطوير الذات</h3>
                     <p className="text-muted-foreground">ومدرب في الذكاء الاصطناعي</p>
                   </div>
                 </div>
                 <p className="text-muted-foreground leading-relaxed">
                   نسعى لإطلاق مبادرات واستشارات تدريبية وتعليمية متقدمة تُسهم في بناء مهارات المعلمين والطلاب، مع توظيف التقنية الحديثة والذكاء الاصطناعي لتعزيز بيئة تعليمية مبتكرة تواكب تطلعات المستقبل وتنسجم مع رؤية المملكة 2030
                 </p>
               </div>
             </motion.div>
           </div>
         </div>
       </section>
 
       {/* Vision & Mission */}
       <section className="section-padding bg-muted/30">
         <div className="container-custom">
           <SectionHeader
             title="الرؤية والرسالة"
             subtitle="نحو مستقبل تعليمي مشرق ومبتكر"
           />
 
           <div className="grid md:grid-cols-2 gap-8">
             {/* Vision */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="bg-gradient-edu rounded-2xl p-8 text-white"
             >
               <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                 <Target className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-cairo font-bold mb-4">الرؤية</h3>
               <p className="text-white/90 leading-relaxed">
                 أن تصبح الشركة نموذجاً وطنياً رائداً في تطبيق الذكاء الاصطناعي في التعليم، تعتمد على البيانات والتخصيص، وتقديم بيئة تعليمية مبتكرة تتيح تحقيق مستويات أعلى من الأداء للمعلمين والطلاب وأساليب التعليم والابتكار
               </p>
             </motion.div>
 
             {/* Mission */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="bg-card rounded-2xl p-8 shadow-lg border border-border/30"
             >
               <div className="icon-container mb-6">
                 <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-cairo font-bold text-foreground mb-4">الرسالة</h3>
               <p className="text-muted-foreground leading-relaxed">
                 تصميم وتنفيذ برامج تدريبية نوعية ومستدامة تعتمد على أحدث التقنيات، لرفع كفاءة المعلمين والطلاب والإداريين، وتحقيق التميز في المخرجات التعليمية بما يعزز تنافسية المنظمة على المستوى المحلي والعالمي
               </p>
             </motion.div>
           </div>
         </div>
       </section>
 
       {/* Objectives */}
       <section className="section-padding">
         <div className="container-custom">
           <SectionHeader
             title="الأهداف الاستراتيجية"
             subtitle="أهداف طموحة تدعم مهارات المستقبل وتحقق تطوراً مستداماً"
           />
 
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {objectives.map((objective, index) => (
               <FeatureCard
                 key={index}
                 icon={objective.icon}
                 title={objective.title}
                 description={objective.description}
                 delay={index * 0.1}
               />
             ))}
           </div>
         </div>
       </section>
 
       {/* Values */}
       <section className="section-padding bg-edu-navy">
         <div className="container-custom">
           <SectionHeader
             title="قيمنا"
             subtitle="القيم التي تحركنا وتوجه عملنا"
             light
           />
 
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {values.map((value, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
               >
                 <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                   <value.icon className="w-7 h-7 text-secondary" />
                 </div>
                 <h3 className="text-xl font-cairo font-bold text-white mb-3">{value.title}</h3>
                 <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default About;