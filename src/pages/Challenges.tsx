import React from 'react';
import { Construction, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function Challenges() {
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

      {/* Challenges Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Challenges</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* PowerShell Logs Challenge */}
          <Link 
            to="/challenges/powershell-logs"
            className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue transition group"
          >
            <FileText className="w-8 h-8 text-primary-blue mb-4" />
            <h3 className="text-xl font-semibold mb-2">PowerShell Analysis Challenge</h3>
            <p className="text-gray-400 mb-4">
              Analyze a suspicious PowerShell command and investigate its role in a system compromise
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-primary-blue">10 Questions</span>
              <span className="text-primary-red">500 Points</span>
            </div>
          </Link>

          {/* CryptoMiner Investigation Challenge */}
          <Link 
            to="/challenges/miner-on-the-run"
            className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue transition group"
          >
            <FileText className="w-8 h-8 text-primary-blue mb-4" />
            <h3 className="text-xl font-semibold mb-2">Miner On the Run</h3>
            <p className="text-gray-400 mb-4">
              Investigate an encrypted endpoint and uncover a hidden cryptocurrency mining operation.
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-primary-blue">12 Questions</span>
              <span className="text-primary-red">600 Points</span>
            </div>
          </Link>

          {/* Coming Soon Placeholder */}
          <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
            <Construction className="w-8 h-8 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-600">More Challenges Coming Soon</h3>
            <p className="text-gray-500">
              We're working on new challenges to test your cybersecurity skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
