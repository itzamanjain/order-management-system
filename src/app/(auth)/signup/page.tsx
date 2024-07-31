'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        role: ''
    });
    console.log('formData:', formData);
    
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/signup', formData);
            console.log('Signup successful:', response.data);
            toast.success('Signup successful!');
            router.push('/login');
        } catch (error:any) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
            toast.error('Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex text-black items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input 
                                type="text" 
                                id="fullname" 
                                name="fullname" 
                                required
                                value={formData.fullname}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
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
                            <label className="block text-sm font-medium text-gray-700">I am a:</label>
                            <div className="mt-2 space-x-4 text-black">
                                <label className="inline-flex items-center">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="foodie" 
                                        checked={formData.role === 'foodie'}
                                        onChange={handleChange}
                                        className="form-radio text-indigo-600" 
                                    />
                                    <span className="ml-2">Foodie</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input 
                                        type="radio" 
                                        name="role" 
                                        value="restaurant owner"
                                        checked={formData.role === 'restaurant owner'}
                                        onChange={handleChange}
                                        className="form-radio text-indigo-600" 
                                    />
                                    <span className="ml-2">Restaurant Owner</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign Up
                            </button>
                            <Link href='/login'>
                                <p className="text-md mt-4 underline text-black">Already Have an account? Login</p>
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