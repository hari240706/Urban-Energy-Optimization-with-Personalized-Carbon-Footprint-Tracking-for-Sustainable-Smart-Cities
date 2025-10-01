import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreePine, Flower, Sprout, Sun, Droplets, Wind } from "lucide-react";
import seedlingImage from "@/assets/seedling.jpg";

interface PlantItem {
  id: string;
  name: string;
  icon: any;
  level: number;
  co2Required: number;
  unlocked: boolean;
  description: string;
}

const plants: PlantItem[] = [
  { id: 'sprout', name: 'Climate Sprout', icon: Sprout, level: 1, co2Required: 0, unlocked: true, description: 'Your journey begins' },
  { id: 'flower', name: 'Eco Flower', icon: Flower, level: 2, co2Required: 25, unlocked: true, description: 'Beautiful progress blooms' },
  { id: 'sapling', name: 'Green Sapling', icon: TreePine, level: 3, co2Required: 75, unlocked: false, description: 'Growing strong and tall' },
  { id: 'tree', name: 'Carbon Tree', icon: TreePine, level: 4, co2Required: 150, unlocked: false, description: 'Mighty environmental guardian' }
];

export const VirtualGarden = () => {
  const [currentCO2Saved, setCO2Saved] = useState(45); // Simulated saved CO2
  const [selectedPlant, setSelectedPlant] = useState<PlantItem | null>(null);
  
  const gardenLevel = plants.filter(p => p.co2Required <= currentCO2Saved).length;
  const nextPlant = plants.find(p => p.co2Required > currentCO2Saved);

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Your Virtual Garden</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch your garden grow as you reduce your carbon footprint. Every sustainable action nurtures new life!
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Garden Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center bg-gradient-success text-success-foreground">
              <TreePine className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{currentCO2Saved} kg</h3>
              <p className="opacity-90">CO₂ Saved Total</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Sun className="h-12 w-12 mx-auto mb-4 text-warning" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Level {gardenLevel}</h3>
              <p className="text-muted-foreground">Garden Growth</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Droplets className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {nextPlant ? nextPlant.co2Required - currentCO2Saved : 0} kg
              </h3>
              <p className="text-muted-foreground">Until Next Plant</p>
            </Card>
          </div>
          
          {/* Garden Visualization */}
          <Card className="p-8 mb-8">
            <div className="relative">
              {/* Garden Background */}
              <div 
                className="h-80 rounded-lg bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${seedlingImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-earth/60 to-transparent" />
                
                {/* Planted Items */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="flex items-end gap-8">
                    {plants.slice(0, gardenLevel).map((plant, index) => (
                      <div 
                        key={plant.id}
                        className="text-center cursor-pointer transform hover:scale-110 transition-all duration-300"
                        onClick={() => setSelectedPlant(plant)}
                      >
                        <div className="bg-success/20 backdrop-blur-sm rounded-full p-4 mb-2 border border-success/30">
                          <plant.icon className="h-8 w-8 text-success" />
                        </div>
                        <Badge variant="secondary" className="bg-white/90 text-xs">
                          {plant.name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weather Effects */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-warning/20 backdrop-blur-sm rounded-full p-2">
                    <Sun className="h-6 w-6 text-warning" />
                  </div>
                  <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2">
                    <Wind className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Plant Collection */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Plant Collection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plants.map((plant) => (
                <div 
                  key={plant.id}
                  className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                    plant.unlocked || plant.co2Required <= currentCO2Saved
                      ? 'bg-card hover:shadow-medium border-border'
                      : 'bg-muted/30 border-muted opacity-60'
                  }`}
                  onClick={() => setSelectedPlant(plant)}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      plant.unlocked || plant.co2Required <= currentCO2Saved
                        ? 'bg-success/20 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <plant.icon className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{plant.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{plant.description}</p>
                    
                    {plant.co2Required <= currentCO2Saved ? (
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Unlocked
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        {plant.co2Required} kg CO₂
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Plant Details Modal */}
          {selectedPlant && (
            <Card className="fixed inset-0 z-50 m-8 p-8 bg-card/95 backdrop-blur-lg border shadow-large">
              <div className="max-w-md mx-auto text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/20 mb-6">
                  <selectedPlant.icon className="h-12 w-12 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{selectedPlant.name}</h3>
                <p className="text-muted-foreground mb-6">{selectedPlant.description}</p>
                <p className="text-sm text-muted-foreground mb-8">
                  {selectedPlant.co2Required <= currentCO2Saved 
                    ? "This plant is thriving in your garden!" 
                    : `Save ${selectedPlant.co2Required - currentCO2Saved} more kg CO₂ to unlock this plant.`
                  }
                </p>
                <Button onClick={() => setSelectedPlant(null)} variant="outline">
                  Close
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};