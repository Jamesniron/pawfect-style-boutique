
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-brand-mint text-brand-navy">New</Badge>
          )}
          
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-brand-pink text-brand-navy">
              {product.discountPercentage}% OFF
            </Badge>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1" /> 
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white text-brand-navy border-none hover:bg-brand-pink hover:text-white transition-colors"
            >
              <Heart size={16} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.category}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-lg font-bold text-brand-navy">${product.price * (1 - product.discountPercentage / 100)}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">${product.price}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-brand-navy">${product.price}</span>
              )}
            </div>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
