import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { useGlobalContext } from '../provider/GlobalProvider'
import PriceInRupees from '../utils/PriceInRupees'
import { Link } from 'react-router-dom'
import { FaCaretRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const CartMobileLink = () => {
  const {totalPrice, totalQty} = useGlobalContext()

  const cartItem = useSelector((state) => state.cartItem.cart)
   
  return (
    <>
      {
        cartItem[0] && (
          <div className='sticky bottom-4 p-2'>
            <div className='bg-green-600 px-2 py-1 text-sm rounded text-neutral-100 flex items-center justify-between gap-3 lg:hidden'>
              <div className='flex items-center gap-2'>
                <div className='p-2 bg-green-500 rounded w-fit'>
                  <FaCartShopping size={26} />
                </div>
                <div className='text-xs'>
                  <p>{totalQty} items</p>
                  <p>{PriceInRupees(totalPrice)}</p>
                </div>
              </div>

              <Link to={"/cart"} className='flex items-center gap-1'>
                <span>View Cart</span>
                <FaCaretRight size={26} />
              </Link>
            </div>
          </div>
        )
      }
    </>
  )
}

export default CartMobileLink