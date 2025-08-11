const Footer = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Skinversity. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
