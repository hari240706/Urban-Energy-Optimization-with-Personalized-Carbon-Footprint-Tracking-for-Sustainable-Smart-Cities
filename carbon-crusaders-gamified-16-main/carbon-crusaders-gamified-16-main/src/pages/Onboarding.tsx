import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Home, Car, Utensils, MapPin, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    homeType: "",
    householdSize: "",
    primaryTransport: "",
    dietType: "",
    energySource: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate baseline carbon footprint
      const baseline = calculateBaseline(formData);
      toast({
        title: "Welcome to Carbon Crusaders! 🌱",
        description: `Your baseline carbon footprint: ${baseline} kg CO₂/month. Let's reduce it together!`
      });
      navigate("/dashboard");
    }
  };

  const calculateBaseline = (data: any) => {
    // Simplified baseline calculation
    let baseline = 500; // Base amount
    
    if (data.homeType === "apartment") baseline -= 100;
    if (data.homeType === "house") baseline += 200;
    if (data.primaryTransport === "car") baseline += 300;
    if (data.primaryTransport === "public") baseline += 100;
    if (data.primaryTransport === "bike") baseline -= 150;
    if (data.dietType === "meat") baseline += 200;
    if (data.dietType === "vegetarian") baseline += 50;
    if (data.dietType === "vegan") baseline -= 100;
    
    return Math.round(baseline);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Where are you located?</h2>
              <p className="text-muted-foreground">This helps us provide region-specific emission factors</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">City/Region</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai, India</SelectItem>
                    <SelectItem value="delhi">Delhi, India</SelectItem>
                    <SelectItem value="bangalore">Bangalore, India</SelectItem>
                    <SelectItem value="chennai">Chennai, India</SelectItem>
                    <SelectItem value="kolkata">Kolkata, India</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Home className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your home</h2>
              <p className="text-muted-foreground">This affects your energy consumption patterns</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Home Type</Label>
                <RadioGroup 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, homeType: value }))}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apartment" id="apartment" />
                    <Label htmlFor="apartment">Apartment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="house" id="house" />
                    <Label htmlFor="house">Independent House</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shared" id="shared" />
                    <Label htmlFor="shared">Shared Accommodation</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="householdSize">Household Size</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, householdSize: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Number of people" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3">3 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="5+">5+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Car className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">How do you usually travel?</h2>
              <p className="text-muted-foreground">Transport is often the largest source of personal emissions</p>
            </div>
            
            <div>
              <Label>Primary Transportation</Label>
              <RadioGroup 
                onValueChange={(value) => setFormData(prev => ({ ...prev, primaryTransport: value }))}
                className="mt-3 space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="car" id="car" />
                  <Label htmlFor="car">Personal Car</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public Transport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bike" id="bike" />
                  <Label htmlFor="bike">Bicycle/Walking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed">Mixed (varies daily)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Utensils className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">What's your diet like?</h2>
              <p className="text-muted-foreground">Food choices significantly impact your carbon footprint</p>
            </div>
            
            <div>
              <Label>Diet Type</Label>
              <RadioGroup 
                onValueChange={(value) => setFormData(prev => ({ ...prev, dietType: value }))}
                className="mt-3 space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meat" id="meat" />
                  <Label htmlFor="meat">Omnivore (includes meat daily)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexitarian" id="flexitarian" />
                  <Label htmlFor="flexitarian">Flexitarian (occasional meat)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-card/95 backdrop-blur-lg shadow-large">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Welcome to Carbon Crusaders</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Let's understand your lifestyle to calculate your baseline carbon footprint
          </p>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
          >
            {currentStep === totalSteps ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Setup
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};