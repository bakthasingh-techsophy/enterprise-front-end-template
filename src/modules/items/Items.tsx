import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Items() {
  const items = [
    { id: 1, name: 'Product Alpha', category: 'Electronics', status: 'Active', stock: 150 },
    { id: 2, name: 'Product Beta', category: 'Furniture', status: 'Active', stock: 45 },
    { id: 3, name: 'Product Gamma', category: 'Clothing', status: 'Low Stock', stock: 8 },
    { id: 4, name: 'Product Delta', category: 'Electronics', status: 'Active', stock: 230 },
    { id: 5, name: 'Product Epsilon', category: 'Books', status: 'Active', stock: 89 },
    { id: 6, name: 'Product Zeta', category: 'Sports', status: 'Out of Stock', stock: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Items</h2>
          <p className="text-muted-foreground">
            Manage your inventory items
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </div>
                </div>
                <Badge variant={item.status === 'Active' ? 'default' : item.status === 'Low Stock' ? 'secondary' : 'destructive'}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Stock: {item.stock} units</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
