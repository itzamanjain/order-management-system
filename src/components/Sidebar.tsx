import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen  text-Black ">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li>
            <button
              onClick={() => router.push('/dashboard/home')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/restaurant')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Add Items
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/orders')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/dashboard/allmenuitems')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Menu Item
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
