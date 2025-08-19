import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, Eye, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateOrderStatus } from "@/api/orders";
import type { OrderWithItems, OrderStatus } from "@/types/order";
import type { Product } from "@/types/product";

// Mock data for admin orders (in production, you'd fetch all orders)
const mockOrders: OrderWithItems[] = [
  {
    id: "order-1",
    user_id: "user-1",
    total: 45.50,
    status: "pending",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    order_items: [
      { id: "item-1", order_id: "order-1", product_id: "p1", quantity: 2, price: 14.00, created_at: "2024-01-15T10:30:00Z" },
      { id: "item-2", order_id: "order-1", product_id: "p5", quantity: 1, price: 17.50, created_at: "2024-01-15T10:30:00Z" }
    ]
  },
  {
    id: "order-2",
    user_id: "user-2",
    total: 32.00,
    status: "paid",
    created_at: "2024-01-14T15:45:00Z",
    updated_at: "2024-01-14T16:20:00Z",
    order_items: [
      { id: "item-3", order_id: "order-2", product_id: "p9", quantity: 1, price: 20.00, created_at: "2024-01-14T15:45:00Z" },
      { id: "item-4", order_id: "order-2", product_id: "p3", quantity: 1, price: 12.00, created_at: "2024-01-14T15:45:00Z" }
    ]
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      // In production, you'd call an API to fetch all orders
      // For now, we'll use mock data
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load orders", variant: "destructive" });
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { success, error } = await updateOrderStatus(orderId, newStatus);
      
      if (success) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
            : order
        ));
        toast({ title: "Success", description: "Order status updated successfully" });
      } else {
        toast({ title: "Error", description: error || "Failed to update order status", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update order status", variant: "destructive" });
    }
  };

  const viewOrderDetails = (order: OrderWithItems) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusOptions = (currentStatus: OrderStatus): OrderStatus[] => {
    switch (currentStatus) {
      case 'pending': return ['paid', 'cancelled'];
      case 'paid': return ['shipped', 'cancelled'];
      case 'shipped': return ['delivered'];
      case 'delivered': return [];
      case 'cancelled': return [];
      default: return [];
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Orders | Admin | Skinversity</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Total: {orders.length} orders
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                Orders will appear here once customers start shopping
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        #{order.id.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">User {order.user_id.slice(0, 8)}</p>
                          <p className="text-muted-foreground">
                            {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.order_items.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <Package className="h-3 w-3 text-muted-foreground" />
                              <span>
                                {item.quantity}× Product {item.product_id}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          {getStatusOptions(order.status).length > 0 && (
                            <Select
                              value={order.status}
                              onValueChange={(value: OrderStatus) => handleStatusUpdate(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {getStatusOptions(order.status).map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Order Details #{selectedOrder?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Order ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {selectedOrder.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Customer ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {selectedOrder.user_id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-sm text-muted-foreground">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedOrder.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedOrder.updated_at)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.order_items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Product {item.product_id}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="font-semibold mb-3">Update Status</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Current:</span>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                  {getStatusOptions(selectedOrder.status).length > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground">→</span>
                      <Select
                        onValueChange={(value: OrderStatus) => {
                          handleStatusUpdate(selectedOrder.id, value);
                          setIsOrderDetailOpen(false);
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                          {getStatusOptions(selectedOrder.status).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
