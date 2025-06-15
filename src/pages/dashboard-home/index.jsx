import React from 'react';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Active Schedules',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: 'Calendar'
    },
    {
      title: 'Screenshots Today',
      value: '847',
      change: '+15%',
      changeType: 'positive',
      icon: 'Camera'
    },
    {
      title: 'Storage Used',
      value: '2.4 GB',
      change: '+0.3 GB',
      changeType: 'neutral',
      icon: 'HardDrive'
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      change: '+0.2%',
      changeType: 'positive',
      icon: 'CheckCircle'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'capture_success',
      message: 'Screenshot captured successfully',
      website: 'https://example-dashboard.com',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'schedule_started',
      message: 'New schedule started',
      website: 'https://analytics-platform.com',
      timestamp: '5 minutes ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'capture_success',
      message: 'Screenshot captured successfully',
      website: 'https://client-portal.com',
      timestamp: '8 minutes ago',
      status: 'success'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'capture_success':
        return 'CheckCircle';
      case 'schedule_started':
        return 'Play';
      case 'capture_failed':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      
      <main className="pt-20 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back, Admin
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your screenshot schedules today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-lg">
                    <Icon name={stat.icon} size={24} className="text-primary" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 
                    stat.changeType === 'negative' ? 'text-error' : 'text-text-secondary'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-text-secondary">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Recent Activity
                </h2>
                <button className="text-sm text-primary hover:text-primary-700 transition-colors duration-200">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-opacity-10 ${getActivityColor(activity.status)} bg-current`}>
                      <Icon name={getActivityIcon(activity.type)} size={16} className={getActivityColor(activity.status)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        {activity.message}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {activity.website}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Quick Actions
              </h2>
              
              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-colors duration-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                    <Icon name="Plus" size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-text-primary">
                      Create New Schedule
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Set up automated screenshot capture
                    </p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-colors duration-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent-100 rounded-lg">
                    <Icon name="Images" size={20} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-text-primary">
                      View Gallery
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Browse captured screenshots
                    </p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-primary-50 hover:border-primary transition-colors duration-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg">
                    <Icon name="Settings" size={20} className="text-secondary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-text-primary">
                      Configure Storage
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Manage storage and retention
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;