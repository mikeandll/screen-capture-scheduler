import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoginForm from './components/LoginForm';
import WebsiteCredentialsManager from './components/WebsiteCredentialsManager';

const LoginAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialsManager, setShowCredentialsManager] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    // Mock authentication - check against mock credentials
    const mockCredentials = {
      email: 'admin@screencapture.com',
      password: 'ScreenCapture123!'
    };

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (credentials.email === mockCredentials.email && credentials.password === mockCredentials.password) {
        setIsAuthenticated(true);
        setShowCredentialsManager(true);
        
        // Auto-redirect to dashboard after showing credentials manager
        setTimeout(() => {
          navigate('/dashboard-home');
        }, 3000);
      } else {
        throw new Error('Invalid credentials. Please use: admin@screencapture.com / ScreenCapture123!');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipCredentials = () => {
    navigate('/dashboard-home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 shadow-lg">
            <Icon name="Camera" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">ScreenCapture Pro</h1>
          <p className="text-text-secondary">
            {isAuthenticated ? 'Setup Website Credentials' : 'Automated Screenshot Scheduling'}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="card p-8 shadow-lg">
          {!isAuthenticated ? (
            <LoginForm 
              onLogin={handleLogin} 
              isLoading={isLoading}
            />
          ) : showCredentialsManager ? (
            <WebsiteCredentialsManager 
              onSkip={handleSkipCredentials}
              onComplete={() => navigate('/dashboard-home')}
            />
          ) : null}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} ScreenCapture Pro. All rights reserved.
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-primary" />
            </div>
            <span className="text-text-primary font-medium">Authenticating...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAuthentication;