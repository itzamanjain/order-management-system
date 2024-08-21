'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('formData:', formData);
            const response = await axios.post('/api/v1/auth/login', formData);
            toast.success('Login successful!');
    
            const { role, hasRestaurant } = response.data;
    
            if (role === 'restaurant owner') {
                if (hasRestaurant) {
                    router.push('/dashboard/restaurant'); // Redirect to /owner-menuitems if the user already has a restaurant
                } else {
                    router.push('/rest'); // Redirect to /rest if the user does not have a restaurant
                }
            } else {
                router.push('/dashboard/foodie'); // Redirect to /dashboard/foodie if the user is a foodie
            }
        } catch (error:any) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            toast.error('Login failed. Please try again.');
        }
    };
    
    return (
        <div className="min-h-screen text-black bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                            <Link href='/signup'>
                                <p className="text-md mt-4 underline text-black">Don't Have an account? Signup</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export default Page