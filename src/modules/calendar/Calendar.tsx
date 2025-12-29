import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';

export function Calendar() {
  const events = [
    { id: 1, title: 'Team Meeting', date: '2024-12-23', time: '10:00 AM', type: 'Meeting' },
    { id: 2, title: 'Product Launch', date: '2024-12-25', time: '2:00 PM', type: 'Event' },
    { id: 3, title: 'Client Call', date: '2024-12-23', time: '3:30 PM', type: 'Call' },
    { id: 4, title: 'Code Review', date: '2024-12-24', time: '11:00 AM', type: 'Meeting' },
    { id: 5, title: 'Design Workshop', date: '2024-12-26', time: '9:00 AM', type: 'Workshop' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">
            Schedule and manage your events
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled events and meetings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate">{event.title}</p>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{event.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Monthly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground border rounded-lg">
              Calendar grid will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
