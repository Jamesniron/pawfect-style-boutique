
import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <Link to={`/collections/${collection.slug}`} className="block group">
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-square md:aspect-[3/4] w-full">
          <img 
            src={collection.imageUrl} 
            alt={collection.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">{collection.name}</h3>
          <p className="text-white/80 mb-4 text-sm md:text-base">{collection.productCount} products</p>
          <span className="inline-flex items-center text-sm font-medium text-white border-b border-white pb-1 transition-all group-hover:border-brand-pink group-hover:text-brand-pink">
            Shop Collection
            <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
