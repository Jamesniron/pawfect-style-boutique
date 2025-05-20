
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProducts } from '@/hooks/useProducts';

interface FeaturedProductsProps {
  title: string;
  subtext?: string;
  category?: string;
  limit?: number;
  viewAllLink?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title, 
  subtext, 
  category, 
  limit = 4,
  viewAllLink = '/shop'
}) => {
  const { products, isLoading } = useProducts(category);
  
  const displayProducts = products.slice(0, limit);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-brand-navy mb-2">{title}</h2>
            {subtext && <p className="text-gray-600 max-w-xl">{subtext}</p>}
          </div>
          <Link to={viewAllLink} className="mt-4 md:mt-0 text-brand-navy font-medium hover:text-brand-pink transition-colors inline-flex items-center">
            View All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
