import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import WorkoutPage from "../pages/WorkoutPage.jsx";
import ActivityPage from "../pages/ActivityPage.jsx";
import PlayerPage from "../pages/PlayerPage.jsx";
import PlaylistsPage from "../pages/PlaylistsPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useAuthStore } from "../store/authStore.js";

export default function AppRoutes() {
  const token = useAuthStore((state) => state.token);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/workouts" element={<WorkoutPage />} />
      <Route path="/" element={token ? <DashboardPage /> : <Navigate to="/login" replace />} />
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
        path="/playlists"
        element={
          <ProtectedRoute>
            <PlaylistsPage />
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
