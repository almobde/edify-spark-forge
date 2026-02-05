 import { motion } from "framer-motion";
 import { LucideIcon } from "lucide-react";
 
 interface FeatureCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   delay?: number;
 }
 
 const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
   return (
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay }}
       className="bg-card rounded-2xl p-6 shadow-lg border border-border/30 card-hover group"
     >
       <div className="icon-container mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
         <Icon size={28} />
       </div>
       <h3 className="text-xl font-cairo font-bold text-foreground mb-3">{title}</h3>
       <p className="text-muted-foreground leading-relaxed">{description}</p>
     </motion.div>
   );
 };
 
 export default FeatureCard;