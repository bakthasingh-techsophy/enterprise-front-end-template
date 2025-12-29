import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-react';

export function Orders() {
  const orders = [
    { id: 1, orderId: 'ORD-001', customer: 'John Doe', amount: '$250.00', status: 'Completed', date: '2024-12-20' },
    { id: 2, orderId: 'ORD-002', customer: 'Jane Smith', amount: '$480.50', status: 'Processing', date: '2024-12-21' },
    { id: 3, orderId: 'ORD-003', customer: 'Bob Johnson', amount: '$125.00', status: 'Shipped', date: '2024-12-22' },
    { id: 4, orderId: 'ORD-004', customer: 'Alice Brown', amount: '$890.00', status: 'Processing', date: '2024-12-22' },
    { id: 5, orderId: 'ORD-005', customer: 'Charlie Wilson', amount: '$340.25', status: 'Completed', date: '2024-12-21' },
    { id: 6, orderId: 'ORD-006', customer: 'Diana Prince', amount: '$560.00', status: 'Pending', date: '2024-12-23' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage customer orders
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{order.orderId}</CardTitle>
                    <CardDescription>{order.customer} • {order.date}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    order.status === 'Completed' ? 'default' :
                    order.status === 'Shipped' ? 'secondary' :
                    order.status === 'Processing' ? 'outline' : 'destructive'
                  }>
                    {order.status}
                  </Badge>
                  <span className="font-semibold">{order.amount}</span>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
