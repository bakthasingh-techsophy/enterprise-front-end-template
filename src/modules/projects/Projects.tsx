import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function Projects() {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 65, team: 5 },
    { id: 2, name: 'Mobile App Development', status: 'In Progress', progress: 40, team: 8 },
    { id: 3, name: 'Marketing Campaign', status: 'Planning', progress: 15, team: 3 },
    { id: 4, name: 'API Integration', status: 'In Progress', progress: 80, team: 4 },
    { id: 5, name: 'Database Migration', status: 'Completed', progress: 100, team: 2 },
    { id: 6, name: 'Security Audit', status: 'Planning', progress: 10, team: 6 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and track your projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Users className="h-3 w-3" />
                      {project.team} members
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={
                  project.status === 'Completed' ? 'default' :
                  project.status === 'In Progress' ? 'secondary' : 'outline'
                }>
                  {project.status}
                </Badge>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
