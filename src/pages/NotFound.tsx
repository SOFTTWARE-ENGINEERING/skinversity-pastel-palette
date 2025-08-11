import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
