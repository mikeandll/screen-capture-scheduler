import React from 'react';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

const SystemLogsMonitoring = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      
      <main className="pt-20 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full mx-auto mb-6">
              <Icon name="FileText" size={48} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              System Logs & Monitoring
            </h1>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Monitor system activity, view capture logs, and troubleshoot any issues with your schedules.
            </p>
            <div className="space-y-4">
              <button className="btn-primary px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto">
                <Icon name="Activity" size={20} />
                <span>View System Logs</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemLogsMonitoring;