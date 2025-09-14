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
import { LogOut, Plus, Folder } from "lucide-react";
import logoUrl from "@assets/logoX16_1757816161143.png";

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
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

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
              <Button variant="default" size="sm" data-testid="button-new-portfolio">
                <Plus className="h-4 w-4 mr-2" />
                Tạo Portfolio Mới
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