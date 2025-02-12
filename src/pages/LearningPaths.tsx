import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight } from 'lucide-react';

function LearningPaths() {
  const learningPaths = [
    {
      title: "Cybersecurity Fundamentals",
      path: "/cybersecurity-fundamentals",
      description: "Master the essential concepts and foundations of cybersecurity",
      modules: [
        {
          title: "What is Cybersecurity",
          topics: [
            "The CIA Triad",
            "Why is Cybersecurity Important?",
            "Key Cybersecurity Concepts",
            "Cybersecurity Domains",
            "Types of Cyber Threats",
            "Stages of a Cyber Attack"
          ]
        },
        {
          title: "Network Fundamentals",
          topics: [
            "What is a Computer Network?",
            "Purposes of Computer Networks",
            "The OSI Reference Model",
            "Network Devices"
          ]
        },
        {
          title: "Windows Fundamentals",
          topics: ["Coming soon"]
        },
        {
          title: "Linux for Blue Team",
          topics: ["Coming soon"]
        }
      ]
    },
    {
      title: "SOC Analyst",
      path: "/soc-analyst",
      description: "Master Security Operations Center processes and tools",
      modules: [
        {
          title: "SOC Overview",
          topics: [
            "What is a SOC?",
            "SOC Analyst Roles",
            "Core SOC Functions",
            "SOC Tools and Technologies"
          ]
        },
        {
          title: "Security Monitoring",
          topics: [
            "SIEM Fundamentals"
          ]
        }
      ]
    },
    {
      title: "Incident Response",
      path: "/incident-response",
      description: "Master incident handling and response procedures",
      modules: [
        {
          title: "Incident Response Overview",
          topics: [
            "What is Incident Response?",
            "Incident Response Lifecycle",
            "Core IR Concepts"
          ]
        }
      ]
    },
    {
      title: "Threat Hunting",
      path: "/threat-hunting",
      description: "Advanced techniques for proactive threat detection",
      modules: [
        {
          title: "Threat Hunting Overview",
          topics: [
            "What is Threat Hunting?",
            "Threat Hunting Process",
            "Core Concepts"
          ]
        }
      ]
    },
    {
      title: "Malware Analysis",
      path: "/malware-analysis",
      description: "Learn to analyze and understand malicious software",
      modules: [
        {
          title: "Malware Analysis Overview",
          topics: [
            "What is Malware Analysis?",
            "Types of Analysis",
            "Core Concepts"
          ]
        }
      ]
    },
    {
      title: "Cyber Threat Intelligence",
      path: "/cyber-threat-intelligence",
      description: "Master the art of threat intelligence analysis and implementation",
      modules: [
        {
          title: "CTI Overview",
          topics: [
            "What is Cyber Threat Intelligence?",
            "Intelligence Sources",
            "CTI Process",
            "Threat Intelligence Platforms"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <a href="/" className="animate-pulse-slow">
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

      {/* Header with image on the left */}
      <div className="relative bg-primary-dark py-12 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="flex-shrink-0">
            <img 
              src="/blue-team-page.png" 
              alt="Blue Team Page" 
              className="w-80 h-80 object-cover rounded-lg shadow-lg" 
            />
          </div>
          <div className="ml-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Learning Paths</h1>
            <p className="text-xl text-gray-400">Comprehensive cybersecurity training paths to advance your career</p>
          </div>
        </div>
      </div>

      {/* Learning Paths Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8">
          {learningPaths.map((path, index) => (
            <div 
              key={index} 
              className="bg-primary-dark/30 rounded-lg border border-primary-blue/20 overflow-hidden hover-card glass-effect animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Book className="w-6 h-6 text-primary-blue animate-pulse-slow" />
                      <h2 className="text-2xl font-bold gradient-text">{path.title}</h2>
                    </div>
                    <p className="text-gray-400 mb-6">{path.description}</p>
                  </div>
                  <Link
                    to={path.path}
                    className="bg-primary-blue text-background px-4 py-2 rounded-md hover:bg-secondary-blue transition flex items-center group"
                  >
                    Start Learning 
                    <ChevronRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {path.modules.map((module, moduleIndex) => (
                    <div 
                      key={moduleIndex} 
                      className="border-t border-primary-blue/10 pt-6 animate-slideInRight"
                      style={{ animationDelay: `${moduleIndex * 0.1}s` }}
                    >
                      <h3 className="text-lg font-semibold mb-4 text-primary-blue">{module.title}</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <li 
                            key={topicIndex} 
                            className="text-gray-400 flex items-center group hover:text-primary-blue transition-colors"
                          >
                            <div className="w-2 h-2 bg-primary-blue rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
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

export default LearningPaths;
