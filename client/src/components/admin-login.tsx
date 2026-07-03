import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/admin/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Başarılı!",
        description: data.message,
      });
      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard";
    },
    onError: () => {
      toast({
        title: "Hata!",
        description: "Kullanıcı adı veya şifre hatalı! Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Uyarı!",
        description: "Lütfen kullanıcı adı ve şifre girin.",
        variant: "destructive",
      });
      return;
    }

    loginMutation.mutate({
      username: formData.username,
      password: formData.password
    });
  };

  return (
    <div>
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-xl font-heading font-bold text-slate-800 mb-6 text-center">Admin Girişi</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password">Şifre</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700"
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, remember: checked as boolean }))
                  }
                />
                <Label htmlFor="remember" className="text-sm text-slate-600">Beni Hatırla</Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-slate-800 text-white hover:bg-slate-900"
                disabled={loginMutation.isPending}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
