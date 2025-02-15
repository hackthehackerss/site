import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface XPAward {
  amount: number;
  reason: string;
  type: 'path_completion' | 'challenge_completion' | 'achievement' | 'daily_streak';
}

export const awardXP = async (userId: string, award: XPAward) => {
  try {
    // Get current user stats
    const statsRef = doc(db, 'user_stats', userId);
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) {
      throw new Error('User stats not found');
    }

    // Calculate new level based on current XP + award amount
    const currentXP = statsDoc.data().xp || 0;
    const newXP = currentXP + award.amount;
    
    // Update user stats with new XP
    await updateDoc(statsRef, {
      xp: increment(award.amount),
      updatedAt: new Date().toISOString()
    });

    // Log the activity
    const activityRef = doc(collection(db, 'user_activity_log'));
    await setDoc(activityRef, {
      userId,
      activityType: 'xp_earned',
      description: award.reason,
      xpEarned: award.amount,
      metadata: {
        type: award.type,
        previousXP: currentXP,
        newXP: newXP
      },
      createdAt: new Date().toISOString()
    });

    return {
      previousXP: currentXP,
      newXP: newXP,
      xpGained: award.amount
    };
  } catch (error) {
    console.error('Error awarding XP:', error);
    throw error;
  }
};

// XP values for different actions
export const XP_VALUES = {
  PATH_COMPLETION: {
    BEGINNER: 1000,
    INTERMEDIATE: 2000,
    ADVANCED: 3000
  },
  CHALLENGE_COMPLETION: {
    VERY_EASY: 100,
    EASY: 200,
    MEDIUM: 500,
    HARD: 1000
  },
  DAILY_STREAK: {
    BASE: 50,
    BONUS_PER_WEEK: 100 // Additional bonus for each week of streak
  }
};

// Helper function to calculate streak bonus
export const calculateStreakBonus = (streakDays: number): number => {
  const baseBonus = XP_VALUES.DAILY_STREAK.BASE;
  const weeklyBonus = Math.floor(streakDays / 7) * XP_VALUES.DAILY_STREAK.BONUS_PER_WEEK;
  return baseBonus + weeklyBonus;
};

// Helper function to get XP for path completion
export const getPathCompletionXP = (difficulty: string): number => {
  const difficultyMap: { [key: string]: keyof typeof XP_VALUES.PATH_COMPLETION } = {
    'Beginner': 'BEGINNER',
    'Intermediate': 'INTERMEDIATE',
    'Advanced': 'ADVANCED'
  };

  const xpKey = difficultyMap[difficulty];
  return xpKey ? XP_VALUES.PATH_COMPLETION[xpKey] : XP_VALUES.PATH_COMPLETION.BEGINNER;
};

// Helper function to get XP for challenge completion
export const getChallengeCompletionXP = (difficulty: string): number => {
  const difficultyMap: { [key: string]: keyof typeof XP_VALUES.CHALLENGE_COMPLETION } = {
    'Very Easy': 'VERY_EASY',
    'Easy': 'EASY',
    'Medium': 'MEDIUM',
    'Hard': 'HARD'
  };

  const xpKey = difficultyMap[difficulty];
  return xpKey ? XP_VALUES.CHALLENGE_COMPLETION[xpKey] : XP_VALUES.CHALLENGE_COMPLETION.EASY;
};