import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, TrendingUp, Eye, Heart, Share2, 
  Calendar, Download, SlidersHorizontal 
} from 'lucide-react';
import { 
  SiFacebook, SiInstagram, SiYoutube, 
  SiX, SiLinkedin 
} from 'react-icons/si';

interface SocialTrackerProps {
  user: {
    name: string;
    email: string;
    role: 'manager' | 'creative_team' | 'digital_marketer';
  };
}

export default function SocialTracker({ user }: SocialTrackerProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: BarChart3 },
    { id: 'youtube', name: 'YouTube', icon: SiYoutube },
    { id: 'instagram', name: 'Instagram', icon: SiInstagram },
    { id: 'facebook', name: 'Facebook', icon: SiFacebook },
    { id: 'twitter', name: 'Twitter', icon: SiX },
    { id: 'linkedin', name: 'LinkedIn', icon: SiLinkedin },
  ];

  const stats = [
    { title: 'Total Posts', value: '2.4K', change: '+15%', icon: BarChart3 },
    { title: 'Total Reach', value: '1.2M', change: '+22%', icon: Eye },
    { title: 'Total Impressions', value: '3.8M', change: '+18%', icon: TrendingUp },
    { title: 'Total Engagement', value: '145K', change: '+12%', icon: Heart },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Diwali Collection Launch',
      platform: 'Instagram',
      date: '2025-01-25',
      reach: '45.2K',
      impressions: '125K',
      engagement: '8.9K',
      type: 'Video',
    },
    {
      id: 2,
      title: 'Wedding Collection Showcase',
      platform: 'YouTube',
      date: '2025-01-24',
      reach: '32.1K',
      impressions: '98K',
      engagement: '5.2K',
      type: 'Video',
    },
    {
      id: 3,
      title: 'New Store Opening',
      platform: 'Facebook',
      date: '2025-01-23',
      reach: '28.5K',
      impressions: '75K',
      engagement: '4.1K',
      type: 'Image',
    },
    {
      id: 4,
      title: 'Behind The Scenes',
      platform: 'Instagram',
      date: '2025-01-22',
      reach: '21.3K',
      impressions: '62K',
      engagement: '3.8K',
      type: 'Carousel',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            Social Media Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor performance across all platforms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-date-range">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <Button
              key={platform.id}
              variant={selectedPlatform === platform.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPlatform(platform.id)}
              className="toggle-elevate"
              data-testid={`button-platform-${platform.id}`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {platform.name}
            </Button>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} data-testid={`card-stat-${index}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Recent Posts</CardTitle>
          <Button variant="outline" size="sm" data-testid="button-filters">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Post Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Platform
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Reach
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Impressions
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Engagement
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post, index) => (
                  <tr 
                    key={post.id} 
                    className="border-b hover-elevate cursor-pointer"
                    data-testid={`row-post-${post.id}`}
                  >
                    <td className="py-3 px-4 font-medium" data-testid={`text-post-title-${post.id}`}>
                      {post.title}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" data-testid={`badge-platform-${post.id}`}>
                        {post.platform}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {post.date}
                    </td>
                    <td className="py-3 px-4 text-sm">{post.reach}</td>
                    <td className="py-3 px-4 text-sm">{post.impressions}</td>
                    <td className="py-3 px-4 text-sm">{post.engagement}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{post.type}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
