import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

const ADMIN_EMAIL = "admin@reyada-initiative.sa";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setIsSubmitting(true);

    const { error } = await signIn(ADMIN_EMAIL, password);

    if (error) {
      toast({
        title: "خطأ في الدخول",
        description: "كلمة المرور غير صحيحة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "تم تسجيل الدخول",
      description: "جاري التحقق من الصلاحيات...",
    });

    setTimeout(() => {
      navigate("/admin");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-edu-navy via-edu-navy/95 to-primary/20 p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-14 h-14" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">لوحة الإدارة</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              أدخل كلمة المرور للمتابعة
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الدخول...
                </>
              ) : (
                "دخول"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}