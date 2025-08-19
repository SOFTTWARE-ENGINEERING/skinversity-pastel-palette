import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRound, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-semibold text-xl">Skinversity</Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>Home</NavLink>
          <NavLink to="/shop" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>Shop</NavLink>
          {user && (
            <NavLink to="/orders" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>Orders</NavLink>
          )}
          <NavLink to="/posts" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>Posts</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive ? "text-primary" : "hover:text-primary transition-colors"}>About</NavLink>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/admin" className="hover:text-primary transition-colors text-sm">
                Admin
              </NavLink>
              <button onClick={signOut} aria-label="Logout" className="hover:text-primary transition-colors flex items-center gap-1 text-sm">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" aria-label="Login" className="hover:text-primary transition-colors">
              <UserRound />
            </NavLink>
          )}
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
