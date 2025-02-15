import { useState } from "react";
import { collection, addDoc, query, where, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Badge {
  id: string;
  userId: string;
  courseId: string;
  badgeType: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: Date;
  sharedCount: number;
}

export function useBadges() {
  const [loading, setLoading] = useState(false);

  async function createBadge(
    userId: string,
    courseId: string,
    badgeType: string,
    name: string,
    description: string,
    imageUrl: string
  ) {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'badges'), {
        userId,
        courseId,
        badgeType,
        name,
        description,
        imageUrl,
        earnedAt: new Date(),
        sharedCount: 0
      });
      return docRef.id;
    } finally {
      setLoading(false);
    }
  }

  async function getUserBadges(userId: string): Promise<Badge[]> {
    const q = query(collection(db, 'badges'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Badge));
  }

  async function incrementShareCount(badgeId: string) {
    const badgeRef = doc(db, 'badges', badgeId);
    await updateDoc(badgeRef, {
      sharedCount: increment(1)
    });
  }

  function generateShareUrl(badge: Badge) {
    const shareText = encodeURIComponent(
      `I just earned the ${badge.name} badge on HackTheHackers! 🎉 #cybersecurity #learning`
    );
    
    return {
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.origin)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&title=${shareText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${shareText}`
    };
  }

  return {
    loading,
    createBadge,
    getUserBadges,
    incrementShareCount,
    generateShareUrl
  };
}