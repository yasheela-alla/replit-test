import { useState } from 'react';
import { Check, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          size="sm"
          variant="outline"
          className="h-8 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900 dark:hover:bg-emerald-950/50"
          onClick={() => handleAction(() => onApprove?.(taskId))}
          disabled={isLoading}
          data-testid={`button-approve-${taskId}`}
        >
          <Check className="h-4 w-4 mr-1" />
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950/50"
          onClick={() => handleAction(() => onReject?.(taskId))}
          disabled={isLoading}
          data-testid={`button-reject-${taskId}`}
        >
          <X className="h-4 w-4 mr-1" />
          Reject
        </Button>
      </div>
    );
  }

  // Creative/DM actions for draft tasks
  if ((userRole === 'creative_team' || userRole === 'digital_marketer') && status === 'draft') {
    return (
      <div className="flex items-center gap-2" data-testid={`actions-creator-${taskId}`}>
        <Button
          size="sm"
          className="h-8 bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => handleAction(() => onSendForApproval?.(taskId))}
          disabled={isLoading}
          data-testid={`button-send-approval-${taskId}`}
        >
          <Send className="mr-1 h-4 w-4" />
          Send for Approval
        </Button>
      </div>
    );
  }

  // Default for completed, approved, rejected tasks - no actions needed
  return (
    <span className="text-xs text-muted-foreground" data-testid={`text-no-actions-${taskId}`}>
      No actions
    </span>
  );
}
