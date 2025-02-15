import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LearningPaths from './pages/LearningPaths';
import CybersecurityFundamentals from './pages/CybersecurityFundamentals';
import SocAnalyst from './pages/SocAnalyst';
import IncidentResponse from './pages/IncidentResponse';
import ThreatHunting from './pages/ThreatHunting';
import MalwareAnalysis from './pages/MalwareAnalysis';
import CyberThreatIntelligence from './pages/CyberThreatIntelligence';
import Challenges from './pages/Challenges';
import PowerShellChallenge from './pages/PowerShellChallenge';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Certificates from './pages/Certificates';
import Admin from './pages/Admin';
import Leaderboard from './pages/Leaderboard';
import TermsOfUse from './pages/TermsOfUse';
import ContactUs from './pages/ContactUs';
import RedTeam from './pages/RedTeam';
import { AuthProvider } from './contexts/AuthContext';
import MinerOnTheRun from './pages/MinerOnTheRun';
import MFTChallenge from './pages/MasterFileTrap';
import Payment from './pages/Payment';
import Pricing from './pages/Pricing';
import PublicProfile from './pages/Public_Profile';
import Search from './pages/Search';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route path="/cybersecurity-fundamentals" element={<CybersecurityFundamentals />} />
          <Route path="/soc-analyst" element={<SocAnalyst />} />
          <Route path="/incident-response" element={<IncidentResponse />} />
          <Route path="/threat-hunting" element={<ThreatHunting />} />
          <Route path="/malware-analysis" element={<MalwareAnalysis />} />
          <Route path="/cyber-threat-intelligence" element={<CyberThreatIntelligence />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/powershell-logs" element={<PowerShellChallenge />} />
          <Route path="/challenges/miner-on-the-run" element={<MinerOnTheRun />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<PublicProfile />} />
          <Route path="/profile/certificates" element={<Certificates />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/red-team" element={<RedTeam />} />
          <Route path="/challenges/mft-analysis" element={<MFTChallenge />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;