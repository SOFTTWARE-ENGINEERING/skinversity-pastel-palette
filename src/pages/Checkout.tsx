import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface FormValues {
  name: string;
  email: string;
  address: string;
  card: string;
  expiry: string;
  cvc: string;
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [orderId, setOrderId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const id = Math.random().toString(36).slice(2, 10).toUpperCase();
    setOrderId(id);
    clearCart();
    toast({ title: "Order placed", description: `Confirmation #${id}` });
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
        <meta name="description" content="Secure checkout at Skinversity. Enter your details to complete your order." />
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
            <Button onClick={()=>navigate("/")}>Back Home</Button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm">Card number</label>
                <Input inputMode="numeric" placeholder="4242 4242 4242 4242" {...register("card", { required: true, minLength: 12 })} />
                {errors.card && <p className="text-sm text-destructive mt-1">Card number required</p>}
              </div>
              <div>
                <label className="text-sm">Expiry</label>
                <Input placeholder="MM/YY" {...register("expiry", { required: true })} />
              </div>
              <div>
                <label className="text-sm">CVC</label>
                <Input inputMode="numeric" placeholder="123" {...register("cvc", { required: true, minLength: 3 })} />
              </div>
            </div>
            <Button type="submit" size="lg">Pay {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalPrice)}</Button>
          </section>
          <aside className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex items-center justify-between mb-6">
              <span>Total</span>
              <span className="font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">This is a demo checkout. Do not enter real card data.</p>
          </aside>
        </form>
      )}
    </main>
  );
};

export default Checkout;
