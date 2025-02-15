import { useState, useEffect } from 'react';
import { db, ensureCollections } from '../lib/firebase';
import { collection, doc, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { UserStats, UserAchievement, UserActivityLog } from '../types/user';

export function useUserStats(userId: string) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [activityLog, setActivityLog] = useState<UserActivityLog[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        
        // Ensure collections exist before subscribing
        await ensureCollections(userId);

        // Subscribe to user stats
        const unsubStats = onSnapshot(
          doc(db, 'user_stats', userId),
          (doc) => {
            if (doc.exists()) {
              setStats({ id: doc.id, ...doc.data() } as UserStats);
            }
          },
          (error) => {
            console.error('Error fetching stats:', error);
            setError(error as Error);
          }
        );

        // Subscribe to achievements
        const achievementsQuery = query(
          collection(db, 'user_achievements'),
          where('userId', '==', userId),
          orderBy('earnedAt', 'desc')
        );

        const unsubAchievements = onSnapshot(
          achievementsQuery,
          (snapshot) => {
            const achievements = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as UserAchievement[];
            setAchievements(achievements);
          },
          (error) => {
            console.error('Error fetching achievements:', error);
            setError(error as Error);
          }
        );

        // Subscribe to activity log
        const activityQuery = query(
          collection(db, 'user_activity_log'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(10)
        );

        const unsubActivity = onSnapshot(
          activityQuery,
          (snapshot) => {
            const activities = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as UserActivityLog[];
            setActivityLog(activities);
          },
          (error) => {
            console.error('Error fetching activity log:', error);
            setError(error as Error);
          }
        );

        setLoading(false);

        // Cleanup subscriptions
        return () => {
          unsubStats();
          unsubAchievements();
          unsubActivity();
        };
      } catch (err) {
        console.error('Error setting up subscriptions:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  return {
    loading,
    error,
    stats,
    achievements,
    activityLog
  };
}