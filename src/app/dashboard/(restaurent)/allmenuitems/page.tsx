'use client';

import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [menuItemList, setMenuItemList] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const response = await axios.get('/api/v1/auth/me');
        setRestaurantId(response.data.restaurantId);
      } catch (error: any) {
        console.error('Error fetching restaurant id:', error);
      }
    };
    fetchRestaurantId();
  }, []);

  useEffect(() => {
    if (restaurantId) {
      const fetchAllMenuItems = async () => {
        try {
          const response = await axios.get(`/api/v1/owner/allmenuitem?id=${restaurantId}`);
          const { menuItems } = response.data;
          setMenuItemList(menuItems || []);
        } catch (error: any) {
          console.error('Error fetching menu items:', error);
        }
      };
      fetchAllMenuItems();
    }
  }, [restaurantId]);

  return (
    <div className='flex bg-gradient-to-br from-amber-100 to-orange-300 text-black'>
      <Sidebar />
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4'>Menu Items</h1>
        {menuItemList.length > 0 ? (
          <ul>
            {menuItemList.map((item, index) => (
              <li key={index} className='mb-4'>
                <div className='flex items-center'>
                  <img src={item.imageUrl} alt={item.name} className='w-16 rounded-xl h-16 mr-4' />
                  <div>
                    <h2 className='text-lg font-semibold'>{item.name}</h2>
                    <p className='text-black'>{item.description}</p>
                    <p className='text-black'>Cuisine: {item.cuisine}</p>
                    <p className='text-black'>Price: ${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
