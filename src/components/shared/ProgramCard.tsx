import { motion } from "framer-motion";
import { LucideIcon, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  category: "teachers" | "students" | "digital";
  duration?: string;
  imageUrl?: string;
  delay?: number;
}

const categoryStyles = {
  teachers: { label: "للمعلمين", color: "bg-primary text-primary-foreground" },
  students: { label: "للطلاب", color: "bg-secondary text-secondary-foreground" },
  digital: { label: "التحول الذكي", color: "bg-accent text-accent-foreground" },
};

const ProgramCard = ({ icon: Icon, title, description, category, duration, imageUrl, delay = 0 }: ProgramCardProps) => {
  const { label, color } = categoryStyles[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 card-hover flex flex-col h-full"
    >
      {/* Image or gradient header */}
      <div className="relative h-40 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-edu" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge className={`${color} font-medium`}>{label}</Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            <Icon size={22} />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-cairo font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{description}</p>

        {duration && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm pt-3 border-t border-border/30">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProgramCard;
