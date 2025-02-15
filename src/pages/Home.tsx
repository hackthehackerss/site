import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Award, Trophy, Star, Quote, CheckCircle2, MessageCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import UserProfileButton from '../components/UserProfileButton';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleGetStarted = (plan: string) => {
    if (profile) {
      navigate(`/payment?plan=${plan.toLowerCase()}&billing=${billingCycle}`);
    } else {
      navigate('/signup');
    }
  };

  const MovingBar = () => {
    const companies = [
      { name: 'Meta', logo: '/logos/meta.png' },
      { name: 'Cisco', logo: '/logos/cisco.png' },
      { name: 'Microsoft', logo: '/logos/microsoft.png' },
      { name: 'Mitre', logo: '/logos/mitre.png' },
      { name: 'Google', logo: '/logos/google.png' },
      { name: 'Amazon', logo: '/logos/amazon.png' },
      { name: 'IBM', logo: '/logos/ibm.png' },
      { name: 'Palo Alto', logo: '/logos/palo.png' },
      { name: 'Check Point', logo: '/logos/check.png' },
      { name: 'Crowdstrike', logo: '/logos/cs.png' },
    ];
  
    return (
      <div className="py-6 overflow-hidden">
        <div className="text-center mb-4">
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          </h3>
        </div>
  
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center space-x-10 animate-marquee">
            {[...companies, ...companies].map((company, index) => (
              <img
                key={index}
                src={company.logo}
                alt={company.name}
                className="h-16 w-auto md:h-20 opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

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

      {/* Moving Bar */}
      <MovingBar />

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
              }
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