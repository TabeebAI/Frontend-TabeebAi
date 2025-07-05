import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "@components/ui/loader/loadingScreen";
import PublicGuard from "@/hooks/guard/publicGuard";
import AuthGuard from "@/hooks/guard/authGuard";

const MainLayout = lazy(() => import("@layouts/mainLayouts"));
const RoleBasedLayout = lazy(() => import("@layouts/RoleBasedLayout"));

// public pages
const LandingPage = lazy(() => import("@pages/landingPage/index"));
const ForgotPasswordPage = lazy(
  () => import("@pages/dashboardUser/forgotPassword/index")
);

// user pages
const UserOverview = lazy(() => import("@pages/dashboardUser/overview/index"));
const ChatBot = lazy(() => import("@pages/dashboardUser/chatbot/index"));
const MedicalRecord = lazy(() => import("@pages/dashboardUser/medicalRecord/index"));
const ChangePassword = lazy(
  () => import("@pages/dashboardUser/changePassword/index")
);

// doctor pages
const DoctorOverview = lazy(
  () => import("@pages/dashboardDoctor/overviewPage/index")
);
const VisitsPage = lazy(() => import("@pages/dashboardDoctor/visitsPage/index"));

const NotFoundPage = lazy(() => import("@pages/pageNotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public */}
        <Route
          element={
            <PublicGuard>
              <MainLayout />
            </PublicGuard>
          }
        >
          <Route path="/" element={<LandingPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected: role-aware dashboard */}
        <Route
          element={
            <AuthGuard>
              <RoleBasedLayout />
            </AuthGuard>
          }
        >
          {/* common path prefix */}
          <Route path="/dashboard/*">
            {/* user routes */}
            <Route path="profile-user" element={<UserOverview />} />
            <Route path="chat-bot" element={<ChatBot />} />
            <Route path="medical-record" element={<MedicalRecord />} />
            <Route path="settings" element={<ChangePassword />} />

            {/* doctor routes */}
            <Route path="profile-doctor" element={<DoctorOverview />} />
            <Route path="visits" element={<VisitsPage />} />
            <Route path="appointments" element={<></>} />
          </Route>
        </Route>

        {/* catch-all */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
