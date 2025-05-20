
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={32} className="text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-brand-navy mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any products to your cart yet. Continue shopping to find the perfect style for your pet.
        </p>
        <Link to="/shop" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-navy mb-6">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-8 gap-4 p-4 bg-gray-50 border-b border-gray-100">
              <div className="col-span-4 font-medium">Product</div>
              <div className="col-span-1 font-medium text-center">Price</div>
              <div className="col-span-2 font-medium text-center">Quantity</div>
              <div className="col-span-1 font-medium text-right">Total</div>
            </div>
            
            {cartItems.map((item) => {
              const { product, quantity, size, color } = item;
              const itemPrice = product.discountPercentage > 0
                ? product.price * (1 - product.discountPercentage / 100)
                : product.price;
              const itemTotal = itemPrice * quantity;
              
              return (
                <div key={`${product.id}-${size}-${color}`} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
                    {/* Product */}
                    <div className="md:col-span-4 flex items-center">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <Link to={`/product/${product.id}`} className="font-medium text-brand-navy hover:text-brand-pink transition-colors">
                          {product.name}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          {size && <span className="mr-2">Size: {size}</span>}
                          {color && <span>Color: {color}</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-1 flex md:block items-center">
                      <span className="text-sm text-gray-500 md:hidden mr-2">Price:</span>
                      <span>${itemPrice.toFixed(2)}</span>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center">
                      <span className="text-sm text-gray-500 md:hidden mr-2">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 1}
                          className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50"
                        >
                          -
                        </button>
                        <div className="px-3 py-1 border-t border-b border-gray-300 w-10 text-center">
                          {quantity}
                        </div>
                        <button 
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(product.id)} 
                        className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-1 flex md:block items-center justify-between">
                      <span className="text-sm text-gray-500 md:hidden">Item Total:</span>
                      <span className="font-medium text-right block">${itemTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/shop" className="text-brand-navy hover:text-brand-pink transition-colors inline-flex items-center">
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-gray-500 hover:text-red-500 transition-colors inline-flex items-center ml-auto"
            >
              <Trash2 size={18} className="mr-2" />
              Clear Cart
            </button>
            <button className="text-brand-navy hover:text-brand-pink transition-colors inline-flex items-center">
              <RefreshCcw size={18} className="mr-2" />
              Update Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg">
                <span className="font-medium text-brand-navy">Total</span>
                <span className="font-bold text-brand-navy">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full py-6 text-base">
                Proceed to Checkout
              </Button>
              
              <div className="text-sm text-gray-500 text-center">
                Secure checkout. We accept all major credit cards.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
