import React, { useState } from 'react';
import { Check } from 'lucide-react';

const avatars = [
  {
    id: 'hacker1',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&q=80',
    alt: 'Matrix-style code'
  },
  {
    id: 'hacker2',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&q=80',
    alt: 'Cybersecurity lock'
  },
  {
    id: 'hacker3',
    url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=100&h=100&fit=crop&q=80',
    alt: 'Binary code'
  },
  {
    id: 'hacker4',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop&q=80',
    alt: 'Network security'
  },
  {
    id: 'hacker5',
    url: 'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?w=100&h=100&fit=crop&q=80',
    alt: 'Digital security'
  },
  {
    id: 'hacker6',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&q=80',
    alt: 'Circuit board'
  }
];

interface AvatarSelectorProps {
  currentAvatar?: string;
  onSelect: (url: string) => void;
}

function AvatarSelector({ currentAvatar, onSelect }: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -bottom-3 -right-3 bg-primary-blue text-background p-2 rounded-full hover:bg-secondary-blue transition z-10"
        title="Change avatar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 bg-primary-dark/90 rounded-lg border border-primary-blue/20 p-4 w-72 backdrop-blur-sm z-20">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Select an avatar</h3>
          <div className="grid grid-cols-3 gap-3">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => {
                  onSelect(avatar.url);
                  setIsOpen(false);
                }}
                className="relative group"
              >
                <img
                  src={avatar.url}
                  alt={avatar.alt}
                  className={`w-20 h-20 rounded-lg object-cover border-2 transition ${
                    currentAvatar === avatar.url
                      ? 'border-primary-blue'
                      : 'border-transparent group-hover:border-primary-blue/50'
                  }`}
                />
                {currentAvatar === avatar.url && (
                  <div className="absolute top-1 right-1 bg-primary-blue rounded-full p-1">
                    <Check className="w-3 h-3 text-background" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarSelector;