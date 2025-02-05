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
                  <div className="mt-4 pt-4 border-t border-primary-blue/20 text-center">
                    <span className="text-primary-blue text-sm">
                      Subscribe to unlock this path
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      {!profile?.subscription && (
        <div className="bg-primary-dark/50 py-24" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center reveal">
              <span className="text-primary-red">Subscription</span> Plans
            </h2>
            <div className="flex justify-center items-center mb-8 reveal">
              <span className="text-gray-400">Monthly</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                className="mx-4 relative inline-flex h-6 w-11 items-center rounded-full bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
              >
                <span
                  className={`${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-primary-blue transition`}
                />
              </button>
              <span className="text-gray-400">Annual</span>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="reveal-left bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-3xl font-bold mb-4">Free</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Cybersecurity Fundamentals path</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Basic challenges</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Community access</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="block w-full text-center border border-primary-blue text-primary-blue py-3 rounded-md hover:bg-primary-blue hover:text-background transition"
                >
                  Get Started
                </Link>
              </div>
              <div className="reveal bg-primary-dark rounded-lg p-6 border border-primary-blue/20">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-2">
                  {billingCycle === 'monthly' ? '$14' : '$10'}<span className="text-lg">/month</span>
                </p>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-primary-blue mb-4">Save $48/year with annual billing</p>
                )}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>SOC Analyst path</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Malware Analysis path</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>All challenges</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Hands-on labs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-primary-blue text-background py-3 rounded-md hover:bg-secondary-blue transition"
                >
                  Get Started
                </Link>
              </div>
              <div className="reveal-right bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 relative">
                <div className="absolute -top-3 right-4 bg-primary-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Ultimate</h3>
                <p className="text-3xl font-bold mb-2">
                  {billingCycle === 'monthly' ? '$24' : '$20'}<span className="text-lg">/month</span>
                </p>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-primary-blue mb-4">Save $48/year with annual billing</p>
                )}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>All learning paths</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>All challenges</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Hands-on labs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                    <span>Early access to new content</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="block w-full text-center border border-primary-blue text-primary-blue py-3 rounded-md hover:bg-primary-blue hover:text-background transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Reviews Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-16 text-center reveal">
            <span className="text-primary-blue">What Our</span> Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John D.",
                role: "Security Team Lead",
                review: "This platform has been an incredible resource for my team. The training is clear, well-structured, and practical. The content covers everything from basic concepts to advanced techniques. Highly recommend it for anyone serious about improving their Blue Team skills!",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100"
              },
              {
                name: "Sarah L.",
                role: "Cybersecurity Professional",
                review: "As a cybersecurity professional, I was looking for a comprehensive training solution for my team. This platform provided exactly what we needed! The hands-on labs are particularly useful, and I feel much more confident tackling security incidents now.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100"
              },
              {
                name: "Alex T.",
                role: "Security Operations Manager",
                review: "I've gone through several courses, but this one stands out. The Windows security training was top-notch, and the practical exercises gave me real-world experience. I can immediately apply what I learned to my day-to-day job. Will definitely recommend it to my colleagues!",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100"
              },
              {
                name: "Emily K.",
                role: "Incident Response Analyst",
                review: "This platform is a game-changer! The modules are engaging, and the content is incredibly relevant to current cybersecurity threats. I'm much more confident when responding to security incidents now. The support team is also very responsive and helpful!",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100"
              },
              {
                name: "Michael P.",
                role: "Blue Team Lead",
                review: "The Blue Team training platform has transformed the way we approach incident response. The training is detailed and well-organized, with a perfect balance of theory and practical application. It's a must-have for anyone looking to strengthen their security operations!",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100"
              }
            ].map((review, index) => (
              <div 
                key={index} 
                className={`reveal ${
                  index === 1 ? 'lg:col-span-2' : ''
                } bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20 hover:border-primary-blue transition relative hover-card glass-effect`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-blue/20" />
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-primary-blue"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-primary-blue text-sm">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-400 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Copyright and Contact */}
      <footer className="bg-primary-dark py-6 border-t border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © 2025 HackTheHackers. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/terms" className="text-primary-blue hover:text-secondary-blue transition">
                Terms of Use
              </Link>
              <Link 
                to="/contact" 
                className="bg-primary-blue text-background px-4 py-2 rounded-md hover:bg-secondary-blue transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;