import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, CheckCircle, Circle, DollarSign, Users, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface Agent {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  icon?: React.ReactNode;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  agentLimit: number;
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Agent icons mapping
  const getAgentIcon = (name: string, category: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('email') || lowerName.includes('marketing')) {
      return <Bot className="h-8 w-8 text-blue-500" />;
    }
    if (lowerName.includes('social')) {
      return <Users className="h-8 w-8 text-pink-500" />;
    }
    if (lowerName.includes('support') || lowerName.includes('customer')) {
      return <Users className="h-8 w-8 text-green-500" />;
    }
    if (lowerName.includes('data') || lowerName.includes('analysis')) {
      return <TrendingUp className="h-8 w-8 text-purple-500" />;
    }
    if (lowerName.includes('sales')) {
      return <DollarSign className="h-8 w-8 text-emerald-500" />;
    }
    if (lowerName.includes('content')) {
      return <Bot className="h-8 w-8 text-orange-500" />;
    }
    return <Bot className="h-8 w-8 text-gray-500" />;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock data since backend isn't connected yet
      const mockAgents = [
        {
          id: '1',
          name: 'Email Marketing Agent',
          description: 'Automate email campaigns, lead nurturing, and customer communication.',
          price: 29,
          category: 'Marketing',
          features: ['📧 Campaign automation', '🎯 Lead scoring', '🔄 A/B testing', '📊 Analytics']
        },
        {
          id: '2',
          name: 'Social Media Agent',
          description: 'Manage posts, engagement, and social media analytics across platforms.',
          price: 39,
          category: 'Marketing',
          features: ['📅 Post scheduling', '💬 Engagement tracking', '#️⃣ Hashtag optimization', '📈 Analytics']
        },
        {
          id: '3',
          name: 'Customer Support Agent',
          description: 'Handle customer inquiries, tickets, and support documentation.',
          price: 49,
          category: 'Support',
          features: ['💬 24/7 chat support', '🎫 Ticket management', '📚 Knowledge base', '⬆️ Escalation']
        },
        {
          id: '4',
          name: 'Data Analysis Agent',
          description: 'Process data, generate reports, and provide actionable insights.',
          price: 59,
          category: 'Analytics',
          features: ['⚙️ Data processing', '📄 Report generation', '📈 Trend analysis', '📊 Visualization']
        }
      ];

      const mockPricing = [
        {
          id: '1',
          name: '🆓 Free',
          price: 0,
          period: 'forever',
          description: 'Perfect for trying out SOM AI',
          features: ['🤖 1 AI Agent', '⚙️ Basic automation', '👥 Community support', '🔄 5 workflows/month'],
          agentLimit: 1
        },
        {
          id: '2',
          name: '📅 Monthly',
          price: 99,
          period: 'per month',
          description: 'Great for growing businesses',
          features: ['🤖 Up to 5 AI Agents', '🚀 Advanced automation', '⭐ Priority support', '♾️ Unlimited workflows', '🔧 Custom integrations'],
          agentLimit: 5
        },
        {
          id: '3',
          name: '📆 Yearly',
          price: 999,
          period: 'per year',
          description: 'Best value for established teams',
          features: ['🤖 Unlimited AI Agents', '🏢 Enterprise automation', '📞 24/7 phone support', '⚙️ Custom workflows', '📊 Advanced analytics', '👥 Team collaboration'],
          agentLimit: -1
        }
      ];
      
      setAgents(mockAgents);
      setPricingPlans(mockPricing);
    } catch (err: any) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const calculateTotal = () => {
    const selectedAgentsPrices = agents
      .filter(agent => selectedAgents.includes(agent.id))
      .reduce((sum, agent) => sum + agent.price, 0);
    
    const planPrice = pricingPlans.find(plan => plan.id === selectedPlan)?.price || 0;
    
    return selectedAgentsPrices + planPrice;
  };

  const handleProceedToPayment = () => {
    if (selectedAgents.length === 0 || !selectedPlan) {
      setError('Please select at least one agent and a plan');
      return;
    }

    const selectedAgentData = agents.filter(agent => selectedAgents.includes(agent.id));
    const selectedPlanData = pricingPlans.find(plan => plan.id === selectedPlan);
    
    const paymentData = {
      agents: selectedAgentData,
      plan: selectedPlanData,
      total: calculateTotal(),
      user: user
    };

    // Store payment data in localStorage to pass to payment page
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Choose your AI agents and subscription plan to get started with automation.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <Bot className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">🤖 Available Agents</p>
                <p className="text-2xl font-semibold text-gray-900">{agents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">✅ Selected Agents</p>
                <p className="text-2xl font-semibold text-gray-900">{selectedAgents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-100 p-2 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">💰 Monthly Total</p>
                <p className="text-2xl font-semibold text-gray-900">${calculateTotal()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">🚀 Efficiency Boost</p>
                <p className="text-2xl font-semibold text-gray-900">300% ⬆️</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agents Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  🤖 Select AI Agents
                </h2>
                <p className="text-gray-600 mt-1">
                  Choose the agents that best fit your workflow needs.
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedAgents.includes(agent.id)
                          ? 'border-primary-500 bg-primary-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleAgentToggle(agent.id)}
                    >
                      <div className="flex justify-center mb-3">
                        <div className="bg-gray-50 p-3 rounded-full">
                          {getAgentIcon(agent.name, agent.category)}
                        </div>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            {selectedAgents.includes(agent.id) ? (
                              <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400 mr-2" />
                            )}
                            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          </div>
                          <p className="text-gray-600 mt-1 text-sm">{agent.description}</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-primary-600">
                              💰 ${agent.price}/month
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 Choose Your Plan
                </h2>
                <p className="text-gray-600 mt-1">
                  Select a subscription plan that works for you.
                </p>
              </div>
              
              <div className="p-6 space-y-4">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedPlan === plan.id
                        ? 'border-primary-500 bg-primary-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {selectedPlan === plan.id ? (
                          <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400 mr-2" />
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-sm text-gray-600">{plan.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600">
                          ${plan.price}
                        </p>
                        <p className="text-xs text-gray-500">{plan.period}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 Order Summary
                </h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {selectedAgents.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-900 mb-2">🤖 Selected Agents:</p>
                      {agents
                        .filter(agent => selectedAgents.includes(agent.id))
                        .map(agent => (
                          <div key={agent.id} className="flex justify-between text-sm">
                            <span>{agent.name}</span>
                            <span>${agent.price}/month</span>
                          </div>
                        ))}
                    </div>
                  )}
                  
                  {selectedPlan && (
                    <div>
                      <p className="font-medium text-gray-900 mb-2">📋 Plan:</p>
                      <div className="flex justify-between text-sm">
                        <span>{pricingPlans.find(p => p.id === selectedPlan)?.name}</span>
                        <span>${pricingPlans.find(p => p.id === selectedPlan)?.price}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>💰 Total:</span>
                      <span className="text-primary-600">${calculateTotal()}/month 💳</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToPayment}
                  disabled={selectedAgents.length === 0 || !selectedPlan}
                  className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💳 Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}