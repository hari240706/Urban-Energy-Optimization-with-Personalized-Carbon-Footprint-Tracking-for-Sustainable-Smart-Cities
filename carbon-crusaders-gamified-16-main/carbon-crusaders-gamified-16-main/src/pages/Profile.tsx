import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  Edit,
  Award,
  Target,
  Calendar,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Profile = () => {
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: true,
    challengeUpdates: true,
    tips: false
  });
  
  const [profileData, setProfileData] = useState({
    name: "Eco Warrior",
    email: "eco.warrior@example.com",
    location: "Chennai, India",
    goal: "Reduce 50kg CO₂/month"
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile changes have been saved successfully."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started 📊",
      description: "Your carbon footprint data will be emailed to you within 24 hours."
    });
  };

  const achievements = [
    { name: "Week Warrior", description: "7-day logging streak", earned: true, date: "2024-01-15" },
    { name: "Green Commuter", description: "Used eco transport 10 times", earned: true, date: "2024-01-20" },
    { name: "Plant Pioneer", description: "Logged 50 plant-based meals", earned: false, progress: 35 },
    { name: "Energy Saver", description: "Reduced energy use by 20%", earned: false, progress: 12 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 max-w-4xl mx-auto">
            <Avatar className="h-24 w-24 border-4 border-white/20">
              <AvatarFallback className="bg-white/20 text-2xl font-bold">
                EW
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
              <p className="text-xl opacity-90 mb-2">{profileData.email}</p>
              <div className="flex items-center gap-2 text-sm opacity-75">
                <MapPin className="h-4 w-4" />
                {profileData.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="profile" className="space-y-8">
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="achievements">Badges</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Profile Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, location: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={profileData.location} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai, India</SelectItem>
                          <SelectItem value="delhi">Delhi, India</SelectItem>
                          <SelectItem value="bangalore">Bangalore, India</SelectItem>
                          <SelectItem value="chennai">Chennai, India</SelectItem>
                          <SelectItem value="kolkata">Kolkata, India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="goal">Monthly CO₂ Goal</Label>
                      <Input
                        id="goal"
                        placeholder="e.g., Reduce 50kg CO₂/month"
                        value={profileData.goal}
                        onChange={(e) => setProfileData(prev => ({ ...prev, goal: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSaveProfile}
                    className="mt-6 bg-gradient-primary hover:opacity-90"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center">
                    <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">89 kg</h3>
                    <p className="text-muted-foreground">CO₂ Saved This Month</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Calendar className="h-12 w-12 text-success mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">12 days</h3>
                    <p className="text-muted-foreground">Current Streak</p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <Award className="h-12 w-12 text-warning mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Level 6</h3>
                    <p className="text-muted-foreground">Climate Crusader</p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    Achievement Badges
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-6 rounded-lg border transition-all duration-300 ${
                          achievement.earned 
                            ? 'bg-success/10 border-success shadow-success/20' 
                            : 'bg-muted/30 border-border'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-foreground mb-2">{achievement.name}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          {achievement.earned ? (
                            <Award className="h-8 w-8 text-success" />
                          ) : (
                            <Award className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        
                        {achievement.earned ? (
                          <div className="flex items-center justify-between">
                            <Badge className="bg-success/20 text-success">Earned</Badge>
                            <span className="text-xs text-muted-foreground">{achievement.date}</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{achievement.progress}/50</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((achievement.progress || 0) / 50) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {key === 'dailyReminders' && 'Get daily reminders to log your activities'}
                            {key === 'weeklyReports' && 'Receive weekly progress summaries'}
                            {key === 'challengeUpdates' && 'Stay updated on challenge progress'}
                            {key === 'tips' && 'Receive personalized sustainability tips'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Privacy Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Public Profile</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your achievements and progress
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Leaderboard Participation</h3>
                        <p className="text-sm text-muted-foreground">
                          Show your name on community leaderboards
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Data Analytics</h3>
                        <p className="text-sm text-muted-foreground">
                          Help improve the app with anonymous usage data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Data Management</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 border border-border rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Export Your Data</h3>
                      <p className="text-muted-foreground mb-4">
                        Download all your carbon footprint data, achievements, and activity logs.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleExportData}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                    
                    <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-lg">
                      <h3 className="font-semibold text-destructive mb-2">Delete Account</h3>
                      <p className="text-muted-foreground mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};