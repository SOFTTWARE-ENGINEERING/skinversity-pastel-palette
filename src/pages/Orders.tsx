import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchUserOrders } from "@/api/orders";
import { fetchProduct } from "@/api/products";
import type { OrderWithItems } from "@/types/order";
import type { Product } from "@/types/product";

const Orders = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      loadOrders();
    }
  }, [loading, user, navigate]);

  const loadOrders = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const { orders: userOrders, error } = await fetchUserOrders(user.id);
    
    if (error) {
      console.error("Failed to load orders:", error);
      return;
    }

    setOrders(userOrders);
    
    // Load product details for order items
    const productIds = new Set<string>();
    userOrders.forEach(order => {
      order.order_items.forEach(item => {
        productIds.add(item.product_id);
      });
    });

    const productMap: Record<string, Product> = {};
    for (const productId of productIds) {
      const product = await fetchProduct(productId);
      if (product) {
        productMap[productId] = product;
      }
    }
    
    setProducts(productMap);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || isLoading) {
    return (
      <main className="container mx-auto px-4 py-10">
        <div className="text-center">
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <Helmet>
        <title>My Orders | Skinversity</title>
        <meta name="description" content="View your order history and track order statuses at Skinversity." />
        <link rel="canonical" href="/orders" />
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Button variant="outline" onClick={() => navigate("/shop")}>
          Continue Shopping
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Start shopping to see your orders here
              </p>
              <Button onClick={() => navigate("/shop")}>
                Browse Products
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <span className="text-lg font-semibold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.order_items.map((item) => {
                    const product = products[item.product_id];
                    return (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <div className="flex items-center gap-3">
                          {product?.image && (
                            <img 
                              src={product.image} 
                              alt={product?.name || 'Product'} 
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium">{product?.name || `Product ${item.product_id}`}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default Orders;
