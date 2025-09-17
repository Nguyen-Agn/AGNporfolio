import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing"; // checked
import SignUp from "@/pages/SignUp"
import Home from "@/pages/Home";
import Editor from "@/pages/Editor";
import PortfolioView from "@/pages/PortfolioView";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
        <>
          <Route path="/" component={Landing} /> // giao diện chưa đăng nhập
          <Route path="/signup" component={SignUp}/>
 
          <Route path="/home" component={Home} />
          <Route path="/editor/:id?" component={Editor} />
          <Route path="/portfolio/:id" component={PortfolioView} />
        </>

      <Route component={NotFound} />
    </Switch>
  );
}

// Tạo app frontend 
/*
  QueryClientProvider => hỗ trợ fetch và quản lý dữ liệu
  Tooltip từ  tanstack => hổ trợ chú thích
    Tooltip: ghi chú nhở hiện lên khi hover
    Toaster: thông báo nổi
    Router: định hướng => home, dashboard, login,....
*/
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider> 
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
