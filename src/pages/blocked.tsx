import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { ArrowLeft } from 'lucide-react'; // Assuming ArrowLeft is being used

function BlockedPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-primary-blue hover:text-primary-blue/80 flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="bg-primary-dark/30 p-8 rounded-lg border border-primary-blue/20 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <AlertCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">Access Denied</h1>
          <p className="text-center text-lg mb-6">You do not have permission to access this page.</p>
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="bg-primary-blue text-background py-2 px-6 rounded-md hover:bg-secondary-blue transition">Go to Home Page</Link>
            <Link to="/support" className="text-primary-blue hover:text-secondary-blue">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockedPage;
