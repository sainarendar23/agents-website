import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  TrendingUp
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary-600" />,
      title: "🤖 AI-Powered Automation",
      description: "Leverage advanced AI agents to automate complex workflows and boost productivity."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: "⚡ Lightning Fast",
      description: "Deploy automation agents in minutes, not hours. Get results instantly."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "🛡️ Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: "🕒 24/7 Operation",
      description: "Your AI agents work around the clock, ensuring continuous automation."
    }
  ];

  const agents = [
    {
      icon: <Mail className="h-12 w-12 text-blue-500" />,
      name: "Email Marketing Agent",
      description: "Automate email campaigns, lead nurturing, and customer communication.",
      price: "$29/month",
      features: ["📧 Campaign automation", "🎯 Lead scoring", "🔄 A/B testing", "📊 Analytics"]
    },
    {
      icon: <Users className="h-12 w-12 text-pink-500" />,
      name: "Social Media Agent",
      description: "Manage posts, engagement, and social media analytics across platforms.",
      price: "$39/month",
      features: ["📅 Post scheduling", "💬 Engagement tracking", "#️⃣ Hashtag optimization", "📈 Analytics"]
    },
    {
      icon: <Users className="h-12 w-12 text-green-500" />,
      name: "Customer Support Agent",
      description: "Handle customer inquiries, tickets, and support documentation.",
      price: "$49/month",
      features: ["💬 24/7 chat support", "🎫 Ticket management", "📚 Knowledge base", "⬆️ Escalation"]
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-purple-500" />,
      name: "Data Analysis Agent",
      description: "Process data, generate reports, and provide actionable insights.",
      price: "$59/month",
      features: ["⚙️ Data processing", "📄 Report generation", "📈 Trend analysis", "📊 Visualization"]
    }
  ];

  const pricingPlans = [
    {
      name: "🆓 Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out SOM AI",
      features: [
        "🤖 1 AI Agent",
        "⚙️ Basic automation",
        "👥 Community support",
        "🔄 5 workflows/month"
      ],
      buttonText: "Get Started",
      buttonClass: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    },
    {
      name: "📅 Monthly",
      price: "$99",
      period: "per month",
      description: "Great for growing businesses",
      features: [
        "🤖 Up to 5 AI Agents",
        "🚀 Advanced automation",
        "⭐ Priority support",
        "♾️ Unlimited workflows",
        "🔧 Custom integrations"
      ],
      buttonText: "Choose Monthly",
      buttonClass: "bg-primary-600 text-white hover:bg-primary-700",
      popular: true
    },
    {
      name: "📆 Yearly",
      price: "$999",
      period: "per year",
      description: "Best value for established teams",
      features: [
        "🤖 Unlimited AI Agents",
        "🏢 Enterprise automation",
        "📞 24/7 phone support",
        "⚙️ Custom workflows",
        "📊 Advanced analytics",
        "👥 Team collaboration"
      ],
      buttonText: "Choose Yearly",
      buttonClass: "bg-primary-600 text-white hover:bg-primary-700"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "MOS AI has revolutionized our marketing workflows. We've seen a 300% increase in efficiency.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "StartupXYZ",
      content: "The AI agents are incredibly intuitive. Setup was seamless and results were immediate.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO",
      company: "GrowthCo",
      content: "Best investment we've made for our business automation. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automate Everything.
              <span className="text-gradient block">Work Smarter with SOM AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your business with AI-powered automation agents. Purchase ready-to-deploy
              AI solutions that work 24/7 to boost your productivity and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#agents"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-primary-600"
              >
                View Agents
              </a>
              <a
                href="#pricing"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-primary-600"
              >
                See Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MOS AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with user-friendly design
              to deliver unparalleled automation experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI Agents Available
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of specialized AI agents, each designed
              to excel in specific business functions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="p-6 text-center border-b border-gray-100">
                  <div className="flex justify-center mb-4">
                    {agent.icon}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {agent.name}
                    </h3>
                    <span className="text-2xl font-bold text-primary-600">
                      {agent.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {agent.description}
                  </p>
                  <ul className="space-y-2">
                    {agent.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to="/register"
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center block"
                  >
                    Get Agent
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to our
              AI agent marketplace and 24/7 support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 ${plan.popular ? 'ring-2 ring-primary-600 transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white text-center py-2 text-sm font-semibold">
                    ⭐ Most Popular ⭐
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors text-center block ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of businesses that trust SOM AI for their automation needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    👤 {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    💼 {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about SOM AI? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-primary-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">admin@gflow.ai</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-primary-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
