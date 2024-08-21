'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define TypeScript types for the menu item
interface MenuItem {
  _id: string;
  name: string;
  cuisine: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
}

const Page: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get<{ res: MenuItem[] }>('/api/v1/menuitems');
        setMenuItems(response.data.res);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-100 to-gray-200">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {menuItems.map((item) => (
      <div
        key={item._id}
        className="bg-white border p-5 rounded-xl border-gray-300  shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full rounded-xl  h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h3>
          <p className="text-gray-500 mb-2">{item.cuisine}</p>
          <p className="text-gray-700 mb-4">{item.description}</p>
          <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Page;
