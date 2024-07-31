'use client'
import React, { useState } from 'react';

const RestaurantDashboard = () => {
  const [menuItem, setMenuItem] = useState({
    name: '',
    price: '',
    description: '',
    mainIngredient: '',
    cuisine: ''
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setMenuItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Here you would make your API call
    console.log('Submitting menu item:', menuItem);
    // Example API call (uncomment and modify as needed):
    // try {
    //   const response = await fetch('/api/menu-items', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(menuItem)
    //   });
    //   if (response.ok) {
    //     console.log('Menu item added successfully');
    //     setMenuItem({ name: '', price: '', description: '', mainIngredient: '' });
    //   }
    // } catch (error) {
    //   console.error('Error adding menu item:', error);
    // }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-amber-100 to-orange-300 p-6">
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
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">cuisine</label>
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
    </div>
  );
};

export default RestaurantDashboard;