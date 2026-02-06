import { useState, useEffect } from "react";
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
  LucideIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import ProgramCard from "@/components/shared/ProgramCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Presentation, Brain, Lightbulb, Globe, Mic, Code, Sparkles, BookOpen, GraduationCap, Users,
};

interface Program {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  duration: string | null;
  icon: string | null;
  image_url: string | null;
  order_index: number | null;
}

const Programs = () => {
  const [activeTab, setActiveTab] = useState("teachers");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("is_visible", true)
        .order("order_index");
      if (!error && data) setPrograms(data);
      setIsLoading(false);
    };
    fetchPrograms();
  }, []);

  const getIcon = (iconName: string | null): LucideIcon => {
    return (iconName && iconMap[iconName]) || BookOpen;
  };

  const filterByCategory = (cat: string) => programs.filter(p => p.category === cat);

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

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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

              {["teachers", "students", "digital"].map(cat => (
                <TabsContent key={cat} value={cat}>
                  <div className={`grid ${cat === "digital" ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-2 lg:grid-cols-4"} gap-6`}>
                    {filterByCategory(cat).map((program, index) => (
                      <ProgramCard
                        key={program.id}
                        icon={getIcon(program.icon)}
                        title={program.title}
                        description={program.description || ""}
                        category={cat as "teachers" | "students" | "digital"}
                        duration={program.duration || undefined}
                        imageUrl={program.image_url || undefined}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
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
