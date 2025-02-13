import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Pricing() {
  const { profile } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Basic',
      price: 0,
      features: [
        'Access to Basic Challenges',
        'Cybersecurity Fundamentals Course',
        'Community Forum Access',
        'Basic Support'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 24.99 : 19.99,
      features: [
        'All Basic Features',
        'All Advanced Challenges',
        'All Learning Paths',
        'Priority Support',
        'Certificate of Completion',
        'Private Discord Access',
        'Team Collaboration Tools'
      ],
      buttonText: 'Subscribe Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 49.99 : 39.99,
      features: [
        'All Pro Features',
        'Custom Learning Paths',
        'Dedicated Support Manager',
        'API Access',
        'SSO Integration',
        'Advanced Analytics',
        'Custom Reporting',
        'SLA Guarantee'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <span className="text-xl font-bold">Plans & Pricing</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Billing Toggle */}
        <div className="flex justify-center items-center space-x-6 mb-12">
          <span 
            className={`cursor-pointer text-lg font-semibold ${
              billingCycle === 'monthly' ? 'text-primary-blue' : 'text-gray-400'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </span>
          <div 
            className={`w-20 h-10 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out ${
              billingCycle === 'annual' ? 'bg-primary-blue' : 'bg-gray-600'
            }`}
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
          >
            <div 
              className={`w-8 h-8 bg-white rounded-full transform transition-transform duration-300 ease-in-out ${
                billingCycle === 'annual' ? 'translate-x-10' : ''
              }`}
            />
          </div>
          <span 
            className={`cursor-pointer text-lg font-semibold ${
              billingCycle === 'annual' ? 'text-primary-blue' : 'text-gray-400'
            }`}
            onClick={() => setBillingCycle('annual')}
          >
            Annual (Save 20%)
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-primary-dark/30 rounded-lg p-8 border transition-all duration-300 ${
                plan.popular 
                  ? 'border-primary-blue scale-105 shadow-lg shadow-primary-blue/20' 
                  : 'border-primary-blue/20 hover:border-primary-blue'
              } hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-blue text-background px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-2">
                  {plan.price === 0 ? 'Free forever' : `per month, billed ${billingCycle}`}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 rounded-md transition-colors ${
                  plan.popular
                    ? 'bg-primary-blue text-background hover:bg-secondary-blue'
                    : 'border border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-background'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What's included in the free plan?",
                answer: "The free plan includes access to basic challenges, the Cybersecurity Fundamentals course, and community forum access. It's perfect for beginners starting their cybersecurity journey."
              },
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be cancelled anytime but are not refundable for partial months."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Contact */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-400 mb-8">
            Contact our sales team to discuss custom requirements for your organization.
          </p>
          <button className="bg-primary-blue text-background px-8 py-3 rounded-md hover:bg-secondary-blue transition-colors">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
