import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

function Payment() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log('Processing payment...', paymentDetails);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/pricing" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Plans
              </Link>
              <span className="text-xl font-bold">Payment Details</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-primary-dark/30 rounded-lg p-8 border border-primary-blue/20">
          <div className="flex items-center space-x-2 mb-8">
            <Lock className="w-5 h-5 text-primary-blue" />
            <span className="text-sm text-gray-400">Secure Payment Processing</span>
          </div>

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
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, '');
                    if (/^\d*$/.test(value) && value.length <= 16) {
                      const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                      setPaymentDetails({ ...paymentDetails, cardNumber: formatted });
                    }
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      const formatted = value.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
                      setPaymentDetails({ ...paymentDetails, expiryDate: formatted });
                    }
                  }}
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
              className="w-full bg-primary-blue text-background py-3 rounded-md hover:bg-secondary-blue transition font-semibold mt-8"
            >
              Complete Payment
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Your payment is secured with industry-standard encryption.</p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <img src="https://www.vectorlogo.zone/logos/visa/visa-ar21.svg" alt="Visa" className="h-8" />
              <img src="https://www.vectorlogo.zone/logos/mastercard/mastercard-ar21.svg" alt="Mastercard" className="h-8" />
              <img src="https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
