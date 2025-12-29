import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Team() {
  const members = [
    { id: 1, name: 'John Doe', role: 'Team Lead', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Developer', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', role: 'Designer', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', role: 'Developer', email: 'alice@example.com', status: 'Away' },
    { id: 5, name: 'Charlie Wilson', role: 'Product Manager', email: 'charlie@example.com', status: 'Active' },
    { id: 6, name: 'Diana Prince', role: 'QA Engineer', email: 'diana@example.com', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">
            Manage your team members
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base truncate">{member.name}</CardTitle>
                    <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate">{member.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
