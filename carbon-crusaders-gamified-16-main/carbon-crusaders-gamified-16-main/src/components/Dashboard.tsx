import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, Award, Flame, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const weeklyData = [
  { day: 'Mon', co2: 12.5 },
  { day: 'Tue', co2: 8.2 },
  { day: 'Wed', co2: 15.1 },
  { day: 'Thu', co2: 6.8 },
  { day: 'Fri', co2: 11.3 },
  { day: 'Sat', co2: 4.9 },
  { day: 'Sun', co2: 7.2 }
];

const categoryData = [
  { name: 'Transport', value: 45, color: '#3B82F6' },
  { name: 'Food', value: 30, color: '#F97316' },
  { name: 'Energy', value: 20, color: '#EAB308' },
  { name: 'Waste', value: 5, color: '#A855F7' }
];

export const Dashboard = () => {
  const currentStreak = 12;
  const monthlyGoal = 150; // kg CO2
  const currentMonth = 89; // kg CO2
  const badges = [
    { name: "Week Warrior", desc: "7-day logging streak", earned: true },
    { name: "Green Commuter", desc: "Used eco transport 10 times", earned: true },
    { name: "Plant Pioneer", desc: "Logged 50 plant-based meals", earned: false },
    { name: "Energy Saver", desc: "Reduced energy use by 20%", earned: false }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Your Impact Dashboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your progress and celebrate your environmental achievements
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-success text-success-foreground">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="h-8 w-8" />
                <div>
                  <p className="text-sm opacity-90">Current Streak</p>
                  <p className="text-3xl font-bold">{currentStreak}</p>
                </div>
              </div>
              <p className="text-sm opacity-75">days logging activities</p>
            </Card>
            
            <Card className="p-6 bg-gradient-earth text-earth-foreground">
              <div className="flex items-center gap-3 mb-3">
                <TrendingDown className="h-8 w-8" />
                <div>
                  <p className="text-sm opacity-90">Monthly CO₂</p>
                  <p className="text-3xl font-bold">{currentMonth}</p>
                </div>
              </div>
              <p className="text-sm opacity-75">kg saved this month</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Goal</p>
                  <p className="text-3xl font-bold text-foreground">{Math.round((currentMonth / monthlyGoal) * 100)}%</p>
                </div>
              </div>
              <Progress value={(currentMonth / monthlyGoal) * 100} className="mt-3" />
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                  <p className="text-3xl font-bold text-foreground">{badges.filter(b => b.earned).length}/{badges.length}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">achievements unlocked</p>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Weekly CO₂ Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Impact by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
          
          {/* Badges */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Achievement Badges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`text-center p-6 rounded-lg border transition-all duration-300 ${
                    badge.earned 
                      ? 'bg-success/10 border-success shadow-success/20' 
                      : 'bg-muted/30 border-border opacity-60'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    badge.earned ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    <Award className={`h-8 w-8 ${badge.earned ? 'text-success' : 'text-muted-foreground'}`} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground">{badge.desc}</p>
                  {badge.earned && (
                    <Badge variant="secondary" className="mt-3 bg-success/20 text-success">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};