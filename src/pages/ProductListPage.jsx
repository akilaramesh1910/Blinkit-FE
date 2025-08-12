import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const ProductListPage = () => {
  const params = useParams()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [displaySubCategory, setDisplaySubCategory] = useState([])

  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductData = async (req, res) => {


    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          page: page,
          limit: 8,
          categoryId: categoryId,
          subCategoryId: subCategoryId
        }
      })

      const {data: responseData} = response

      if(responseData.success) {
        if(responseData.page === 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalPageCount)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [params])

  useEffect(() => {
    const sub = allSubCategory.filter(s  => {
      const filterData = s.category.some(el => {
        return el._id === categoryId
      })

      return filterData ? filterData : false
    })
    setDisplaySubCategory(sub)
  }, [params, allSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-249 mx-auto grid grid-cols-[90px, 1fr] md:grid-cols-[200px, 1fr] lg:grid-cols-[200px, 1fr]'>
        <div className='min-h-[88vh] max-h-[88vh] grid gap-1 overflow-y-scroll scrollbarCustom shadow-md bg-white py-2'>
          {
            displaySubCategory.map((sub, index) => {
              const url = `/${ValidateURL(sub?.category[0]?.name)}-${sub?.category[0]?._id}/${ValidateURL(sub.name)}-${sub._id}`
              return (
                <Link to={url} className={`w-full p-2 bg-white lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer ${subCategoryId === sub._id ? "border-green-500" : ""}`}>
                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                    <img 
                      src={sub.image} 
                      alt="subCategory" 
                      className='w-14 lg:h-14 lg:w-12 h-full object-scale-down lg:object-fill'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{sub.name}</p>
                </Link>
              )
            })
          }
        </div>

        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

          <div className='min-h-[75vh] max-h-[75vh] overflow-y-auto relative'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
              {
                data.map((p, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id+"ProductSubCategory"+index}
                    />
                  )
                })
              }
            </div>
          </div>

          {
            loading && (
              <Loading />
            )
          }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage