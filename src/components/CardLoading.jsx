import React from 'react'

const CardLoading = () => {
  return (
    <div className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white animated-pulse'>
        <div className='min-h-24 bg-blue-50 rounded'></div>
        <div className='p-2 lg:p-3 rounded bg-red-100 w-20'></div>
        <div className='p-2 lg:p-3 rounded bg-blue-100'></div>
        <div className='p-2 lg:p-3  rounded bg-red-100 w-14'></div>

        <div className='flex items-center justify-between gap-3'>
            <div className='p-2 lg:p-3 rounded bg-red-100 w-20'></div>
            <div className='p-2 lg:p-3  rounded bg-red-100 w-20'></div>
        </div>
    </div>
  )
}

export default CardLoading