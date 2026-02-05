 import { motion } from "framer-motion";
 import { LucideIcon } from "lucide-react";
 
 interface StatsCardProps {
   icon: LucideIcon;
   value: string;
   label: string;
   delay?: number;
 }
 
 const StatsCard = ({ icon: Icon, value, label, delay = 0 }: StatsCardProps) => {
   return (
     <motion.div
       initial={{ opacity: 0, scale: 0.9 }}
       whileInView={{ opacity: 1, scale: 1 }}
       viewport={{ once: true }}
       transition={{ duration: 0.4, delay }}
       className="stats-card text-center card-hover"
     >
       <div className="icon-container mx-auto mb-4">
         <Icon size={28} />
       </div>
       <h3 className="text-3xl md:text-4xl font-cairo font-bold text-primary mb-2">{value}</h3>
       <p className="text-muted-foreground font-medium">{label}</p>
     </motion.div>
   );
 };
 
 export default StatsCard;