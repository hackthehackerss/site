import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function SocAnalyst() {
  const [activeSection, setActiveSection] = useState("soc-overview");
  const [activeSubSection, setActiveSubSection] = useState("");

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    revealElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [activeSection, activeSubSection]);

  const sections = [
    {
      id: "soc-overview",
      title: "SOC Overview",
      content: {
        introduction: "A Security Operations Center (SOC) is a centralized unit that deals with security issues on an organizational and technical level.",
        sections: [
          {
            title: "What is a SOC?",
            content: [
              "A team of security professionals monitoring and defending an organization",
              "24/7 monitoring and analysis of security alerts",
              "Incident detection, response, and recovery",
              "Threat intelligence and vulnerability management"
            ]
          },
          {
            title: "SOC Analyst Roles",
            content: [
              "Tier 1: Initial alert triage and basic incident handling",
              "Tier 2: Advanced incident investigation and response",
              "Tier 3: Advanced threat hunting and incident response",
              "SOC Manager: Team leadership and strategy"
            ]
          },
          {
            title: "Core SOC Functions",
            subsections: [
              {
                title: "Security Monitoring",
                content: [
                  "Real-time monitoring of security events",
                  "Log analysis and correlation",
                  "Alert triage and investigation",
                  "Incident detection and response"
                ]
              },
              {
                title: "Threat Intelligence",
                content: [
                  "Collection and analysis of threat data",
                  "Integration of threat feeds",
                  "Threat hunting and investigation",
                  "Intelligence sharing and reporting"
                ]
              }
            ]
          },
          {
            title: "SOC Tools and Technologies",
            content: [
              "SIEM (Security Information and Event Management)",
              "EDR (Endpoint Detection and Response)",
              "SOAR (Security Orchestration and Response)",
              "Threat Intelligence Platforms",
              "Network Monitoring Tools"
            ]
          }
        ]
      }
    },
    {
      id: "security-monitoring",
      title: "Security Monitoring",
      content: {
        introduction: "Security monitoring is the continuous observation and analysis of network activities and security controls.",
        sections: [
          {
            title: "SIEM Fundamentals",
            content: [
              "Log collection and aggregation",
              "Event correlation and analysis",
              "Alert generation and management",
              "Reporting and compliance"
            ]
          }
        ]
      }
    }
  ];

  const activeContent = sections.find(section => section.id === activeSection)?.content;
  const activeSubSectionContent = activeContent?.sections?.find(s => s.title === activeSubSection);

  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/learning-paths" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Learning Paths
              </Link>
              <span className="text-xl font-bold animate-fadeIn">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-primary-dark/50 py-8 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 animate-fadeIn">
            <Book className="w-8 h-8 text-primary-blue animate-pulse-slow" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">SOC Analyst</h1>
              <p className="text-gray-400 text-sm mt-1">Master Security Operations Center processes and tools</p>
              <div className="mt-2 progress-bar"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 bg-primary-dark/30 min-h-[calc(100vh-11rem)] border-r border-primary-blue/20 glass-effect">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 gradient-text">Course Sections</h2>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveSubSection("");
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center justify-between hover-card transition-all ${
                    activeSection === section.id
                      ? 'bg-primary-blue/20 text-primary-blue'
                      : 'hover:bg-primary-blue/10'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {section.title}
                  <ChevronRight className={`w-4 h-4 transform transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-8">
          {activeContent && (
            <div className="space-y-8">
              {!activeSubSection && (
                <>
                  <h1 className="text-3xl font-bold text-primary-blue mb-4 reveal-scale">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h1>
                  <p className="text-lg mb-8 whitespace-pre-line reveal">{activeContent.introduction}</p>
                </>
              )}
              
              {activeSubSection && activeSubSectionContent && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold gradient-text reveal">{activeSubSectionContent.title}</h2>
                  
                  {activeSubSectionContent.content && (
                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                      {activeSubSectionContent.content.map((item, i) => {
                        if (item.includes(':')) {
                          const [title, ...rest] = item.split(':');
                          return (
                            <div key={i} className="mb-4 reveal-right" style={{ animationDelay: `${i * 100}ms` }}>
                              <span className="font-bold">{title}:</span>
                              {rest.length > 0 && (
                                <span className="text-gray-200 hover:text-white transition-colors">
                                  {rest.join(':')}
                                </span>
                              )}
                            </div>
                          );
                        }
                        return (
                          <li 
                            key={i} 
                            className="reveal-left hover:text-primary-blue transition-colors" 
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  
                  {activeSubSectionContent.subsections && (
                    <div className="space-y-6">
                      {activeSubSectionContent.subsections.map((subsection, si) => (
                        <div 
                          key={si} 
                          className="space-y-2 reveal"
                          style={{ animationDelay: `${si * 100}ms` }}
                        >
                          <h3 className="text-xl font-bold">{subsection.title}</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-200">
                            {subsection.content.map((item, i) => (
                              <li 
                                key={i}
                                className="hover:text-primary-blue transition-colors reveal-left"
                                style={{ animationDelay: `${(si * 4 + i) * 100}ms` }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {activeContent?.sections && activeContent.sections.length > 0 && (
          <div className="w-64 bg-primary-dark/30 min-h-[calc(100vh-11rem)] border-l border-primary-blue/20 glass-effect">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4 gradient-text">Module Sections</h2>
              <div className="space-y-2">
                {activeContent.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSubSection(section.title)}
                    className={`w-full text-left px-4 py-2 rounded-md hover-card transition-all ${
                      activeSubSection === section.title
                        ? 'bg-primary-blue/20 text-primary-blue'
                        : 'hover:bg-primary-blue/10'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SocAnalyst;