import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Inbox as InboxIcon, Star, Archive, Trash2 } from 'lucide-react';

export function Inbox() {
  const messages = [
    { id: 1, from: 'John Doe', subject: 'Project Update', preview: 'Here is the latest update on the project...', time: '10:30 AM', unread: true, starred: true },
    { id: 2, from: 'Jane Smith', subject: 'Meeting Tomorrow', preview: 'Don\'t forget about our meeting tomorrow...', time: '9:15 AM', unread: true, starred: false },
    { id: 3, from: 'System', subject: 'Weekly Report', preview: 'Your weekly analytics report is ready...', time: 'Yesterday', unread: false, starred: false },
    { id: 4, from: 'Bob Johnson', subject: 'Design Review', preview: 'I\'ve reviewed the designs and have some feedback...', time: 'Yesterday', unread: false, starred: true },
    { id: 5, from: 'Alice Brown', subject: 'Bug Report', preview: 'Found an issue in the login flow...', time: '2 days ago', unread: false, starred: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">
            Your messages and notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        {messages.map((message) => (
          <Card key={message.id} className={message.unread ? 'border-primary/50' : ''}>
            <CardHeader className="py-4">
              <div className="flex items-start gap-3">
                <InboxIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className={`text-base truncate ${message.unread ? 'font-semibold' : 'font-normal'}`}>
                      {message.subject}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {message.unread && (
                        <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{message.time}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className={`h-4 w-4 ${message.starred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-medium">{message.from}</span>
                    <span>•</span>
                    <span className="truncate">{message.preview}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
