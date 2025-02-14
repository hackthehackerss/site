import React, { useState } from 'react';
import { Construction, Terminal, HardHat, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

function Challenges() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // State for active tab

  // Sample challenges data
  const challenges = [
    {
      id: 1,
      title: 'PowerShell Analysis Challenge',
      description: 'Analyze a suspicious PowerShell command and investigate its role in a system compromise.',
      icon: Terminal,
      questions: 10,
      points: 500,
      difficulty: 'Very Easy',
      category: 'SOC',
      link: '/challenges/powershell-logs',
    },
    {
      id: 2,
      title: 'Miner On the Run',
      description: 'Investigate an encrypted endpoint and uncover a hidden cryptocurrency mining operation.',
      icon: HardHat,
      questions: 8,
      points: 600,
      difficulty: 'Easy',
      category: 'SOC',
      link: '/challenges/miner-on-the-run',
    },
    {
      id: 3,
      title: 'Master File Trap',
      description: 'Analyze the Master File Table (MFT) to uncover details of a malware attack.',
      icon: Terminal,
      questions: 10,
      points: 700,
      difficulty: 'Medium',
      category: 'DFIR',
      link: '/challenges/mft-analysis',
    },
    {
      id: 4,
      title: 'Malware Analysis Challenge (Testing Its empty)',
      description: 'Analyze a malicious binary and identify its behavior and impact.',
      icon: Construction,
      questions: 12,
      points: 700,
      difficulty: 'Medium',
      category: 'Malware Analysis',
      link: '/challenges/malware-analysis',
    },
    
    {
      id: 5,
      title: 'More Challenges Coming Soon',
      description: "We're working on new challenges to test your cybersecurity skills.",
      icon: Construction,
      questions: 0,
      points: 0,
      difficulty: '',
      category: '',
      link: '#', // Placeholder link
    },
  ];

  // Filter challenges based on search query and active tab
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || challenge.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition z-50"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

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

      {/* Challenges Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Professional Title with Gradient Effect */}
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary-blue to-primary-red bg-clip-text text-transparent">
          Challenges
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <input 
            type="text" 
            placeholder="Search challenges..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg focus:outline-none focus:border-primary-blue"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {['All', 'Malware Analysis', 'SOC', 'DFIR'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition ${
                activeTab === tab ? 'bg-primary-blue/10 border-primary-blue' : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map((challenge) => (
            <Link 
              key={challenge.id}
              to={challenge.link}
              className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue hover:scale-105 transition-transform group hover:shadow-lg hover:bg-primary-dark/40 overflow-hidden"
            >
              <challenge.icon className="w-8 h-8 text-primary-blue mb-4 group-hover:text-primary-red transition-colors" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-blue transition-colors">
                {challenge.title}
              </h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                {challenge.description}
              </p>
              {/* Difficulty and Category Tags */}
              <div className="mt-2 flex gap-2">
                {challenge.difficulty && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    challenge.difficulty === 'Very Easy' ? 'bg-green-500/20 text-green-500' :
                    challenge.difficulty === 'Easy' ? 'bg-yellow-500/20 text-yellow-500' :
                    challenge.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                    challenge.difficulty === 'Hard' ? 'bg-red-500/20 text-red-500' : ''
                  }`}>
                    {challenge.difficulty}
                  </span>
                )}
                {challenge.category && (
                  <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
                    {challenge.category}
                  </span>
                )}
              </div>
              {/* Points and Questions (Hidden for "More Challenges Coming Soon") */}
              {challenge.questions > 0 && (
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-primary-blue group-hover:text-primary-red transition-colors">
                    {challenge.questions} Questions
                  </span>
                  <span className="text-primary-red group-hover:text-primary-blue transition-colors">
                    {challenge.points} Points
                  </span>
                </div>
              )}
              {/* Progress Bar (Hidden for "More Challenges Coming Soon") */}
              {challenge.questions > 0 && (
                <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue" style={{ width: '30%' }}></div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Challenges;
