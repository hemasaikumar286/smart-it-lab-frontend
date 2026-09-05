import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Issues from "./pages/Issues.jsx";
import CreateIssue from "./pages/CreateIssue.jsx";
import Notifications from "./pages/Notifications.jsx";
import Profile from "./pages/Profile.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <Issues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-issue"
          element={
            <ProtectedRoute>
              <CreateIssue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Unknown URL */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;