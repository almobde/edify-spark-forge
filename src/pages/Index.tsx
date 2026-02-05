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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import StatsCard from "@/components/shared/StatsCard";
import FeatureCard from "@/components/shared/FeatureCard";
import InitiativeCard from "@/components/shared/InitiativeCard";
import ProgramCard from "@/components/shared/ProgramCard";
import heroBg from "@/assets/hero-bg.jpg";

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

// Programs Data
const programs = [
  {
    icon: Presentation,
    title: "تدريب المدربين TOT",
    description: "برنامج متقدم لتأهيل القادة التربويين وإكسابهم مهارات التدريب الاحترافي",
    category: "teachers" as const,
    duration: "5 أيام",
  },
  {
    icon: Brain,
    title: "توظيف الذكاء الاصطناعي",
    description: "دورة شاملة في استخدام أدوات الذكاء الاصطناعي في العملية التعليمية",
    category: "teachers" as const,
    duration: "3 أيام",
  },
  {
    icon: Lightbulb,
    title: "التفكير الإبداعي وحل المشكلات",
    description: "تطوير مهارات التفكير الإبداعي والنقدي لدى الطلاب",
    category: "students" as const,
    duration: "يومين",
  },
  {
    icon: Globe,
    title: "برمجة المواقع الإلكترونية",
    description: "تعلم أساسيات تطوير المواقع باستخدام أحدث التقنيات",
    category: "digital" as const,
    duration: "4 أيام",
  },
];

// Initiatives Data
const initiatives = [
  {
    icon: Presentation,
    title: "100 عرض تقديمي تعليمي",
    description: "إنشاء 100 عرض بوربوينت يقدمها المعلمون أو الطلاب، تُستخدم في الدروس وتُتاح للجميع",
    impact: "ارتفاع جودة الشرح والتفاعل داخل الصف",
  },
  {
    icon: Heart,
    title: "100 مشروع تطوعي",
    description: "طلاب المدرسة ينفذون 100 مشروع تطوعي بسيط (تنظيم، تنظيف، مساعدة، توعية، دعم…)",
    impact: "مدرسة متعاونة يسودها احترام وانتماء قوي",
  },
  {
    icon: FileEdit,
    title: "100 مقال مفيد",
    description: "مقالات يكتبها الطلاب بأنفسهم في منصة مدرسية خاصة، مع التأكد من أصالتها",
    impact: "جيل قارئ وواع قادر على التعبير والتحليل",
  },
  {
    icon: Image,
    title: "100 صورة احترافية",
    description: "يصنعون الطلاب صورة احترافية (تصوير – تصميم – تعديل) تعبر عن رسائل ومفاهيم تربوية",
    impact: "معرض بصري مذهل يبرز مواهب المدرسة الفنية",
  },
];

const Index = () => {
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
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Content */}
        <div className="relative container-custom px-4 md:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-full text-sm font-bold mb-6">
                مبادرة تعليمية رائدة
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold text-white leading-tight mb-6"
            >
              مبادرة الريادة والإبداع
              <br />
              <span className="text-secondary">للتطوير المهني</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            >
              مبادرة نوعية لتعزيز التطوير المهني للمعلمين وتنمية المهارات التربوية والشخصية لدى الطلاب ضمن بيئة تعليمية محفزة على الإبداع والتميز، مع توظيف الذكاء الاصطناعي والتقنية الحديثة
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/about">
                <Button size="lg" className="btn-gradient gap-2">
                  <span>اكتشف المزيد</span>
                  <ChevronLeft size={20} />
                </Button>
              </Link>
              <Link to="/programs">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  البرامج والدورات
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-edu rounded-2xl p-8 text-white"
            >
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-cairo font-bold mb-4">الرؤية</h3>
              <p className="text-white/90 leading-relaxed">
                أن تصبح الشركة نموذجاً وطنياً رائداً في تطبيق الذكاء الاصطناعي، تعتمد على البيانات والتخصيص، وتقديم بيئة تعليمية مبتكرة تتيح تحقيق مستويات أعلى من الأداء للمعلمين والطلاب وأساليب التعليم والابتكار
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border/30"
            >
              <div className="icon-container mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-cairo font-bold text-foreground mb-4">الرسالة</h3>
              <p className="text-muted-foreground leading-relaxed">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                icon={program.icon}
                title={program.title}
                description={program.description}
                category={program.category}
                duration={program.duration}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <div className="text-center mt-12">
            <Link to="/initiatives">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                <span>استكشف جميع المبادرات</span>
                <ChevronLeft size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-edu">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-cairo font-bold text-white mb-6">
              انضم إلينا في رحلة التطوير والإبداع
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              كن جزءاً من مبادرتنا وساهم في بناء مستقبل تعليمي مشرق
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold gap-2">
                  <MessageSquare size={20} />
                  تواصل معنا
                </Button>
              </Link>
              <a href="https://wa.me/966555255837" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
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
