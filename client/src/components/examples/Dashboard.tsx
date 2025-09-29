import { Dashboard } from '../ui/dashboard';

export default function DashboardExample() {
  // Example user data for demonstration
  const mockUser = {
    name: "Sarah Johnson",
    email: "manager@company.com", 
    role: "manager" as const
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    alert("Logout functionality would redirect to login page");
  };

  return (
    <Dashboard
      user={mockUser}
      onLogout={handleLogout}
    />
  );
}