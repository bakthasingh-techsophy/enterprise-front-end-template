import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LayoutWithAppShell } from './layout/LayoutWithAppShell';
import { RequireAuth } from './components/RequireAuth';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LayoutProvider } from './contexts/LayoutContext';

// Auth modules
import { Login } from './modules/auth/Login';
import { Signup } from './modules/auth/Signup';
import { ForgotPassword } from './modules/auth/ForgotPassword';

// Main application modules
import { Dashboard } from './modules/dashboard/Dashboard';
import { Analytics } from './modules/analytics/Analytics';
import { Reports } from './modules/reports/Reports';
import { Items } from './modules/items/Items';
import { Projects } from './modules/projects/Projects';
import { Tasks } from './modules/tasks/Tasks';
import { Calendar } from './modules/calendar/Calendar';
import { Messages } from './modules/messages/Messages';
import { Team } from './modules/team/Team';
import { Orders } from './modules/orders/Orders';
import { Inbox } from './modules/inbox/Inbox';
import { Integrations } from './modules/integrations/Integrations';
import { Settings } from './modules/settings/Settings';
import { Support } from './modules/support/Support';

// Account modules
import { Profile } from './modules/account/Profile';
import { SessionInspector } from './modules/account/SessionInspector';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutProvider>
          <BrowserRouter>
            <Routes>
              {/* Public auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/forgot" element={<ForgotPassword />} />

              {/* Protected routes - rendered inside LayoutWithAppShell */}
              <Route
                element={
                  <RequireAuth>
                    <LayoutWithAppShell />
                  </RequireAuth>
                }
              >
                {/* Main application routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Reports />} />
                
                {/* Content Management */}
                <Route path="/items" element={<Items />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/calendar" element={<Calendar />} />
                
                {/* Collaboration */}
                <Route path="/messages" element={<Messages />} />
                <Route path="/team" element={<Team />} />
                
                {/* Commerce */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/inbox" element={<Inbox />} />
                
                {/* System */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/support" element={<Support />} />

                {/* Account routes */}
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/inspector" element={<SessionInspector />} />
              </Route>

              {/* Redirect root and unknown routes */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
