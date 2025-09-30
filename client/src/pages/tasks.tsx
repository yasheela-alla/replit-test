import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatsGrid } from '@/components/ui/enhanced-stats';
import { TaskActions } from '@/components/ui/task-actions';
import { NewTaskModal } from '@/components/ui/new-task-modal';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    const mockUsers: User[] = [
      { id: '1', name: 'Sarah Johnson', email: 'manager@emmadi.com', role: 'manager' },
      { id: '2', name: 'Alex Chen', email: 'creative@emmadi.com', role: 'creative_team' },
      { id: '3', name: 'Maria Rodriguez', email: 'dm@emmadi.com', role: 'digital_marketer' },
      { id: '4', name: 'Pradeep Kumar', email: 'pradeep@emmadi.com', role: 'creative_team' }
    ];

    const mockTasks: Task[] = [
      {
        id: 'task-1',
        title: 'New store awareness campaign',
        requirement: 'Create promotional video for new store opening',
        contentType: 'video',
        priority: 'high',
        status: 'in_review',
        assigneeId: '1',
        createdById: '4',
        branchSpecific: 'Bhimavaram',
        format: '1350 x 1080 PX',
        eventBased: 'YES',
        dueDate: '2025-02-15',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-2',
        title: 'Festival collection showcase',
        requirement: 'Design carousel for Diwali collection',
        contentType: 'carousel',
        priority: 'high',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'All Branches',
        format: '1080 x 1080 PX',
        eventBased: 'YES',
        dueDate: '2025-02-10',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-3',
        title: 'Wedding collection promo',
        requirement: 'Social media posts for wedding season',
        contentType: 'image',
        priority: 'urgent',
        status: 'in_review',
        assigneeId: '1',
        createdById: '2',
        branchSpecific: 'Vijayawada',
        format: '1080 x 1350 PX',
        eventBased: 'NO',
        dueDate: '2025-02-08',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-4',
        title: 'Social media campaign',
        requirement: 'Weekly social media content',
        contentType: 'video',
        priority: 'medium',
        status: 'draft',
        assigneeId: '2',
        createdById: '3',
        branchSpecific: 'Online',
        format: '1080 x 1920 PX',
        eventBased: 'NO',
        dueDate: '2025-02-20',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-5',
        title: 'Product showcase',
        requirement: 'Product photography for website',
        contentType: 'image',
        priority: 'low',
        status: 'draft',
        assigneeId: '2',
        createdById: '3',
        branchSpecific: 'All Branches',
        format: '1200 x 1200 PX',
        eventBased: 'NO',
        dueDate: '2025-02-25',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-6',
        title: 'Grand opening announcement',
        requirement: 'Announcement video for new branch',
        contentType: 'video',
        priority: 'high',
        status: 'approved',
        assigneeId: '3',
        createdById: '4',
        branchSpecific: 'Hyderabad',
        format: '1920 x 1080 PX',
        eventBased: 'YES',
        dueDate: '2025-02-05',
        thumbnailUrl: '/placeholder.jpg'
      },
      {
        id: 'task-7',
        title: 'Customer testimonial video',
        requirement: 'Compile customer testimonials',
        contentType: 'video',
        priority: 'medium',
        status: 'completed',
        assigneeId: '2',
        createdById: '3',
        branchSpecific: 'All Branches',
        format: '1080 x 1080 PX',
        eventBased: 'NO',
        dueDate: '2025-01-30',
        thumbnailUrl: '/placeholder.jpg'
      }
    ];

    setUsers(mockUsers);
    setTasks(mockTasks);
  }, []);

  const stats = {
    pending: tasks.filter(t => t.status === 'draft').length,
    inApproval: tasks.filter(t => t.status === 'in_review').length,
    open: tasks.filter(t => ['draft', 'in_review'].includes(t.status)).length,
    completed: tasks.filter(t => t.status === 'approved' || t.status === 'completed').length
  };

  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...taskData,
      status: 'draft',
      createdById: user.id,
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task Created",
      description: "Your task has been created successfully.",
    });
  };

  const handleApprove = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'approved' as const } : task
    ));
    toast({
      title: "Task Approved",
      description: "The task has been approved successfully.",
    });
  };

  const handleReject = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'rejected' as const } : task
    ));
    toast({
      title: "Task Rejected",
      description: "The task has been rejected.",
      variant: "destructive",
    });
  };

  const handleSendForApproval = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'in_review' as const } : task
    ));
    toast({
      title: "Sent for Approval",
      description: "The task has been sent for approval.",
    });
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.requirement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  };

  const getUserInitials = (userId: string) => {
    const name = getUserName(userId);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    in_review: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300',
  };

  return (
    <div className="space-y-6">
      {/* Header with greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            Hello, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your tasks today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button onClick={() => setIsNewTaskModalOpen(true)} data-testid="button-create-task">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid
        pendingCount={stats.pending}
        inApprovalCount={stats.inApproval}
        openCount={stats.open}
        completedCount={stats.completed}
      />

      {/* Filters and Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Button variant="outline" data-testid="button-filter">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tasks Table */}
      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Sent By
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Requirement
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Branch
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Format
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Event Based
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Priority
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Due Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr 
                  key={task.id}
                  className="border-b hover-elevate transition-colors"
                  data-testid={`row-task-${task.id}`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getUserInitials(task.createdById)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{getUserName(task.createdById)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium" data-testid={`text-task-title-${task.id}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{task.requirement}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">{task.branchSpecific}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="capitalize">
                      {task.contentType}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-muted-foreground">{task.format}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant={task.eventBased === 'YES' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {task.eventBased}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">{task.dueDate}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={statusColors[task.status]}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <TaskActions
                      taskId={task.id}
                      status={task.status}
                      userRole={user.role}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onSendForApproval={handleSendForApproval}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
