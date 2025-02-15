import React, { useState, useRef } from 'react';
import { Check, Upload, Camera } from 'lucide-react';

interface AvatarSelectorProps {
  currentAvatar?: string;
  onSelect: (url: string) => void;
}

function AvatarSelector({ currentAvatar, onSelect }: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);

      // Create a FormData object
      const formData = new FormData();
      formData.append('file', file);

      // Upload to your server/storage
      // In a real app, you would upload to your storage service
      // For now, we'll use a data URL as a placeholder
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onSelect(reader.result);
          setIsOpen(false);
        }
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -bottom-3 -right-3 bg-primary-blue text-background p-2 rounded-full hover:bg-secondary-blue transition z-10"
        title="Change avatar"
      >
        <Camera className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 bg-primary-dark/90 rounded-lg border border-primary-blue/20 p-4 w-72 backdrop-blur-sm z-20">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Change Profile Picture</h3>
          
          {/* Upload Option */}
          <div className="mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full py-2 px-4 bg-primary-blue/10 border border-primary-blue/20 rounded-lg text-primary-blue hover:bg-primary-blue/20 transition flex items-center justify-center"
            >
              {uploading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-blue"></div>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Picture
                </>
              )}
            </button>
          </div>

          <div className="text-sm text-gray-400 mb-4">Or choose from presets:</div>
          
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