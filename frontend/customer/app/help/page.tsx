"use client";
import { useState } from 'react';

interface HelpSection {
  title: string;
  content: string;
  icon: string;
}

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('getting-started');

  const helpSections: { [key: string]: HelpSection[] } = {
    'getting-started': [
      {
        title: "Creating Your Account",
        content: "Sign up for Bidovio by clicking the 'Sign Up' button in the top right corner. You can use your email or sign up with Google/Facebook for faster access. Verify your email address to complete the registration process.",
        icon: "👤"
      },
      {
        title: "Setting Up Your Profile",
        content: "Complete your profile by adding your delivery address, phone number, and payment information. This ensures smooth transactions and accurate delivery to your location.",
        icon: "⚙️"
      },
      {
        title: "Finding Restaurants",
        content: "Use the search bar to find restaurants in your area. You can search by cuisine type, location, or browse featured restaurants. Set your delivery location to see available options near you.",
        icon: "🔍"
      },
      {
        title: "Understanding the Platform",
        content: "Bidovio works through competitive bidding. Restaurants list party trays with starting prices, and customers place bids. The highest bidder when the auction ends wins the food at their bid price.",
        icon: "📚"
      }
    ],
    'bidding': [
      {
        title: "How Bidding Works",
        content: "When you find a menu you like, you can place a bid above the current highest bid. Each auction has a time limit, and the person with the highest bid when time runs out wins. You'll receive notifications about competing bids.",
        icon: "💰"
      },
      {
        title: "Placing Your First Bid",
        content: "Click on a menu item to view details, then click 'Place Bid'. Enter your bid amount (must be higher than the current highest bid) and confirm. You can increase your bid at any time before the auction ends.",
        icon: "🎯"
      },
      {
        title: "Bid Notifications",
        content: "You'll receive real-time notifications when someone outbids you. You can then place a new bid to stay competitive. Notifications are sent via email and push notifications (if enabled).",
        icon: "🔔"
      },
      {
        title: "Winning an Auction",
        content: "When you win an auction, you'll receive a confirmation email with pickup details. Your payment is processed automatically, and you can pick up your order during the specified time window.",
        icon: "🏆"
      }
    ],
    'orders': [
      {
        title: "Order Confirmation",
        content: "After winning an auction, you'll receive an order confirmation with the restaurant's address, pickup time, and order details. Save this information for pickup.",
        icon: "📋"
      },
      {
        title: "Pickup Process",
        content: "Go to the restaurant during the specified pickup window. Bring your order confirmation (on your phone or printed) and a valid ID. The restaurant will verify your identity and hand over your order.",
        icon: "🏪"
      },
      {
        title: "What to Bring",
        content: "Bring your order confirmation (order number and details), a valid photo ID, and the payment method used for the order. Some restaurants may also ask for the name on the order.",
        icon: "📱"
      },
      {
        title: "Late Pickup",
        content: "If you can't pick up on time, contact the restaurant immediately. Most restaurants are flexible within reasonable limits. If you can't pick up at all, contact our support team for assistance.",
        icon: "⏰"
      }
    ],
    'payments': [
      {
        title: "Payment Methods",
        content: "We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay. Your payment information is securely stored and encrypted.",
        icon: "💳"
      },
      {
        title: "When You're Charged",
        content: "Payment is processed automatically when you win an auction. You're only charged if you win - there are no charges for placing bids or participating in auctions.",
        icon: "💸"
      },
      {
        title: "Refunds and Cancellations",
        content: "We offer a 100% satisfaction guarantee. If you're not satisfied with your order, contact us within 24 hours for a full refund. We'll also work with the restaurant to address any issues.",
        icon: "🔄"
      },
      {
        title: "Payment Security",
        content: "All payments are processed through secure, PCI-compliant payment processors. We never store your full credit card information on our servers.",
        icon: "🔒"
      }
    ],
    'troubleshooting': [
      {
        title: "App Not Working",
        content: "Try refreshing the page or restarting the app. Check your internet connection and clear your browser cache. If problems persist, contact our support team with specific error details.",
        icon: "🔧"
      },
      {
        title: "Not Receiving Notifications",
        content: "Check your notification settings in your account preferences. Ensure email notifications are enabled and check your spam folder. For push notifications, make sure they're enabled in your device settings.",
        icon: "📧"
      },
      {
        title: "Can't Place a Bid",
        content: "Ensure your bid is higher than the current highest bid. Check that you have a valid payment method on file. If the auction has ended, you won't be able to place additional bids.",
        icon: "❌"
      },
      {
        title: "Order Issues",
        content: "For any issues with your order, contact our support team immediately. Include your order number and details about the problem. We'll work quickly to resolve the issue.",
        icon: "🚨"
      }
    ]
  };

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'bidding', label: 'Bidding', icon: '💰' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'payments', label: 'Payments', icon: '💳' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: '🔧' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Everything you need to know about using Bidovio. Find answers to common questions, 
            learn how to get started, and get the most out of our platform.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Help Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {helpSections[activeTab]?.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{section.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Need More Help?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant help from our support team
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Start Chat →
              </a>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send us a detailed message
              </p>
              <a href="mailto:support@bidovio.com" className="text-green-600 hover:text-green-800 font-medium">
                Send Email →
              </a>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Call us directly for urgent issues
              </p>
              <a href="tel:1-800-BIDORAI" className="text-purple-600 hover:text-purple-800 font-medium">
                Call 1-800-BIDORAI →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I know if I won an auction?</h3>
              <p className="text-gray-600">
                You'll receive an immediate notification and email confirmation when you win an auction. 
                You can also check your order history in your account dashboard.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What if I'm not satisfied with my order?</h3>
              <p className="text-gray-600">
                We offer a 100% satisfaction guarantee. Contact us within 24 hours of pickup for a full refund. 
                We'll also work with the restaurant to address any quality issues.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I cancel my bid?</h3>
              <p className="text-gray-600">
                Bids cannot be cancelled once placed, as this would be unfair to other bidders. 
                However, you can place a new bid if you want to change your offer amount.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer delivery?</h3>
              <p className="text-gray-600">
                Currently, we focus on pickup to keep costs low and ensure the freshest food. 
                We're working on delivery partnerships and will announce this feature when available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-xl mb-8">
            Our support team is here to help you get the most out of Bidovio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/faq"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 