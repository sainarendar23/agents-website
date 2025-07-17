import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface PaymentData {
  agents: any[];
  plan: any;
  total: number;
  user: any;
}

export default function Payment() {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPaymentData = localStorage.getItem('paymentData');
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      // Validate card details
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        throw new Error('Please fill in all card details');
      }

      if (cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Please enter a valid card number');
      }

      // Create payment session
      const response = await api.post('/api/payment', {
        agents: paymentData?.agents.map(agent => agent.id),
        plan: paymentData?.plan.id,
        total: paymentData?.total,
        cardDetails: {
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiryDate,
          cvv,
          cardholderName
        }
      });

      if (response.data.success) {
        setSuccess(true);
        localStorage.removeItem('paymentData');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Payment failed');
      }
    } catch (err: any) {
      setError(err.message || 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your AI agents have been activated and admin has been notified.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">
            Secure checkout powered by industry-leading encryption
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Selected Agents</h3>
                {paymentData.agents.map((agent, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${agent.price}/month</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Subscription Plan</h3>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{paymentData.plan.name}</p>
                    <p className="text-sm text-gray-600">{paymentData.plan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${paymentData.plan.price}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${paymentData.total}/month
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Lock className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  <CreditCard className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    Your payment information is encrypted and secure
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay $${paymentData.total}/month`
                )}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>By completing this purchase, you agree to our Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}