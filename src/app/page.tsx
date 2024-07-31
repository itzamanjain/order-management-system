import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-white font-bold text-2xl">OMS</div>
          <Link href="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-indigo-100 transition duration-300">
            Login
          </Link>
        </nav>

        <main className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Highly Scalable<br />Order Management System
          </h1>
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto">
            Streamline your operations, boost efficiency, and delight your customers with our cutting-edge OMS solution.
          </p>
          <Link href="/signup" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-100 transition duration-300 inline-block">
            Create Account
          </Link>
        </main>

        <section className="mt-24 grid md:grid-cols-3 gap-8">
          {['Efficient Order Processing', 'Real-time Inventory Management', 'Advanced Analytics'].map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">{feature}</h3>
              <p className="text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
            </div>
          ))}
        </section>

        <footer className="mt-24 text-center text-indigo-200">
          <p>&copy; 2024 OMS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;