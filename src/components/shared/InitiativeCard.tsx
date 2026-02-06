import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InitiativeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  impact?: string;
  imageUrl?: string;
  delay?: number;
}

const InitiativeCard = ({ icon: Icon, title, description, impact, imageUrl, delay = 0 }: InitiativeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 card-hover group"
    >
      {/* Header with image */}
      <div className="relative h-40 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-edu" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            <Icon size={28} />
          </div>
        </div>
        <h3 className="absolute bottom-3 left-3 right-16 text-lg font-cairo font-bold text-white">{title}</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
        {impact && (
          <div className="bg-muted rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-primary mb-1">الأثر المتوقع:</p>
            <p className="text-sm text-muted-foreground">{impact}</p>
          </div>
        )}
        <Button variant="ghost" className="text-primary hover:text-primary gap-2 p-0">
          <span>اقرأ المزيد</span>
          <ArrowLeft size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default InitiativeCard;
