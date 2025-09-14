import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      <LandingPage />
    </div>
  );
}