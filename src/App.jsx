import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, {Toaster} from 'react-hot-toast'
import fetchUserDetails from './utils/fetchUserDetails'
import { useEffect } from 'react'
import { setUserDetails } from './store/userSlice'
import { useDispatch } from 'react-redux'
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice'
import Axios from './utils/Axios'
import SummaryApi from './common/SummaryApi'
import {handleAddCartItem} from './store/cartSlice'
import GlobalProvider from './provider/GlobalProvider'
import CartMobileLink from './components/CartMobileLink'

function App() {

  const dispatch = useDispatch()

  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategories
      })

      const {data: responseData} = response

      if(responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const {data: responseData} = response

      if(responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }finally {
    }
  }

  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  }, [])
  

  return (
    <GlobalProvider>
      <>
        <Header />
        <main className='min-h-[80vh]'>
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        {
          location.pathname !== "/checkout" && (
            <CartMobileLink />
          )
        }
      </>
    </GlobalProvider>
  )
}

export default App
