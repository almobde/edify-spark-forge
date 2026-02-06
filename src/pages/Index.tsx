import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Lightbulb,
  Target,
  BookOpen,
  Cpu,
  Award,
  TrendingUp,
  ChevronLeft,
  Brain,
  Presentation,
  FileEdit,
  Globe,
  Heart,
  PenTool,
  Image,
  MessageSquare,
  Sparkles,
   Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import StatsCard from "@/components/shared/StatsCard";
import FeatureCard from "@/components/shared/FeatureCard";
import InitiativeCard from "@/components/shared/InitiativeCard";
import ProgramCard from "@/components/shared/ProgramCard";
import heroBg from "@/assets/hero-bg.jpg";
import nameCalligraphy from "@/assets/name-calligraphy.png";
import { supabase } from "@/integrations/supabase/client";
import { LucideIcon } from "lucide-react";
// Stats Data
const stats = [
  { icon: Users, value: "+600", label: "مستفيد" },
  { icon: GraduationCap, value: "+20", label: "دورة تدريبية" },
  { icon: Lightbulb, value: "+400", label: "مبادرة مئوية" },
  { icon: Award, value: "+10", label: "برنامج متميز" },
];

// Features Data
const features = [
  {
    icon: Brain,
    title: "الذكاء الاصطناعي في التعليم",
    description: "توظيف أحدث تقنيات الذكاء الاصطناعي لتعزيز تجربة التعلم وتحسين مخرجات التعليم",
  },
  {
    icon: GraduationCap,
    title: "تطوير مهارات المعلمين",
    description: "برامج تدريبية متخصصة لرفع كفاءة المعلمين وتحسين أساليبهم التدريسية",
  },
  {
    icon: Lightbulb,
    title: "تنمية الإبداع والابتكار",
    description: "تهيئة بيئة تعليمية داعمة تشجع الطلاب على تنفيذ مشاريع مبتكرة",
  },
  {
    icon: TrendingUp,
    title: "رفع مستوى التحصيل",
    description: "الاستفادة من منصات ذكية لمتابعة تقدم كل طالب وتقديم أساليب تعلم مناسبة",
  },
];

const iconMap: Record<string, LucideIcon> = {
  Presentation, Brain, Lightbulb, Globe, Heart, FileEdit, Image, PenTool,
  GraduationCap, Users, Award, TrendingUp, BookOpen, Cpu, Target,
};

const getIcon = (name: string | null): LucideIcon => (name && iconMap[name]) || Lightbulb;
const Index = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [dbPrograms, setDbPrograms] = useState<any[]>([]);
  const [dbInitiatives, setDbInitiatives] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [videoRes, programsRes, initiativesRes] = await Promise.all([
        supabase.from("site_settings").select("value").eq("key", "intro_video_url").maybeSingle(),
        supabase.from("programs").select("*").eq("is_visible", true).order("order_index").limit(4),
        supabase.from("initiatives").select("*").eq("is_visible", true).order("order_index").limit(4),
      ]);
      if (videoRes.data?.value) setVideoUrl(videoRes.data.value);
      if (programsRes.data) setDbPrograms(programsRes.data);
      if (initiativesRes.data) setDbInitiatives(initiativesRes.data);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-edu-navy/90 via-edu-navy/65 to-edu-navy/90" />

        {/* Content */}
        <div className="relative container-custom px-4 md:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 text-center"
            >
              مبادرة الريادة والإبداع
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center mb-2"
            >
              <span className="text-lg sm:text-xl font-bold" style={{ color: "hsl(45, 90%, 55%)" }}>مع المدرب</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <img
                src={nameCalligraphy}
                alt="عبدالعزيز بن محمد الخنين"
                className="h-20 sm:h-24 md:h-32 lg:h-36 w-auto brightness-0 invert"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(15deg)" }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
               className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed"
            >
              مبادرة نوعية لتعزيز التطوير المهني للمعلمين وتنمية المهارات التربوية والشخصية لدى الطلاب ضمن بيئة تعليمية محفزة على الإبداع والتميز، مع توظيف الذكاء الاصطناعي والتقنية الحديثة
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
               className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link to="/about">
                <Button size="lg" className="btn-gradient gap-2">
                  <span>اكتشف المزيد</span>
                  <ChevronLeft size={20} />
                </Button>
              </Link>
              <Link to="/programs">
                 <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto">
                  البرامج والدورات
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

       {/* Video Section */}
       <section className="section-padding bg-card">
         <div className="container-custom">
           <SectionHeader
             title="تعرف على المبادرة"
             subtitle="شاهد الفيديو التعريفي لمعرفة المزيد عن رؤيتنا وأهدافنا"
           />

           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="max-w-4xl mx-auto"
           >
             <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-edu-navy group">
               {showVideo && videoUrl ? (
                 <iframe
                   src={videoUrl
                     .replace("youtube.com/watch?v=", "youtube.com/embed/")
                     .replace("youtu.be/", "youtube.com/embed/")
                     .replace("youtube.com/shorts/", "youtube.com/embed/")
                   }
                   className="absolute inset-0 w-full h-full"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                   title="فيديو تعريفي بالمبادرة"
                 />
               ) : (
                 <div className="cursor-pointer absolute inset-0" onClick={() => videoUrl && setShowVideo(true)}>
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <motion.div
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.95 }}
                       className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:bg-white transition-colors"
                     >
                       <Play className="w-8 h-8 md:w-10 md:h-10 text-primary mr-[-4px]" fill="currentColor" />
                     </motion.div>
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-edu-navy/90 to-transparent">
                     <h3 className="text-white text-xl font-bold">فيديو تعريفي بالمبادرة</h3>
                     <p className="text-white/80 text-sm mt-1">اضغط للمشاهدة</p>
                   </div>
                 </div>
               )}
             </div>
           </motion.div>
         </div>
       </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="رؤيتنا ورسالتنا"
            subtitle="نسعى لتطوير منظومة تعليمية مبتكرة تواكب تطلعات المستقبل وتنسجم مع رؤية المملكة 2030"
          />

           <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
               className="bg-gradient-edu rounded-2xl p-5 sm:p-8 text-white"
            >
               <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-white/20 flex items-center justify-center mb-4 sm:mb-6">
                 <Target className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
               <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">الرؤية</h3>
               <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                أن تصبح الشركة نموذجاً وطنياً رائداً في تطبيق الذكاء الاصطناعي، تعتمد على البيانات والتخصيص، وتقديم بيئة تعليمية مبتكرة تتيح تحقيق مستويات أعلى من الأداء للمعلمين والطلاب وأساليب التعليم والابتكار
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
               className="bg-card rounded-2xl p-5 sm:p-8 shadow-lg border border-border/30"
            >
               <div className="icon-container mb-4 sm:mb-6">
                 <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
               <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">الرسالة</h3>
               <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                تصميم وتنفيذ برامج تدريبية نوعية ومستدامة تعتمد على أحدث التقنيات، لرفع كفاءة المعلمين والطلاب والإداريين، وتحقيق التميز في المخرجات التعليمية بما يعزز تنافسية المنظمة على المستوى المحلي والعالمي
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <SectionHeader
            title="أهدافنا الاستراتيجية"
            subtitle="نعمل على تحقيق أهداف طموحة تدعم مهارات المستقبل وتحقق تطوراً مستداماً"
          />

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="البرامج والدورات التدريبية"
            subtitle="نقدم مجموعة متنوعة من البرامج التدريبية للمعلمين والطلاب"
          />

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dbPrograms.map((program, index) => (
              <ProgramCard
                key={program.id}
                icon={getIcon(program.icon)}
                title={program.title}
                description={program.description || ""}
                category={(program.category as "teachers" | "students" | "digital") || "teachers"}
                duration={program.duration || undefined}
                imageUrl={program.image_url || undefined}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/programs">
              <Button size="lg" className="btn-gradient gap-2">
                <span>عرض جميع البرامج</span>
                <ChevronLeft size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="section-padding bg-edu-navy">
        <div className="container-custom">
          <SectionHeader
            title="المبادرات النوعية"
            subtitle="مبادرات مئوية مبتكرة تسهم في تطوير مهارات الطلاب وإثراء البيئة التعليمية"
            light
          />

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {dbInitiatives.map((initiative, index) => (
              <InitiativeCard
                key={initiative.id}
                icon={getIcon(initiative.icon)}
                title={initiative.title}
                description={initiative.short_description || ""}
                impact={initiative.impact || undefined}
                imageUrl={initiative.image_url || undefined}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/initiatives">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 font-bold">
                <span>استكشف جميع المبادرات</span>
                <ChevronLeft size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-edu">
         <div className="container-custom text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
             <Sparkles className="w-12 sm:w-16 h-12 sm:h-16 text-white/90 mx-auto mb-4 sm:mb-6" />
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              انضم إلينا في رحلة التطوير والإبداع
            </h2>
             <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              كن جزءاً من مبادرتنا وساهم في بناء مستقبل تعليمي مشرق
            </p>
             <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/contact">
                 <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold gap-2 w-full sm:w-auto">
                  <MessageSquare size={20} />
                  تواصل معنا
                </Button>
              </Link>
              <a href="https://wa.me/966555255837" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold w-full sm:w-auto">
                  واتساب مباشر
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
