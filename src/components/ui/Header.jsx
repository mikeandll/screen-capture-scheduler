import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const settingsRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-home',
      icon: 'LayoutDashboard',
      tooltip: 'Monitor schedules and view recent captures'
    },
    {
      label: 'Schedules',
      path: '/schedule-management',
      icon: 'Calendar',
      tooltip: 'Create and manage screenshot schedules'
    },
    {
      label: 'Gallery',
      path: '/screenshot-gallery',
      icon: 'Images',
      tooltip: 'View and organize captured screenshots'
    }
  ];

  const settingsItems = [
    {
      label: 'Storage Settings',
      path: '/storage-settings',
      icon: 'HardDrive',
      tooltip: 'Configure storage and retention policies'
    },
    {
      label: 'System Logs',
      path: '/system-logs-monitoring',
      icon: 'FileText',
      tooltip: 'Monitor system activity and troubleshoot issues'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    navigate('/login-authentication');
    setIsProfileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isSettingsActive = () => {
    return settingsItems.some(item => location.pathname === item.path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Camera" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary font-heading">
                ScreenCapture Pro
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(item.path)
                    ? 'text-primary bg-primary-50 border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
                title={item.tooltip}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}

            {/* Settings Dropdown */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isSettingsActive()
                    ? 'text-primary bg-primary-50 border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
                title="Settings and monitoring tools"
              >
                <Icon name="Settings" size={18} />
                <span>Settings</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-dropdown animate-slide-down">
                  <div className="py-2">
                    {settingsItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                          isActiveRoute(item.path)
                            ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                        }`}
                        title={item.tooltip}
                      >
                        <Icon name={item.icon} size={16} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
                title="Account settings and logout"
              >
                <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} />
                </div>
                <Icon name="ChevronDown" size={16} className={`hidden sm:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-dropdown animate-slide-down">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-text-primary">Admin User</p>
                      <p className="text-xs text-text-secondary">admin@company.com</p>
                    </div>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-error hover:bg-error-50 transition-colors duration-200"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
              title="Open navigation menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-1100 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-surface shadow-modal animate-slide-down">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                    <Icon name="Camera" size={20} color="white" />
                  </div>
                  <h1 className="text-lg font-semibold text-text-primary font-heading">
                    ScreenCapture Pro
                  </h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      isActiveRoute(item.path)
                        ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                <div className="pt-4 border-t border-border">
                  <p className="px-4 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Settings
                  </p>
                  {settingsItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        isActiveRoute(item.path)
                          ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;