import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Layout, Share2, Zap } from "lucide-react";

export default function LandingPage() {
  const handleGetStarted = () => {
    window.location.href = "/api/login";
  };

  const features = [
    {
      icon: Layout,
      title: "A4 Design Freedom",
      description: "Create stunning portfolios with our flexible A4 page design tools. Perfect layouts for any creative field."
    },
    {
      icon: Palette,
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates or start from scratch. Customize every element to match your style."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your portfolio with a simple link. Perfect for job applications, client presentations, or social media."
    },
    {
      icon: Zap,
      title: "Quick & Intuitive",
      description: "Drag and drop interface that makes portfolio creation fast and enjoyable. No design experience needed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Beautiful Portfolios
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional portfolio builder with A4 design flexibility. 
            Showcase your work beautifully with our intuitive tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              data-testid="button-get-started"
              className="text-lg px-8"
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              data-testid="button-view-examples"
              className="text-lg px-8"
            >
              View Examples
            </Button>
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="shadow-2xl bg-white">
            <div className="aspect-[210/297] bg-gradient-to-br from-primary/5 to-accent/5 rounded-t-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-3xl">👩‍🎨</span>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2">Sarah Johnson</h3>
                <p className="text-muted-foreground mb-4">Creative Designer</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Skills</h4>
                    <div className="space-y-1">
                      <div className="bg-primary/10 rounded px-2 py-1">UI/UX Design</div>
                      <div className="bg-primary/10 rounded px-2 py-1">Branding</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Projects</h4>
                    <div className="space-y-1">
                      <div className="h-8 bg-muted rounded"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to create stunning portfolios that stand out.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Ready to Build Your Portfolio?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of creatives who trust our platform to showcase their best work.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            data-testid="button-cta-get-started"
            className="text-lg px-8"
          >
            Start Creating Today
          </Button>
        </div>
      </div>
    </div>
  );
}