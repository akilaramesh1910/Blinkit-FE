import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import PriceInRupees from '../utils/PriceInRupees'
import Divider from '../components/Divider'
import delivery from "../assets/minute_delivery.png"
import bestPricesOffers from "../assets/Best_Prices_Offers.png"
import wideAssortment from "../assets/Wide_Assortment.png"
import PriceWithDiscount from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const {data: responseData} = response

      if(responseData.success) {
        setData(responseData.data)
        setImage(responseData.data.image[0])
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 200  
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 200
  }
  
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-3'>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56'>
          <img 
            src={image} 
            alt="" 
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img+index} className={`bg-slate-100 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}>
  
                </div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex z-10 relative gap-4 w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md rounded' key={img+index}>
                    <img 
                      src={img} 
                      alt="min-Product" 
                      className='w-full h-full object-scale-down'
                      onClick={() => setImage(index)}
                    />
                  </div>
                )
              })
            }
          </div>

          <div className='w-full h-full -mt-3 flex justify-between absolute items-center'>
            <button
              className='bg-white p-1 rounded-full shadow-lg relative z-10'
              onClick={handleScrollLeft}
            >
              <FaAngleLeft />
            </button>
            <button
              className='bg-white p-1 rounded-full shadow-lg relative z-10'
              onClick={handleScrollRight}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className='my-4 hidden lg:grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data.more_details && Object.keys(data.more_details).map((ele, index) => {
              return (
                <div>
                  <p className='font-semibold'>{ele}</p>
                  <p className='text-base'>{data?.more_details[ele]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg-text-3xl'>{data.name}</h2>
        <p className='text-sm text-green-600 font-semibold'>{data.unit}</p>
        <Divider />
        <div>
          <p>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{PriceInRupees(PriceWithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (
                <p className='line-through'>
                  {PriceInRupees(data.price)}
                </p>
              )
            }
            {
              data.discount && (
                <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% off</p>
              )
            }
          </div>
        </div>

        {
          data.stock === 0 ? (
            <p className='text-red-500 text-lg font-semibold my-2'>Out of Stock</p>
          ) : (
            <div className='my-4'>
              <AddToCartButton data={data} />
            </div>
          )
        }

        <h2 className='font-semibold'>Why shop from blinkit</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img 
              src={delivery} 
              alt="delivery" 
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>SuperFast Delivery</div>
              <p>Get your order delivered in 10 minutes</p>
            </div>
          </div>

          <div className='flex items-center gap-4 my-4'>
            <img 
              src={bestPricesOffers} 
              alt="bestPricesOffers" 
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from brands</p>
            </div>
          </div>

          <div className='flex items-center gap-4 my-4'>
            <img 
              src={wideAssortment} 
              alt="wideAssortment" 
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products across food personal care, household & other categories</p>
            </div>
          </div>

        </div>

        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data.more_details && Object.keys(data.more_details).map((ele, index) => {
              return (
                <div>
                  <p className='font-semibold'>{ele}</p>
                  <p className='text-base'>{data?.more_details[ele]}</p>
                </div>
              )
            })
          }
        </div>

      </div>
    </section>
  )
}

export default ProductDisplayPage