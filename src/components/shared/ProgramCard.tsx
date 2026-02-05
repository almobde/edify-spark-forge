 import { motion } from "framer-motion";
 import { LucideIcon, Users, Clock } from "lucide-react";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 
 interface ProgramCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   category: "teachers" | "students" | "digital";
   duration?: string;
   delay?: number;
 }
 
 const categoryStyles = {
   teachers: { label: "للمعلمين", color: "bg-primary text-primary-foreground" },
   students: { label: "للطلاب", color: "bg-secondary text-secondary-foreground" },
   digital: { label: "التحول الذكي", color: "bg-accent text-accent-foreground" },
 };
 
 const ProgramCard = ({ icon: Icon, title, description, category, duration, delay = 0 }: ProgramCardProps) => {
   const { label, color } = categoryStyles[category];
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay }}
       className="bg-card rounded-2xl p-6 shadow-lg border border-border/30 card-hover flex flex-col h-full"
     >
       <div className="flex items-start justify-between mb-4">
         <div className="icon-container">
           <Icon size={28} />
         </div>
         <Badge className={`${color} font-medium`}>{label}</Badge>
       </div>
 
       <h3 className="text-lg font-cairo font-bold text-foreground mb-3">{title}</h3>
       <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{description}</p>
 
       <div className="flex items-center justify-between pt-4 border-t border-border/30">
         {duration && (
           <div className="flex items-center gap-2 text-muted-foreground text-sm">
             <Clock size={16} />
             <span>{duration}</span>
           </div>
         )}
         <Button variant="outline" size="sm" className="gap-2">
           <Users size={16} />
           التسجيل
         </Button>
       </div>
     </motion.div>
   );
 };
 
 export default ProgramCard;