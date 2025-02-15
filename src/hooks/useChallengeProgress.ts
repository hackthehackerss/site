import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useXP } from './useXP';
import { getChallengeCompletionXP } from '../utils/xpSystem';

interface ChallengeProgress {
  id: string;
  userId: string;
  challengeId: string;
  correctAnswers: number;
  totalQuestions: number;
  completed: boolean;
  completedAt?: string;
  lastUpdated: string;
  timeSpent: number;
}

export function useChallengeProgress(userId: string, challengeId: string) {
  const [progress, setProgress] = useState<ChallengeProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { awardUserXP } = useXP();

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progressRef = doc(db, 'challenge_progress', `${userId}_${challengeId}`);
        const progressDoc = await getDoc(progressRef);

        if (progressDoc.exists()) {
          setProgress(progressDoc.data() as ChallengeProgress);
        } else {
          // Initialize progress
          const initialProgress: ChallengeProgress = {
            id: `${userId}_${challengeId}`,
            userId,
            challengeId,
            correctAnswers: 0,
            totalQuestions: 0,
            completed: false,
            timeSpent: 0,
            lastUpdated: new Date().toISOString()
          };
          await setDoc(progressRef, initialProgress);
          setProgress(initialProgress);
        }
      } catch (err) {
        console.error('Error loading challenge progress:', err);
        setError('Failed to load challenge progress');
      } finally {
        setLoading(false);
      }
    };

    if (userId && challengeId) {
      loadProgress();
    }
  }, [userId, challengeId]);

  const updateProgress = async (
    correctAnswers: number,
    totalQuestions: number,
    timeSpent: number,
    difficulty: string
  ) => {
    if (!progress) return;

    try {
      const progressRef = doc(db, 'challenge_progress', progress.id);
      const wasNotCompleted = !progress.completed;
      const isNowCompleted = correctAnswers === totalQuestions;

      const updates: Partial<ChallengeProgress> = {
        correctAnswers,
        totalQuestions,
        timeSpent,
        lastUpdated: new Date().toISOString()
      };

      if (isNowCompleted && wasNotCompleted) {
        updates.completed = true;
        updates.completedAt = new Date().toISOString();

        // Award XP for challenge completion
        const xpAmount = getChallengeCompletionXP(difficulty);
        await awardUserXP(userId, {
          amount: xpAmount,
          reason: `Completed ${challengeId}`,
          type: 'challenge_completion'
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