'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <div>
            <h1>Menu Item</h1>
        </div>
    </div>
  )
}

export default page