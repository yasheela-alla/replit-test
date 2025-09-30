import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';

interface ContentPlannerProps {
  user: {
    name: string;
    email: string;
    role: 'manager' | 'creative_team' | 'digital_marketer';
  };
}

export default function ContentPlanner({ user }: ContentPlannerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const scheduledContent = [
    {
      id: 1,
      title: 'Diwali Collection Launch',
      date: '2025-02-05',
      platform: 'Instagram',
      status: 'Scheduled',
      type: 'Video',
    },
    {
      id: 2,
      title: 'Wedding Collection Showcase',
      date: '2025-02-08',
      platform: 'YouTube',
      status: 'Scheduled',
      type: 'Video',
    },
    {
      id: 3,
      title: 'Behind The Scenes',
      date: '2025-02-10',
      platform: 'Instagram',
      status: 'Draft',
      type: 'Carousel',
    },
    {
      id: 4,
      title: 'New Store Opening',
      date: '2025-02-12',
      platform: 'Facebook',
      status: 'Approved',
      type: 'Image',
    },
  ];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getContentForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledContent.filter(content => content.date === dateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            Content Planner
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Schedule and manage your content calendar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-filter">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" data-testid="button-add-content">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Content
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        {['month', 'week', 'day'].map((v) => (
          <Button
            key={v}
            variant={view === v ? "default" : "outline"}
            size="sm"
            onClick={() => setView(v as typeof view)}
            className="capitalize"
            data-testid={`button-view-${v}`}
          >
            {v}
          </Button>
        ))}
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateMonth('prev')}
                data-testid="button-prev-month"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                data-testid="button-today"
              >
                Today
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateMonth('next')}
                data-testid="button-next-month"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
            {getDaysInMonth().map((day, index) => {
              const content = day ? getContentForDate(day) : [];
              return (
                <div
                  key={index}
                  className={`min-h-24 border rounded-md p-2 ${
                    day ? 'bg-card hover-elevate cursor-pointer' : 'bg-muted/30'
                  }`}
                  data-testid={day ? `cell-day-${day}` : `cell-empty-${index}`}
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium mb-1">{day}</div>
                      <div className="space-y-1">
                        {content.map(item => (
                          <Badge
                            key={item.id}
                            variant="secondary"
                            className="w-full text-xs truncate"
                            data-testid={`badge-content-${item.id}`}
                          >
                            {item.title}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Content */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledContent.map(content => (
              <div
                key={content.id}
                className="flex items-center justify-between p-3 border rounded-md hover-elevate"
                data-testid={`card-content-${content.id}`}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium" data-testid={`text-content-title-${content.id}`}>
                      {content.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{content.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{content.platform}</Badge>
                  <Badge variant="secondary">{content.type}</Badge>
                  <Badge 
                    variant={
                      content.status === 'Scheduled' ? 'default' :
                      content.status === 'Approved' ? 'default' : 'secondary'
                    }
                  >
                    {content.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
