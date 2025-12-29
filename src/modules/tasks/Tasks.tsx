import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ListTodo, Plus } from 'lucide-react';

export function Tasks() {
  const tasks = [
    { id: 1, title: 'Update documentation', priority: 'High', completed: false, dueDate: '2024-12-25' },
    { id: 2, title: 'Review pull requests', priority: 'Medium', completed: false, dueDate: '2024-12-23' },
    { id: 3, title: 'Fix bug in login flow', priority: 'High', completed: true, dueDate: '2024-12-22' },
    { id: 4, title: 'Prepare presentation', priority: 'Low', completed: false, dueDate: '2024-12-28' },
    { id: 5, title: 'Update dependencies', priority: 'Medium', completed: false, dueDate: '2024-12-24' },
    { id: 6, title: 'Write unit tests', priority: 'High', completed: false, dueDate: '2024-12-26' },
    { id: 7, title: 'Schedule team meeting', priority: 'Low', completed: true, dueDate: '2024-12-21' },
    { id: 8, title: 'Review design mockups', priority: 'Medium', completed: false, dueDate: '2024-12-27' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Track and manage your tasks
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <Card key={task.id} className={task.completed ? 'opacity-60' : ''}>
            <CardHeader className="py-4">
              <div className="flex items-center gap-4">
                <Checkbox checked={task.completed} />
                <ListTodo className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className={`text-base ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </CardTitle>
                    <CardDescription>Due: {task.dueDate}</CardDescription>
                  </div>
                  <Badge variant={
                    task.priority === 'High' ? 'destructive' :
                    task.priority === 'Medium' ? 'default' : 'secondary'
                  }>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
