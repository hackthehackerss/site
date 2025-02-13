import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Award, Trophy, Star, Quote, CheckCircle2, Search, Moon, Sun, MessageCircle } from 'lucide-react';
import UserProfileButton from '../components/UserProfileButton';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { profile } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [darkMode, setDarkMode] = useState(true); // Dark mode state
  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot state

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`${darkMode ? 'bg-primary-dark border-b border-primary-blue/20' : 'bg-white border-b border-gray-200'} glass-effect`}>
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
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Hack</span>
                <span className="text-primary-red">The</span>
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Hackers</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/challenges" className={`${darkMode ? 'text-primary-blue hover:text-primary-blue/80' : 'text-gray-700 hover:text-gray-900'}`}>Challenges</Link>
              <Link to="/leaderboard" className={`${darkMode ? 'text-primary-blue hover:text-primary-blue/80' : 'text-gray-700 hover:text-gray-900'}`}>Leaderboard</Link>
              <Link to="/pricing" className={`${darkMode ? 'text-primary-blue hover:text-primary-blue/80' : 'text-gray-700 hover:text-gray-900'}`}>Plan & Pricing</Link>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
              </button>
              <Search className={`w-6 h-6 ${darkMode ? 'text-primary-blue' : 'text-gray-700'} cursor-pointer`} />
              {profile ? (
                <UserProfileButton />
              ) : (
                <>
                  <Link to="/signin" className={`${darkMode ? 'text-primary-blue hover:text-primary-blue/80' : 'text-gray-700 hover:text-gray-900'}`}>Sign In</Link>
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
      <div className={`relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 ${darkMode ? 'bg-gradient-to-b from-primary-dark to-background' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        {/* Main Text */}
        <div className="mb-12 reveal-scale">
          <h1 className="text-6xl font-bold mb-6 title-gradient tracking-tight leading-tight">
            Your Cybersecurity Journey
            <br />
            <span className="title-glow">Starts Here</span>
          </h1>
          <h2 className="text-3xl subtitle-gradient font-semibold mb-8 tracking-wide">
            Hands-On Training for Real-World Threats
          </h2>
        </div>

        {/* Choose Logo */}
        <div className="mb-16 reveal transform hover:scale-105 transition-transform duration-300 relative">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-lg z-0 animate-glow-blue-red"></div>
          <div className="relative z-10 p-2 border-4 border-primary-blue/30 rounded-lg">
            <img 
              src="/choose-path.png" 
              alt="Choose Your Path" 
              className="w-120 h-auto animate-float"
            />
          </div>
        </div>

        {/* Team Selection */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto reveal">
          <Link 
            to="/learning-paths" 
            className="group transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="/blue-team.png" 
                alt="Blue Team" 
                className="w-full h-auto rounded-lg shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-2xl font-bold text-primary-blue">Enter Blue Team Training</span>
              </div>
            </div>
          </Link>
          <Link 
            to="/red-team" 
            className="group transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="/red-team.png" 
                alt="Red Team" 
                className="w-full h-auto rounded-lg shadow-lg group-hover:shadow-red-500/50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-2xl font-bold text-primary-red">Explore Red Team Courses</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${darkMode ? 'bg-primary-dark/50' : 'bg-gray-100'} py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-left">
              <Shield className="w-12 h-12 text-primary-blue mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Learning Paths</h3>
              <p className="text-gray-400">Structured courses covering incident response, threat hunting, and security operations.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-primary-red/20 hover:border-primary-red transition reveal">
              <Trophy className="w-12 h-12 text-primary-red mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Hands-on Labs</h3>
              <p className="text-gray-400">Practice in realistic environments with guided exercises and real-world scenarios.</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-primary-blue/20 hover:border-primary-blue transition reveal-right">
              <Award className="w-12 h-12 text-primary-blue mx-auto mb-4 animate-pulse-slow" />
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <p className="text-gray-400">Test your skills with CTF-style challenges and earn badges for your achievements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className={`py-24 ${darkMode ? 'bg-primary-dark' : 'bg-white'}`} id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Choose Your Plan</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Select the plan that best suits your learning goals. The Basic plan is free, and the Pro plan includes full access to all courses and challenges.
            </p>
            <div className="flex justify-center items-center space-x-6">
              <span 
                className={`cursor-pointer text-lg font-semibold ${billingCycle === 'monthly' ? 'text-primary-blue' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </span>
              <div 
                className={`w-20 h-10 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out ${billingCycle === 'annual' ? 'bg-primary-blue' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              >
                <div 
                  className={`w-8 h-8 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-50'} transform transition-transform duration-300 ease-in-out ${billingCycle === 'annual' ? 'translate-x-10' : ''}`}
                />
              </div>
              <span 
                className={`cursor-pointer text-lg font-semibold ${billingCycle === 'annual' ? 'text-primary-blue' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual (Save 20%)
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[ 
              {
                name: 'Basic',
                price: 0,  // Free Plan
                features: [
                  'Free Challenges',
                  'Cybersecurity Fundamentals'
                ],
                description: "Get started with the basics, explore foundational courses, and access a selection of free challenges."
              },
              {
                name: 'Pro',
                price: billingCycle === 'monthly' ? 24 : 20,  // Monthly $24, Annual $20/month (for annual billing)
                popular: true,
                features: [
                  'All Challenges',
                  'All Learning Paths',
                  'All Courses',
                  'Priority Support'
                ],
                description: "Unlock all content, including premium challenges, learning paths, and courses. Gain priority support to fast-track your progress."
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`${darkMode ? 'bg-primary-dark/30' : 'bg-white'} rounded-lg p-8 border transition-all duration-300 ease-in-out ${
                  plan.popular 
                    ? 'border-primary-blue scale-105 shadow-lg shadow-primary-blue/20' 
                    : 'border-primary-blue/20 hover:border-primary-blue'
                } hover:scale-105 relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary-blue text-background px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{plan.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{plan.description}</p>
                <div className="mb-6 flex items-center space-x-2">
                  <span className="text-4xl font-extrabold text-primary-blue">${plan.price}</span>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{billingCycle === 'monthly' ? 'per month' : 'annually'}</span>
                </div>
                <ul className="space-y-4 mb-8 text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-primary-blue text-background py-3 rounded-md hover:bg-secondary-blue transition duration-200 ease-in-out">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What's New Section */}
      <div className={`py-24 ${darkMode ? 'bg-primary-dark/50' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="text-primary-blue">What's New</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "New Red Team Challenge",
                description: "Test your penetration testing skills with our latest Red Team challenge.",
                image: "/red-team-challenge.jpg",
                date: "2023-10-15"
              },
              {
                title: "Blue Team Learning Path",
                description: "Explore our new Blue Team learning path focused on incident response.",
                image: "/blue-team-path.jpg",
                date: "2023-10-10"
              },
              {
                title: "Advanced Threat Hunting",
                description: "Learn advanced threat hunting techniques with our new course.",
                image: "/threat-hunting.jpg",
                date: "2023-10-05"
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`${darkMode ? 'bg-primary-dark/40' : 'bg-white'} rounded-lg p-6 border ${darkMode ? 'border-primary-blue/20' : 'border-gray-200'} hover:border-primary-blue transition transform hover:scale-105`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{item.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{item.description}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Published on {item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Reviews Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">
            <span className="text-primary-blue">What Our</span> Users Are Saying
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John D.",
                role: "Security Team Lead",
                review:
                  "This platform has been an incredible resource for my team. The training is clear, well-structured, and practical. The content covers everything from basic concepts to advanced techniques. Highly recommend it for anyone serious about improving their Blue Team skills!",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100",
              },
              {
                name: "Sarah L.",
                role: "Cybersecurity Professional",
                review:
                  "As a cybersecurity professional, I was looking for a comprehensive training solution for my team. This platform provided exactly what we needed! The hands-on labs are particularly useful, and I feel much more confident tackling security incidents now.",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100",
              },
              {
                name: "Alex T.",
                role: "Security Operations Manager",
                review:
                  "I've gone through several courses, but this one stands out. The Windows security training was top-notch, and the practical exercises gave me real-world experience. I can immediately apply what I learned to my day-to-day job. Will definitely recommend it to my colleagues!",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100",
              },
              {
                name: "David M.",
                role: "Incident Responder",
                review:
                  "This platform truly excels in providing real-world scenarios for incident response training. The challenges helped me improve my analysis and investigation skills, and I now feel more confident in handling complex threats.",
                image:
                  "https://images.unsplash.com/photo-1494387302712-4d3171c04237?fit=crop&w=100&h=100",
              },
              {
                name: "Emily W.",
                role: "Forensics Expert",
                review:
                  "The hands-on exercises in digital forensics were incredibly valuable. It’s great to have a platform that teaches you the practical aspects, not just theory. The scenarios presented were both engaging and informative.",
                image:
                  "https://images.unsplash.com/photo-1521747116042-5e31a0c93b8e?fit=crop&w=100&h=100",
              },
              {
                name: "Michael R.",
                role: "Penetration Tester",
                review:
                  "The content here is highly relevant for real-world penetration testing. I particularly appreciated the comprehensive Blue Team training. I’ve learned new techniques and enhanced my approach to identifying vulnerabilities in a system.",
                image:
                  "https://images.unsplash.com/photo-1518770660439-4636190af1d7?fit=crop&w=100&h=100",
              },
            ].map((review, index) => (
              <div
                key={index}
                className={`reveal ${darkMode ? 'bg-primary-dark/40' : 'bg-white'} rounded-lg p-8 border ${darkMode ? 'border-primary-blue/20' : 'border-gray-200'} hover:border-primary-blue transition transform hover:scale-105 relative hover-card glass-effect`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-blue/30" />
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-primary-blue"
                  />
                  <div>
                    <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.name}</h3>
                    <p className="text-primary-blue text-sm">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} italic`}>"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="fixed bottom-8 right-8">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)} 
          className="bg-primary-blue p-4 rounded-full shadow-lg hover:bg-secondary-blue transition"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </button>
        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chat with Us</h3>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-64 overflow-y-auto mb-4">
              {/* Chat messages go here */}
            </div>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-primary-dark' : 'bg-white'} py-6 border-t ${darkMode ? 'border-primary-blue/20' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 HackTheHackers. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/terms" className={`${darkMode ? 'text-primary-blue hover:text-secondary-blue' : 'text-gray-700 hover:text-gray-900'} transition`}>
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
