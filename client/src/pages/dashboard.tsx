import TasksPage from './tasks';

interface DashboardPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'manager' | 'creative_team' | 'digital_marketer';
  };
  onLogout: () => void;
}

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  return (
    <TasksPage
      user={user}
      onLogout={onLogout}
    />
  );
}