import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Rating from "./Rating";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

type Props = { product: Product };

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  return (
    <Card className="overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={`${product.name} product image`}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium leading-tight">{product.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
          </div>
          <span className="font-semibold">{formatter.format(product.price)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Rating value={product.rating} />
          <Button size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
