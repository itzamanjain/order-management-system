import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <div>Cart page</div>
        {/* redirect to payment page  */}
        <button
                type="submit"
                className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              >
                Checkout
              </button>
    </div>
  )
}

export default page