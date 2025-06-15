import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LoginForm = ({ onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onLogin(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@screencapture.com',
      password: 'ScreenCapture123!',
      rememberMe: false
    });
    setErrors({});
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Welcome Back</h2>
        <p className="text-text-secondary">Sign in to your account to continue</p>
      </div>

      {/* Demo Credentials Helper */}
      <div className="bg-accent-100 border border-accent-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-accent-600 mb-1">Demo Credentials</h4>
            <p className="text-xs text-accent-600 mb-2">Use these credentials to access the demo:</p>
            <div className="text-xs text-accent-600 space-y-1">
              <div><strong>Email:</strong> admin@screencapture.com</div>
              <div><strong>Password:</strong> ScreenCapture123!</div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="mt-2 text-xs text-accent-600 hover:text-accent-700 underline"
            >
              Auto-fill demo credentials
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Mail" size={18} className="text-text-secondary" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input-field w-full pl-10 ${errors.email ? 'border-error focus:ring-error' : ''}`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Lock" size={18} className="text-text-secondary" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`input-field w-full pl-10 pr-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
              disabled={isLoading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
              disabled={isLoading}
            />
            <span className="text-sm text-text-secondary">Remember me</span>
          </label>
          
          <button
            type="button"
            className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-error mb-1">Authentication Failed</h4>
                <p className="text-sm text-error">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin">
                <Icon name="Loader2" size={20} />
              </div>
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <Icon name="LogIn" size={20} />
              <span>Sign In</span>
            </>
          )}
        </button>

        {/* Create Account */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              disabled={isLoading}
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;