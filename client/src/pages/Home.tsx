import Header from "@/components/Header";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={isAuthenticated} user={user as any} />
      <PortfolioDashboard />
    </div>
  );
}