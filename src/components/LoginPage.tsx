import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, Lock, User, Key, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import MatrixBackground from './MatrixBackground';

interface LoginPageProps {
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    secretPin: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [botDetection, setBotDetection] = useState({
    mouseMovements: 0,
    keystrokes: 0,
    timeSpent: 0
  });

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput('');
    setCaptchaVerified(false);
  };

  // Bot detection tracking
  useEffect(() => {
    const startTime = Date.now();
    
    const handleMouseMove = () => {
      setBotDetection(prev => ({ ...prev, mouseMovements: prev.mouseMovements + 1 }));
    };

    const handleKeyPress = () => {
      setBotDetection(prev => ({ ...prev, keystrokes: prev.keystrokes + 1 }));
    };

    const timeInterval = setInterval(() => {
      setBotDetection(prev => ({ ...prev, timeSpent: Math.floor((Date.now() - startTime) / 1000) }));
    }, 1000);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);

    generateCaptcha();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
      clearInterval(timeInterval);
    };
  }, []);

  // Block countdown
  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBlockTimeLeft(blockTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isBlocked && blockTimeLeft === 0) {
      setIsBlocked(false);
      setLoginAttempts(0);
    }
  }, [isBlocked, blockTimeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaVerify = () => {
    if (captchaInput.toUpperCase() === captcha) {
      setCaptchaVerified(true);
    } else {
      generateCaptcha();
      alert('Invalid CAPTCHA. Please try again.');
    }
  };

  const detectBot = () => {
    // Simple bot detection logic
    if (botDetection.timeSpent < 5) return true; // Too fast
    if (botDetection.mouseMovements < 10) return true; // No mouse movement
    if (botDetection.keystrokes < 5) return true; // No typing
    return false;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      alert(`Access blocked. Try again in ${blockTimeLeft} seconds.`);
      return;
    }

    if (!captchaVerified) {
      alert('Please verify CAPTCHA first.');
      return;
    }

    if (detectBot()) {
      alert('Bot activity detected. Access denied.');
      setIsBlocked(true);
      setBlockTimeLeft(60);
      return;
    }

    // Simulate login attempt
    setLoginAttempts(prev => prev + 1);
    
    if (loginAttempts >= 2) {
      setIsBlocked(true);
      setBlockTimeLeft(30);
      alert('Too many failed attempts. Access temporarily blocked.');
      return;
    }

    // For demo purposes, always show "invalid credentials"
    alert('Invalid credentials. This is a demo login page.');
    generateCaptcha();
  };

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <MatrixBackground />
      
      {/* Header */}
      <div className="relative z-20 p-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Main Site</span>
        </button>
      </div>

      {/* Login Panel */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className="bg-black/90 backdrop-blur-sm border border-green-500/50 rounded-lg p-8 w-full max-w-md shadow-2xl shadow-green-500/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-green-400 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-green-400 mb-2 font-mono">SECURE ACCESS PORTAL</h1>
            <p className="text-green-300/70 text-sm font-mono">LEX TECHNOLOGIES - AUTHORIZED PERSONNEL ONLY</p>
            <div className="mt-4 text-xs text-green-500 font-mono">
              <div className="animate-pulse">● SYSTEM ONLINE ●</div>
            </div>
          </div>

          {/* Security Status */}
          <div className="mb-6 p-3 bg-green-900/20 border border-green-500/30 rounded font-mono">
            <div className="flex items-center justify-between text-xs">
              <span>SECURITY LEVEL: HIGH</span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                ENCRYPTED
              </span>
            </div>
            <div className="mt-2 text-xs text-green-400">
              <div className="flex justify-between">
                <span>FIREWALL: ACTIVE</span>
                <span>IDS: MONITORING</span>
              </div>
            </div>
          </div>

          {/* Bot Detection Status */}
          <div className="mb-6 p-3 bg-gray-900/50 border border-gray-600 rounded text-xs font-mono">
            <div className="text-gray-400 mb-2">BOT PROTECTION STATUS:</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-green-400 text-lg">{botDetection.mouseMovements}</div>
                <div className="text-gray-500">MOUSE</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg">{botDetection.keystrokes}</div>
                <div className="text-gray-500">KEYS</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg">{botDetection.timeSpent}s</div>
                <div className="text-gray-500">TIME</div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className={`text-xs ${detectBot() ? 'text-red-400' : 'text-green-400'}`}>
                {detectBot() ? '⚠ SUSPICIOUS ACTIVITY' : '✓ HUMAN VERIFIED'}
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* User ID */}
            <div>
              <label className="block text-green-400 text-sm font-medium mb-2 font-mono">
                <User className="h-4 w-4 inline mr-2" />
                USER ID
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                className="w-full bg-black/70 border border-green-500/50 rounded px-3 py-2 text-green-400 placeholder-green-600 focus:border-green-400 focus:outline-none font-mono"
                placeholder="Enter your user ID"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-green-400 text-sm font-medium mb-2 font-mono">
                <Lock className="h-4 w-4 inline mr-2" />
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black/70 border border-green-500/50 rounded px-3 py-2 pr-10 text-green-400 placeholder-green-600 focus:border-green-400 focus:outline-none font-mono"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Secret PIN */}
            <div>
              <label className="block text-green-400 text-sm font-medium mb-2 font-mono">
                <Key className="h-4 w-4 inline mr-2" />
                SECRET PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  name="secretPin"
                  value={formData.secretPin}
                  onChange={handleInputChange}
                  className="w-full bg-black/70 border border-green-500/50 rounded px-3 py-2 pr-10 text-green-400 placeholder-green-600 focus:border-green-400 focus:outline-none font-mono"
                  placeholder="Enter 6-digit PIN"
                  maxLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div>
              <label className="block text-green-400 text-sm font-medium mb-2 font-mono">
                SECURITY VERIFICATION
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-gray-800 border border-green-500/50 px-4 py-2 rounded font-mono text-green-400 text-lg tracking-widest">
                  {captcha}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-green-400 hover:text-green-300 text-sm font-mono"
                >
                  REFRESH
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1 bg-black/70 border border-green-500/50 rounded px-3 py-2 text-green-400 placeholder-green-600 focus:border-green-400 focus:outline-none font-mono"
                  placeholder="Enter CAPTCHA"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleCaptchaVerify}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-black font-medium transition-colors font-mono"
                >
                  VERIFY
                </button>
              </div>
              {captchaVerified && (
                <div className="flex items-center mt-2 text-green-400 text-sm font-mono">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  CAPTCHA VERIFIED
                </div>
              )}
            </div>

            {/* Warning Messages */}
            {loginAttempts > 0 && (
              <div className="flex items-center p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm font-mono">
                <AlertTriangle className="h-4 w-4 mr-2" />
                FAILED ATTEMPTS: {loginAttempts}/3
              </div>
            )}

            {isBlocked && (
              <div className="flex items-center p-3 bg-red-900/30 border border-red-500 rounded text-red-400 text-sm font-mono">
                <AlertTriangle className="h-4 w-4 mr-2" />
                ACCESS BLOCKED FOR {blockTimeLeft} SECONDS
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isBlocked || !captchaVerified}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-4 rounded transition-colors font-mono"
            >
              {isBlocked ? `BLOCKED (${blockTimeLeft}s)` : 'ACCESS SYSTEM'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-green-600 font-mono">
            <p>⚠️ UNAUTHORIZED ACCESS IS PROHIBITED ⚠️</p>
            <p className="mt-1">ALL ACTIVITIES ARE MONITORED AND LOGGED</p>
            <div className="mt-2 text-green-500">
              <div className="animate-pulse">● NEURAL NETWORK ACTIVE ●</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;