import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: string;
  hint?: string; // Optional hint for each question
  userAnswer?: string;
  isCorrect?: boolean;
  showHint?: boolean; // State to toggle hint visibility
}

function CryptoMinerChallenge() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "1. What is the first thing the user searched on Google?",
      answer: "how to get rich",
      hint: "Check the browser history logs for search queries."
    },
    {
      id: 2,
      text: "2. From which URL was the extension downloaded?",
      answer: "http://chromewebstore.google.com/detail/bitcoin-generator-best-bi/lhahofhogpojbfgcejbohlinmhjaodkn",
      hint: "The Chrome Web Store URL contains the extension ID."
    },
    {
      id: 3,
      text: "3. What is the name of the suspicious extension?",
      answer: "Bitcoin Generator - Best Bitcoin Miner",
      hint: "The extension name is listed in the browser’s installed extensions."
    },
    {
      id: 4,
      text: "4. What is the ID of the extension?",
      answer: "lhahofhogpojbfgcejbohlinmhjaodkn",
      hint: "Look at the extension’s unique identifier in Chrome’s extension page."
    },
    {
      id: 5,
      text: "5. What is the last Bitcoin payment address shown by the extension?",
      answer: "bc1qvwrfc4kkwecw2apvyn42vensftdelepee8gafm",
      hint: "HTML"
    },
    {
      id: 6,
      text: "6. What is the malicious domain associated with the extension?",
      answer: "bitcoinlive-app.xyz",
      hint: "The miner might communicate with this domain."
    },
    {
      id: 7,
      text: "7. Which URL is used for miner updates?",
      answer: "https://clients2.google.com/service/update2/crx",
      hint: "Google's update service is being leveraged by the extension."
    },
    {
      id: 8,
      text: "8. What color is the Bitcoin coin in the extension's logo?",
      answer: "pink",
      hint: "Check the extension’s icon for color details."
    }
  ]);

  const handleAnswerSubmit = (id: number, answer: string) => {
    setQuestions(questions.map((q) => {
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

  const toggleHint = (id: number) => {
    setQuestions(questions.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          showHint: !q.showHint // Toggle hint visibility
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
      <div className="flex justify-center">
        <img
          src="/cryptominer-banner.jpg"
          alt="CryptoMiner Challenge Banner"
          className="w-auto max-h-80 object-cover"
        />
      </div>

      {/* Challenge Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <h1 className="text-3xl font-bold mb-8">Miner On The Run</h1>

        {/* Introduction */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Challenge Introduction</h2>
          <p className="text-gray-400 mb-4">
            The SOC team received an alert about unusual high CPU usage on a workstation.
            Suspecting a cryptominer, they escalated the case for further investigation.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Recommended Tool:</span> We suggest using 
            <span className="font-bold text-white"> FTK Imager</span> to analyze the provided forensic image.
          </p>
        </div>

        {/* Download Link */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Download Challenge File</h2>
          <a href="/Miner%20on%20the%20Run.ad1" download>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Download Miner on the Run.ad1
            </button>
          </a>
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
                    <button
                      className="text-gray-500 hover:text-gray-400"
                      onClick={() => toggleHint(question.id)}
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {question.userAnswer && (
                      question.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )
                    )}
                  </div>
                  {question.showHint && (
                    <div className="mt-4 text-gray-300 italic">{question.hint}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CryptoMinerChallenge;
