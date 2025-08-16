import React from 'react'
import banner from "../assets/banner.jpg"
import bannerMobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import ValidateURL from '../utils/ValidateURL'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const allCategory = useSelector(state => state.product.allCategory)
  const subCategory = useSelector(state => state.product.allSubCategory)

  const navigate = useNavigate()

  const handleRedirect = (id, name) => {
    const subcategoryData = subCategory.find(s => {
      const filterDate = s.category.some(c => {
        return c._id === id
      })
      return filterDate ? s : null
    })

    const url = `/${ValidateURL(name)}-${id}/${subCategory.name}-${subCategory._id}`
    navigate(url)
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto rounded my-4'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rouned ${!banner && animated-pulse}`}>
          <img 
            src={banner} 
            alt="Banner" 
            className='w-full h-full hidden lg:block'
          />
          <img 
            src={bannerMobile} 
            alt="Banner" 
            className='w-full h-full lg:hidden'
          />
        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {
          loadingCategory ? (
            new Array(12).fill(null).map((c, index) => {
              return (
                <div key={index+"category"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animated-pulse'>
                  <div className='bg-blue-100 min-h-20 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>
                </div>
              )
            }) 
          ) : (
            allCategory.map((c, index) => {
                return (
                    <div key={c._id+"displayCategory"} className='w-full h-full' onClick={() => {handleRedirect(c._id, c.name)}}>
                        <div>
                          <img 
                            src={c.image} 
                            alt="Category" 
                            className='w-full h-full object-scale-down'
                          />
                        </div>
                    </div>
                )
            })
          )
        }
      </div>

      {
        allCategory.map((c, index) => {
          return (
            <CategoryWiseProductDisplay key={c._id+"categoryBasedProductDisplay"} id={c?._id} name={c?.name}/>
          )
        })
      }

      
    </section>
  )
}

export default Home