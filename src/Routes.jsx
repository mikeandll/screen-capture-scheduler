import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginAuthentication from "pages/login-authentication";
import DashboardHome from "pages/dashboard-home";
import ScheduleManagement from "pages/schedule-management";
import ScreenshotGallery from "pages/screenshot-gallery";
import StorageSettings from "pages/storage-settings";
import SystemLogsMonitoring from "pages/system-logs-monitoring";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoginAuthentication />} />
          <Route path="/login-authentication" element={<LoginAuthentication />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/schedule-management" element={<ScheduleManagement />} />
          <Route path="/screenshot-gallery" element={<ScreenshotGallery />} />
          <Route path="/storage-settings" element={<StorageSettings />} />
          <Route path="/system-logs-monitoring" element={<SystemLogsMonitoring />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;