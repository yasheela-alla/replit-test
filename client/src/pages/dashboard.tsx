import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  DollarSign,
  Calendar,
  Plus,
  ArrowUpRight,
  Instagram,
  Facebook,
  Youtube
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'manager' | 'creative_team' | 'digital_marketer';
  };
  onLogout: () => void;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  // Sample data for charts - in production, this would come from API
  const engagementData = [
    { month: 'Apr', instagram: 28400, facebook: 24500, youtube: 12300 },
    { month: 'May', instagram: 31200, facebook: 27800, youtube: 14200 },
    { month: 'Jun', instagram: 35600, facebook: 31200, youtube: 16500 },
    { month: 'Jul', instagram: 38900, facebook: 33400, youtube: 18900 },
    { month: 'Aug', instagram: 42500, facebook: 36200, youtube: 21300 },
    { month: 'Sep', instagram: 45800, facebook: 38700, youtube: 23100 },
  ];

  const platformData = [
    { name: 'Instagram', value: 45.8, color: '#E4405F' },
    { name: 'Facebook', value: 38.7, color: '#1877F2' },
    { name: 'YouTube', value: 23.1, color: '#FF0000' },
  ];

  const recentCampaigns = [
    { name: 'Diwali Collection Launch', status: 'active', platform: 'Instagram', reach: '125K', engagement: '8.3%' },
    { name: 'Wedding Season Showcase', status: 'active', platform: 'Facebook', reach: '210K', engagement: '7.2%' },
    { name: 'Store Opening Promotion', status: 'active', platform: 'YouTube', reach: '85K', engagement: '6.4%' },
    { name: 'Festive Collection Teaser', status: 'scheduled', platform: 'Instagram', reach: '0', engagement: '-' },
  ];

  const contentPerformance = [
    { type: 'Video', posts: 24, engagement: 12500, conversion: '4.2%' },
    { type: 'Image', posts: 156, engagement: 28400, conversion: '3.8%' },
    { type: 'Carousel', posts: 48, engagement: 18200, conversion: '5.1%' },
    { type: 'Text', posts: 32, engagement: 8900, conversion: '2.4%' },
  ];

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    trend, 
    icon: Icon, 
    description 
  }: { 
    title: string; 
    value: string; 
    change: string; 
    trend: 'up' | 'down'; 
    icon: any; 
    description: string;
  }) => (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</div>
        <div className="flex items-center space-x-2 mt-1">
          <Badge variant={trend === 'up' ? 'default' : 'destructive'} className="flex items-center space-x-1">
            {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{change}</span>
          </Badge>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-dashboard-title">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user.name}! Here's your social media performance overview.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" data-testid="button-schedule-content">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Content
          </Button>
          <Button data-testid="button-create-campaign">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Reach"
          value="420K"
          change="+12.5%"
          trend="up"
          icon={Users}
          description="vs last month"
        />
        <MetricCard
          title="Impressions"
          value="1.1M"
          change="+18.2%"
          trend="up"
          icon={Eye}
          description="vs last month"
        />
        <MetricCard
          title="Engagement"
          value="83.2K"
          change="+8.4%"
          trend="up"
          icon={Heart}
          description="vs last month"
        />
        <MetricCard
          title="ROI"
          value="3.8x"
          change="+0.6x"
          trend="up"
          icon={DollarSign}
          description="vs last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Engagement Trend */}
        <Card className="col-span-1" data-testid="card-engagement-trend">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Last 6 months platform performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} name="Instagram" />
                <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} name="Facebook" />
                <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} name="YouTube" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="col-span-1" data-testid="card-platform-distribution">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Engagement by platform (in thousands)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}K`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance & Recent Campaigns */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Content Performance */}
        <Card data-testid="card-content-performance">
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Performance by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={contentPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="type" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="engagement" fill="hsl(var(--primary))" name="Engagement" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Campaigns */}
        <Card data-testid="card-recent-campaigns">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Your current running campaigns</CardDescription>
            </div>
            <Button variant="ghost" size="sm" data-testid="button-view-all-campaigns">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  data-testid={`campaign-item-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    {getPlatformIcon(campaign.platform)}
                    <div>
                      <p className="font-medium text-sm">{campaign.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={campaign.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {campaign.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{campaign.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{campaign.reach}</p>
                    <p className="text-xs text-muted-foreground">{campaign.engagement} eng.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
