'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex min-h-screen'>
        <Sidebar />
        <div>
            <h1>Home</h1>
        </div>
    </div>
  )
}

export default page