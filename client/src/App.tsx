import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

interface User {
  name: string;
  email: string;
  role: 'manager' | 'creative_team' | 'digital_marketer';
}

function Router() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is logged in, show dashboard
  if (user) {
    return <DashboardPage user={user} onLogout={handleLogout} />;
  }

  // Otherwise show login page
  return (
    <Switch>
      <Route path="/" component={() => <LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route component={NotFound} />
    </Switch>
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
