"use client";
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (question: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(question)) {
      newOpenItems.delete(question);
    } else {
      newOpenItems.add(question);
    }
    setOpenItems(newOpenItems);
  };

  const faqData: FAQCategory[] = [
    {
      title: "Getting Started",
      items: [
        {
          question: "How does Bidorai work?",
          answer: "Bidorai is a competitive bidding platform for party food. Restaurants list their party trays with starting prices, and customers place bids. The highest bidder when the auction ends wins the food at their bid price. It's a win-win: restaurants get fair market value, and customers get great deals on quality food."
        },
        {
          question: "How do I create an account?",
          answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email. You can also sign up using your Google or Facebook account for even faster access."
        },
        {
          question: "Is Bidorai available in my area?",
          answer: "Bidorai is currently available in major metropolitan areas across the United States. We're expanding rapidly, so if we're not in your area yet, sign up for our newsletter to be notified when we launch in your city."
        },
        {
          question: "What types of food can I bid on?",
          answer: "We offer a wide variety of party trays including appetizers, main courses, desserts, and complete meal packages. From sushi platters to BBQ ribs, Italian pasta to Mexican fiesta trays, there's something for every occasion and taste preference."
        }
      ]
    },
    {
      title: "Bidding & Auctions",
      items: [
        {
          question: "How does the bidding process work?",
          answer: "When you find a menu you like, you can place a bid above the current highest bid. Each auction has a time limit, and the person with the highest bid when time runs out wins. You'll receive notifications about competing bids so you can stay competitive."
        },
        {
          question: "What happens if I'm outbid?",
          answer: "If someone bids higher than you, you'll receive an immediate notification. You can then place a new bid to stay in the running. Don't worry - you won't be charged unless you win the auction."
        },
        {
          question: "Can I cancel my bid?",
          answer: "Bids cannot be cancelled once placed, as this would be unfair to other bidders. However, you can place a new bid if you want to change your offer amount."
        },
        {
          question: "What if no one bids on an item?",
          answer: "If an auction ends with no bids, the restaurant may choose to relist the item at a lower starting price or offer it through our direct purchase option."
        }
      ]
    },
    {
      title: "Orders & Pickup",
      items: [
        {
          question: "How do I pick up my order?",
          answer: "When you win an auction, you'll receive pickup instructions including the restaurant's address and pickup time. Simply go to the restaurant during the specified pickup window, show your order confirmation, and collect your food."
        },
        {
          question: "What if I can't pick up my order on time?",
          answer: "Contact the restaurant directly as soon as possible if you need to arrange a different pickup time. Most restaurants are flexible within reasonable limits. If you can't pick up at all, contact our support team immediately."
        },
        {
          question: "Do you offer delivery?",
          answer: "Currently, we focus on pickup to keep costs low and ensure the freshest food. However, we're working on delivery partnerships and will announce this feature when it becomes available."
        },
        {
          question: "What should I bring for pickup?",
          answer: "Bring your order confirmation (either on your phone or printed) and a valid ID. The restaurant may also ask for the name on the order to verify your identity."
        }
      ]
    },
    {
      title: "Payment & Billing",
      items: [
        {
          question: "How do I pay for my order?",
          answer: "Payment is processed automatically when you win an auction. We accept all major credit cards, debit cards, and digital wallets like Apple Pay and Google Pay. Your card is only charged if you win the auction."
        },
        {
          question: "Are there any additional fees?",
          answer: "There are no hidden fees! You pay exactly what you bid, plus applicable sales tax. We don't charge service fees, delivery fees, or any other surprise charges."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 100% satisfaction guarantee. If you're not completely satisfied with your order, contact us within 24 hours of pickup for a full refund. We'll also work with the restaurant to address any issues."
        },
        {
          question: "How do I update my payment method?",
          answer: "You can update your payment information in your account settings. Go to your profile, select 'Payment Methods', and add or update your preferred payment options."
        }
      ]
    },
    {
      title: "Restaurant Partners",
      items: [
        {
          question: "How do restaurants benefit from Bidorai?",
          answer: "Restaurants use Bidorai to sell excess inventory, reduce food waste, and reach new customers. They set their own starting prices and get fair market value through competitive bidding, all while building customer relationships."
        },
        {
          question: "How can my restaurant join Bidorai?",
          answer: "We'd love to have your restaurant on board! Visit our restaurant portal to learn more about the partnership process. Our team will guide you through onboarding, menu setup, and best practices for success."
        },
        {
          question: "What types of restaurants can join?",
          answer: "We welcome all types of restaurants that serve party-sized portions. From fine dining to casual eateries, food trucks to catering companies - if you can serve groups, we can help you reach more customers."
        },
        {
          question: "How much does it cost restaurants to join?",
          answer: "There's no upfront cost to join Bidorai. We only take a small percentage of successful sales, so restaurants only pay when they make money. We also provide marketing support and analytics to help restaurants succeed."
        }
      ]
    },
    {
      title: "Technical Support",
      items: [
        {
          question: "The app isn't working properly. What should I do?",
          answer: "First, try refreshing the page or restarting the app. If the issue persists, check your internet connection and try clearing your browser cache. If problems continue, contact our support team with details about the issue."
        },
        {
          question: "I'm not receiving bid notifications. How can I fix this?",
          answer: "Check your notification settings in your account preferences. Make sure you have email and push notifications enabled. Also verify that our emails aren't going to your spam folder."
        },
        {
          question: "Can I use Bidorai on my mobile device?",
          answer: "Yes! Bidorai is fully optimized for mobile devices. You can access all features through your mobile browser, and we're working on native mobile apps for even better experience."
        },
        {
          question: "How do I reset my password?",
          answer: "Click the 'Forgot Password' link on the sign-in page. Enter your email address, and we'll send you a secure link to reset your password. Make sure to check your spam folder if you don't see the email."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about Bidorai, bidding, orders, and more. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button
                      onClick={() => toggleItem(item.question)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          openItems.has(item.question) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openItems.has(item.question) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help! Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:1-800-BIDORAI"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Call 1-800-BIDORAI
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Quick Links</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Help Center</h3>
              <p className="text-gray-600 text-sm mb-4">
                Detailed guides and tutorials for using Bidorai
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Visit Help Center →
              </a>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant help from our support team
              </p>
              <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                Start Chat →
              </a>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send us a detailed message
              </p>
              <a href="mailto:support@bidorai.com" className="text-purple-600 hover:text-purple-800 font-medium">
                Send Email →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 