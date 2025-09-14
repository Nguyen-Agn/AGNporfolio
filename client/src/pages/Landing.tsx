import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated={false} />
      <LandingPage />
      <Footer />
    </div>
  );
}