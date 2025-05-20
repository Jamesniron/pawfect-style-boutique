
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[];
  category: string;
  tags?: string[];
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isInStock: boolean;
  discountPercentage: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

export type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  productCount: number;
};
