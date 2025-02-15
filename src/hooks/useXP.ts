import { useState } from 'react';
import { awardXP, XPAward } from '../utils/xpSystem';

export function useXP() {
  const [awarding, setAwarding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const awardUserXP = async (userId: string, award: XPAward) => {
    setAwarding(true);
    setError(null);
    
    try {
      const result = await awardXP(userId, award);
      return result;
    } catch (err) {
      setError('Failed to award XP. Please try again.');
      throw err;
    } finally {
      setAwarding(false);
    }
  };

  return {
    awardUserXP,
    awarding,
    error
  };
}