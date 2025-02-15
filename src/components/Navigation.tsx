import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Target, Award, Trophy, Search, Sun, Moon, X } from 'lucide-react';
import UserProfileButton from './UserProfileButton';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

function Navigation({ darkMode, onToggleDarkMode }: NavigationProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <nav className={`${darkMode ? 'bg-primary-dark border-b border-primary-blue/20' : 'bg-white border-b border-gray-200'} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="logo-glitch">
                <img 
                  src="/logo-shield.png" 
                  alt="HackTheHackers Logo" 
                  className="h-10 w-auto animate-float"
                />
              </div>
              <span className="text-xl font-bold">
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Hack</span>
                <span className="text-primary-red">The</span>
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Hackers</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/learning-paths" 
              className={`${darkMode ? 'text-gray-300 hover:text-primary-blue' : 'text-gray-700 hover:text-gray-900'} flex items-center space-x-2 transition-colors`}
            >
              <Shield className="w-5 h-5" />
              <span>Learning Paths</span>
            </Link>
            
            <Link 
              to="/challenges" 
              className={`${darkMode ? 'text-gray-300 hover:text-primary-blue' : 'text-gray-700 hover:text-gray-900'} flex items-center space-x-2 transition-colors`}
            >
              <Target className="w-5 h-5" />
              <span>Challenges</span>
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`${darkMode ? 'text-gray-300 hover:text-primary-blue' : 'text-gray-700 hover:text-gray-900'} flex items-center space-x-2 transition-colors`}
            >
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link 
              to="/pricing" 
              className={`${darkMode ? 'text-gray-300 hover:text-primary-blue' : 'text-gray-700 hover:text-gray-900'} flex items-center space-x-2 transition-colors`}
            >
              <Award className="w-5 h-5" />
              <span>Pricing Plans</span>
            </Link>

            <button 
              onClick={onToggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </button>

            <div className="relative" ref={searchRef}>
              {showSearch ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary-dark/95 rounded-lg shadow-lg p-2 min-w-[300px]">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-4 py-2 bg-background border border-primary-blue/20 rounded-l-md focus:outline-none focus:border-primary-blue text-white"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowSearch(false)}
                      className="p-2 bg-background border border-l-0 border-primary-blue/20 rounded-r-md text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              ) : (
                <button 
                  onClick={() => setShowSearch(true)}
                  className={`${darkMode ? 'text-gray-300 hover:text-primary-blue' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {profile ? (
              <UserProfileButton />
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/signin" 
                  className={`${darkMode ? 'text-gray-300 hover:text-primary-blue' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-primary-red text-white px-6 py-2 rounded-md hover:bg-secondary-red transition min-w-[120px] text-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;