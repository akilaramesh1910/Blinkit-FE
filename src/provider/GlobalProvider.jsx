import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch, useSelector } from 'react-redux'
import { handleAddCartItem } from "../store/cartSlice";
import PriceWithDiscount from "../utils/PriceWithDiscount";
import { setOrder } from "../store/orderSlice";
import toast from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { handleAddAddress } from "../store/addressSlice"

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = (props) => {
  const { children } = props || {};

  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const cartItem = useSelector((state) => state.cartItem.cart)
  const [priceWithoutDiscount, setPriceWithoutDiscount] = useState(0)
  const user = useSelector((state) => state.user)

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddCartItem(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty
        }
      })

      const {data: responseData} = response

      if(responseData.success) {
        // toast.success(responseData.message)
        fetchCartItem()
        return responseData
      }

    } catch (error) {
      AxiosToastError(error)
      return error
    }
  }

  const deleteCartItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: id
        }
      })

      const {data: responseData} = response

      if(responseData.success) {
        toast.success(responseData.message)
        fetchCartItem()
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    const quantity = cartItem.reduce((prev, curr) => {
      return prev + Number(curr.quantity || 0)
    }, 0)
    setTotalQty(quantity)

    const price = cartItem.reduce((prev, curr) => {
      const priceAfterDiscount = PriceWithDiscount(Number(curr?.productId?.price || 0), Number(curr?.productId?.discount || 0))
      return prev + (priceAfterDiscount * Number(curr.quantity || 0))
    }, 0)
    setTotalPrice(price)

    const priceWithoutDiscount = cartItem.reduce((prev, curr) => {
      return prev + (Number(curr?.productId?.price || 0) * Number(curr.quantity || 0))
    }, 0)
    setPriceWithoutDiscount(priceWithoutDiscount)
    
  }, [cartItem])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(handleAddCartItem([]))
  }

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })

      const {data: responseData} = response

      if(responseData.success) {
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderDetails
      })

      const {data: responseData} = response

      if(responseData.success) {
        dispatch(setOrder(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchCartItem()
    fetchAddress()
    fetchOrder()
  }, [user])

  return (
    <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
      <GlobalContext.Provider value={{
          fetchCartItem,
          updateCartItem,
          deleteCartItem,
          fetchAddress,
          fetchOrder,
          totalPrice,
          totalQty,
          priceWithoutDiscount
      }}>
          {children}
      </GlobalContext.Provider>
    </ErrorBoundary>
  )
};

export default GlobalProvider