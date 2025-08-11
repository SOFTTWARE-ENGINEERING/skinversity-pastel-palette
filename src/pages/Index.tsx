import { Helmet } from "react-helmet-async";
import hero from "@/assets/hero-skinversity.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/api/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import GlowAura from "@/components/GlowAura";

const Index = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  useEffect(() => { fetchProducts().then(p => setFeatured(p.slice(0,6))); }, []);

  return (
    <>
      <Helmet>
        <title>Skinversity – Modern Pastel Skincare</title>
        <meta name="description" content="Discover gentle, effective skincare in a modern pastel palette. Shop cleansers, moisturizers, and sunscreens at Skinversity." />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Skinversity – Modern Pastel Skincare" />
        <meta property="og:description" content="Discover gentle, effective skincare in a modern pastel palette." />
      </Helmet>

      <header className="relative overflow-hidden">
        <div className="bg-hero">
          <div className="container mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Glow made simple.</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-prose">Gentle, effective formulas for every skin story — in soft, joyful pastels.</p>
              <div className="mt-8 flex items-center gap-4">
                <Link to="/shop" className="inline-flex"><Button size="lg" variant="hero">Shop now</Button></Link>
                <Link to="/about" className="inline-flex"><Button size="lg" variant="outline">About us</Button></Link>
              </div>
            </div>
            <div className="relative">
              <img src={hero} alt="Skinversity pastel skincare hero" className="w-full rounded-xl shadow-xl" loading="eager" />
            </div>
          </div>
        </div>
        <GlowAura />
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Featured products</h2>
          <p className="text-muted-foreground">Handpicked favorites loved by our community</p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p)=> (<ProductCard key={p.id} product={p} />))}
        </section>
        <div className="text-center mt-10">
          <Link to="/shop" className="inline-flex"><Button size="lg">Explore the shop</Button></Link>
        </div>
      </main>
    </>
  );
};

export default Index;
