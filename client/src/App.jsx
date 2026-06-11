import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import Activities from "./pages/Activities";
import EditActivity from "./pages/EditActivity";
import ActivityDetails from "./pages/ActivityDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import ForgotPassword from "./pages/ForgotPassword";
import ReportArchives from "./pages/ReportArchives";
import AchievementArchives from "./pages/AchievementArchives";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-activity"
        element={
          <ProtectedRoute>
            <AddActivity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-activity/:id"
        element={
          <ProtectedRoute>
            <EditActivity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activities/:id"
        element={
          <ProtectedRoute>
            <ActivityDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activities"
        element={
          <ProtectedRoute>
            <Activities />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
  path="/achievements"
  element={
   <ProtectedRoute>
 <AchievementArchives />

   </ProtectedRoute>
 }
/>

      <Route
        path="/report-archives"
        element={
          <ProtectedRoute>
            <ReportArchives />
          </ProtectedRoute>
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
