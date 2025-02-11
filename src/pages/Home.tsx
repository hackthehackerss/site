import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Award, Trophy, Star, Quote, CheckCircle2 } from 'lucide-react';
import UserProfileButton from '../components/UserProfileButton';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { profile } = useAuth();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('monthly');

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
              <Link to="/challenges" className="text-primary-blue hover:text-primary-blue/80">Challenges</Link>
              <Link to="/leaderboard" className="text-primary-blue hover:text-primary-blue/80">Leaderboard</Link>
              <Link to="/Pricing" className="text-primary-blue hover:text-primary-blue/80">Plan & Pricing</Link>
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
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
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
        <div className="mb-16 reveal transform hover:scale-105 transition-transform duration-300">
          <img 
            src="/choose-path.png" 
            alt="Choose Your Path" 
            className="w-96 h-auto animate-float"
          />
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
      <div className="bg-primary-dark/50 py-24">
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
      <div className="py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <div className="flex justify-center items-center space-x-4">
              <span className={`cursor-pointer ${billingCycle === 'monthly' ? 'text-primary-blue' : 'text-gray-400'}`}
                    onClick={() => setBillingCycle('monthly')}>
                Monthly
              </span>
              <div className={`w-16 h-8 rounded-full p-1 cursor-pointer ${
                billingCycle === 'annual' ? 'bg-primary-blue' : 'bg-gray-600'
              }`}
                   onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}>
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-8' : ''
                }`} />
              </div>
              <span className={`cursor-pointer ${billingCycle === 'annual' ? 'text-primary-blue' : 'text-gray-400'}`}
                    onClick={() => setBillingCycle('annual')}>
                Annual (Save 20%)
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: billingCycle === 'monthly' ? 29 : 279,
                features: [
                  'Access to Basic Courses',
                  'Community Support',
                  'Basic Labs',
                  'Monthly Webinars'
                ]
              },
              {
                name: 'Pro',
                price: billingCycle === 'monthly' ? 49 : 469,
                popular: true,
                features: [
                  'All Basic Features',
                  'Advanced Courses',
                  'Premium Labs',
                  'Priority Support',
                  'Team Collaboration'
                ]
              },
              {
                name: 'Ultimate',
                price: billingCycle === 'monthly' ? 99 : 949,
                features: [
                  'All Pro Features',
                  'Custom Learning Path',
                  '1-on-1 Mentoring',
                  'Career Guidance',
                  'Certificate Program'
                ]
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`bg-primary-dark/30 rounded-lg p-8 border ${
                  plan.popular 
                    ? 'border-primary-blue scale-105 shadow-lg shadow-primary-blue/20' 
                    : 'border-primary-blue/20'
                } hover:border-primary-blue transition relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary-blue text-background px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-primary-blue text-background py-2 rounded-md hover:bg-secondary-blue transition">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              }
            ].map((review, index) => (
              <div 
                key={index} 
                className="reveal bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20 hover:border-primary-blue transition relative hover-card glass-effect"
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

      {/* Footer */}
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
