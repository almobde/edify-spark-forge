import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Target,
  Users,
  CheckCircle,
 } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Import initiative images
import presentationImg from "@/assets/initiatives/presentation.jpg";
import volunteerImg from "@/assets/initiatives/volunteer.jpg";
import videoImg from "@/assets/initiatives/video.jpg";
import websiteImg from "@/assets/initiatives/website.jpg";
import thanksImg from "@/assets/initiatives/thanks.jpg";
import articleImg from "@/assets/initiatives/article.jpg";
import resumeImg from "@/assets/initiatives/resume.jpg";
import innovationImg from "@/assets/initiatives/innovation.jpg";
import photographyImg from "@/assets/initiatives/photography.jpg";

interface Initiative {
  id: number;
  icon: typeof Presentation;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  impact: string;
  targetAudience: string;
  image: string;
}
 
const initiatives: Initiative[] = [
   {
    id: 1,
     icon: Presentation,
     title: "100 عرض تقديمي تعليمي",
    shortDescription: "إنشاء 100 عرض بوربوينت يقدمها المعلمون أو الطلاب، تُستخدم في الدروس وتُتاح للجميع",
    fullDescription: "مبادرة تهدف إلى إنشاء 100 عرض بوربوينت احترافي يقدمها المعلمون أو الطلاب، تُستخدم في الدروس وتُتاح للجميع. تسهم هذه المبادرة في تعزيز التعلم التشاركي وتدريب الطلاب على مهارات العرض والبحث، كما توفر مواد تعليمية جاهزة للمدرسين.",
    objectives: [
      "تعزيز التعلم التشاركي بين الطلاب والمعلمين",
      "تدريب الطلاب على مهارات العرض والبحث والتقديم",
      "توفير مواد تعليمية جاهزة ومتنوعة للمدرسين",
      "بناء مكتبة رقمية من العروض التقديمية المميزة",
    ],
     impact: "ارتفاع جودة الشرح والتفاعل داخل الصف وتعزيز التعلم التشاركي",
    targetAudience: "المعلمون والطلاب في جميع المراحل الدراسية",
    image: presentationImg,
   },
   {
    id: 2,
     icon: Heart,
     title: "100 مشروع تطوعي",
    shortDescription: "طلاب المدرسة ينفذون 100 مشروع تطوعي بسيط (تنظيم، تنظيف، مساعدة، توعية، دعم…)",
    fullDescription: "مبادرة تربوية اجتماعية يقوم فيها طلاب المدرسة بتنفيذ 100 مشروع تطوعي بسيط تشمل التنظيم والتنظيف والمساعدة والتوعية ودعم المحتاجين. تهدف المبادرة إلى تعميق روح المسؤولية المجتمعية وتنمية مهارات القيادة والعمل الجماعي لدى الطلاب.",
    objectives: [
      "تعميق روح المسؤولية المجتمعية لدى الطلاب",
      "تنمية مهارات القيادة والعمل الجماعي",
      "تعزيز قيم التعاون والإيثار والمبادرة",
      "ربط الطالب بمجتمعه وبيئته المحلية",
    ],
     impact: "مدرسة متعاونة يسودها احترام وانتماء قوي وروح المسؤولية المجتمعية",
    targetAudience: "طلاب المرحلة المتوسطة والثانوية",
    image: volunteerImg,
   },
   {
    id: 3,
     icon: Video,
     title: "100 مقطع فيديو توعوي",
    shortDescription: "إنتاج مقاطع قصيرة من الطلاب حول موضوعات أخلاقية، تربوية، اجتماعية، وصحية",
    fullDescription: "مبادرة إعلامية إبداعية يقوم فيها الطلاب بإنتاج 100 مقطع فيديو قصير حول موضوعات أخلاقية وتربوية واجتماعية وصحية. تهدف إلى تعزيز مهارات التصوير والمونتاج لدى الطلاب ونشر ثقافة التوعية بطريقة جذابة ومؤثرة.",
    objectives: [
      "تعزيز مهارات التصوير والمونتاج لدى الطلاب",
      "نشر ثقافة التوعية بطريقة جذابة ومؤثرة",
      "إبراز مواهب الطلاب في الإنتاج المرئي",
      "بناء محتوى توعوي يخدم المجتمع المدرسي",
    ],
     impact: "رفع مستوى الوعي والسلوكيات الإيجابية داخل المدرسة",
    targetAudience: "الطلاب المهتمون بالإعلام والإنتاج المرئي",
    image: videoImg,
   },
   {
    id: 4,
     icon: Globe,
     title: "100 موقع ويب إبداعي",
    shortDescription: "الطلاب والمعلمون يصممون مواقع بسيطة عبر أدوات AI في موضوعات من اختيارهم",
    fullDescription: "مبادرة تقنية مبتكرة يقوم فيها الطلاب والمعلمون بتصميم 100 موقع ويب بسيط باستخدام أدوات الذكاء الاصطناعي في موضوعات متنوعة من اختيارهم (توعوي، تعليمي، شخصي). تهدف إلى تنمية المهارات الرقمية وبناء منتجات إلكترونية ذات قيمة.",
    objectives: [
      "تنمية المهارات الرقمية والتقنية لدى الطلاب",
      "بناء منتجات إلكترونية ذات قيمة ومحتوى مفيد",
      "تعزيز الإبداع التقني واستخدام أدوات AI",
      "إعداد جيل قادر على التعامل مع التحول الرقمي",
    ],
     impact: "مدرسة مواكبة للتحول الرقمي وتنتج محتوى عالي الجودة",
    targetAudience: "الطلاب والمعلمون المهتمون بالتقنية",
    image: websiteImg,
   },
   {
    id: 5,
     icon: Mail,
     title: "100 رسالة شكر",
    shortDescription: "الطلاب يكتبون رسالة تقدير 100 لمعلميهم، أولياء أمورهم، أصدقائهم وزملائهم",
    fullDescription: "مبادرة إنسانية راقية يقوم فيها الطلاب بكتابة 100 رسالة تقدير وشكر لمعلميهم وأولياء أمورهم وأصدقائهم وزملائهم. تهدف إلى تعزيز قيمة الامتنان وتقوية الروابط الإنسانية داخل المجتمع المدرسي وخلق أجواء إيجابية.",
    objectives: [
      "تعزيز قيمة الامتنان والتقدير لدى الطلاب",
      "تقوية الروابط الإنسانية داخل المدرسة",
      "خلق أجواء إيجابية تخفف السلوكيات السلبية",
      "تنمية مهارات التعبير الكتابي والعاطفي",
    ],
     impact: "أجواء إيجابية تخفف السلوكيات السلبية وترفع الاحترام المتبادل",
    targetAudience: "جميع الطلاب في كافة المراحل الدراسية",
    image: thanksImg,
   },
   {
    id: 6,
     icon: FileEdit,
     title: "100 مقال مفيد",
    shortDescription: "مقالات يكتبها الطلاب بأنفسهم في منصة مدرسية خاصة، مع التأكد من أصالتها",
    fullDescription: "مبادرة ثقافية معرفية يقوم فيها الطلاب بكتابة 100 مقال مفيد بأنفسهم في منصة مدرسية خاصة، مع التأكد من أصالتها عبر أدوات كشف الذكاء الاصطناعي. تهدف إلى تنمية مهارات الكتابة والبحث وتعزيز حب القراءة والتأليف وبناء مكتبة معرفية مدرسية.",
    objectives: [
      "تنمية مهارات الكتابة والبحث لدى الطلاب",
      "تعزيز حب القراءة والتأليف والإنتاج المعرفي",
      "بناء مكتبة معرفية مدرسية متنوعة المحتوى",
      "تشجيع الأصالة والإبداع في الكتابة",
    ],
     impact: "جيل قارئ وواعٍ قادر على التعبير والتحليل",
    targetAudience: "الطلاب الموهوبون في الكتابة والتأليف",
    image: articleImg,
   },
   {
    id: 7,
     icon: FileText,
     title: "100 سيرة ذاتية احترافية",
    shortDescription: "كل طالب يصمم سيرته الذاتية بصيغة PDF أو موقع شخصي يوضح مهاراته وأهدافه",
    fullDescription: "مبادرة مهنية تطويرية يقوم فيها كل طالب بتصميم سيرته الذاتية بصيغة PDF أو موقع شخصي يوضح مهاراته وشهاداته وأهدافه المستقبلية. تهدف إلى بناء الهوية المهنية للطالب ورفع جاهزيته للفرص الجامعية والتطوعية والوظيفية المستقبلية.",
    objectives: [
      "بناء الهوية المهنية للطالب منذ المرحلة الدراسية",
      "اكتشاف مواهب ومهارات الطلاب وتوثيقها",
      "رفع جاهزية الطالب للفرص الجامعية والتطوعية",
      "تعليم الطلاب أساسيات التسويق الذاتي",
    ],
     impact: "بناء الهوية المهنية ورفع جاهزية الطالب للفرص الجامعية والتطوعية",
    targetAudience: "طلاب المرحلة الثانوية والمتوسطة",
    image: resumeImg,
   },
   {
    id: 8,
     icon: Lightbulb,
     title: "100 فكرة ابتكارية",
    shortDescription: "الطلاب والمعلمون يقدمون 100 فكرة لتحسين التعليم والأنشطة والبيئة المدرسية",
    fullDescription: "مبادرة ابتكارية يقوم فيها الطلاب والمعلمون بتقديم 100 فكرة مبتكرة لتحسين التعليم والأنشطة والبيئة المدرسية، وتُعرض في معرض الابتكار المئوي. تهدف إلى تنمية التفكير التصميمي وتوفير حلول حقيقية للمشكلات المدرسية.",
    objectives: [
      "تنمية مهارات التفكير التصميمي والابتكاري",
      "توفير حلول حقيقية للمشكلات المدرسية",
      "إشراك الطلاب والمعلمين في تطوير المدرسة",
      "إقامة معرض الابتكار المئوي السنوي",
    ],
     impact: "أفكار تُطبق فعلياً وتساهم في رفع جودة المدرسة",
    targetAudience: "جميع منسوبي المدرسة من طلاب ومعلمين",
    image: innovationImg,
   },
   {
    id: 9,
     icon: Image,
     title: "100 صورة احترافية",
    shortDescription: "يصنع الطلاب 100 صورة احترافية تعبر عن رسائل ومفاهيم تربوية وجمالية",
    fullDescription: "مبادرة فنية إبداعية يصنع فيها الطلاب 100 صورة احترافية (تصوير – تصميم – تعديل) تعبر عن رسائل ومشاعر ومفاهيم تربوية وجمالية. تهدف إلى تنمية مهارات التصوير والإبداع البصري وتعزيز الإحساس الفني والجمالي لدى الطلاب.",
    objectives: [
      "تنمية مهارات التصوير والإبداع البصري",
      "تعزيز الإحساس الفني والجمالي لدى الطلاب",
      "تدريب الطلاب على معالجة الصور وتقنيات الإخراج",
      "إبراز المواهب الفنية في المدرسة",
    ],
     impact: "معرض بصري مذهل يبرز مواهب المدرسة الفنية",
    targetAudience: "الطلاب المهتمون بالتصوير والفنون البصرية",
    image: photographyImg,
   },
 ];
 
// Animation variants for staggered cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

interface InitiativeCardProps {
  initiative: Initiative;
  onReadMore: (initiative: Initiative) => void;
}

const InitiativeCard = ({ initiative, onReadMore }: InitiativeCardProps) => {
  const Icon = initiative.icon;
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 group cursor-pointer"
      onClick={() => onReadMore(initiative)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={initiative.image}
          alt={initiative.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-edu-navy/80 to-transparent" />
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-cairo font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {initiative.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {initiative.shortDescription}
        </p>
        
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-primary mb-1">الأثر المتوقع:</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{initiative.impact}</p>
        </div>

        <Button 
          variant="ghost" 
          className="text-primary hover:text-primary hover:bg-primary/10 gap-2 p-0 h-auto font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            onReadMore(initiative);
          }}
        >
          <span>اقرأ المزيد</span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -5 }}
          >
            ←
          </motion.span>
        </Button>
      </div>
    </motion.div>
  );
};

 const Initiatives = () => {
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);

   return (
     <Layout>
       {/* Hero Section */}
      <section className="bg-gradient-edu py-24">
         <div className="container-custom px-4 md:px-8">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-center text-white max-w-3xl mx-auto"
           >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              9 مبادرات مئوية مبتكرة
            </motion.span>
             <h1 className="text-4xl md:text-5xl font-cairo font-bold mb-6">المبادرات النوعية</h1>
             <p className="text-lg text-white/90 leading-relaxed">
              مبادرات مئوية مبتكرة تسهم في تطوير مهارات الطلاب وإثراء البيئة التعليمية وتعزيز روح المشاركة والإبداع. تمنح الطلاب فرصة حقيقية لاكتساب مهارات الإلقاء وتعزيز الثقة بالنفس وتنمية قدرتهم على التعبير والعرض أمام الآخرين.
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Intro Section */}
      <section className="py-16 bg-muted/30">
         <div className="container-custom">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/30">
              <div className="text-center">
                <p className="text-3xl font-cairo font-bold text-primary">900</p>
                <p className="text-sm text-muted-foreground">منجز مستهدف</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-cairo font-bold text-primary">9</p>
                <p className="text-sm text-muted-foreground">مبادرات متنوعة</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-cairo font-bold text-primary">+600</p>
                <p className="text-sm text-muted-foreground">مستفيد متوقع</p>
              </div>
            </div>
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
 
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
             {initiatives.map((initiative, index) => (
               <InitiativeCard
                 key={index}
                initiative={initiative}
                onReadMore={setSelectedInitiative}
               />
             ))}
          </motion.div>
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
 
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
             {[
               {
                icon: Target,
                 title: "الارتقاء بجودة التعليم",
                 description: "تطوير أداء المعلمين والطلاب عبر برامج تدريبية وورش ومبادرات عملية",
               },
               {
                icon: Globe,
                 title: "بناء محتوى رقمي أصيل",
                 description: "إنتاج المواقع والمقاطع والكتب لتشكل مكتبة رقمية ثرية تعكس تميز المدرسة",
               },
               {
                icon: Heart,
                 title: "تعزيز الانتماء والتحفيز",
                 description: "إبراز منجزات العاملين والطلاب يمنح الجميع دافعاً عميقاً للعطاء",
               },
               {
                icon: Sparkles,
                 title: "دعم التحول التقني",
                 description: "من المواقع الإلكترونية إلى الشات بوت التعليمي لتصبح المدرسة نموذجاً حديثاً",
               },
            ].map((item) => (
               <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-colors hover:bg-white/15"
               >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                 <h3 className="text-xl font-cairo font-bold text-white mb-3">{item.title}</h3>
                 <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
               </motion.div>
             ))}
          </motion.div>
         </div>
       </section>

      {/* Initiative Detail Dialog */}
      <Dialog open={!!selectedInitiative} onOpenChange={() => setSelectedInitiative(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedInitiative && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl font-cairo">
                  <div className="icon-container">
                    <selectedInitiative.icon className="w-6 h-6" />
                  </div>
                  {selectedInitiative.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={selectedInitiative.image}
                    alt={selectedInitiative.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-cairo font-bold text-lg text-foreground mb-3">الوصف</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedInitiative.fullDescription}
                  </p>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="font-cairo font-bold text-lg text-foreground mb-3">الأهداف</h4>
                  <ul className="space-y-2">
                    {selectedInitiative.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Audience */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="font-cairo font-bold text-foreground">الفئة المستهدفة</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">{selectedInitiative.targetAudience}</p>
                </div>

                {/* Impact */}
                <div className="bg-gradient-edu rounded-xl p-4 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5" />
                    <h4 className="font-cairo font-bold">الأثر المتوقع</h4>
                  </div>
                  <p className="text-white/90 text-sm">{selectedInitiative.impact}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
     </Layout>
   );
 };
 
 export default Initiatives;