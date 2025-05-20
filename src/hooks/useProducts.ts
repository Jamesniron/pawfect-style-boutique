
import { useState, useEffect } from 'react';
import { Product } from '@/types';

// Sample product data (in a real app, this would come from an API)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Urban Pup Hoodie',
    description: 'A stylish and comfortable hoodie for your fashionable pup. Made with soft cotton blend fabric.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1169',
    category: 'Apparel',
    rating: 4.5,
    reviews: 28,
    isNew: true,
    isFeatured: true,
    isInStock: true,
    discountPercentage: 0
  },
  {
    id: 2,
    name: 'Vintage Leather Collar',
    description: 'Handcrafted leather collar with vintage-inspired details. Durable and stylish.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1169',
    category: 'Accessories',
    rating: 4.8,
    reviews: 42,
    isNew: false,
    isFeatured: true,
    isInStock: true,
    discountPercentage: 10
  },
  {
    id: 3,
    name: 'Cozy Winter Sweater',
    description: 'Keep your pet warm during cold weather with this fashionable knit sweater.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1064',
    category: 'Apparel',
    rating: 4.2,
    reviews: 16,
    isNew: true,
    isFeatured: true,
    isInStock: true,
    discountPercentage: 0
  },
  {
    id: 4,
    name: 'Bow Tie Collar Accessory',
    description: 'Add a touch of class to your pet\'s everyday look with this detachable bow tie.',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=1074',
    category: 'Accessories',
    rating: 4.6,
    reviews: 31,
    isNew: false,
    isFeatured: true,
    isInStock: true,
    discountPercentage: 0
  },
  {
    id: 5,
    name: 'Raincoat with Hood',
    description: 'Waterproof raincoat with reflective details. Perfect for walks on rainy days.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1583512603806-077998240c7a?q=80&w=1169',
    category: 'Apparel',
    rating: 4.7,
    reviews: 24,
    isNew: false,
    isFeatured: false,
    isInStock: true,
    discountPercentage: 15
  },
  {
    id: 6,
    name: 'Summer Cooling Vest',
    description: 'Keep your pet cool during hot summer days with this innovative cooling vest.',
    price: 27.99,
    imageUrl: 'https://images.unsplash.com/photo-1583337426008-2fef51fdede2?q=80&w=1064',
    category: 'Apparel',
    rating: 4.3,
    reviews: 18,
    isNew: true,
    isFeatured: false,
    isInStock: true,
    discountPercentage: 0
  },
  {
    id: 7,
    name: 'Luxury Pet Bandana',
    description: 'Stylish bandana made from premium fabric. Available in multiple patterns.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80&w=1169',
    category: 'Accessories',
    rating: 4.4,
    reviews: 37,
    isNew: false,
    isFeatured: false,
    isInStock: true,
    discountPercentage: 0
  },
  {
    id: 8,
    name: 'Designer Harness',
    description: 'Comfortable and secure harness with stylish designer patterns.',
    price: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?q=80&w=1170',
    category: 'Accessories',
    rating: 4.9,
    reviews: 45,
    isNew: false,
    isFeatured: true,
    isInStock: true,
    discountPercentage: 0
  }
];

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter products by category if provided
        const filteredProducts = category
          ? sampleProducts.filter(product => product.category === category)
          : sampleProducts;
        
        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [category]);
  
  return { products, isLoading, error };
};
