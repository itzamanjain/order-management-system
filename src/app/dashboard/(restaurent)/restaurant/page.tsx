'use client';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const RestaurantDashboard = () => {
  const [restaurantId, setRestaurantId] = useState<string>('');

  const [menuItem, setMenuItem] = useState<{
    name: string;
    price: string;
    description: string;
    mainIngredient: string;
    cuisine: string;
    image: File | null;
  }>({
    name: '',
    price: '',
    description: '',
    mainIngredient: '',
    cuisine: '',
    image: null,
  });

  useEffect(() => {
    // Fetch the restaurant ID when the component mounts
    fetchRestaurentId();
  }, []);

  const fetchRestaurentId = async () => {
    try {
      const response = await axios.get('/api/v1/auth/me');
      setRestaurantId(response.data.restaurantId);
    } catch (error: any) {
      console.error('Error fetching restaurant id:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMenuItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setMenuItem((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', menuItem.name);
    formData.append('price', menuItem.price);
    formData.append('description', menuItem.description);
    formData.append('mainIngredient', menuItem.mainIngredient);
    formData.append('cuisine', menuItem.cuisine);
    formData.append('restaurantId', restaurantId); // Append restaurantId to FormData
    if (menuItem.image) {
      formData.append('image', menuItem.image); // Append image file to FormData
    }

    try {
      const response = await axios.post('/api/v1/owner/menu-items', formData);
      if (response.status === 201) {
        toast.success("Item added successfully");
        setMenuItem({ name: '', price: '', description: '', mainIngredient: '', cuisine: '', image: null });
      }
    } catch (error: any) {
      console.error("Error while adding menu item:", error);
      toast.error("Failed to add menu item");
    }
  };

  return (
    <div className='flex '>
  <div className='min-h-screen'>
    <Sidebar />
  </div>
  <div className='w-full min-h-screen text-black bg-gradient-to-br from-amber-100 to-orange-300 p-6'>
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Restaurant Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Dish Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={menuItem.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={menuItem.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine</label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={menuItem.cuisine}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="mainIngredient" className="block text-sm font-medium text-gray-700">Ingredient</label>
            <input
              type="text"
              id="mainIngredient"
              name="mainIngredient"
              value={menuItem.mainIngredient}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={menuItem.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Menu Item Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
            >
              Add Menu Item
            </button>
          </div>
        </form>
      </div>
    </div>
    <Toaster />
  </div>
</div>

  );
};

export default RestaurantDashboard;
