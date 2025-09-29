import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TaskStats } from '@/components/ui/task-stats';
import { TaskTable } from '@/components/ui/task-table';
import { NewTaskModal } from '@/components/ui/new-task-modal';

interface Task {
  id: string;
  title: string;
  requirement: string;
  contentType: 'image' | 'video' | 'carousel' | 'text';
  campaign?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'in_review' | 'approved' | 'rejected' | 'completed';
  assigneeId?: string;
  createdById: string;
  branchSpecific?: string;
  format?: string;
  eventBased?: string;
  thumbnailUrl?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'creative_team' | 'digital_marketer';
}

interface TasksPageProps {
  user: User;
  onLogout: () => void;
}

export default function TasksPage({ user, onLogout }: TasksPageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - TODO: Replace with actual API calls
  useEffect(() => {
    const mockUsers: User[] = [
      { id: '1', name: 'Sarah Johnson', email: 'manager@company.com', role: 'manager' },
      { id: '2', name: 'Alex Chen', email: 'creative@company.com', role: 'creative_team' },
      { id: '3', name: 'Maria Rodriguez', email: 'marketing@company.com', role: 'digital_marketer' }
    ];

    const mockTasks: Task[] = [
      {
        id: 'task-1',
        title: 'New store awareness campaign',
        requirement: 'New store awareness',
        contentType: 'video',
        priority: 'high',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'Bhimavaram',
        format: '1350 x 1080 PX',
        eventBased: 'NO',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-2',
        title: 'Festival collection showcase',
        requirement: 'New store awareness',
        contentType: 'video',
        priority: 'medium',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'Bhimavaram',
        format: '1350 x 1080 PX',
        eventBased: 'NO',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-3',
        title: 'Wedding collection promo',
        requirement: 'New store awareness',
        contentType: 'video',
        priority: 'urgent',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'Bhimavaram',
        format: '1350 x 1080 PX',
        eventBased: 'NO',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-4',
        title: 'Social media campaign',
        requirement: 'New store awareness',
        contentType: 'video',
        priority: 'medium',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'Bhimavaram',
        format: '1350 x 1080 PX',
        eventBased: 'NO',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-5',
        title: 'Product showcase',
        requirement: 'New store awareness',
        contentType: 'video',
        priority: 'low',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'Bhimavaram',
        format: '1350 x 1080 PX',
        eventBased: 'NO',
        thumbnailUrl: '/placeholder.jpg'
      }
    ];

    setUsers(mockUsers);
    setTasks(mockTasks);
  }, []);

  const stats = {
    pending: tasks.filter(t => t.status === 'draft').length,
    inApproval: tasks.filter(t => t.status === 'in_review').length,
    openTasks: '2.9M',
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      requirement: taskData.requirement,
      contentType: taskData.contentType,
      priority: taskData.priority || 'medium',
      status: 'draft',
      assigneeId: taskData.assigneeId,
      createdById: user.id,
      branchSpecific: taskData.branchSpecific,
      format: taskData.format,
      eventBased: taskData.eventBased,
      thumbnailUrl: '/placeholder.jpg'
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus as any } : task
    ));
  };

  const handleSendForApproval = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'in_review' } : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.requirement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-green-600" data-testid="text-page-title">
              Tasks,
            </h1>
            <div className="text-sm text-muted-foreground">
              Hello, {user.name}👋
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            data-testid="button-logout"
          >
            LOGOUT
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="bg-slate-900 text-white border-slate-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Approvals
              </Button>
              <Button 
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={() => setIsNewTaskModalOpen(true)}
                data-testid="button-new-task"
              >
                <Plus className="w-4 h-4 mr-2" />
                New task
              </Button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <TaskStats stats={stats} />

          {/* Table Headers */}
          <div className="text-sm text-muted-foreground mb-2">
            Showing {filteredTasks.length} tasks
          </div>

          {/* Tasks Table */}
          <TaskTable
            tasks={filteredTasks}
            users={users}
            currentUser={user}
            onStatusChange={handleStatusChange}
            onSendForApproval={handleSendForApproval}
          />
        </div>
      </main>

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        users={users}
      />
    </div>
  );
}