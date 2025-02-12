import React from 'react';
import { Construction, Terminal, HardHat, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

function Challenges() {
  const [darkMode, setDarkMode] = React.useState(true);

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
            className="w-full px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg focus:outline-none focus:border-primary-blue"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition">
            All
          </button>
          <button className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition">
            Malware Analysis
          </button>
          <button className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition">
            SOC
          </button>
          <button className="px-4 py-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition">
            DFIR
          </button>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PowerShell Logs Challenge */}
          <Link 
            to="/challenges/powershell-logs"
            className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue hover:scale-105 transition-transform group hover:shadow-lg hover:bg-primary-dark/40 overflow-hidden"
          >
            <Terminal className="w-8 h-8 text-primary-blue mb-4 group-hover:text-primary-red transition-colors" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-blue transition-colors">PowerShell Analysis Challenge</h3>
            <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
              Analyze a suspicious PowerShell command and investigate its role in a system compromise
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-primary-blue group-hover:text-primary-red transition-colors">10 Questions</span>
              <span className="text-primary-red group-hover:text-primary-blue transition-colors">500 Points</span>
            </div>
            <div className="mt-2">
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Very Easy</span>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary-blue" style={{ width: '30%' }}></div>
            </div>
          </Link>

          {/* CryptoMiner Investigation Challenge */}
          <Link 
            to="/challenges/miner-on-the-run"
            className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue hover:scale-105 transition-transform group hover:shadow-lg hover:bg-primary-dark/40 overflow-hidden"
          >
            <HardHat className="w-8 h-8 text-primary-blue mb-4 group-hover:text-primary-red transition-colors" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-blue transition-colors">Miner On the Run</h3>
            <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
              Investigate an encrypted endpoint and uncover a hidden cryptocurrency mining operation.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-primary-blue group-hover:text-primary-red transition-colors">8 Questions</span>
              <span className="text-primary-red group-hover:text-primary-blue transition-colors">600 Points</span>
            </div>
            <div className="mt-2">
              <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">Easy</span>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary-blue" style={{ width: '50%' }}></div>
            </div>
          </Link>

          {/* Coming Soon Placeholder */}
          <div className="bg-gradient-to-br from-primary-dark/30 to-primary-dark/50 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue transition group overflow-hidden">
            <Construction className="w-8 h-8 text-gray-600 mb-4 group-hover:text-primary-blue transition-colors" />
            <h3 className="text-xl font-semibold mb-2 text-gray-600 group-hover:text-primary-blue transition-colors">More Challenges Coming Soon</h3>
            <p className="text-gray-500 group-hover:text-gray-400 transition-colors">
              We're working on new challenges to test your cybersecurity skills.
            </p>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary-blue w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
