
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Truck, 
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import FeaturedProducts from '@/components/FeaturedProducts';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  
  const { products, isLoading } = useProducts();
  const product = products.find(p => p.id === productId);
  
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  // Sample sizes and colors (in a real app, these would come from the product data)
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Red', 'Blue', 'Black', 'Beige'];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample additional images (in a real app, these would come from the product data)
  const productImages = product ? [
    product.imageUrl,
    'https://images.unsplash.com/photo-1577175889968-f551f5880d42?q=80&w=1170',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1064',
    'https://images.unsplash.com/photo-1583511655826-05700442b372?q=80&w=1074'
  ] : [];
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
            <div>
              <div className="h-8 bg-gray-200 w-2/3 mb-4"></div>
              <div className="h-6 bg-gray-200 w-1/3 mb-6"></div>
              <div className="h-20 bg-gray-200 w-full mb-6"></div>
              <div className="h-10 bg-gray-200 w-full mb-4"></div>
              <div className="h-10 bg-gray-200 w-full mb-6"></div>
              <div className="h-12 bg-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-brand-navy mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-navy">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-brand-navy">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={`/collections/${product.category.toLowerCase()}`} className="hover:text-brand-navy">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={productImages[currentImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-brand-mint text-brand-navy text-sm font-medium px-3 py-1 rounded-full">
                  New
                </span>
              )}
              
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 right-4 bg-brand-pink text-brand-navy text-sm font-medium px-3 py-1 rounded-full">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {productImages.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-brand-navy' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-brand-navy mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.reviews} reviews</span>
            </div>
            
            <div className="mb-6">
              {product.discountPercentage > 0 ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-brand-navy mr-2">
                    ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-brand-navy">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6 font-serif">{product.description}</p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Size</h3>
                <Link to="/size-guide" className="text-sm text-brand-navy hover:underline">Size Guide</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${selectedSize === size 
                      ? 'border-brand-navy bg-brand-navy text-white' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color 
                      ? 'ring-2 ring-brand-navy ring-offset-2' 
                      : 'border-gray-300'
                    }`}
                    style={{ background: color.toLowerCase() }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <div className="px-4 py-2 border-t border-b border-gray-300 w-12 text-center">
                  {quantity}
                </div>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center py-6"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="py-6 px-6">
                <Heart size={20} />
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck size={20} className="text-brand-navy mr-2 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Free shipping</span> on orders over $50. 
                  Estimated delivery time: 3-5 business days.
                </p>
              </div>
              <div className="flex items-start">
                <RefreshCcw size={20} className="text-brand-navy mr-2 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Easy returns</span> within 
                  30 days of purchase. See our return policy for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* You May Also Like Section */}
      <FeaturedProducts 
        title="You May Also Like" 
        subtext="Check out these paw-some products that complement your selection."
        category={product.category}
        limit={4}
      />
    </>
  );
};

export default ProductPage;
