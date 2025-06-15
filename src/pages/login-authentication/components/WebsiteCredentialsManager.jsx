import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const WebsiteCredentialsManager = ({ onSkip, onComplete }) => {
  const [credentials, setCredentials] = useState([]);
  const [isAddingCredential, setIsAddingCredential] = useState(false);
  const [newCredential, setNewCredential] = useState({
    websiteUrl: '',
    username: '',
    password: '',
    description: ''
  });
  const [testingCredentials, setTestingCredentials] = useState({});
  const [errors, setErrors] = useState({});

  const mockWebsites = [
    {
      id: 1,
      url: 'https://example-dashboard.com',
      name: 'Company Dashboard',
      description: 'Internal company dashboard requiring authentication'
    },
    {
      id: 2,
      url: 'https://analytics-platform.com',
      name: 'Analytics Platform',
      description: 'Marketing analytics and reporting platform'
    },
    {
      id: 3,
      url: 'https://client-portal.com',
      name: 'Client Portal',
      description: 'Customer relationship management portal'
    }
  ];

  const handleAddCredential = () => {
    const newErrors = {};

    if (!newCredential.websiteUrl) {
      newErrors.websiteUrl = 'Website URL is required';
    } else if (!/^https?:\/\/.+/.test(newCredential.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL (http:// or https://)';
    }

    if (!newCredential.username) {
      newErrors.username = 'Username/Email is required';
    }

    if (!newCredential.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const credential = {
        id: Date.now(),
        ...newCredential,
        status: 'pending',
        createdAt: new Date()
      };

      setCredentials(prev => [...prev, credential]);
      setNewCredential({
        websiteUrl: '',
        username: '',
        password: '',
        description: ''
      });
      setIsAddingCredential(false);
      setErrors({});
    }
  };

  const handleTestCredential = async (credentialId) => {
    setTestingCredentials(prev => ({ ...prev, [credentialId]: true }));

    // Mock test connection
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly succeed or fail for demo
      const success = Math.random() > 0.3;
      
      setCredentials(prev => prev.map(cred => 
        cred.id === credentialId 
          ? { ...cred, status: success ? 'verified' : 'failed', lastTested: new Date() }
          : cred
      ));
    } catch (error) {
      setCredentials(prev => prev.map(cred => 
        cred.id === credentialId 
          ? { ...cred, status: 'failed', lastTested: new Date() }
          : cred
      ));
    } finally {
      setTestingCredentials(prev => ({ ...prev, [credentialId]: false }));
    }
  };

  const handleRemoveCredential = (credentialId) => {
    setCredentials(prev => prev.filter(cred => cred.id !== credentialId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCredential(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Clock" size={16} className="text-warning" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'failed':
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-full mx-auto mb-4">
          <Icon name="Shield" size={24} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Website Credentials</h2>
        <p className="text-text-secondary">
          Securely store login credentials for websites requiring authentication during screenshot capture
        </p>
      </div>

      {/* Quick Setup Suggestions */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-primary mb-2 flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} />
          <span>Suggested Websites</span>
        </h4>
        <div className="space-y-2">
          {mockWebsites.map(website => (
            <button
              key={website.id}
              onClick={() => setNewCredential(prev => ({ ...prev, websiteUrl: website.url, description: website.description }))}
              className="w-full text-left p-2 rounded border border-primary-200 hover:bg-primary-100 transition-colors duration-200"
            >
              <div className="text-sm font-medium text-primary">{website.name}</div>
              <div className="text-xs text-primary-600">{website.url}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Existing Credentials */}
      {credentials.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Stored Credentials</h4>
          <div className="space-y-3">
            {credentials.map(credential => (
              <div key={credential.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="text-sm font-medium text-text-primary">{credential.websiteUrl}</h5>
                      {getStatusIcon(credential.status)}
                      <span className="text-xs text-text-secondary">{getStatusText(credential.status)}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{credential.description}</p>
                    <p className="text-xs text-text-secondary">Username: {credential.username}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTestCredential(credential.id)}
                      disabled={testingCredentials[credential.id]}
                      className="text-xs text-primary hover:text-primary-700 disabled:opacity-50"
                    >
                      {testingCredentials[credential.id] ? (
                        <div className="flex items-center space-x-1">
                          <div className="animate-spin">
                            <Icon name="Loader2" size={12} />
                          </div>
                          <span>Testing...</span>
                        </div>
                      ) : (
                        'Test'
                      )}
                    </button>
                    <button
                      onClick={() => handleRemoveCredential(credential.id)}
                      className="text-xs text-error hover:text-error-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Credential */}
      {isAddingCredential ? (
        <div className="border border-border rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-4">Add Website Credentials</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Website URL *
              </label>
              <input
                type="url"
                name="websiteUrl"
                value={newCredential.websiteUrl}
                onChange={handleInputChange}
                className={`input-field w-full text-sm ${errors.websiteUrl ? 'border-error' : ''}`}
                placeholder="https://example.com"
              />
              {errors.websiteUrl && (
                <p className="mt-1 text-xs text-error">{errors.websiteUrl}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Username/Email *
              </label>
              <input
                type="text"
                name="username"
                value={newCredential.username}
                onChange={handleInputChange}
                className={`input-field w-full text-sm ${errors.username ? 'border-error' : ''}`}
                placeholder="Enter username or email"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-error">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={newCredential.password}
                onChange={handleInputChange}
                className={`input-field w-full text-sm ${errors.password ? 'border-error' : ''}`}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-error">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                name="description"
                value={newCredential.description}
                onChange={handleInputChange}
                className="input-field w-full text-sm"
                placeholder="Brief description of this website"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddCredential}
                className="btn-primary px-4 py-2 rounded text-sm font-medium"
              >
                Add Credential
              </button>
              <button
                onClick={() => {
                  setIsAddingCredential(false);
                  setNewCredential({ websiteUrl: '', username: '', password: '', description: '' });
                  setErrors({});
                }}
                className="btn-secondary px-4 py-2 rounded text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCredential(true)}
          className="w-full border-2 border-dashed border-border hover:border-primary hover:bg-primary-50 rounded-lg p-4 mb-6 transition-colors duration-200"
        >
          <div className="flex items-center justify-center space-x-2 text-text-secondary hover:text-primary">
            <Icon name="Plus" size={20} />
            <span className="font-medium">Add Website Credentials</span>
          </div>
        </button>
      )}

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onComplete}
          className="flex-1 btn-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
        >
          <Icon name="ArrowRight" size={20} />
          <span>Continue to Dashboard</span>
        </button>
        
        <button
          onClick={onSkip}
          className="btn-secondary px-6 py-3 rounded-lg font-medium"
        >
          Skip for Now
        </button>
      </div>

      {/* Security Notice */}
      <div className="mt-6 bg-secondary-100 border border-secondary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-secondary-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-xs font-medium text-secondary-700 mb-1">Security Notice</h4>
            <p className="text-xs text-secondary-600">
              All credentials are encrypted and stored securely. They are only used for automated screenshot capture and are never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCredentialsManager;