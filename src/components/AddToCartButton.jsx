import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector } from "react-redux";
import {FaMinus, FaPlus} from "react-icons/fa"
import SummaryApi from "../common/SummaryApi";

const AddToCartButton = ({data}) => {

    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState (false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailable, setIsAvailable] = useState(true)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()
      
    const handleAddToCart = async(e) => {
        e.preventDefault()
        e.stopPropagation()
    
        try {
            setLoading(true)
    
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })
    
            const {data: responseData} = response
    
            if(responseData.success) {
                toast.success(responseData.message)
                if(fetchCartItem) {
                    fetchCartItem()
                }
            }
    
        } catch (error) {
            console.log("error", error)
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const checkItem = cartItem?.some(item => item.productId._id === data._id)
        setIsAvailable(checkItem)

        const qtyCartItem = cartItem?.find(item => item.productId._id === data._id)
        setQty(qtyCartItem?.quantity)
        setCartItemDetails(qtyCartItem)
    }, [cartItem])

    const increaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()

        const response = await updateCartItem(cartItemDetails?._id, qty+1)

        if(response.success) {
            toast.success("Item added to cart")
        }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()

        if(qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
            const response = await updateCartItem(cartItemDetails?._id, qty-1)

            if(response.success) {
                toast.success("Item removed from cart")
            }
        }
    }
        
    
  return (
    <div className="w-full max-w-[150px]">
      {
        isAvailable ? (
            <div className="flex w-full h-full">
                <button onClick={decreaseQty} className="bg-green-600 hover:bg-green700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"><FaMinus /></button>
                <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">{qty}</p>
                <button onClick={increaseQty} className="bg-green-600 hover:bg-green700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"><FaPlus /></button>
            </div>
        ) : (
            <button
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded cursor-pointer"
            >
                Add
            </button>
        )
      }
    </div>
  );
};

export default AddToCartButton;
