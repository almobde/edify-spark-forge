 import { motion } from "framer-motion";
 
 interface SectionHeaderProps {
   title: string;
   subtitle?: string;
   centered?: boolean;
   light?: boolean;
 }
 
 const SectionHeader = ({ title, subtitle, centered = true, light = false }: SectionHeaderProps) => {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5 }}
       className={`mb-12 ${centered ? "text-center" : ""}`}
     >
       <h2 className={`text-3xl md:text-4xl font-cairo font-bold mb-4 ${light ? "text-white" : "text-foreground"}`}>
         {title}
       </h2>
       {subtitle && (
         <p className={`text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-white/80" : "text-muted-foreground"}`}>
           {subtitle}
         </p>
       )}
       <div className={`h-1 w-24 bg-gradient-edu rounded-full mt-6 ${centered ? "mx-auto" : ""}`} />
     </motion.div>
   );
 };
 
 export default SectionHeader;