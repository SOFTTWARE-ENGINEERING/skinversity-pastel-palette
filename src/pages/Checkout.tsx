import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { createOrder, updateOrderStatus } from "@/api/orders";
import { supabase } from "@/integrations/supabase/client";
import { usePaystackPayment } from "react-paystack";

interface FormValues {
  name: string;
  email: string;
  address: string;
  phone: string;
}


const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentData, setPaymentData] = useState<FormValues | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Paystack configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: paymentData?.email || user?.email || "",
    amount: totalPrice * 100, // Paystack expects amount in kobo (smallest currency unit)
    publicKey: import.meta.env.VITE_REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_your_actual_key_here",
    currency: "NGN",
    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    label: "Skinversity Order",
    metadata: {
      custom_fields: [
        {
          display_name: "Order ID",
          variable_name: "order_id",
          value: orderId || ""
        },
        {
          display_name: "Customer Name",
          variable_name: "customer_name", 
          value: paymentData?.name || ""
        },
        {
          display_name: "Items",
          variable_name: "items",
          value: items.map(item => `${item.product.name} x${item.quantity}`).join(", ")
        }
      ]
    }
  };

  // Payment success handler
  const onSuccess = async (reference: any) => {
    try {
      // Update order status to 'paid'
      if (orderId) {
        const { success, error } = await updateOrderStatus(orderId, 'paid');
        if (success) {
          toast({ 
            title: "Payment Successful!", 
            description: `Transaction reference: ${reference.reference}` 
          });
          
          // Clear cart and show success
          clearCart();
          
          // Notify via Edge Function
          await supabase.functions.invoke("notify-order", {
            body: { 
              orderId: orderId, 
              paymentRef: reference.reference,
              status: 'paid',
              amount: totalPrice 
            },
          });
        } else {
          toast({ 
            title: "Payment successful but order update failed", 
            description: error || "Please contact support", 
            variant: "destructive" 
          });
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({ 
        title: "Payment successful but order update failed", 
        description: "Please contact support", 
        variant: "destructive" 
      });
    }
  };

  // Payment close handler
  const onClose = () => {
    toast({ 
      title: "Payment cancelled", 
      description: "You can try again or contact support if you need help" 
    });
  };

  // Paystack payment hook
  const initializePayment = usePaystackPayment({
    ...config,
    onSuccess,
    onClose
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({ title: "Authentication required", description: "Please log in to complete your order", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create order in database first
      const { order, error } = await createOrder(user.id, items, totalPrice);
      
      if (error || !order) {
        toast({ title: "Order creation failed", description: error || "Please try again", variant: "destructive" });
        return;
      }

      // Store payment data and order ID for Paystack
      setPaymentData(data);
      setOrderId(order.id);
      
      // Initialize Paystack payment
      initializePayment();
      
    } catch (error) {
      toast({ title: "Checkout failed", description: "Please try again", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to shop if cart is empty and no order has been placed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (items.length === 0 && !orderId) navigate("/shop");
  }, [items.length, orderId]);

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Checkout | Skinversity</title>
        <meta name="description" content="Secure Paystack checkout at Skinversity. Enter your details to complete your order." />
        <link rel="canonical" href="/checkout" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {orderId ? (
        <section className="max-w-xl border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
          <p className="text-muted-foreground mb-6">Your order has been placed successfully.</p>
          <div className="rounded-md bg-secondary/50 p-4 mb-6">
            <p className="text-sm">Order confirmation</p>
            <p className="font-mono text-lg">#{orderId}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={()=>navigate("/orders")}>View Order</Button>
            <Button variant="outline" onClick={()=>navigate("/shop")}>Continue Shopping</Button>
          </div>
        </section>
      ) : (
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handleSubmit(onSubmit)}>
          <section className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-sm">Full name</label>
              <Input {...register("name", { required: true, minLength: 2 })} />
              {errors.name && <p className="text-sm text-destructive mt-1">Please enter your name</p>}
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input type="email" {...register("email", { required: true })} />
              {errors.email && <p className="text-sm text-destructive mt-1">Valid email required</p>}
            </div>
            <div>
              <label className="text-sm">Address</label>
              <Input {...register("address", { required: true, minLength: 5 })} />
              {errors.address && <p className="text-sm text-destructive mt-1">Please enter your address</p>}
            </div>
            <div>
              <label className="text-sm">Phone number (optional)</label>
              <Input inputMode="tel" placeholder="e.g. +234700000000" {...register("phone", { required: false, minLength: 7 })} />
              <p className="text-xs text-muted-foreground mt-1">For order updates and delivery</p>
            </div>
                         <Button type="submit" size="lg" disabled={isSubmitting}>
               {isSubmitting ? "Processing..." : `Pay with Paystack - ${new Intl.NumberFormat("en-US", { style: "currency", currency: "NGN" }).format(totalPrice)}`}
             </Button>
          </section>
          <aside className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                         <div className="flex items-center justify-between mb-6">
               <span>Total</span>
               <span className="font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "NGN" }).format(totalPrice)}</span>
             </div>
            <p className="text-xs text-muted-foreground">Secure payment powered by Paystack. Multiple payment options available.</p>
          </aside>
        </form>
      )}
    </main>
  );
};

export default Checkout;
