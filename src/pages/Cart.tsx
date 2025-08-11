import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/products/QuantitySelector";
import { Button } from "@/components/ui/button";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Your Cart | Skinversity</title>
        <meta name="description" content="Review your Skinversity cart and proceed to secure checkout." />
        <link rel="canonical" href="/cart" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link to="/shop" className="inline-flex"><Button>Continue Shopping</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 border rounded-lg p-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <QuantitySelector value={quantity} onChange={(v)=>updateQuantity(product.id, v)} />
                    <span className="font-semibold">{formatter.format(product.price * quantity)}</span>
                  </div>
                </div>
                <Button variant="ghost" onClick={()=>removeFromCart(product.id)}>Remove</Button>
              </div>
            ))}
          </section>
          <aside className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex items-center justify-between mb-6">
              <span>Subtotal</span>
              <span className="font-semibold">{formatter.format(totalPrice)}</span>
            </div>
            <Link to="/checkout" className="w-full inline-flex"><Button className="w-full" size="lg">Checkout</Button></Link>
            <p className="text-xs text-muted-foreground mt-3">Taxes and shipping calculated at checkout.</p>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
