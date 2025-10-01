import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, TrendingDown, Users, Trophy } from "lucide-react";
import heroGarden from "@/assets/hero-garden.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroGarden})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-earth/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-success/20 backdrop-blur-sm border border-success/30 rounded-full px-6 py-2 mb-8">
            <Leaf className="h-5 w-5 text-success" />
            <span className="text-success font-medium">Join the Carbon Crusaders</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Track. Reduce.
            <span className="bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              {" "}Grow.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your daily habits into climate action. Log activities, reduce your carbon footprint, 
            and watch your virtual garden flourish as you make a real difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-success text-success-foreground hover:bg-success/90 shadow-success transform transition-all duration-300 hover:scale-105"
              onClick={() => window.location.href = '/onboarding'}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => window.location.href = '/dashboard'}
            >
              View Dashboard
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: TrendingDown, title: "Carbon Reduced", value: "50K+ kg", desc: "CO₂ saved by our community" },
              { icon: Users, title: "Active Crusaders", value: "10K+", desc: "Making a difference daily" },
              { icon: Trophy, title: "Challenges Completed", value: "25K+", desc: "Sustainable actions taken" }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-success/20 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/90 font-medium mb-2">{stat.title}</p>
                <p className="text-white/70 text-sm">{stat.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-success rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40 animation-delay-1000" />
      <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-warning rounded-full animate-pulse opacity-50 animation-delay-2000" />
    </section>
  );
};