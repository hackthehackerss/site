import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle2, XCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

function PowerShellChallenge() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "Was PowerShell logging enabled on the system? (yes/no)",
      answer: "yes"
    },
    {
      id: 2,
      text: "What was the name of the malicious script that was executed?",
      answer: "invoke-mimikatz"
    },
    {
      id: 3,
      text: "What time was the first suspicious PowerShell command executed? (Format: HH:MM)",
      answer: "03:15"
    },
    {
      id: 4,
      text: "Was script block logging enabled? (yes/no)",
      answer: "yes"
    },
    {
      id: 5,
      text: "What user account executed the suspicious commands?",
      answer: "administrator"
    }
  ]);

  const handleAnswerSubmit = (id: number, answer: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          userAnswer: answer.toLowerCase(),
          isCorrect: answer.toLowerCase() === q.answer.toLowerCase()
        };
      }
      return q;
    }));
  };

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link to="/challenges" className="text-primary-blue hover:text-primary-blue/80 flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Challenges
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Image */}
      <div className="w-full h-48 relative overflow-hidden">
        <img 
          src="/powershell-banner.jpg"
          alt="PowerShell Challenge Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>

      {/* Challenge Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <h1 className="text-3xl font-bold mb-8">PowerShell Logs Analysis Challenge</h1>
        
        {/* Introduction */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Challenge Introduction</h2>
          <p className="text-gray-400 mb-6">
            You've been provided with PowerShell logs from a potentially compromised system. 
            Your task is to analyze these logs and identify signs of malicious activity. 
            The logs contain various PowerShell commands and scripts that were executed on the system.
          </p>
          
          {/* Download Button */}
          <button 
            className="flex items-center bg-primary-blue text-background px-4 py-2 rounded-md hover:bg-secondary-blue transition"
            onClick={() => window.alert('Download functionality will be implemented!')}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Logs
          </button>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      className="bg-background border border-primary-blue/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary-blue"
                      placeholder="Enter your answer"
                      onChange={(e) => handleAnswerSubmit(question.id, e.target.value)}
                    />
                    {question.userAnswer && (
                      question.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PowerShellChallenge;