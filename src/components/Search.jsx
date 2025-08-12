import React, { useEffect, useState, } from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import noData from '../assets/noData.webp'

const Search = () => {

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  const navigate = useNavigate()
  const location = useLocation()

  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const redirectToSearchPage = () => {
    navigate("/search")
  }

  useEffect(() => {
    const isSearch = location.pathname === "/search"
    setIsSearchPage(isSearch);
  }, [location])

  const handleOnChange = (e) => {
    const search = e.target.value;
    const url = `/search?q=${search}`
    navigate(url)
  }

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 '>
        <div>
            { 
              !(isSearchPage && isMobile) ?   
                (<button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 '>
                    <FaSearch size={22} />
                </button>) : 
                (<Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-colour:white rounded-full shadow-md'>
                    <FaArrowLeft size={22} />
                </Link>)
            }
        </div>
        <div className='w-full h-full'>
            {!isSearchPage ? (
                 <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                    <TypeAnimation
                        sequence={[
                            'Search "milk"',
                            1000,
                            'Search "ice cream"',
                            1000,
                            'Search "chocolate"',
                            1000,
                            'Search "cake"',
                            1000,
                            'Search "rice"',
                            1000,
                            'Search "butter"',
                            1000,
                            'Search "wheat"',
                            1000,
                            'Search "chips"',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        // style={{ fontSize: '2em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </div>
            ) : (
                <div className='w-full h-full'> 
                    <input 
                        type="text" 
                        placeholder='Search the things !!'
                        autoFocus
                        className='bg-transparent w-full h-full outline-none'
                        onChange={handleOnChange}
                        defaultValue={searchText}
                    />
                </div>
            )}
        </div>
       
    </div>
  )
}

export default Search