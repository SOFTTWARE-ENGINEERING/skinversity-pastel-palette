import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { fetchProducts } from "@/api/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Shop = () => {
  const [all, setAll] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    fetchProducts().then((p) => { setAll(p); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return all.filter((p) => {
      const matchCat = category === "all" || p.category === category;
      const matchQuery = (p.name + " " + p.description).toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [all, query, category]);

  return (
    <main className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Shop Skincare | Skinversity</title>
        <meta name="description" content="Browse cleansers, moisturizers, and sunscreens at Skinversity. Pastel, modern skincare with fast shipping." />
        <link rel="canonical" href="/shop" />
      </Helmet>

      <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Shop</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex-1 sm:flex-none">
            <Input placeholder="Search products..." value={query} onChange={(e)=>setQuery(e.target.value)} />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-56"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cleansers">Cleansers</SelectItem>
              <SelectItem value="moisturizers">Moisturizers</SelectItem>
              <SelectItem value="sunscreens">Sunscreens</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {loading ? (
        <p className="text-muted-foreground">Loading products...</p>
      ) : (
        <section aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Shop;
