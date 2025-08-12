import React, { useState } from 'react'
import PriceInRupees from '../utils/PriceInRupees'
import { Link } from 'react-router-dom'
import ValidateURL from '../utils/ValidateURL'
import PriceWithDiscount from '../utils/PriceWithDiscount'
import AxiosToastError from "../utils/AxiosToastError";
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AddToCartButton from './AddToCartButton'


const CardProduct = ({ data }) => {
  const url = `/product/${ValidateURL(data.name)}-${data._id}`
  
  return (
    <Link url={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white'>
        <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src={data?.image[0]}
                className='w-full h-full object-scale-down lg:scale-125'
                alt="" 
            />
        </div>
        <div className='flex items-center gap-1'>
            <div className='rounded text-xs p-[1px] px-2 w-fit text-green-600 bg-green-50'>
                10 min
            </div>
            <div>
                {
                    Boolean(data.discount) && (
                    <p className='text-green-600 text-xs bg-green-100 px-2 rounded-full w-fit'>{data.discount}% off</p>
                    )
                }
            </div>
        </div>
        <div className='px-2 lg:px-0 font-medium text-ellipsis line-clamp-2 text-sm lg:text-base'>
            {data.name}
        </div>
        <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
            {data.unit}
        </div>

        <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm '>
            <div className='flex items-center gap-1'>
                <div className='font-semibold'>
                    {PriceInRupees(PriceWithDiscount(data.price, data.discount))}
                </div>
            </div>

            <div className=''>
                {
                    data.stock === 0 ? (
                        <p className='text-red-500 text-sm text-center'>Out of Stock</p>
                    ) : (
                        <AddToCartButton data={data} />
                    )
                }
            </div>
        </div>
    </Link>
  )
}

export default CardProduct