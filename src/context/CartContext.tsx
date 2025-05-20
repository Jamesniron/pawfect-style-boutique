
import React, { createContext, useReducer, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { toast } from 'sonner';

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; size?: string; color?: string; } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  cartItems: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, size, color } = action.payload;
      
      // Check if product already exists in cart (with same size and color if applicable)
      const existingItemIndex = state.cartItems.findIndex(
        item => item.product.id === product.id && 
               item.size === size && 
               item.color === color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Add new item to cart
        return {
          ...state,
          cartItems: [...state.cartItems, { product, quantity, size, color }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product.id !== action.payload.productId
        ),
      };
      
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product.id !== productId),
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
      
    default:
      return state;
  }
};

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load cart from localStorage
  const loadFromLocalStorage = (): CartState => {
    try {
      const storedCart = localStorage.getItem('pawfect-cart');
      return storedCart ? JSON.parse(storedCart) : initialState;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return initialState;
    }
  };
  
  const [state, dispatch] = useReducer(cartReducer, loadFromLocalStorage());
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('pawfect-cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);
  
  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, size, color },
    });
    
    toast.success(`${product.name} added to cart!`);
  };
  
  const removeFromCart = (productId: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId },
    });
    
    toast.info('Item removed from cart');
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Cart cleared');
  };
  
  // Calculate cart total
  const cartTotal = state.cartItems.reduce((total, item) => {
    const price = item.product.discountPercentage > 0
      ? item.product.price * (1 - item.product.discountPercentage / 100)
      : item.product.price;
    return total + price * item.quantity;
  }, 0);
  
  // Calculate cart count (total number of items)
  const cartCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
  
  const value = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
