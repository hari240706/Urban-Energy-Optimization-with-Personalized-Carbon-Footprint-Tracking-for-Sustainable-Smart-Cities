import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Target, Calendar, Medal, Crown, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: number;
  reward: string;
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface User {
  id: string;
  name: string;
  co2Saved: number;
  streak: number;
  level: number;
  rank: number;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Car-Free Week',
    description: 'Avoid using personal vehicles for 7 days straight',
    duration: '7 days',
    participants: 234,
    reward: '500 XP + Green Commuter Badge',
    progress: 45,
    difficulty: 'medium',
    category: 'Transport'
  },
  {
    id: '2',
    title: 'Plant-Based Pioneer',
    description: 'Log 10 plant-based meals this month',
    duration: '30 days',
    participants: 156,
    reward: '300 XP + Veggie Hero Badge',
    progress: 70,
    difficulty: 'easy',
    category: 'Food'
  },
  {
    id: '3',
    title: 'Energy Saver Supreme',
    description: 'Reduce home energy consumption by 20%',
    duration: '14 days',
    participants: 89,
    reward: '750 XP + Efficiency Expert Badge',
    progress: 25,
    difficulty: 'hard',
    category: 'Energy'
  }
];

const leaderboard: User[] = [
  { id: '1', name: 'EcoWarrior23', co2Saved: 245, streak: 28, level: 12, rank: 1 },
  { id: '2', name: 'GreenGuardian', co2Saved: 198, streak: 15, level: 10, rank: 2 },
  { id: '3', name: 'ClimateCrusader', co2Saved: 167, streak: 22, level: 9, rank: 3 },
  { id: '4', name: 'You', co2Saved: 89, streak: 12, level: 6, rank: 4 },
  { id: '5', name: 'SustainableSam', co2Saved: 76, streak: 8, level: 5, rank: 5 }
];

export const Community = () => {
  const [activeTab, setActiveTab] = useState("challenges");
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>(['2']);
  const { toast } = useToast();

  const handleJoinChallenge = (challengeId: string) => {
    setJoinedChallenges(prev => [...prev, challengeId]);
    toast({
      title: "Challenge Joined! 🎯",
      description: "You've successfully joined the challenge. Start logging activities to make progress!"
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/20 text-success';
      case 'medium': return 'bg-warning/20 text-warning';
      case 'hard': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-warning" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Community Hub</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join challenges, compete with friends, and make a bigger impact together
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Groups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="challenges" className="space-y-8">
              {/* Active Challenges */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Active Challenges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="p-6 hover:shadow-medium transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2">{challenge.title}</h3>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <Badge variant="outline">{challenge.category}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{challenge.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} />
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {challenge.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {challenge.participants}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          <strong>Reward:</strong> {challenge.reward}
                        </p>
                        {joinedChallenges.includes(challenge.id) ? (
                          <Button variant="outline" className="w-full" disabled>
                            Joined
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleJoinChallenge(challenge.id)}
                            className="w-full bg-gradient-primary hover:opacity-90"
                          >
                            Join Challenge
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Global Leaderboard</h2>
                <Card className="p-6">
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div 
                        key={user.id} 
                        className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                          user.name === 'You' 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getRankIcon(user.rank)}
                          <span className="text-2xl font-bold text-foreground">#{user.rank}</span>
                        </div>
                        
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/20 text-primary font-bold">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{user.name}</span>
                            {user.name === 'You' && (
                              <Badge variant="secondary" className="text-xs">You</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{user.co2Saved} kg CO₂ saved</span>
                            <span className="flex items-center gap-1">
                              <Flame className="h-4 w-4" />
                              {user.streak} day streak
                            </span>
                            <span>Level {user.level}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Community Groups</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">Climate Action Chennai</h3>
                    <p className="text-muted-foreground mb-4">
                      Local group focused on reducing emissions in Chennai. Join us for city-wide challenges!
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">456 members</span>
                      <Button variant="outline">Join Group</Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">Workplace Warriors</h3>
                    <p className="text-muted-foreground mb-4">
                      Corporate sustainability challenges. Compete with colleagues and other companies!
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">1,234 members</span>
                      <Button variant="outline">Join Group</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};