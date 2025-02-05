import React from 'react';
import { Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Badge } from '../hooks/useBadges';
import { formatDate } from '../utils/formatters';

interface BadgeCardProps {
  badge: Badge;
  onShare: (platform: 'twitter' | 'linkedin' | 'facebook') => void;
}

function BadgeCard({ badge, onShare }: BadgeCardProps) {
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={badge.imageUrl}
            alt={badge.name}
            className="w-16 h-16 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold">{badge.name}</h3>
            <p className="text-sm text-gray-400">{badge.description}</p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2 text-primary-blue hover:bg-primary-blue/10 rounded-full transition"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {showShareMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-primary-dark border border-primary-blue/20">
              <button
                onClick={() => {
                  onShare('twitter');
                  setShowShareMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-primary-blue/10 transition-colors flex items-center"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Share on Twitter
              </button>
              <button
                onClick={() => {
                  onShare('linkedin');
                  setShowShareMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-primary-blue/10 transition-colors flex items-center"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </button>
              <button
                onClick={() => {
                  onShare('facebook');
                  setShowShareMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-primary-blue/10 transition-colors flex items-center"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Share on Facebook
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>Earned on {formatDate(badge.earnedAt)}</span>
        <span>Shared {badge.sharedCount} times</span>
      </div>
    </div>
  );
}

export default BadgeCard;