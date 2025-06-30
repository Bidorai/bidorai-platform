export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Help us revolutionize the food industry and build the future of restaurant technology. 
            We're looking for passionate individuals who want to make a difference.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Culture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation First</h3>
              <p className="text-gray-600">
                We encourage creative thinking and bold ideas. Every team member has a voice in shaping our product and company direction.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaborative Environment</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork. Cross-functional collaboration and knowledge sharing are core to our success.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Work-Life Balance</h3>
              <p className="text-gray-600">
                We value your well-being. Flexible hours, remote work options, and generous time-off policies support a healthy work-life balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Competitive Salary</h3>
              <p className="text-gray-600 text-sm">Market-leading compensation with equity options</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">🏥</span>
              </div>
              <h3 className="font-semibold mb-2">Health Benefits</h3>
              <p className="text-gray-600 text-sm">Comprehensive health, dental, and vision coverage</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">🏠</span>
              </div>
              <h3 className="font-semibold mb-2">Remote Work</h3>
              <p className="text-gray-600 text-sm">Flexible remote and hybrid work options</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Learning Budget</h3>
              <p className="text-gray-600 text-sm">Annual budget for courses, conferences, and books</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-xl">🍕</span>
              </div>
              <h3 className="font-semibold mb-2">Food Perks</h3>
              <p className="text-gray-600 text-sm">Free meals and food delivery credits</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-yellow-600 text-xl">🎉</span>
              </div>
              <h3 className="font-semibold mb-2">Team Events</h3>
              <p className="text-gray-600 text-sm">Regular team building and social events</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Fast Growth</h3>
              <p className="text-gray-600 text-sm">Rapid career advancement opportunities</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-xl">🌍</span>
              </div>
              <h3 className="font-semibold mb-2">Global Impact</h3>
              <p className="text-gray-600 text-sm">Make a difference in the food industry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Senior Full Stack Engineer</h3>
                  <p className="text-gray-600 mb-4">
                    Join our engineering team to build scalable, real-time bidding systems and customer-facing applications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Node.js</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">PostgreSQL</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Full-time</span>
                  <p className="text-gray-500 text-sm mt-2">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Manager</h3>
                  <p className="text-gray-600 mb-4">
                    Lead product strategy and execution for our restaurant and customer platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Product Strategy</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">User Research</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Data Analysis</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Agile</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Full-time</span>
                  <p className="text-gray-500 text-sm mt-2">Remote</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Restaurant Success Manager</h3>
                  <p className="text-gray-600 mb-4">
                    Help restaurants maximize their success on our platform through onboarding, training, and ongoing support.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Customer Success</span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Restaurant Industry</span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Training</span>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Sales</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Full-time</span>
                  <p className="text-gray-500 text-sm mt-2">New York, NY</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Scientist</h3>
                  <p className="text-gray-600 mb-4">
                    Build machine learning models to optimize pricing, predict demand, and improve user experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Python</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Machine Learning</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">SQL</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Statistics</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Full-time</span>
                  <p className="text-gray-500 text-sm mt-2">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Apply</h3>
              <p className="text-gray-600">
                Submit your resume and cover letter through our application portal.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Initial Call</h3>
              <p className="text-gray-600">
                A 30-minute conversation to learn about your background and interests.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Technical Interview</h3>
              <p className="text-gray-600">
                Skills assessment and technical discussion with team members.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Final Round</h3>
              <p className="text-gray-600">
                Onsite or virtual interviews with leadership and team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Don't see a position that fits? We're always looking for talented individuals to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@bidorai.com"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Send General Application
            </a>
            <a
              href="mailto:careers@bidorai.com"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Contact Recruiting
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 