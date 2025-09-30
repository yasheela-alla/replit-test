import { useState } from "react";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/app-layout";
import LoginPage from "@/pages/login";
import TasksPage from "@/pages/tasks";
import SocialTracker from "@/pages/social-tracker";
import ContentPlanner from "@/pages/content-planner";
import NotFound from "@/pages/not-found";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'creative_team' | 'digital_marketer';
}

function Router() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser({ ...userData, id: userData.id || '1' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is not logged in, show login page
  if (!user) {
    return (
      <Switch>
        <Route path="/" component={() => <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login" component={() => <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  // If user is logged in, show app with sidebar
  return (
    <AppLayout user={user} onLogout={handleLogout}>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={() => <TasksPage user={user} onLogout={handleLogout} />} />
        <Route path="/tasks" component={() => <TasksPage user={user} onLogout={handleLogout} />} />
        <Route path="/social-tracker" component={() => <SocialTracker user={user} />} />
        <Route path="/content-planner" component={() => <ContentPlanner user={user} />} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
