import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter } from 'lucide-react';

export function Reports() {
  const reports = [
    { id: 1, name: 'Monthly Sales Report', date: '2024-12-01', size: '2.4 MB' },
    { id: 2, name: 'Quarterly Analytics', date: '2024-11-15', size: '5.1 MB' },
    { id: 3, name: 'Annual Summary', date: '2024-10-01', size: '8.3 MB' },
    { id: 4, name: 'Customer Insights', date: '2024-09-20', size: '3.7 MB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and download reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{report.name}</CardTitle>
                    <CardDescription>{report.date}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">File size: {report.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
