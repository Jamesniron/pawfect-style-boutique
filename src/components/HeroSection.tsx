
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-lavender/30 to-brand-pink/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-4">
              Stylish Fashion for<br />
              <span className="text-brand-pink">Perfect Pets</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md">
              Discover our exclusive collection of trendy and comfortable pet apparel designed for the fashion-forward furry friend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary text-center">
                Shop Collection
              </Link>
              <Link to="/collections/new-arrivals" className="btn-secondary text-center">
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-fade-in">
            <div className="relative">
              <div className="w-full h-full absolute top-0 left-0 rounded-full bg-brand-pink/30 blur-3xl transform -translate-y-1/4 translate-x-1/4"></div>
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1064" 
                alt="Stylish pet wearing PawfectStyle" 
                className="w-full h-auto rounded-lg shadow-xl relative z-10"
              />
              <div className="absolute top-1/4 -left-8 md:-left-16 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-bounce z-20">
                <p className="text-brand-navy font-bold">Summer Sale</p>
                <p className="text-xl text-brand-pink font-bold">Up to 40% Off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
