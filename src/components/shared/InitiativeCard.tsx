 import { motion } from "framer-motion";
 import { LucideIcon, ArrowLeft } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface InitiativeCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   impact?: string;
   delay?: number;
 }
 
 const InitiativeCard = ({ icon: Icon, title, description, impact, delay = 0 }: InitiativeCardProps) => {
   return (
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay }}
       className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/30 card-hover group"
     >
       {/* Header */}
       <div className="bg-gradient-edu p-6 text-white">
         <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
           <Icon size={28} />
         </div>
         <h3 className="text-xl font-cairo font-bold">{title}</h3>
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