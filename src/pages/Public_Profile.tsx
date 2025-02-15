import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Star, Target, Award, Shield, Clock, 
  User, MapPin, Globe, Twitter, Github 
} from 'lucide-react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile, UserStats } from '../types/user';
import { formatDate } from '../utils/formatters';

function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        
        // Query profile by username
        const profilesRef = collection(db, 'profiles');
        const q = query(profilesRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('Profile not found');
          setLoading(false);
          return;
        }

        const profileDoc = querySnapshot.docs[0];
        const profileData = { id: profileDoc.id, ...profileDoc.data() } as UserProfile;
        setProfile(profileData);

        // Get user stats
        const statsDoc = await getDoc(doc(db, 'user_stats', profileData.id));
        if (statsDoc.exists()) {
          setStats({ id: statsDoc.id, ...statsDoc.data() } as UserStats);
        }

      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background text-white">
        <nav className="bg-primary-dark border-b border-primary-blue/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="text-primary-blue hover:text-primary-blue/80 flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-400">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-primary-blue hover:text-primary-blue/80 flex items-center">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20 mb-8">
          <div className="flex items-center space-x-6">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-blue/20 flex items-center justify-center">
                <User className="w-12 h-12 text-primary-blue" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{profile.fullName}</h1>
              <p className="text-gray-400">@{profile.username}</p>
              {profile.bio && (
                <p className="text-gray-300 mt-2 max-w-2xl">{profile.bio}</p>
              )}
              <div className="flex items-center space-x-4 mt-4">
                {profile.location && (
                  <span className="text-gray-400 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:text-primary-blue/80"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:text-primary-blue/80"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.twitter && (
                  <a
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:text-primary-blue/80"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
              <Star className="w-8 h-8 text-primary-blue mb-2" />
              <div className="text-2xl font-bold">Level {stats.level}</div>
              <div className="text-sm text-gray-400">{stats.xp} XP</div>
            </div>
            <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
              <Trophy className="w-8 h-8 text-primary-blue mb-2" />
              <div className="text-2xl font-bold">#{stats.rank}</div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
            <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
              <Target className="w-8 h-8 text-primary-blue mb-2" />
              <div className="text-2xl font-bold">{stats.challengesCompleted}</div>
              <div className="text-sm text-gray-400">Challenges Completed</div>
            </div>
            <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
              <Clock className="w-8 h-8 text-primary-blue mb-2" />
              <div className="text-2xl font-bold">{stats.streakDays}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
          </div>
        )}

        {/* Member Since */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Member since</p>
              <p className="text-lg">{formatDate(new Date(profile.createdAt))}</p>
            </div>
            <Shield className="w-6 h-6 text-primary-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;