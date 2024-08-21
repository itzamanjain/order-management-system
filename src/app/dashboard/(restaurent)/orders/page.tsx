'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          </div>
    </div>
  )
}

export default page