import { useState } from 'react';
import { Check, X, Send, MoreVertical, Eye, Edit, Copy, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TaskActionsProps {
  taskId: string;
  status: 'draft' | 'in_review' | 'approved' | 'rejected' | 'completed';
  userRole: 'manager' | 'creative_team' | 'digital_marketer';
  onApprove?: (taskId: string) => void;
  onReject?: (taskId: string) => void;
  onSendForApproval?: (taskId: string) => void;
  onViewDetails?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
  onDuplicate?: (taskId: string) => void;
  onDownload?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskActions({
  taskId,
  status,
  userRole,
  onApprove,
  onReject,
  onSendForApproval,
  onViewDetails,
  onEdit,
  onDuplicate,
  onDownload,
  onDelete,
}: TaskActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => void) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  // Manager actions for tasks in approval
  if (userRole === 'manager' && status === 'in_review') {
    return (
      <div className="flex items-center gap-2" data-testid={`actions-manager-${taskId}`}>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
          onClick={() => handleAction(() => onApprove?.(taskId))}
          disabled={isLoading}
          data-testid={`button-approve-${taskId}`}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
          onClick={() => handleAction(() => onReject?.(taskId))}
          disabled={isLoading}
          data-testid={`button-reject-${taskId}`}
        >
          <X className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8" data-testid={`button-more-${taskId}`}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails?.(taskId)} data-testid={`menu-view-${taskId}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownload?.(taskId)}>
              <Download className="mr-2 h-4 w-4" />
              Download Assets
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Creative/DM actions for pending tasks
  if ((userRole === 'creative_team' || userRole === 'digital_marketer') && status === 'draft') {
    return (
      <div className="flex items-center gap-2" data-testid={`actions-creator-${taskId}`}>
        <Button
          size="sm"
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => handleAction(() => onSendForApproval?.(taskId))}
          disabled={isLoading}
          data-testid={`button-send-approval-${taskId}`}
        >
          <Send className="mr-2 h-4 w-4" />
          Send for Approval
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8" data-testid={`button-more-${taskId}`}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(taskId)} data-testid={`menu-edit-${taskId}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(taskId)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(taskId)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Default actions for all other cases
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8" data-testid={`button-more-${taskId}`}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails?.(taskId)} data-testid={`menu-view-${taskId}`}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        {(userRole === 'manager' || userRole === 'digital_marketer') && (
          <DropdownMenuItem onClick={() => onEdit?.(taskId)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Task
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onDuplicate?.(taskId)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownload?.(taskId)}>
          <Download className="mr-2 h-4 w-4" />
          Download Assets
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
