import React from 'react';
import { UserActivityLog } from '../types/user';
import { formatDate } from '../utils/formatters';
import { Trophy, Star, Target, Award, Activity } from 'lucide-react';

interface UserActivityFeedProps {
  activities: UserActivityLog[];
}

export default function UserActivityFeed({ activities }: UserActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'challenge_completed':
        return <Trophy className="w-5 h-5 text-primary-blue" />;
      case 'xp_earned':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'achievement_earned':
        return <Award className="w-5 h-5 text-green-500" />;
      default:
        return <Target className="w-5 h-5 text-primary-blue" />;
    }
  };

  return (
    <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Activity className="w-6 h-6 text-primary-blue mr-2" />
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-background/50 rounded-lg p-4 border border-primary-blue/10 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              {getActivityIcon(activity.activityType)}
              <div>
                <div className="font-medium">{activity.description}</div>
                <div className="text-sm text-gray-400">
                  {formatDate(new Date(activity.createdAt))}
                </div>
              </div>
            </div>
            {(activity.xpEarned > 0 || activity.pointsEarned > 0) && (
              <div className="flex items-center space-x-3">
                {activity.xpEarned > 0 && (
                  <span className="text-yellow-500 font-medium">
                    +{activity.xpEarned} XP
                  </span>
                )}
                {activity.pointsEarned > 0 && (
                  <span className="text-primary-blue font-medium">
                    +{activity.pointsEarned} pts
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}