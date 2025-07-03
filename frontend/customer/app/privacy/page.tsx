export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: January 15, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Bidovio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our competitive bidding platform for party food orders.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700">
                  We collect information you provide directly to us, such as when you create an account, place bids, 
                  or contact our support team. This may include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Account credentials and preferences</li>
                  <li>Communication history with our support team</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 mb-2">Usage Information</h3>
                <p className="text-gray-700">
                  We automatically collect certain information about your use of our platform, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage patterns (pages visited, time spent, features used)</li>
                  <li>Bidding activity and preferences</li>
                  <li>Location data (with your consent)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4">
                <p className="text-gray-700">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Facilitate bidding and auction processes</li>
                  <li>Send you important updates and notifications</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Analyze usage patterns to improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <div className="space-y-4">
                <p className="text-gray-700">We may share your information in the following circumstances:</p>
                
                <h3 className="text-xl font-medium text-gray-900 mb-2">With Restaurant Partners</h3>
                <p className="text-gray-700">
                  When you win an auction, we share necessary information with the restaurant to fulfill your order, 
                  including your name, contact information, and order details.
                </p>

                <h3 className="text-xl font-medium text-gray-900 mb-2">With Service Providers</h3>
                <p className="text-gray-700">
                  We work with trusted third-party service providers who help us operate our platform, 
                  including payment processors, hosting providers, and analytics services.
                </p>

                <h3 className="text-xl font-medium text-gray-900 mb-2">Legal Requirements</h3>
                <p className="text-gray-700">
                  We may disclose your information if required by law or in response to valid legal requests, 
                  such as subpoenas or court orders.
                </p>

                <h3 className="text-xl font-medium text-gray-900 mb-2">Business Transfers</h3>
                <p className="text-gray-700">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                  as part of the transaction.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-gray-700">
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. 
                  These technologies help us:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze how our platform is used</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Improve security and prevent fraud</li>
                </ul>
                <p className="text-gray-700">
                  You can control cookie settings through your browser preferences, though disabling cookies 
                  may affect some functionality of our platform.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <div className="space-y-4">
                <p className="text-gray-700">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                </ul>
                <p className="text-gray-700">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. 
                When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our platform is not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected information 
                from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers comply with applicable data protection laws and implement 
                appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">Bidovio Inc.</p>
                <p className="text-gray-700">Email: privacy@bidovio.com</p>
                <p className="text-gray-700">Phone: 1-800-BIDOVIO</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 