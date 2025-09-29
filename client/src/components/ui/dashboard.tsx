import { User, Settings, LogOut, BarChart3, Users, Target } from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    role: 'manager' | 'creative_team' | 'digital_marketer';
  };
  onLogout: () => void;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'manager': return <Users className="w-6 h-6" />;
    case 'creative_team': return <User className="w-6 h-6" />;
    case 'digital_marketer': return <Target className="w-6 h-6" />;
    default: return <User className="w-6 h-6" />;
  }
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'manager': return 'Manager';
    case 'creative_team': return 'Creative Team';
    case 'digital_marketer': return 'Digital Marketer';
    default: return role;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'manager': return 'bg-blue-500';
    case 'creative_team': return 'bg-purple-500';
    case 'digital_marketer': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${getRoleColor(user.role)} text-white`}>
              {getRoleIcon(user.role)}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground" data-testid="text-welcome">
                Welcome, {user.name}
              </h1>
              <p className="text-sm text-muted-foreground" data-testid="text-role">
                {getRoleDisplayName(user.role)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              data-testid="button-settings"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Role-specific content */}
            {user.role === 'manager' && (
              <>
                <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                    <h3 className="text-lg font-semibold">Analytics Overview</h3>
                  </div>
                  <p className="text-muted-foreground">View team performance and project metrics</p>
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-sm text-muted-foreground">Team Productivity</div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-green-500" />
                    <h3 className="text-lg font-semibold">Team Management</h3>
                  </div>
                  <p className="text-muted-foreground">Manage team members and assignments</p>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-muted-foreground">Active Team Members</div>
                  </div>
                </div>
              </>
            )}

            {user.role === 'creative_team' && (
              <>
                <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-8 h-8 text-purple-500" />
                    <h3 className="text-lg font-semibold">Creative Projects</h3>
                  </div>
                  <p className="text-muted-foreground">Manage your creative workflows and assets</p>
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-muted-foreground">Active Projects</div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-pink-500" />
                    <h3 className="text-lg font-semibold">Asset Library</h3>
                  </div>
                  <p className="text-muted-foreground">Access your design assets and templates</p>
                  <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">247</div>
                    <div className="text-sm text-muted-foreground">Design Assets</div>
                  </div>
                </div>
              </>
            )}

            {user.role === 'digital_marketer' && (
              <>
                <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-green-500" />
                    <h3 className="text-lg font-semibold">Campaign Management</h3>
                  </div>
                  <p className="text-muted-foreground">Track and optimize your marketing campaigns</p>
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-muted-foreground">Active Campaigns</div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                    <h3 className="text-lg font-semibold">Performance Analytics</h3>
                  </div>
                  <p className="text-muted-foreground">Monitor ROI and conversion metrics</p>
                  <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">3.2x</div>
                    <div className="text-sm text-muted-foreground">Average ROI</div>
                  </div>
                </div>
              </>
            )}

            {/* Common card for all roles */}
            <div className="p-6 rounded-lg bg-card border border-card-border hover-elevate">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-8 h-8 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Account Settings</h3>
              </div>
              <p className="text-muted-foreground">Manage your profile and preferences</p>
              <div className="mt-4 space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 text-foreground" data-testid="text-user-email">{user.email}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="ml-2 text-foreground">{getRoleDisplayName(user.role)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};