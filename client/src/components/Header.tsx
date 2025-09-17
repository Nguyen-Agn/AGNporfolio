import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { LogOut, Plus, Folder, Edit3 } from "lucide-react";
import logoUrl from "@assets/logoX16_1757816161143.png";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    profileImageUrl?: string | null;
    email?: string | null;
  };
}

export default function Header({ isAuthenticated, user }: HeaderProps) {
  const [,setLocation] = useLocation();
  const {toast} = useToast();
  const handleLogin = () => {
    setLocation("/signup")
  };
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
  mutationFn: async () => {
    await apiRequest("POST", "/api/auth/logout");
  },
  onSuccess: () => {
    localStorage.removeItem("token"); 
    queryClient.clear();      // clear toàn bộ cache
    toast({
      title: "Đã đăng xuất",
      description: "Hẹn gặp lại bạn!",
    });
    setLocation("/signup");    // điều hướng
  },
  onError: () => {
    toast({
      title: "Lỗi",
      description: "Không thể đăng xuất. Vui lòng thử lại.",
      variant: "destructive",
    });
  },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // tạo tên ban đầu
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "You";
  };
  const handleHome = () => {
    setLocation("/home");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" data-testid="link-home">
          <div className="flex items-center space-x-3">
            <img src={logoUrl} alt="@GN Logo" className="h-8 w-8" />
            <h1 className="font-heading font-bold text-xl text-primary">@GN</h1>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <Button variant="default" size="sm" data-testid="button-new-portfolio" onClick={handleHome}>
                <Edit3 className="h-4 w-4 mr-2" />
                Profile
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl || ""} />
                      <AvatarFallback className="text-xs">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem data-testid="menu-portfolios">
                    <Folder className="h-4 w-4 mr-2" />
                    Portfolio Của Tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng Xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={handleLogin} data-testid="button-login">
              Đăng Nhập
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}