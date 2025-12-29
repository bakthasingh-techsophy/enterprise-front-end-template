import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Messages() {
  const conversations = [
    { id: 1, name: 'John Doe', message: 'Thanks for the update!', time: '2m ago', unread: 2 },
    { id: 2, name: 'Jane Smith', message: 'Can you review this?', time: '15m ago', unread: 0 },
    { id: 3, name: 'Bob Johnson', message: 'Meeting at 3 PM', time: '1h ago', unread: 1 },
    { id: 4, name: 'Alice Brown', message: 'Project looks great', time: '2h ago', unread: 0 },
    { id: 5, name: 'Team Channel', message: 'New announcement', time: '3h ago', unread: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Chat and communicate with your team
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent chats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
              >
                <Avatar>
                  <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm truncate">{conv.name}</p>
                    {conv.unread > 0 && (
                      <Badge variant="default" className="h-5 min-w-5 px-1.5">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.message}</p>
                </div>
                <span className="text-xs text-muted-foreground">{conv.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">John Doe</CardTitle>
                <CardDescription>Active now</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[300px] border rounded-lg p-4 space-y-4 overflow-y-auto">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">Hi! How's the project going?</p>
                  <span className="text-xs text-muted-foreground">10:30 AM</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">Going well! Almost done with the implementation.</p>
                  <span className="text-xs opacity-70">10:32 AM</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type a message..." />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
