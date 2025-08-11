import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchProduct } from "@/api/products";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/products/QuantitySelector";
import Rating from "@/components/products/Rating";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    fetchProduct(id).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-muted-foreground">Loading product...</p>
      </main>
    );
  }

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: 120,
    },
  };

  return (
    <main className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <Helmet>
        <title>{product.name} | Skinversity</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`/product/${product.id}`} />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>

      <section>
        <img src={product.image} alt={`${product.name} large image`} className="w-full rounded-lg object-cover" />
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <Rating value={product.rating} />
          <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)} / 5</span>
        </div>
        <p className="text-lg font-semibold mb-6">{formatter.format(product.price)}</p>
        <p className="text-muted-foreground mb-6">{product.description}</p>
        <div className="flex items-center gap-4">
          <QuantitySelector value={qty} onChange={setQty} />
          <Button size="lg" onClick={() => { addToCart(product, qty); toast({ title: "Added to cart", description: `${product.name} x${qty}` }); }}>
            Add to Cart
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
