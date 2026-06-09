import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

import Landing from './pages/Landing';
import OnboardingModal from './components/OnboardingModal';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/participant/Dashboard';
import SprintList from './pages/participant/SprintList';
import SprintDetail from './pages/participant/SprintDetail';
import Leaderboard from './pages/participant/Leaderboard';
import Playbook from './pages/participant/Playbook';
import LeaderDashboard from './pages/leader/LeaderDashboard';
import AdminPanel from './pages/admin/AdminPanel';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isAuthenticated, user, refreshUser } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
            <span className="font-inter font-black text-primary-foreground text-sm">CAM</span>
          </div>
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    );
  }

  const isLeader = user?.role === 'leader' || user?.role === 'admin';
  const defaultRoute = isLeader ? '/leader' : '/dashboard';
  const needsOnboarding = user && !user.display_name;

  return (
    <>
      {needsOnboarding && (
        <OnboardingModal user={user} onComplete={refreshUser} />
      )}
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route element={<AppLayout user={user} />}>
          <Route path="/dashboard" element={isLeader ? <Navigate to="/leader" replace /> : <Dashboard />} />
          <Route path="/sprints" element={<SprintList />} />
          <Route path="/sprints/:id" element={<SprintDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/playbook" element={<Playbook />} />
          {isLeader && <Route path="/leader" element={<LeaderDashboard />} />}
          {isLeader && <Route path="/admin" element={<AdminPanel />} />}
          {!isLeader && <Route path="/leader" element={<Navigate to="/dashboard" replace />} />}
          {!isLeader && <Route path="/admin" element={<Navigate to="/dashboard" replace />} />}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
