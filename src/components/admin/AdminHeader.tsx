 import { Menu, Bell } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useAuth } from "@/contexts/AuthContext";
 import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 
 interface AdminHeaderProps {
   onMenuClick: () => void;
 }
 
 export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
   const { user } = useAuth();
 
   const getInitials = (email: string) => {
     return email.charAt(0).toUpperCase();
   };
 
   return (
     <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
       <Button
         variant="ghost"
         size="icon"
         className="lg:hidden"
         onClick={onMenuClick}
       >
         <Menu className="h-5 w-5" />
       </Button>
 
       <div className="flex-1" />
 
       <div className="flex items-center gap-4">
         <Button variant="ghost" size="icon" className="relative">
           <Bell className="h-5 w-5" />
         </Button>
 
         <div className="flex items-center gap-3">
           <Avatar className="h-8 w-8">
             <AvatarFallback className="bg-primary text-primary-foreground text-sm">
               {user?.email ? getInitials(user.email) : "A"}
             </AvatarFallback>
           </Avatar>
           <span className="text-sm font-medium hidden sm:block">
             {user?.email}
           </span>
         </div>
       </div>
     </header>
   );
 }