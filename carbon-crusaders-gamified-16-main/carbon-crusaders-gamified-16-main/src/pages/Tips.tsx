import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Leaf, Zap, Car, Utensils, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tip {
  id: string;
  category: 'transport' | 'food' | 'energy' | 'general';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  co2Savings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
}

const tips: Tip[] = [
  {
    id: '1',
    category: 'transport',
    title: 'Switch to Public Transport',
    description: 'Replace 3 car trips per week with bus or metro. Save money and reduce emissions significantly.',
    impact: 'high',
    co2Savings: 15.2,
    difficulty: 'easy'
  },
  {
    id: '2',
    category: 'food',
    title: 'Meatless Monday',
    description: 'Try plant-based meals one day per week. Start small and gradually increase for bigger impact.',
    impact: 'medium',
    co2Savings: 8.5,
    difficulty: 'easy',
    completed: true
  },
  {
    id: '3',
    category: 'energy',
    title: 'LED Light Upgrade',
    description: 'Replace old bulbs with LED lights. They use 75% less energy and last 25 times longer.',
    impact: 'medium',
    co2Savings: 12.3,
    difficulty: 'easy'
  },
  {
    id: '4',
    category: 'transport',
    title: 'Bike to Work',
    description: 'Cycle for short distances under 5km. Great for health and zero emissions.',
    impact: 'high',
    co2Savings: 22.1,
    difficulty: 'medium'
  },
  {
    id: '5',
    category: 'energy',
    title: 'Smart Thermostat',
    description: 'Install a programmable thermostat to optimize heating and cooling automatically.',
    impact: 'high',
    co2Savings: 18.7,
    difficulty: 'hard'
  },
  {
    id: '6',
    category: 'food',
    title: 'Local & Seasonal Food',
    description: 'Buy locally grown, seasonal produce to reduce transportation emissions.',
    impact: 'medium',
    co2Savings: 6.8,
    difficulty: 'medium'
  }
];

const categories = [
  { id: 'all', name: 'All Tips', icon: Lightbulb, color: 'text-primary' },
  { id: 'transport', name: 'Transport', icon: Car, color: 'text-blue-500' },
  { id: 'food', name: 'Food', icon: Utensils, color: 'text-orange-500' },
  { id: 'energy', name: 'Energy', icon: Zap, color: 'text-yellow-500' },
];

export const Tips = () => {
  const { toast } = useToast();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'bg-muted text-muted-foreground';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'high': return 'bg-success/20 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/20 text-success';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'hard': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return Car;
      case 'food': return Utensils;
      case 'energy': return Zap;
      default: return Leaf;
    }
  };

  const handleTipAction = (tip: Tip) => {
    if (tip.completed) return;
    
    toast({
      title: "Great choice! 🌱",
      description: `You'll save approximately ${tip.co2Savings} kg CO₂ per month with this action.`,
    });
  };

  const totalSavings = tips.reduce((sum, tip) => sum + tip.co2Savings, 0);
  const completedTips = tips.filter(tip => tip.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Personalized Tips</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover simple ways to reduce your carbon footprint based on your lifestyle
            </p>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{totalSavings.toFixed(1)} kg</h3>
              <p className="text-muted-foreground">Potential Monthly Savings</p>
            </Card>
            
            <Card className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{completedTips}/{tips.length}</h3>
              <p className="text-muted-foreground">Tips Implemented</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Lightbulb className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{Math.round((completedTips / tips.length) * 100)}%</h3>
              <p className="text-muted-foreground">Progress Complete</p>
              <Progress value={(completedTips / tips.length) * 100} className="mt-3" />
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <category.icon className={`h-4 w-4 ${category.color}`} />
                  {category.name}
                </Button>
              ))}
            </div>

            {/* High Impact Tips */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">🎯 High Impact Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.filter(tip => tip.impact === 'high').map((tip) => {
                  const IconComponent = getCategoryIcon(tip.category);
                  return (
                    <Card key={tip.id} className={`p-6 relative overflow-hidden ${tip.completed ? 'bg-success/5 border-success/20' : ''}`}>
                      {tip.completed && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="h-6 w-6 text-success" />
                        </div>
                      )}
                      
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-2">{tip.title}</h3>
                          <div className="flex gap-2 mb-3">
                            <Badge className={getImpactColor(tip.impact)}>
                              {tip.impact} impact
                            </Badge>
                            <Badge className={getDifficultyColor(tip.difficulty)}>
                              {tip.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{tip.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-semibold text-success">
                            {tip.co2Savings} kg CO₂/month
                          </span>
                          <span className="text-muted-foreground"> savings</span>
                        </div>
                        
                        {tip.completed ? (
                          <Badge variant="secondary" className="bg-success/20 text-success">
                            Completed
                          </Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleTipAction(tip)}
                            className="bg-gradient-primary hover:opacity-90"
                          >
                            Try This
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* All Tips */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">💡 All Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips.map((tip) => {
                  const IconComponent = getCategoryIcon(tip.category);
                  return (
                    <Card key={tip.id} className={`p-6 relative ${tip.completed ? 'bg-success/5 border-success/20' : ''}`}>
                      {tip.completed && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{tip.title}</h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>
                      
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {tip.co2Savings} kg CO₂
                        </Badge>
                        <Badge className={`text-xs ${getImpactColor(tip.impact)}`}>
                          {tip.impact}
                        </Badge>
                      </div>
                      
                      {!tip.completed && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleTipAction(tip)}
                        >
                          Learn More
                        </Button>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};