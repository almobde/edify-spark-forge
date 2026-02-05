 import { useAuth } from "@/contexts/AuthContext";
 import { useNavigate } from "react-router-dom";
 import { useEffect } from "react";
 
 export function useAdmin() {
   const { user, isAdmin, isLoading } = useAuth();
   const navigate = useNavigate();
 
   useEffect(() => {
     if (!isLoading && (!user || !isAdmin)) {
       navigate("/admin/login");
     }
   }, [user, isAdmin, isLoading, navigate]);
 
   return { user, isAdmin, isLoading };
 }