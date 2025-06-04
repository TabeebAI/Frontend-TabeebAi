import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from '@components/ui/loader/loadingScreen';
import PublicGuard from '@/hooks/guard/publicGuard';
import AuthGuard from '@/hooks/guard/authGuard';

// Layouts
const MainLayout = lazy(() => import('@layouts/mainLayouts'));
const DashboardLayout = lazy(() => import('@layouts/dashboardLayout'));

// Pages
const LandingPage = lazy(() => import('@pages/landingPage/index'));
const DashboardHome = lazy(() => import('@pages/dashboardUser/overview/index'));
const NotFoundPage = lazy(() => import('@pages/pageNotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route
          element={
            <PublicGuard>
              <MainLayout />
            </PublicGuard>
          }
        >
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Protected Dashboard */}
        <Route
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route path="/dashboard" element={<DashboardHome />} />
        </Route>

        {/* 404 */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
