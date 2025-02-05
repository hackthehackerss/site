import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function TermsOfUse() {
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
              <span className="text-xl font-bold">
                <span className="text-white">Hack</span>
                <span className="text-primary-red">The</span>
                <span className="text-white">Hackers</span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
          <p className="text-gray-400 mb-4">Effective Date: March 15, 2024</p>

          <p className="mb-8">
            Welcome to HackingTheHackers. By accessing and using our Platform, you agree to comply with these Terms of Use and our Privacy Policy. If you do not agree with any part of these Terms, please refrain from using the Platform.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using HackingTheHackers, you confirm that you agree to these Terms of Use and our Privacy Policy. Continued use of the Platform constitutes acceptance of any future modifications to these Terms.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. User Conduct</h2>
          <p className="mb-4">
            You agree to use the Platform responsibly and only for lawful purposes. Prohibited activities include, but are not limited to:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Damaging, disabling, or impairing the Platform.</li>
            <li>Interfering with other users' enjoyment of the Platform.</li>
            <li>Attempting to gain unauthorized access to any portion of the Platform.</li>
          </ul>
          <p className="mb-4">By using the Platform, you represent and warrant that:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>All information you provide will be true, accurate, current, and complete.</li>
            <li>You will not access the Platform through automated or non-human means (e.g., bots, scripts).</li>
            <li>You will not use the Platform for any illegal or unauthorized purposes.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            All content, features, and functionality on the Platform are the exclusive property of HackingTheHackers and its licensors. This includes text, graphics, logos, images, videos, and software. You may not reproduce, distribute, modify, or create derivative works without prior written permission.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Account Security</h2>
          <p className="mb-4">
            You are responsible for safeguarding your account credentials, including your username and password. Any activities conducted under your account are your responsibility. Notify us immediately if you suspect unauthorized access.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Modifications to Service</h2>
          <p className="mb-4">
            HackingTheHackers reserves the right to modify, suspend, or discontinue any part of the Platform at any time, with or without prior notice.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Limitations of Liability</h2>
          <p className="mb-4">
            HackingTheHackers is not liable for any indirect, incidental, special, or consequential damages, including:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Loss of data, revenue, or profits.</li>
            <li>Corruption or loss of data resulting from your use of the Platform.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">7. Payment and Refund Policy</h2>
          <h3 className="text-lg font-semibold mt-4 mb-2">Purchases:</h3>
          <p className="mb-4">All purchases are final. No refunds will be provided for:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Monthly or annual subscription payments.</li>
            <li>One-time purchases, including certifications or training materials.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">Subscription Cancellations:</h3>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Monthly Subscriptions: Can be canceled at any time. Cancellation takes effect at the end of the current billing cycle. No prorated refunds are offered for partial months.</li>
            <li>Annual Subscriptions: Cannot be canceled or refunded before the 12-month subscription period ends. Access to the Platform will continue until the subscription term expires.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            HackingTheHackers reserves the right to update or modify these Terms at any time. Changes will be posted on the Platform with a revised "Effective Date." Continued use of the Platform after updates constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">9. Web Resources and Third-Party Services</h2>
          <p className="mb-4">
            For your convenience, we may include hyperlinks to third-party websites or content. However, HackingTheHackers is not responsible for:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Errors, omissions, or delays in third-party content.</li>
            <li>Defamation, obscenity, or other objectionable materials on linked platforms.</li>
            <li>Any consequences arising from your use of third-party platforms.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">10. Contact Us</h2>
          <p className="mb-4">
            For any questions or concerns, please reach out to us. A contact link will be added soon.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;