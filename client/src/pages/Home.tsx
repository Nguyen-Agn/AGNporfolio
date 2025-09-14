import Header from "@/components/Header";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated={isAuthenticated} user={user as any} />
      <div className="flex-1">
        <PortfolioDashboard />
      </div>
      <Footer />
    </div>
  );
}