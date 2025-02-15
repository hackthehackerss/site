import React, { useEffect } from 'react';
import { Star } from 'lucide-react';

interface XPNotificationProps {
  xpAmount: number;
  reason: string;
  onClose: () => void;
}

function XPNotification({ xpAmount, reason, onClose }: XPNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-primary-dark/90 border border-primary-blue/20 rounded-lg p-4 shadow-lg animate-slideIn z-50">
      <div className="flex items-center space-x-3">
        <div className="bg-yellow-500/20 p-2 rounded-full">
          <Star className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          <p className="font-bold text-lg">+{xpAmount} XP</p>
          <p className="text-sm text-gray-400">{reason}</p>
        </div>
      </div>
    </div>
  );
}

export default XPNotification;