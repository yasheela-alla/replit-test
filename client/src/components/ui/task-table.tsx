import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  role: 'manager' | 'creative_team' | 'digital_marketer';
}

interface TaskTableProps {
  tasks: Task[];
  users: User[];
  currentUser: User;
  onStatusChange: (taskId: string, newStatus: string) => void;
  onSendForApproval: (taskId: string) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ 
  tasks, 
  users, 
  currentUser, 
  onStatusChange, 
  onSendForApproval 
}) => {
  const getUserById = (id: string) => users.find(u => u.id === id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'in_review': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canSendForApproval = (task: Task) => {
    return task.status === 'draft' && 
           (currentUser.role === 'creative_team' || task.createdById === currentUser.id);
  };

  const canApprove = (task: Task) => {
    return task.status === 'in_review' && currentUser.role === 'manager';
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Sent by</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Requirement</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Branch specific?</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Creative/Video</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Format</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Event based?</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Output</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Send for Approval</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const assignee = getUserById(task.assigneeId || '');
              const creator = getUserById(task.createdById);
              
              return (
                <tr key={task.id} className="border-b hover:bg-muted/30 transition-colors" data-testid={`row-task-${task.id}`}>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{creator?.name || 'Unknown'}</div>
                      <Badge variant="secondary" className="text-xs">
                        {creator?.role?.replace('_', ' ') || 'Unknown'}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-muted-foreground">{task.requirement}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{task.branchSpecific || 'NO'}</td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className="capitalize">
                      {task.contentType}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm">{task.format || '-'}</td>
                  <td className="px-4 py-4 text-sm">{task.eventBased || 'NO'}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      {task.thumbnailUrl && (
                        <div className="w-12 h-8 bg-orange-200 rounded border border-orange-300 flex items-center justify-center">
                          <div className="w-8 h-6 bg-orange-400 rounded"></div>
                        </div>
                      )}
                      <Badge className={getPriorityColor(task.priority)} variant="secondary">
                        {task.priority}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <Badge className={`text-white ${getStatusColor(task.status)}`} variant="secondary">
                        {task.status.replace('_', ' ')}
                      </Badge>
                      {canSendForApproval(task) && (
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs"
                          onClick={() => onSendForApproval(task.id)}
                          data-testid={`button-send-approval-${task.id}`}
                        >
                          Send for approval
                        </Button>
                      )}
                      {canApprove(task) && (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-500 hover:bg-green-600 text-white text-xs"
                            onClick={() => onStatusChange(task.id, 'approved')}
                            data-testid={`button-approve-${task.id}`}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => onStatusChange(task.id, 'rejected')}
                            data-testid={`button-reject-${task.id}`}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {tasks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No tasks found
        </div>
      )}
    </Card>
  );
};