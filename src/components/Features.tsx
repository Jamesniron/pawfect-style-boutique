
import React from 'react';
import { Package, Heart, Truck, RefreshCcw } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Package className="w-8 h-8 text-brand-navy" />,
      title: 'Premium Quality',
      description: 'All our products are made with high-quality materials that are safe and comfortable for your pets.'
    },
    {
      icon: <Heart className="w-8 h-8 text-brand-navy" />,
      title: 'Designed with Love',
      description: 'Each item is thoughtfully designed with your pet\'s comfort and style in mind.'
    },
    {
      icon: <Truck className="w-8 h-8 text-brand-navy" />,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50. Quick delivery to your doorstep.'
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-brand-navy" />,
      title: 'Easy Returns',
      description: '30-day hassle-free returns if the item doesn\'t fit or meet your expectations.'
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg transition-all hover:bg-gray-50">
              <div className="mb-4 p-3 bg-brand-pink/20 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-navy">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
