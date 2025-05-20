
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Collections from '@/components/Collections';
import Features from '@/components/Features';
import Newsletter from '@/components/Newsletter';

const Index = () => {
  return (
    <div>
      <HeroSection />
      
      <FeaturedProducts 
        title="New Arrivals" 
        subtext="Discover our latest styles and seasonal must-haves for your fashionable pet."
        limit={4}
        viewAllLink="/collections/new-arrivals"
      />
      
      <Collections />
      
      <FeaturedProducts 
        title="Best Sellers" 
        subtext="Our customers' favorites and most loved pet fashion items."
        limit={4}
        viewAllLink="/collections/best-sellers"
      />
      
      <Features />
      
      <Newsletter />
    </div>
  );
};

export default Index;
