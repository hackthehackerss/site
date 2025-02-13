import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, Shield, Sword, Target, Code, Network, Lock, FileSearch, Bug, Braces } from 'lucide-react';

function LearningPaths() {
  const blueTeamPaths = [
    {
      title: "Cybersecurity Fundamentals",
      path: "/cybersecurity-fundamentals",
      description: "Master the essential concepts and foundations of cybersecurity",
      icon: Shield,
      difficulty: "Beginner",
      access: "Free",
      modules: [
        {
          title: "Core Concepts",
          topics: [
            "The CIA Triad",
            "Security Domains",
            "Types of Threats",
            "Attack Lifecycle"
          ]
        },
        {
          title: "Network Security",
          topics: [
            "Network Protocols",
            "Firewalls & IDS/IPS",
            "Network Monitoring",
            "Traffic Analysis"
          ]
        }
      ]
    },
    {
      title: "SOC Analyst",
      path: "/soc-analyst",
      description: "Master Security Operations Center processes and tools",
      icon: Target,
      difficulty: "Intermediate",
      access: "Pro",
      modules: [
        {
          title: "SIEM Fundamentals",
          topics: [
            "Log Analysis",
            "Alert Triage",
            "Incident Response",
            "Threat Detection"
          ]
        }
      ]
    },
    {
      title: "Incident Response",
      path: "/incident-response",
      description: "Learn to handle and respond to security incidents",
      icon: FileSearch,
      difficulty: "Advanced",
      access: "Pro",
      modules: [
        {
          title: "IR Process",
          topics: [
            "Incident Handling",
            "Digital Forensics",
            "Evidence Collection",
            "Root Cause Analysis"
          ]
        }
      ]
    }
  ];

  const redTeamPaths = [
    {
      title: "Penetration Testing Basics",
      path: "/red-team/pentest-basics",
      description: "Learn the fundamentals of penetration testing",
      icon: Sword,
      difficulty: "Beginner",
      access: "Pro",
      modules: [
        {
          title: "Reconnaissance",
          topics: [
            "Information Gathering",
            "OSINT Techniques",
            "Network Scanning",
            "Vulnerability Assessment"
          ]
        }
      ]
    },
    {
      title: "Web Application Security",
      path: "/red-team/web-security",
      description: "Master web application security testing",
      icon: Code,
      difficulty: "Intermediate",
      access: "Pro",
      modules: [
        {
          title: "Web Vulnerabilities",
          topics: [
            "OWASP Top 10",
            "XSS & CSRF",
            "SQL Injection",
            "Authentication Bypass"
          ]
        }
      ]
    },
    {
      title: "Advanced Exploitation",
      path: "/red-team/advanced-exploitation",
      description: "Advanced exploitation techniques and methodologies",
      icon: Bug,
      difficulty: "Advanced",
      access: "Pro",
      modules: [
        {
          title: "Advanced Techniques",
          topics: [
            "Buffer Overflows",
            "Shellcoding",
            "Privilege Escalation",
            "Post Exploitation"
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
              <div className="logo-glitch">
                <img 
                  src="/logo-shield.png" 
                  alt="HackTheHackers Logo" 
                  className="h-10 w-auto animate-float"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Team Selection Header */}
      <div className="relative bg-primary-dark py-12 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text text-center">Choose Your Path</h1>
          <p className="text-xl text-gray-400 text-center mb-12">Select your specialization and begin your cybersecurity journey</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Blue Team Card */}
            <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20 hover:border-primary-blue transition-all hover:scale-105">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-primary-blue mr-3" />
                <h2 className="text-2xl font-bold">Blue Team</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Focus on defending systems, detecting threats, and responding to incidents. Perfect for aspiring Security Analysts and Incident Responders.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Lock className="w-4 h-4 mr-2" />
                <span>Some paths require Pro subscription</span>
              </div>
            </div>

            {/* Red Team Card */}
            <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-red/20 hover:border-primary-red transition-all hover:scale-105">
              <div className="flex items-center mb-4">
                <Sword className="w-8 h-8 text-primary-red mr-3" />
                <h2 className="text-2xl font-bold">Red Team</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Master offensive security techniques, penetration testing, and vulnerability assessment. Ideal for aspiring Ethical Hackers.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <Lock className="w-4 h-4 mr-2" />
                <span>Pro subscription required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Team Paths */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Shield className="w-8 h-8 text-primary-blue mr-3" />
          Blue Team Learning Paths
        </h2>
        
        <div className="grid gap-8">
          {blueTeamPaths.map((path, index) => (
            <div 
              key={index}
              className="bg-primary-dark/30 rounded-lg border border-primary-blue/20 overflow-hidden hover:border-primary-blue transition-all hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <path.icon className="w-6 h-6 text-primary-blue" />
                      <h3 className="text-2xl font-bold">{path.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{path.description}</p>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue text-sm">
                        {path.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        path.access === 'Free' 
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-primary-red/10 text-primary-red'
                      }`}>
                        {path.access}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={path.path}
                    className="bg-primary-blue text-background px-4 py-2 rounded-md hover:bg-secondary-blue transition flex items-center"
                  >
                    Start Learning
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                <div className="border-t border-primary-blue/10 pt-6 mt-6">
                  {path.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="mb-6 last:mb-0">
                      <h4 className="text-lg font-semibold mb-4 text-primary-blue">{module.title}</h4>
                      <ul className="grid grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <li 
                            key={topicIndex}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                          >
                            <div className="w-2 h-2 bg-primary-blue rounded-full mr-3"></div>
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

      {/* Red Team Paths */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Sword className="w-8 h-8 text-primary-red mr-3" />
          Red Team Learning Paths
        </h2>
        
        <div className="grid gap-8">
          {redTeamPaths.map((path, index) => (
            <div 
              key={index}
              className="bg-primary-dark/30 rounded-lg border border-primary-red/20 overflow-hidden hover:border-primary-red transition-all hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <path.icon className="w-6 h-6 text-primary-red" />
                      <h3 className="text-2xl font-bold">{path.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{path.description}</p>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 rounded-full bg-primary-red/10 text-primary-red text-sm">
                        {path.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-primary-red/10 text-primary-red text-sm">
                        {path.access}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={path.path}
                    className="bg-primary-red text-background px-4 py-2 rounded-md hover:bg-secondary-red transition flex items-center"
                  >
                    Start Learning
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                <div className="border-t border-primary-red/10 pt-6 mt-6">
                  {path.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="mb-6 last:mb-0">
                      <h4 className="text-lg font-semibold mb-4 text-primary-red">{module.title}</h4>
                      <ul className="grid grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <li 
                            key={topicIndex}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                          >
                            <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
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
