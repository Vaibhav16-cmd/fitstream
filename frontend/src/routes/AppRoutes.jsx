import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WorkoutPage from "../pages/WorkoutPage.jsx";
import ActivityPage from "../pages/ActivityPage.jsx";
import PlayerPage from "../pages/PlayerPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/workouts" element={<WorkoutPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activity"
        element={
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/player"
        element={
          <ProtectedRoute>
            <PlayerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
