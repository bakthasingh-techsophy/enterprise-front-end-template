import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle2, XCircle } from 'lucide-react';

export function Integrations() {
  const integrations = [
    { id: 1, name: 'Slack', description: 'Team communication platform', connected: true, icon: '💬' },
    { id: 2, name: 'GitHub', description: 'Code repository hosting', connected: true, icon: '🐙' },
    { id: 3, name: 'Google Drive', description: 'Cloud storage solution', connected: false, icon: '📁' },
    { id: 4, name: 'Stripe', description: 'Payment processing', connected: true, icon: '💳' },
    { id: 5, name: 'Mailchimp', description: 'Email marketing platform', connected: false, icon: '✉️' },
    { id: 6, name: 'Zoom', description: 'Video conferencing', connected: true, icon: '🎥' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Connect with your favorite tools
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={integration.connected ? 'default' : 'secondary'}>
                  {integration.connected ? (
                    <><CheckCircle2 className="mr-1 h-3 w-3" /> Connected</>
                  ) : (
                    <><XCircle className="mr-1 h-3 w-3" /> Not Connected</>
                  )}
                </Badge>
                <Button variant="outline" size="sm">
                  {integration.connected ? 'Configure' : 'Connect'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
