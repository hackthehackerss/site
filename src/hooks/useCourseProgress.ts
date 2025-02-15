import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useXP } from './useXP';
import { getPathCompletionXP } from '../utils/xpSystem';

interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
  lastUpdated: string;
}

export function useCourseProgress(userId: string, courseId: string) {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { awardUserXP } = useXP();

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progressRef = doc(db, 'course_progress', `${userId}_${courseId}`);
        const progressDoc = await getDoc(progressRef);

        if (progressDoc.exists()) {
          setProgress(progressDoc.data() as CourseProgress);
        } else {
          // Initialize progress
          const initialProgress: CourseProgress = {
            id: `${userId}_${courseId}`,
            userId,
            courseId,
            progress: 0,
            completed: false,
            lastUpdated: new Date().toISOString()
          };
          await setDoc(progressRef, initialProgress);
          setProgress(initialProgress);
        }
      } catch (err) {
        console.error('Error loading course progress:', err);
        setError('Failed to load course progress');
      } finally {
        setLoading(false);
      }
    };

    if (userId && courseId) {
      loadProgress();
    }
  }, [userId, courseId]);

  const updateProgress = async (newProgress: number, courseDifficulty: string) => {
    if (!progress) return;

    try {
      const progressRef = doc(db, 'course_progress', progress.id);
      const wasNotCompleted = !progress.completed;
      const isNowCompleted = newProgress === 100;

      const updates: Partial<CourseProgress> = {
        progress: newProgress,
        lastUpdated: new Date().toISOString()
      };

      if (isNowCompleted && wasNotCompleted) {
        updates.completed = true;
        updates.completedAt = new Date().toISOString();

        // Award XP for course completion
        const xpAmount = getPathCompletionXP(courseDifficulty);
        await awardUserXP(userId, {
          amount: xpAmount,
          reason: `Completed ${courseId}`,
          type: 'path_completion'
        });
      }

      await updateDoc(progressRef, updates);
      setProgress(prev => prev ? { ...prev, ...updates } : null);

      return isNowCompleted;
    } catch (err) {
      console.error('Error updating progress:', err);
      setError('Failed to update progress');
      return false;
    }
  };

  return {
    progress,
    loading,
    error,
    updateProgress
  };
}