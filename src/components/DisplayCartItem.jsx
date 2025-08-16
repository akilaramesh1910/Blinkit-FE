import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import PriceInRupees from '../utils/PriceInRupees'
import { FaCaretRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import PriceWithDiscount from '../utils/PriceWithDiscount'
import imageEmptyCart from "../assets/empty_cart.webp"
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
  const { priceWithoutDiscount, totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector((state) => state.cartItem.cart)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  const redirectToCheckout = () => {
    if (user._id) {
      navigate("/checkout")
      if(close) close()
      return
    }
    toast.success("Please login to proceed to checkout")
    navigate("/login")
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>My Cart</h2>
                <Link to={"/"} className="lg:hidden">
                    <IoClose size={25} />
                </Link>
                <button onClick={close} className="hidden lg:block">
                    <IoClose size={25} />
                </button>
            </div>

            <div className='min-h-[75vh] lg:min-h-[80vh] max-h-[calc(100vh-150px)] h-full bg-blue-50 p-2 flex flex-col gap-4'>
                {
                    cartItem[0] ? (
                        <>
                            <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                <p>Your total savings</p>
                                <p>{PriceInRupees(priceWithoutDiscount - totalPrice)}</p>
                            </div>
                            <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                        {
                            cartItem[0] && (
                                cartItem.map((item, index) => {
                                    return (
                                        <div key={item._id+index+"cartItem"} className='w-full flex gap-4'>
                                            <div className='w-16 h-16 border rounded min-h-16 min-w-16'>
                                                <img 
                                                    src={item.productId.image[0]} 
                                                    alt="productImage" 
                                                    className='object-scale-down'
                                                />
                                            </div>
                                            <div className='w-full max-w-sm'>
                                                <p className='text-xs ext-ellipsis line-clamp-2'>
                                                    {item?.productId?.name}
                                                </p>
                                                <p className='text-neutral-400'>
                                                    {item?.productId?.unit}
                                                </p>
                                                <p className='font-semibold'>
                                                    {
                                                        PriceInRupees(PriceWithDiscount(item?.productId?.price, item?.productId?.discount))
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <AddToCartButton data={item?.productId} />
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                            </div>
                            <div className='bg-white p-4'>
                                <h3 className='font-semibold'>Bill Details</h3>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Items total</p>
                                    <p className='flex items-center gap-2'>
                                        <span className='line-through text-neutral-400'>{PriceInRupees(priceWithoutDiscount)}</span>
                                        <span>{PriceInRupees(totalPrice)}</span>
                                    </p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Quantity total</p>
                                    <p className='flex items-center gap-2'>
                                       {totalQty} items
                                    </p>
                                </div>
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Delivery Charge</p>
                                    <p className='flex items-center gap-2'>Free</p>
                                </div>
                                <div className='font-semibold flex items-center gap-4 justify-between'>
                                    <p>Grand Total</p>
                                    <p>{PriceInRupees(totalPrice)}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white flex flex-col justify-center items-center'>
                            <img src={imageEmptyCart} alt="emptyCart" className='w-full h-full object-scale-down' />
                            <Link onClick={close} to={"/"} className='grid bg-green-600 px-4 py-2 rounded text-white'>Shop Now</Link>
                        </div>
                    )
                } 
            </div>

            {
                cartItem[0] && (
                    <div className='p-2'>
                        <div className='bg-green-700 text-neutral-100 px-4 py-4 font-bold text-base static bottom-3 rounded flex items-center gap-4 justify-between'>
                            <div>
                                {
                                    PriceInRupees(totalPrice)
                                }
                            </div>
                            {/* {
                                user?._id && (

                                )
                            } */}
                            <button className='flex items-center gap-2'>
                                Proceed
                                <span>
                                    <FaCaretRight size={26} />
                                </span>
                            </button>
                        </div>
                    </div>
                )
            }


        </div>
    </div>
  )
}

export default DisplayCartItem