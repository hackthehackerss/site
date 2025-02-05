import React from 'react';
import { Trophy, Medal } from 'lucide-react';

function Leaderboard() {
  // Mock data for top 10 users
  const topUsers = [
    { username: "CyberNinja", points: 15000 },
    { username: "SecurityPro", points: 14500 },
    { username: "HackMaster", points: 14000 },
    { username: "BlueTeamHero", points: 13500 },
    { username: "DefenderX", points: 13000 },
    { username: "CyberShield", points: 12500 },
    { username: "SecOpsGuru", points: 12000 },
    { username: "NetworkWizard", points: 11500 },
    { username: "ThreatHunter", points: 11000 },
    { username: "SecuritySage", points: 10500 }
  ];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <a href="/">
                <img 
                  src="/logo-shield.png" 
                  alt="HackTheHackers Logo" 
                  className="h-10 w-auto"
                />
              </a>
              <span className="text-xl font-bold">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Leaderboard Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-12 h-12 text-primary-blue mr-4" />
          <h1 className="text-4xl font-bold">Global Leaderboard</h1>
        </div>

        <div className="bg-primary-dark/30 rounded-lg border border-primary-blue/20">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 mb-4">
              <div className="col-span-2 text-center">Rank</div>
              <div className="col-span-6">Username</div>
              <div className="col-span-4 text-right">Points</div>
            </div>

            {topUsers.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 py-4 border-t border-primary-blue/10 items-center"
              >
                <div className="col-span-2 text-center flex justify-center">
                  {index === 0 ? (
                    <Medal className="w-6 h-6 text-yellow-400" />
                  ) : index === 1 ? (
                    <Medal className="w-6 h-6 text-gray-400" />
                  ) : index === 2 ? (
                    <Medal className="w-6 h-6 text-amber-700" />
                  ) : (
                    <span className="text-gray-400">{index + 1}</span>
                  )}
                </div>
                <div className="col-span-6 font-semibold">{user.username}</div>
                <div className="col-span-4 text-right text-primary-blue font-mono">
                  {user.points.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;