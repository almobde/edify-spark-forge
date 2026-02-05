 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useAuth } from "@/contexts/AuthContext";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { useToast } from "@/hooks/use-toast";
 import { Loader2, Shield } from "lucide-react";
 import logo from "@/assets/logo.png";
 
 export default function AdminLogin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { signIn } = useAuth();
   const navigate = useNavigate();
   const { toast } = useToast();
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
 
     const { error } = await signIn(email, password);
 
     if (error) {
       toast({
         title: "خطأ في تسجيل الدخول",
         description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
         variant: "destructive",
       });
       setIsSubmitting(false);
       return;
     }
 
     // Check if user is admin after successful login
     toast({
       title: "تم تسجيل الدخول",
       description: "جاري التحقق من الصلاحيات...",
     });
 
     // Small delay to allow auth state to update
     setTimeout(() => {
       navigate("/admin");
     }, 500);
   };
 
   return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-edu-navy via-edu-navy/95 to-primary/20 p-4">
       <Card className="w-full max-w-md shadow-2xl border-0">
         <CardHeader className="text-center space-y-4">
           <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
             <img src={logo} alt="Logo" className="w-14 h-14" />
           </div>
           <div className="space-y-2">
             <CardTitle className="text-2xl font-cairo">لوحة الإدارة</CardTitle>
             <CardDescription className="flex items-center justify-center gap-2">
               <Shield className="h-4 w-4" />
               تسجيل دخول المشرفين فقط
             </CardDescription>
           </div>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit} className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="email">البريد الإلكتروني</Label>
               <Input
                 id="email"
                 type="email"
                 placeholder="admin@example.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 dir="ltr"
                 className="text-left"
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="password">كلمة المرور</Label>
               <Input
                 id="password"
                 type="password"
                 placeholder="••••••••"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 dir="ltr"
                 className="text-left"
               />
             </div>
             <Button
               type="submit"
               className="w-full"
               disabled={isSubmitting}
             >
               {isSubmitting ? (
                 <>
                   <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                   جاري تسجيل الدخول...
                 </>
               ) : (
                 "تسجيل الدخول"
               )}
             </Button>
           </form>
         </CardContent>
       </Card>
     </div>
   );
 }