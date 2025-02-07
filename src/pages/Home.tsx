import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Terminal, Book, Trophy, Star, Quote, CheckCircle2 } from 'lucide-react';
import UserProfileButton from '../components/UserProfileButton';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { profile } = useAuth();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('monthly');

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
  }, []);

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
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/learning-paths" className="text-primary-blue hover:text-primary-blue/80">Learning Paths</Link>
              <Link to="/challenges" className="text-primary-blue hover:text-primary-blue/80">Challenges</Link>
              <Link to="/leaderboard" className="text-primary-blue hover:text-primary-blue/80">Leaderboard</Link>
              {profile ? (
                <UserProfileButton />
              ) : (
                <>
                  <Link to="/signin" className="text-primary-blue hover:text-primary-blue/80">Sign In</Link>
                  <Link to="/signup" className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-secondary-red transition">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="logo-glitch inline-block">
              <img 
                src="/logo-full.png" 
                alt="HackTheHackers Full Logo" 
                className="h-32 mx-auto mb-8 animate-float"
              />
            </div>
            <h1 className="text-5xl font-bold mb-4 reveal-scale">
              Become a Blue Team Expert
            </h1>
            <h2 className="text-3xl text-primary-blue mb-8 reveal">
              Hands-On Training for Real-World Threats
            </h2>
            <p className="text-2xl text-primary-red font-semibold mb-12 reveal">
              Your Cybersecurity Journey Starts Here
            </p>
            <div className="flex justify-center gap-4 reveal">
              <Link 
                to="/learning-paths" 
                className="bg-primary-blue text-background px-8 py-3 rounded-md hover:bg-secondary-blue transition"
              >
                Start Learning
              </Link>
              <Link 
                to="/challenges" 
                className="border border-primary-red text-primary-red px-8 py-3 rounded-md hover:bg-primary-red hover:text-white transition"
              >
                View Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary-dark/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-left">
              <Shield className="w-12 h-12 text-primary-blue mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Learning Paths</h3>
              <p className="text-gray-400">Structured courses covering incident response, threat hunting, and security operations.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-primary-red/20 hover:border-primary-red transition reveal">
              <Terminal className="w-12 h-12 text-primary-red mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Hands-on Labs</h3>
              <p className="text-gray-400">Practice in realistic environments with guided exercises and real-world scenarios.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-right">
              <Trophy className="w-12 h-12 text-primary-blue mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <p className="text-gray-400">Test your skills with CTF-style challenges and earn badges for your achievements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths Preview */}
      <div className="py-24" id="learning-paths">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center reveal">
            <span className="text-primary-blue">Learning</span> Paths
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cybersecurity Fundamentals",
                description: "Master the essential concepts and foundations of cybersecurity.",
                modules: 15,
                hours: 30,
                path: "/cybersecurity-fundamentals",
                free: true
              },
              {
                title: "SOC Analyst",
                description: "Master Security Operations Center processes and tools.",
                modules: 12,
                hours: 24,
                path: "/soc-analyst",
                free: false
              },
              {
                title: "Incident Response",
                description: "Master incident handling and response procedures.",
                modules: 8,
                hours: 16,
                path: "/incident-response",
                free: false
              },
              {
                title: "Threat Hunting",
                description: "Advanced techniques for proactive threat detection.",
                modules: 10,
                hours: 20,
                path: "/threat-hunting",
                free: false
              },
              {
                title: "Malware Analysis",
                description: "Learn to analyze and understand malicious software.",
                modules: 14,
                hours: 28,
                path: "/malware-analysis",
                free: false
              },
              {
                title: "Cyber Threat Intelligence",
                description: "Master the art of threat intelligence analysis and implementation.",
                modules: 8,
                hours: 16,
                path: "/cyber-threat-intelligence",
                free: false
              }
            ].map((path, index) => (
              <Link 
                key={index} 
                to={path.free || profile?.subscription ? path.path : '#pricing'}
                className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue transition reveal group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Book className="w-8 h-8 text-primary-blue mb-4" />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{path.title}</h3>
                  {path.free && (
                    <span className="bg-primary-blue/20 text-primary-blue text-xs px-2 py-1 rounded-full">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-4">{path.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{path.modules} Modules</span>
                  <span>{path.hours} Hours</span>
                </div>
                {!path.free && !profile?.subscription && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-primary-blue">Unlock with Subscription</p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-primary-dark/80 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-primary-blue mb-12 reveal">Subscription Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary-blue/10 p-8 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-left">
                <h3 className="text-xl font-semibold mb-4">Monthly Plan</h3>
                <p className="text-3xl font-bold mb-8">₪199/month</p>
                <ul className="text-left text-gray-400 mb-8 space-y-4">
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Full Access to All Learning Paths</li>
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Hands-on Labs and Challenges</li>
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Access to Premium Content</li>
                </ul>
                <Link 
                  to="/signup" 
                  className="bg-primary-red text-white px-8 py-3 rounded-md hover:bg-secondary-red transition"
                >
                  Get Started
                </Link>
              </div>

              <div className="bg-primary-blue/10 p-8 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-right">
                <h3 className="text-xl font-semibold mb-4">Annual Plan</h3>
                <p className="text-3xl font-bold mb-8">₪1999/year</p>
                <ul className="text-left text-gray-400 mb-8 space-y-4">
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Full Access to All Learning Paths</li>
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Hands-on Labs and Challenges</li>
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Access to Premium Content</li>
                  <li><CheckCircle2 className="w-4 h-4 text-primary-blue inline mr-2" /> Save ₪389 Annually</li>
                </ul>
                <Link 
                  to="/signup" 
                  className="bg-primary-red text-white px-8 py-3 rounded-md hover:bg-secondary-red transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-24 bg-primary-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-primary-blue mb-12 text-center">What Our Users Are Saying</h2>
          <div className="flex justify-center gap-8">
            <div className="text-center p-8 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition">
              <Quote className="w-12 h-12 text-primary-blue mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-4">"HackTheHackers helped me improve my skills in incident response and threat hunting. The labs and challenges are amazing!"</p>
              <div className="font-semibold text-primary-blue">John Doe</div>
              <div className="text-gray-400">SOC Analyst</div>
            </div>
            <div className="text-center p-8 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition">
              <Quote className="w-12 h-12 text-primary-blue mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-4">"This platform helped me go from novice to expert in just a few months! Highly recommend."</p>
              <div className="font-semibold text-primary-blue">Jane Smith</div>
              <div className="text-gray-400">Threat Hunter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
