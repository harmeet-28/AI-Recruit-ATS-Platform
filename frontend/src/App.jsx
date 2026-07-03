import { Routes, Route } from "react-router-dom";
import CandidateProfile from "./pages/CandidateProfile";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Pipeline from "./pages/Pipeline";
import Interviews from "./pages/Interviews";
import AIScreening from "./pages/AIScreening";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/candidates" element={<Candidates />} />

        <Route path="/pipeline" element={<Pipeline />} />

        <Route path="/interviews" element={<Interviews />} />

        <Route path="/ai-screening" element={<AIScreening />} />

        <Route path="/candidate/:id" element={<CandidateProfile />} />
      </Route>
    </Routes>
  );
}
