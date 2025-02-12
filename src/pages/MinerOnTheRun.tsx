import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, Sun, Moon } from 'lucide-react';
import Confetti from 'react-confetti';

interface Question {
  id: number;
  text: string;
  answer: string;
  hint?: string;
  userAnswer?: string;
  isCorrect?: boolean;
  showHint?: boolean;
}

function CryptoMinerChallenge() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is the first thing the user searched on Google?",
      answer: "how to get rich",
      hint: "Check the browser history logs for search queries.",
    },
    {
      id: 2,
      text: "From which URL was the extension downloaded?",
      answer: "http://chromewebstore.google.com/detail/bitcoin-generator-best-bi/lhahofhogpojbfgcejbohlinmhjaodkn",
      hint: "The Chrome Web Store URL contains the extension ID.",
    },
    {
      id: 3,
      text: "What is the name of the suspicious extension?",
      answer: "Bitcoin Generator - Best Bitcoin Miner",
      hint: "The extension name is listed in the browser’s installed extensions.",
    },
    {
      id: 4,
      text: "What is the ID of the extension?",
      answer: "lhahofhogpojbfgcejbohlinmhjaodkn",
      hint: "Look at the extension’s unique identifier in Chrome’s extension page.",
    },
    {
      id: 5,
      text: "What is the last Bitcoin payment address shown by the extension?",
      answer: "bc1qvwrfc4kkwecw2apvyn42vensftdelepee8gafm",
      hint: "HTML",
    },
    {
      id: 6,
      text: "What is the malicious domain associated with the extension?",
      answer: "bitcoinlive-app.xyz",
      hint: "The miner might communicate with this domain.",
    },
    {
      id: 7,
      text: "Which URL is used for miner updates?",
      answer: "https://clients2.google.com/service/update2/crx",
      hint: "Google's update service is being leveraged by the extension.",
    },
    {
      id: 8,
      text: "What color is the Bitcoin coin in the extension's logo?",
      answer: "pink",
      hint: "Check the extension’s icon for color details.",
    },
  ]);

  const [timeTaken, setTimeTaken] = useState(0); // Time in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [hintsRemaining, setHintsRemaining] = useState(3); // Limit to 3 hints
  const [darkMode, setDarkMode] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeTaken((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Stop the timer when all questions are answered
  const allQuestionsAnswered = questions.every((q) => q.isCorrect !== undefined);
  useEffect(() => {
    if (allQuestionsAnswered) {
      setTimerRunning(false);
    }
  }, [allQuestionsAnswered]);

  // Handle answer submission
  const handleAnswerSubmit = (id: number, answer: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            userAnswer: answer.toLowerCase(),
            isCorrect: answer.toLowerCase() === q.answer.toLowerCase(),
          };
        }
        return q;
      })
    );
  };

  // Toggle hint visibility
  const toggleHint = (id: number) => {
    if (hintsRemaining > 0) {
      setQuestions(
        questions.map((q) => {
          if (q.id === id && !q.showHint) {
            setHintsRemaining(hintsRemaining - 1);
            return {
              ...q,
              showHint: true,
            };
          }
          return q;
        })
      );
    }
  };

  // Reset challenge
  const resetChallenge = () => {
    setQuestions(
      questions.map((q) => ({
        ...q,
        userAnswer: undefined,
        isCorrect: undefined,
        showHint: false,
      }))
    );
    setTimeTaken(0);
    setTimerRunning(true);
    setHintsRemaining(3);
  };

  // Calculate progress
  const calculateProgress = () => {
    const correctAnswers = questions.filter((q) => q.isCorrect).length;
    return (correctAnswers / questions.length) * 100;
  };

  // Calculate score
  const calculateScore = () => {
    const correctAnswers = questions.filter((q) => q.isCorrect).length;
    return correctAnswers * 100 - timeTaken; // Example scoring formula
  };

  // Handle download
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("Download complete!");
    }, 2000); // Simulate download delay
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-background text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 bg-primary-dark/30 border border-primary-blue/20 rounded-lg hover:bg-primary-blue/10 transition z-50"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Navigation */}
      <nav className="bg-primary-dark border-b border-primary-blue/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <Link to="/challenges" className="text-primary-blue hover:text-primary-blue/80 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Challenges
          </Link>
        </div>
      </nav>

      {/* Simplified Banner */}
      <div className="flex justify-center mb-12">
  <div className="relative group">
    {/* Glow Border */}
    <div className="absolute inset-0 rounded-lg bg-primary-blue/40 blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>

    {/* Banner Image */}
    <img
      src="/cryptominer-banner.png"
      alt="CryptoMiner Challenge Banner"
      className="w-auto max-h-80 object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 ease-in-out relative z-10"
    />
  </div>
</div>

      {/* Timer */}
      <div className="text-center mb-6">
        <p className="text-gray-400">
          Time Taken: {Math.floor(timeTaken / 60)}:{timeTaken % 60 < 10 ? `0${timeTaken % 60}` : timeTaken % 60}
        </p>
      </div>

      {/* Improved Progress Bar */}
      <div className="w-full bg-primary-dark/20 h-4 rounded-full mb-6 relative overflow-hidden">
        {/* Progress Bar with Gradient and Glow */}
        <div
          className="h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${calculateProgress()}%`,
            background: 'linear-gradient(90deg, #4ade80, #3b82f6)', // Gradient colors
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)', // Glow effect
          }}
        >
          {/* Progress Percentage Label */}
          <div className="text-center text-white text-sm font-semibold absolute inset-0 flex items-center justify-center">
            {`${Math.round(calculateProgress())}%`}
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Miner On The Run</h1>

        {/* Challenge Introduction */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Challenge Introduction</h2>
          <p className="text-gray-400 mb-4">
            The SOC team received an alert about unusual high CPU usage on a workstation. Suspecting a cryptominer, they escalated the case for further investigation.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Recommended Tool:</span> We suggest using
            <span className="font-bold text-white"> FTK Imager</span> to analyze the provided forensic image.
          </p>
        </div>

        {/* Download Link */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Download Challenge File</h2>
          <a href="/Miner%20on%20the%20Run.ad1" download onClick={handleDownload}>
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download /Miner on the Run.ad1"}
            </button>
          </a>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-primary-dark/40 rounded-lg p-6 border border-primary-blue/20 shadow-lg hover:bg-primary-dark/50 transition-all"
            >
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
              {question.userAnswer && !question.isCorrect && (
                <div className="mt-2 text-red-500">Try Again!</div>
              )}
              {question.userAnswer && question.isCorrect && (
                <div className="mt-2 text-green-500">Correct!</div>
              )}
            </div>
          ))}
        </div>

        {/* Hints Remaining */}
        <div className="text-gray-400 mt-6">
          Hints Remaining: {hintsRemaining}
        </div>

        {/* Reset Button */}
        <div className="text-center mt-6">
          <button
            onClick={resetChallenge}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
          >
            Reset Challenge
          </button>
        </div>

        {/* Challenge Completion */}
        {allQuestionsAnswered && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className="mt-8 text-center">
              <p className="text-xl font-semibold text-green-500">Challenge Completed!</p>
              <p className="text-gray-400">Your Score: {calculateScore()}</p>
              <textarea
                placeholder="Share your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-primary-dark/30 border border-primary-blue/20 rounded-lg p-4 mt-4 focus:outline-none focus:border-primary-blue"
              />
              <button
                onClick={() => alert("Thank you for your feedback!")}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition-all"
              >
                Submit Feedback
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CryptoMinerChallenge;
