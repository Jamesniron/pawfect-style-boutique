
import React from 'react';
import CollectionCard from './CollectionCard';
import { Collection } from '@/types';

const Collections = () => {
  const collections: Collection[] = [
    {
      id: 1,
      name: 'Urban Tails',
      slug: 'urban-tails',
      description: 'City-inspired styles for the metropolitan pet.',
      productCount: 12,
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1169'
    },
    {
      id: 2,
      name: 'Vintage Paws',
      slug: 'vintage-paws',
      description: 'Retro and classic designs with a modern twist.',
      productCount: 9,
      imageUrl: 'https://images.unsplash.com/photo-1583511666407-5f06533f2113?q=80&w=1169'
    },
    {
      id: 3,
      name: 'Cozy Comfort',
      slug: 'cozy-comfort',
      description: 'Soft, warm, and comfortable apparel for colder days.',
      productCount: 15,
      imageUrl: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=1074'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy mb-3">Shop Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed with your pet's comfort and style in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
