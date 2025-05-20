
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-navy">
              <span className="text-brand-pink">Pawfect</span>Style
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-brand-navy">Home</Link>
            <Link to="/shop" className="font-medium hover:text-brand-navy">Shop</Link>
            <Link to="/collections" className="font-medium hover:text-brand-navy">Collections</Link>
            <Link to="/about" className="font-medium hover:text-brand-navy">About</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} />
            </button>
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-brand-pink text-brand-navy">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100" onClick={toggleMenu}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-brand-navy" onClick={() => setIsMenuOpen(false)}>
                <span className="text-brand-pink">Pawfect</span>Style
              </Link>
              <button className="p-2" onClick={toggleMenu}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-xl py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="text-xl py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/collections" className="text-xl py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>Collections</Link>
              <Link to="/about" className="text-xl py-2 border-b border-gray-100" onClick={() => setIsMenuOpen(false)}>About</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
