import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function RedTeam() {
  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <span className="text-xl font-bold">
                <span className="text-white">Red</span>
                <span className="text-primary-red">Team</span>
                <span className="text-white">Courses</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Red Team Courses</h1>
          <p className="text-xl text-gray-400 mb-8">Coming Soon</p>
          <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-red/20">
            <p className="text-lg">
              Our Red Team courses are currently under development. Stay tuned for comprehensive offensive security training content!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedTeam;
