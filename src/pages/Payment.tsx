import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
}

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan') || 'pro';
  const billingCycle = searchParams.get('billing') || 'monthly';

  const [paymentDetails, setPaymentDetails] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would:
      // 1. Validate the card details
      // 2. Send to payment processor (Stripe, etc)
      // 3. Wait for confirmation
      // 4. Update user's subscription status

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update user's subscription in Firestore
      if (profile) {
        const userRef = doc(db, 'profiles', profile.uid);
        await updateDoc(userRef, {
          subscription: {
            plan: plan,
            status: 'active',
            billingCycle: billingCycle,
            startDate: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
          }
        });
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlanDetails = () => {
    const price = plan === 'pro' 
      ? billingCycle === 'monthly' ? 24.99 : 19.99
      : billingCycle === 'monthly' ? 49.99 : 39.99;

    return {
      name: plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan',
      price: price,
      cycle: billingCycle
    };
  };

  const planDetails = getPlanDetails();

  if (success) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">Thank you for your subscription. You will be redirected shortly.</p>
          <Link
            to="/profile"
            className="bg-primary-blue text-background px-6 py-2 rounded-md hover:bg-secondary-blue transition"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/pricing" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Plans
              </Link>
              <span className="text-xl font-bold">Complete Your Purchase</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20">
              <div className="flex items-center space-x-2 mb-8">
                <Lock className="w-5 h-5 text-primary-blue" />
                <span className="text-sm text-gray-400">Secure Payment Processing</span>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-4 mb-6 text-red-500">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 rounded-md bg-background border border-primary-blue/20 text-white focus:outline-none focus:border-primary-blue pl-10"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: formatCardNumber(e.target.value)
                      })}
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2 rounded-md bg-background border border-primary-blue/20 text-white focus:outline-none focus:border-primary-blue"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: formatExpiryDate(e.target.value)
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-2 rounded-md bg-background border border-primary-blue/20 text-white focus:outline-none focus:border-primary-blue"
                      value={paymentDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 3) {
                          setPaymentDetails({ ...paymentDetails, cvv: value });
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-md bg-background border border-primary-blue/20 text-white focus:outline-none focus:border-primary-blue"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-blue text-background py-3 rounded-md hover:bg-secondary-blue transition font-semibold mt-8 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Complete Payment'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{planDetails.name}</p>
                    <p className="text-sm text-gray-400">
                      Billed {billingCycle}
                    </p>
                  </div>
                  <p className="font-medium">${planDetails.price}</p>
                </div>

                <div className="border-t border-primary-blue/20 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${planDetails.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {billingCycle === 'monthly' ? 'per month' : 'per year'}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-blue/20">
                <div className="flex items-center text-sm text-gray-400">
                  <Shield className="w-4 h-4 mr-2 text-primary-blue" />
                  Secure payment processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;