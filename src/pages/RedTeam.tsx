import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, ArrowLeft } from 'lucide-react';

function RedTeam() {
  const redTeamPaths = [
    {
      title: "Ethical Hacking Fundamentals",
      path: "/ethical-hacking-fundamentals",
      description: "Learn the core concepts and techniques of ethical hacking",
      modules: [
        {
          title: "Introduction to Ethical Hacking",
          topics: [
            "What is Ethical Hacking?",
            "Hacking Methodologies",
            "Legal and Ethical Considerations",
            "Penetration Testing vs. Red Teaming"
          ]
        },
        {
          title: "Reconnaissance & OSINT",
          topics: [
            "What is Reconnaissance?",
            "Passive vs. Active Recon",
            "Open-Source Intelligence (OSINT) Techniques"
          ]
        }
      ]
    },
    {
      title: "Penetration Testing",
      path: "/penetration-testing",
      description: "Master the tools and techniques of penetration testers",
      modules: [
        {
          title: "Exploitation Techniques",
          topics: [
            "Vulnerability Discovery",
            "Common Exploits",
            "Privilege Escalation Techniques"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-red/20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary-red hover:text-primary-red/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
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

      {/* Header with image */}
      <div className="relative bg-primary-dark py-12 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="flex-shrink-0">
            <img 
              src="/red-team-page.png" 
              alt="Red Team Page" 
              className="w-80 h-80 object-cover rounded-lg shadow-lg" 
            />
          </div>
          <div className="ml-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Red Team Learning Paths</h1>
            <p className="text-xl text-gray-400">Comprehensive offensive security training paths</p>
          </div>
        </div>
      </div>

      {/* Learning Paths Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8">
          {redTeamPaths.map((path, index) => (
            <div 
              key={index} 
              className="bg-primary-dark/30 rounded-lg border border-primary-red/20 overflow-hidden hover-card glass-effect animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Book className="w-6 h-6 text-primary-red animate-pulse-slow" />
                      <h2 className="text-2xl font-bold gradient-text">{path.title}</h2>
                    </div>
                    <p className="text-gray-400 mb-6">{path.description}</p>
                  </div>
                  <Link
                    to={path.path}
                    className="bg-primary-red text-background px-4 py-2 rounded-md hover:bg-secondary-red transition flex items-center group"
                  >
                    Start Learning 
                    <ChevronRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {path.modules.map((module, moduleIndex) => (
                    <div 
                      key={moduleIndex} 
                      className="border-t border-primary-red/10 pt-6 animate-slideInRight"
                      style={{ animationDelay: `${moduleIndex * 0.1}s` }}
                    >
                      <h3 className="text-lg font-semibold mb-4 text-primary-red">{module.title}</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <li 
                            key={topicIndex} 
                            className="text-gray-400 flex items-center group hover:text-primary-red transition-colors"
                          >
                            <div className="w-2 h-2 bg-primary-red rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RedTeam;
