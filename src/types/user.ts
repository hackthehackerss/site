export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  id: string;
  xp: number;
  level: number;
  rank: number;
  challengesCompleted: number;
  totalPoints: number;
  streakDays: number;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementType: string;
  name: string;
  description?: string;
  earnedAt: string;
  metadata: Record<string, any>;
  createdAt: string;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  activityType: string;
  description: string;
  xpEarned: number;
  pointsEarned: number;
  metadata: Record<string, any>;
  createdAt: string;
}