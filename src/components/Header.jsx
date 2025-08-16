import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import PriceInRupees from '../utils/PriceInRupees';
import DisplayCartItem from './DisplayCartItem';
import { useGlobalContext } from '../provider/GlobalProvider';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user)
  const cartItem = useSelector((state) => state.cartItem.cart)
  // const [totalPrice, setTotalPrice] = useState(0)
  // const [totalQty, setTotalQty] = useState(0)
  const {totalPrice, totalQty} = useGlobalContext()

  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [openCartMenu, setOpenCartMenu] = useState(false)

  const isSearchPage = location.pathname === "/search"

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }

    navigate("/user")
  }

  // useEffect(() => {
  //   const quantity = cartItem.reduce((prev, curr) => {
  //     return prev + curr.quantity
  //   }, 0)
  //   setTotalQty(quantity)

  //   const price = cartItem.reduce((prev, curr) => {
  //     return prev + (curr.productId.price * curr.quantity)
  //   }, 0)
  //   setTotalPrice(price)
  // }, [cartItem])

  return (
    <header className='h-24 lg:h-20 z-40 lg:shadow-md sticky top-0 flex flex-col justify-center gap:1 bg-white'>
      {
        ! (isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>
                <div className='h-full'>
                    <Link to={"/"} className='h-full flex justify-center items-center'>
                        <img src={logo} alt="logo" width={170} height={60} className='hidden lg:block' />
                        <img src={logo} alt="logo" width={120} height={60} className='lg:hidden'/>
                    </Link>
                </div>

                <div className='hidden lg:block'>
                    <Search />
                </div>

                <div>
                    <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                      <FaUserCircle size={26} />
                    </button>
                    <div className='hidden lg:flex items-center gap-10'>
                      {
                        user?._id ? (
                          <div className='relative'>
                            <div onClick={() => setOpenUserMenu((prev) => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
                              <p>{user.name}</p>
                              {
                                openUserMenu ? (
                                  <GoTriangleUp size={25} />
                                ) : (
                                  <GoTriangleDown size={25} />
                                )
                              }
                            </div>
                            {
                              openUserMenu && (
                                <div className='absolute right-0 top-12'>
                                  <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                    <UserMenu close={handleCloseUserMenu} />
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        ) : (
                          <button onClick={redirectToLoginPage} className='text-lg px-2'>
                            Login
                          </button>
                        )
                      }
                      <div onClick={() => setOpenCartMenu(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 text-white rounded cursor-pointer'>
                        <div className='animate-bounce'> 
                          <TiShoppingCart size={26} />
                        </div>
                        <div className='font-semibold text-semibold'>
                          {
                            cartItem[0] ? (
                              <div>
                                <p>{totalQty} Items</p>
                                <p>{PriceInRupees(totalPrice)}</p>
                              </div>
                            ) : (
                              <p>My Cart</p>
                            )
                          }
                        </div>
                      </div>
                    </div>
                </div>
          </div>
        )
      }
      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
      {
        openCartMenu && (
          <DisplayCartItem close={() => setOpenCartMenu(false)}/>
        )
      }
    </header>
  )
}

export default Header