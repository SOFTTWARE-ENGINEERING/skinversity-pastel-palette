import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-semibold text-xl">Skinversity</Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>Home</NavLink>
          <NavLink to="/shop" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>Shop</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>About</NavLink>
        </div>
        <div className="flex items-center gap-3">
          <NavLink to="/login" aria-label="Login" className="hover:text-primary transition-colors">
            <UserRound />
          </NavLink>
          <NavLink to="/cart" aria-label="Cart" className="relative hover:text-primary transition-colors">
            <ShoppingBag />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 text-xs rounded-full bg-primary text-primary-foreground px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
