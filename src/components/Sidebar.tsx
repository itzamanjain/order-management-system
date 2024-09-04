import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className='min-h-screen'>
      {/* Hamburger Icon */}
      <div className="sm:hidden p-4">
        <button onClick={toggleSidebar} className="text-black focus:outline-none">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sm:block ${isOpen ? 'block' : 'hidden'} sm:w-64 bg-white sm:min-h-screen text-black transition-transform duration-300`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-10">
          <ul>
            <li>
              <button
                onClick={() => {router.push('/dashboard/home'); setIsOpen(false);}}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {router.push('/dashboard/restaurant'); setIsOpen(false);}}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Add Items
              </button>
            </li>
            <li>
              <button
                onClick={() => {router.push('/dashboard/orders'); setIsOpen(false);}}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => {router.push('/dashboard/allmenuitems'); setIsOpen(false);}}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Menu Item
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <footer className='bg-white p-5'>
      <p className="text-center  text-gray-600 mt-4">© 2021 All rights reserved.</p>

    </footer>
    </div>
  );
};

export default Sidebar;
