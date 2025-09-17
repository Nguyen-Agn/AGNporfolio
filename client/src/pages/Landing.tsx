import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function Landing() {
  const {isAuthenticated} = useAuth();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated={isAuthenticated} />
      <LandingPage />
      <Footer />
    </div>
  );
}