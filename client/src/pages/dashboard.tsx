import { Dashboard } from '@/components/ui/dashboard';

interface DashboardPageProps {
  user: {
    name: string;
    email: string;
    role: 'manager' | 'creative_team' | 'digital_marketer';
  };
  onLogout: () => void;
}

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  return (
    <Dashboard
      user={user}
      onLogout={onLogout}
    />
  );
}