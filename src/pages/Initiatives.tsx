import { useState, useEffect } from "react";
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
  LucideIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  Presentation, Heart, Video, Globe, Mail, FileEdit, Image, FileText,
  Lightbulb, Sparkles, Target, Users,
};

const getIcon = (name: string | null): LucideIcon => (name && iconMap[name]) || Lightbulb;

interface DbInitiative {
  id: string;
  icon: string | null;
  title: string;
  short_description: string | null;
  full_description: string | null;
  objectives: string[] | null;
  impact: string | null;
  target_audience: string | null;
  image_url: string | null;
}

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
  initiative: DbInitiative;
  onReadMore: (initiative: DbInitiative) => void;
}

const InitiativeCard = ({ initiative, onReadMore }: InitiativeCardProps) => {
  const Icon = getIcon(initiative.icon);
  
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
        {initiative.image_url ? (
          <img
            src={initiative.image_url}
            alt={initiative.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-edu" />
        )}
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
          {initiative.short_description}
        </p>
        
        {initiative.impact && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-xs font-semibold text-primary mb-1">الأثر المتوقع:</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{initiative.impact}</p>
          </div>
        )}

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
  const [selectedInitiative, setSelectedInitiative] = useState<DbInitiative | null>(null);
  const [initiatives, setInitiatives] = useState<DbInitiative[]>([]);

  useEffect(() => {
    const fetchInitiatives = async () => {
      const { data } = await supabase
        .from("initiatives")
        .select("*")
        .eq("is_visible", true)
        .order("order_index");
      if (data) setInitiatives(data);
    };
    fetchInitiatives();
  }, []);

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
            {initiatives.map((initiative) => (
              <InitiativeCard
                key={initiative.id}
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
          {selectedInitiative && (() => {
            const Icon = getIcon(selectedInitiative.icon);
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-cairo">
                    <div className="icon-container">
                      <Icon className="w-6 h-6" />
                    </div>
                    {selectedInitiative.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image */}
                  {selectedInitiative.image_url && (
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={selectedInitiative.image_url}
                        alt={selectedInitiative.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  {/* Description */}
                  {selectedInitiative.full_description && (
                    <div>
                      <h4 className="font-cairo font-bold text-lg text-foreground mb-3">الوصف</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedInitiative.full_description}
                      </p>
                    </div>
                  )}

                  {/* Objectives */}
                  {selectedInitiative.objectives && selectedInitiative.objectives.length > 0 && (
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
                  )}

                  {/* Target Audience */}
                  {selectedInitiative.target_audience && (
                    <div className="bg-muted rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-primary" />
                        <h4 className="font-cairo font-bold text-foreground">الفئة المستهدفة</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">{selectedInitiative.target_audience}</p>
                    </div>
                  )}

                  {/* Impact */}
                  {selectedInitiative.impact && (
                    <div className="bg-gradient-edu rounded-xl p-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5" />
                        <h4 className="font-cairo font-bold">الأثر المتوقع</h4>
                      </div>
                      <p className="text-white/90 text-sm">{selectedInitiative.impact}</p>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Initiatives;
