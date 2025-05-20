
import React from "react";
import { useLocation, Link } from "react-router-dom";
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
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-16">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-8xl font-bold text-brand-navy">404</span>
          <div className="w-16 h-16 bg-brand-pink/20 rounded-full inline-flex items-center justify-center mx-auto my-4">
            <span className="text-4xl">🐾</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-brand-navy mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! It seems like this page has wandered off. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
          <Link to="/shop" className="btn-secondary">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
