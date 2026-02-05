 import { ReactNode } from "react";
 import { Navigate } from "react-router-dom";
 import { useAuth } from "@/contexts/AuthContext";
 import { Loader2 } from "lucide-react";
 
 interface ProtectedRouteProps {
   children: ReactNode;
 }
 
 export default function ProtectedRoute({ children }: ProtectedRouteProps) {
   const { user, isAdmin, isLoading } = useAuth();
 
   if (isLoading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
     );
   }
 
   if (!user || !isAdmin) {
     return <Navigate to="/admin/login" replace />;
   }
 
   return <>{children}</>;
 }