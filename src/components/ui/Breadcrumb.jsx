import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard-home': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/schedule-management': { label: 'Schedule Management', icon: 'Calendar' },
    '/screenshot-gallery': { label: 'Screenshot Gallery', icon: 'Images' },
    '/storage-settings': { label: 'Storage Settings', icon: 'HardDrive', parent: 'Settings' },
    '/system-logs-monitoring': { label: 'System Logs', icon: 'FileText', parent: 'Settings' },
    '/login-authentication': { label: 'Login', icon: 'LogIn' }
  };

  const currentRoute = routeMap[location.pathname];
  
  if (!currentRoute || location.pathname === '/dashboard-home') {
    return null;
  }

  const breadcrumbItems = [];
  
  if (currentRoute.parent) {
    breadcrumbItems.push({
      label: currentRoute.parent,
      icon: 'Settings',
      path: null,
      isParent: true
    });
  }

  breadcrumbItems.push({
    label: currentRoute.label,
    icon: currentRoute.icon,
    path: location.pathname,
    isCurrent: true
  });

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const handleBack = () => {
    if (currentRoute.parent) {
      navigate('/dashboard-home');
    } else {
      window.history.back();
    }
  };

  return (
    <nav className="flex items-center space-x-2 px-6 py-3 bg-background border-b border-border" aria-label="Breadcrumb">
      {/* Mobile Back Button */}
      <button
        onClick={handleBack}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-200"
        title="Go back"
      >
        <Icon name="ArrowLeft" size={16} />
      </button>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:flex items-center space-x-2">
        <button
          onClick={() => navigate('/dashboard-home')}
          className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Icon name="Home" size={16} />
          <span className="text-sm font-medium">Home</span>
        </button>

        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            
            {item.isCurrent ? (
              <div className="flex items-center space-x-1">
                <Icon name={item.icon} size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">{item.label}</span>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation(item.path)}
                className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
                disabled={item.isParent}
              >
                <Icon name={item.icon} size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Current Page Indicator */}
      <div className="md:hidden flex items-center space-x-2">
        <Icon name={currentRoute.icon} size={16} className="text-primary" />
        <span className="text-sm font-medium text-text-primary">{currentRoute.label}</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;