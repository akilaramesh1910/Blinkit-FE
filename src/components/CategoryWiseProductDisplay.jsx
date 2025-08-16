import React, { useEffect, useRef, useState } from 'react'
import { data, Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import ValidateURL from '../utils/ValidateURL'
import CardProduct from './CardProduct'

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef() 
  const subCategory = useSelector(state => state.product.allSubCategory)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
            id: id
        }
      })

      const {data: responseData} = response

      if(responseData.success) {
        setData(responseData.data)
      }

    } catch (error) {
      console.log(error)
      AxiosToastError(error)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const loadingCardNumber = new Array(6).fill(null)

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200
  }

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200
  }

  const handleRedirect = () => {
    const subcategoryData = subCategory.find(s => {
      const filterDate = s.category.some(c => {
        return c._id === id
      })
      return filterDate ? s : null
    })

    const url = `/${ValidateURL(name)}-${id}/${subCategory?.name}-${subCategory?._id}`
    return url
  }

  const redirectURL = handleRedirect()

  return (
    <div>
      <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
        <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">See All</Link>
      </div>
      <div className='relative flex items-center'>
        <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
          {
              loading && 
                  loadingCardNumber.map((_, index) => {
                      return (
                          <CardLoading key={"ProductDisplay"+index} />
                      )
                  })
          }

          {
              data.map((p, index) => {
                  return (
                      <CardProduct data={p} key={p._id+"productDisplay"+index} />
                  )
              })
          }
        </div>
        <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
              <button onClick={handleScrollLeft} className='z-10 relative bg-white shadow-lg p-2 text-lg rounded-full hover:bg-gray-100'>
                  <FaAngleLeft />
              </button>
              <button onClick={handleScrollRight} className='z-10 relative bg-white shadow-lg p-2 text-lg rounded-full hover:bg-gray-100'>
                  <FaAngleRight />
              </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay