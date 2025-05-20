
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">PawfectStyle</h3>
            <p className="text-sm text-gray-300 mb-4">
              Discover stylish, high-quality pet apparel and accessories for your furry friends.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-brand-pink transition-colors">Instagram</a>
              <a href="#" className="text-white hover:text-brand-pink transition-colors">Facebook</a>
              <a href="#" className="text-white hover:text-brand-pink transition-colors">Pinterest</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/collections/new-arrivals" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/collections/best-sellers" className="text-gray-300 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/collections/sale" className="text-gray-300 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and pet fashion updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-pink"
              />
              <button type="submit" className="bg-brand-pink text-brand-navy px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} PawfectStyle. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
