import { Card } from '@/components/ui/card';

interface TaskStatsProps {
  stats: {
    pending: number;
    inApproval: number;
    openTasks: string;
    completed: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 bg-slate-900 border-slate-800 text-white">
        <div className="space-y-2">
          <div className="text-xs text-slate-400">Tasks Pending</div>
          <div className="text-2xl font-bold">{stats.pending}</div>
          <div className="text-xs text-green-400">+ 150%</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-slate-900 border-slate-800 text-white">
        <div className="space-y-2">
          <div className="text-xs text-slate-400">In Approval</div>
          <div className="text-2xl font-bold">{stats.inApproval}</div>
          <div className="text-xs text-green-400">+ 150%</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-slate-900 border-slate-800 text-white">
        <div className="space-y-2">
          <div className="text-xs text-slate-400">Open Tasks</div>
          <div className="text-2xl font-bold">{stats.openTasks}</div>
          <div className="text-xs text-green-400">+ 150%</div>
        </div>
      </Card>
      
      <Card className="p-4 bg-slate-900 border-slate-800 text-white">
        <div className="space-y-2">
          <div className="text-xs text-slate-400">Completed Tasks</div>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <div className="text-xs text-green-400">+ 150%</div>
        </div>
      </Card>
    </div>
  );
};