import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Utensils, Zap, Recycle, Bike, TreePine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  type: 'transport' | 'food' | 'energy' | 'waste';
  icon: any;
  title: string;
  color: string;
}

const activities: Activity[] = [
  { id: 'transport', type: 'transport', icon: Car, title: 'Transport', color: 'bg-blue-500' },
  { id: 'food', type: 'food', icon: Utensils, title: 'Food', color: 'bg-orange-500' },
  { id: 'energy', type: 'energy', icon: Zap, title: 'Energy', color: 'bg-yellow-500' },
  { id: 'waste', type: 'waste', icon: Recycle, title: 'Waste', color: 'bg-purple-500' },
];

export const ActivityLogger = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    distance: '',
    vehicle: '',
    meal: '',
    energy: '',
    waste: ''
  });
  const { toast } = useToast();

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const calculateCO2 = (activity: Activity, data: any) => {
    // Simplified CO2 calculation (in real app, this would use proper emission factors)
    const factors = {
      transport: { car: 0.21, bus: 0.08, bike: 0 },
      food: { meat: 5.5, vegetarian: 2.1, vegan: 1.5 },
      energy: { electricity: 0.45 },
      waste: { recycled: -0.5, landfill: 0.8 }
    };
    
    if (activity.type === 'transport') {
      const distance = parseFloat(data.distance) || 0;
      const vehicleFactor = factors.transport[data.vehicle as keyof typeof factors.transport] || 0.21;
      return distance * vehicleFactor;
    }
    
    return Math.random() * 10; // Placeholder
  };

  const handleSubmit = () => {
    if (!selectedActivity) return;
    
    const co2Saved = calculateCO2(selectedActivity, formData);
    const isPositive = Math.random() > 0.3; // 70% chance of positive impact
    
    toast({
      title: isPositive ? "Great choice! 🌱" : "Activity logged 📊",
      description: isPositive 
        ? `You saved ${co2Saved.toFixed(1)} kg CO₂e! Your garden is growing.`
        : `${co2Saved.toFixed(1)} kg CO₂e logged. Consider greener alternatives!`,
      variant: isPositive ? "default" : "destructive"
    });
    
    // Reset form
    setSelectedActivity(null);
    setFormData({ distance: '', vehicle: '', meal: '', energy: '', waste: '' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Log Your Daily Activities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your carbon footprint with quick and easy logging. Every action counts!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Activity Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {activities.map((activity) => (
              <Card 
                key={activity.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-medium ${
                  selectedActivity?.id === activity.id 
                    ? 'ring-2 ring-primary shadow-success bg-primary/5' 
                    : 'hover:shadow-soft'
                }`}
                onClick={() => handleActivitySelect(activity)}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${activity.color}`}>
                    <activity.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{activity.title}</h3>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Activity Form */}
          {selectedActivity && (
            <Card className="p-8 shadow-medium bg-card">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <selectedActivity.icon className="h-8 w-8 text-primary" />
                Log {selectedActivity.title} Activity
              </h3>
              
              <div className="space-y-6">
                {selectedActivity.type === 'transport' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="distance">Distance (km)</Label>
                      <Input
                        id="distance"
                        type="number"
                        placeholder="e.g., 15"
                        value={formData.distance}
                        onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle">Vehicle Type</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, vehicle: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="bike">Bicycle</SelectItem>
                          <SelectItem value="walk">Walking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {selectedActivity.type === 'food' && (
                  <div>
                    <Label htmlFor="meal">Meal Type</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, meal: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meat">Meat-based</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <Button 
                  onClick={handleSubmit} 
                  className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-success"
                  size="lg"
                >
                  Log Activity & Calculate Impact
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};