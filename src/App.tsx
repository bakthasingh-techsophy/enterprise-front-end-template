import { MainLayout } from "./components/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function App() {
  const techStack = [
    "React 18",
    "Vite",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Frontend Template
          </h1>
          <p className="text-muted-foreground">
            A minimal, production-ready template for modern web applications
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>Built with modern technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Out of the box capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Dark/Light theme support</li>
                <li>Responsive layout</li>
                <li>Type-safe development</li>
                <li>Component library</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ready to Use</CardTitle>
              <CardDescription>Start building immediately</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All dependencies installed and configured. Just start coding
                your application logic.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              This template includes everything you need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              The project is pre-configured with React, Vite, TypeScript,
              Tailwind CSS, and the complete shadcn/ui component library.
            </p>
            <p className="text-sm text-muted-foreground">
              Replace this content with your application and maintain the same
              structure and conventions for consistency across projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default App;
