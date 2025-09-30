import { LucideIcon, TrendingUp, TrendingDown, Clock, AlertCircle, Grid3x3, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedStatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  accentColor: 'orange' | 'blue' | 'purple' | 'emerald';
  onClick?: () => void;
}

const accentColors = {
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    text: 'text-orange-600 dark:text-orange-400',
    icon: 'text-orange-400/30 dark:text-orange-600/30',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-400/30 dark:text-blue-600/30',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-400/30 dark:text-purple-600/30',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'text-emerald-400/30 dark:text-emerald-600/30',
  },
};

export function EnhancedStatCard({
  title,
  value,
  trend,
  icon: Icon,
  accentColor,
  onClick,
}: EnhancedStatCardProps) {
  const colors = accentColors[accentColor];

  return (
    <Card 
      className={cn(
        "hover-elevate transition-all duration-200 cursor-pointer",
        onClick && "active-elevate-2"
      )}
      onClick={onClick}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-foreground mb-1" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </h3>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              )}>
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", colors.bg)}>
            <Icon className={cn("w-6 h-6", colors.text)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  pendingCount: number;
  inApprovalCount: number;
  openCount: number;
  completedCount: number;
  onStatClick?: (stat: string) => void;
}

export function StatsGrid({
  pendingCount,
  inApprovalCount,
  openCount,
  completedCount,
  onStatClick,
}: StatsGridProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <EnhancedStatCard
        title="Tasks Pending"
        value={pendingCount}
        trend={{ value: 15, isPositive: true }}
        icon={Clock}
        accentColor="orange"
        onClick={() => onStatClick?.('pending')}
      />
      <EnhancedStatCard
        title="In Approval"
        value={inApprovalCount}
        trend={{ value: 22, isPositive: true }}
        icon={AlertCircle}
        accentColor="blue"
        onClick={() => onStatClick?.('in_approval')}
      />
      <EnhancedStatCard
        title="Open Tasks"
        value={formatNumber(openCount)}
        trend={{ value: 8, isPositive: true }}
        icon={Grid3x3}
        accentColor="purple"
        onClick={() => onStatClick?.('open')}
      />
      <EnhancedStatCard
        title="Completed"
        value={completedCount}
        trend={{ value: 12, isPositive: true }}
        icon={CheckCircle2}
        accentColor="emerald"
        onClick={() => onStatClick?.('completed')}
      />
    </div>
  );
}
