import { useEffect, useState } from "react"
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import Loading from "../components/Loading"
import ProductCardAdmin from "../components/ProductCardAdmin"
import { IoSearchOutline } from "react-icons/io5"
import NoData from "../components/NoData"

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProducts,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      })

      const {data: responseData} = response;

      if(responseData.success) {
        setProductData(responseData.data)
        setTotalPageCount(responseData.totalNoPage)
      }

    } catch (error) {
      AxiosToastError(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
        if(flag) {
            fetchProductData()
            flag = false
        }
    }, 300)
    return () => clearTimeout(interval)
  }, [search])

  const handleNext = () => {
    if(page !== totalPageCount) {
      setPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if(page !== 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleOnChange = (e) => {
    const {value} = e.target
    setSearch(value)
    setPage(1)
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
            <h2 className='font-semibold'>Product</h2>
            <div className="h-full w-full ml-auto max-w-56 min-w-24 px-4 flex items-center gap-3 py-2 border rounded focus-within:border-primary-200">
                <IoSearchOutline size={25} />
                <input 
                    type="text" 
                    placeholder="Search Product"
                    className="h-full w-full bg-slate-50 border rounded outline-none bg-transparent"
                    value={search}
                    onChange={handleOnChange}
                />
            </div>
      </div>
      {
        loading && (
            <Loading />
        )
      }
      {
        !loading && !productData.length && (
          <NoData />
        )
      }
      {
        productData.length > 0 && (
          <div className="p-4 bg-blue-50">
            <div className="min-h-[55vh]">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {
                        productData.map((p, index) => {
                            return(
                                <ProductCardAdmin key={index} data={p} fetchProductData={fetchProductData}/>
                            )
                        })
                    }
                </div>
            </div>
            
            <div className="flex justify-between my-4">
                <button onClick={handlePrevious} className="px-4 py-1 border rounded border-primary-200 hover:bg-primary-200">Previous</button>
                <button className="w-full bg-white">{page}/{totalPageCount}</button>
                <button onClick={handleNext} className="px-4 py-1 border rounded border-primary-200 hover:bg-primary-200">Next</button>
            </div>
          </div>
        )
      }

    </section>
  )
}

export default ProductAdmin