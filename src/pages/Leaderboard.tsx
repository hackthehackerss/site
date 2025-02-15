import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Search, Filter, User } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile, UserStats } from '../types/user';
import Navigation from '../components/Navigation';

interface LeaderboardEntry {
  profile: UserProfile;
  stats: UserStats;
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week'>('all');

  useEffect(() => {
    // Query user stats ordered by XP
    const statsQuery = query(
      collection(db, 'user_stats'),
      orderBy('xp', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(statsQuery, async (snapshot) => {
      try {
        const leaderboardData: LeaderboardEntry[] = [];

        for (const statsDoc of snapshot.docs) {
          // Get corresponding profile
          const profileDoc = await getDoc(doc(db, 'profiles', statsDoc.id));
          
          if (profileDoc.exists()) {
            leaderboardData.push({
              profile: { id: profileDoc.id, ...profileDoc.data() } as UserProfile,
              stats: { id: statsDoc.id, ...statsDoc.data() } as UserStats
            });
          }
        }

        setEntries(leaderboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredEntries = entries.filter(entry => 
    entry.profile.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.profile.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img 
                  src="/logo-shield.png" 
                  alt="HackTheHackers Logo" 
                  className="h-10 w-auto"
                />
              </Link>
              <span className="text-xl font-bold">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Trophy className="w-8 h-8 text-primary-blue" />
            <h1 className="text-3xl font-bold">Global Leaderboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-md focus:outline-none focus:border-primary-blue"
              />
            </div>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'all' | 'month' | 'week')}
              className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-md focus:outline-none focus:border-primary-blue"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
          </div>
        ) : (
          <div className="bg-primary-dark/30 rounded-lg border border-primary-blue/20">
            <div className="p-6">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 mb-4">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-4">User</div>
                <div className="col-span-2 text-center">Level</div>
                <div className="col-span-2 text-center">XP</div>
                <div className="col-span-2 text-right">Challenges</div>
              </div>

              {filteredEntries.map((entry, index) => (
                <Link
                  key={entry.profile.id}
                  to={`/profile/${entry.profile.username}`}
                  className="grid grid-cols-12 gap-4 py-4 border-t border-primary-blue/10 items-center hover:bg-primary-blue/5 transition-colors"
                >
                  <div className="col-span-2 text-center flex justify-center">
                    {index === 0 ? (
                      <Medal className="w-6 h-6 text-yellow-400" />
                    ) : index === 1 ? (
                      <Medal className="w-6 h-6 text-gray-400" />
                    ) : index === 2 ? (
                      <Medal className="w-6 h-6 text-amber-700" />
                    ) : (
                      <span className="text-gray-400">#{index + 1}</span>
                    )}
                  </div>
                  <div className="col-span-4 flex items-center space-x-3">
                    {entry.profile.avatarUrl ? (
                      <img
                        src={entry.profile.avatarUrl}
                        alt={entry.profile.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-blue/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-blue" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{entry.profile.fullName}</div>
                      <div className="text-sm text-gray-400">@{entry.profile.username}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="bg-primary-blue/20 text-primary-blue px-2 py-1 rounded-full">
                      {entry.stats.level}
                    </span>
                  </div>
                  <div className="col-span-2 text-center font-mono">
                    {entry.stats.xp.toLocaleString()}
                  </div>
                  <div className="col-span-2 text-right">
                    {entry.stats.challengesCompleted.toLocaleString()}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;