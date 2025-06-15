import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard-home');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full btn-secondary px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Camera" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-text-primary">ScreenCapture Pro</span>
          </div>
          <p className="text-sm text-text-secondary">
            Automated screenshot scheduling and management
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;