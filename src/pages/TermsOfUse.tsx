import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';

function TermsOfUse() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navigation darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
          <p className="text-gray-400 mb-4">Effective Date: March 15, 2024</p>

          <p className="mb-8">
            Welcome to HackTheHackers. By accessing and using our Platform, you agree to comply with these Terms of Use and our Privacy Policy. If you do not agree with any part of these Terms, please refrain from using the Platform.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using HackTheHackers, you confirm that you agree to these Terms of Use and our Privacy Policy. Continued use of the Platform constitutes acceptance of any future modifications to these Terms.
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

          <h2 className="text-xl font-bold mt-8 mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            All content, features, and functionality on the Platform are the exclusive property of HackTheHackers and its licensors. This includes text, graphics, logos, images, videos, and software.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Account Security</h2>
          <p className="mb-4">
            You are responsible for safeguarding your account credentials. Any activities conducted under your account are your responsibility.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Privacy</h2>
          <p className="mb-4">
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend your account and access to the Platform at our discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users of the Platform, us, or third parties, or for any other reason.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We may update these Terms of Use from time to time. We will notify you of any changes by posting the new Terms of Use on this page and updating the "Effective Date" at the top of this page.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Use, please contact us at support@hackthehackers.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;