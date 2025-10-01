import { HeroSection } from "@/components/HeroSection";
import { ActivityLogger } from "@/components/ActivityLogger";
import { Dashboard } from "@/components/Dashboard";
import { VirtualGarden } from "@/components/VirtualGarden";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ActivityLogger />
      <Dashboard />
      <VirtualGarden />
    </div>
  );
};

export default Index;
