import PriceInRupees from "../utils/PriceInRupees";
import useGlobalContext from "../provider/GlobalProvider";
import { useEffect, useState } from "react";
import AddAddress from "./AddAddress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js"

const CheckOutPage = () => {

  const { priceWithoutDiscount, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()

  const [openAddAddress, setOpenAddAddress] = useState(false)
  const [selectAddress, setSelectAddress] = useState(0)

  const addressList = useSelector((state) => state.address.addressList)
  const cartItems = useSelector((state) => state.cartItems.cart)

  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {
    try {
      const response = await Axios({
        ...SummaryApi.cashOnDelivery,
        data: {
            list_items: cartItems, 
            totalAmt: totalPrice, 
            addressId: addressList[selectAddress]?._id, 
            subTotalAmt: totalPrice
        }
      })

      const {data: responseData} = response

      if(responseData.success) {
        toast.success(responseData.message)  
        if(fetchCartItem) {
          fetchCartItem()
        }
        if(fetchOrder) {
          fetchOrder()
        }
        navigate("/success", {
          state: {
            text: "Order"
          }
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleOnlinePayment = async() => {
    try { 
      toast.loading("Processing...")
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)

      const response = await Axios({
        ...SummaryApi.payment,
        data: {
            list_items: cartItems, 
            totalAmt: totalPrice, 
            addressId: addressList[selectAddress]?._id, 
            subTotalAmt: totalPrice
        }
      })

      const {data: responseData} = response

      stripePromise.redirectToCheckout({ sessionId: responseData.id })

      if(fetchCartItem) {
        fetchCartItem()
      }
      if(fetchOrder) {
        fetchOrder()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex w-full gap-5 justify-between flex-col lg:flex-row">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2">
            {
                addressList.map((address, index) => {
                    return (
                        <label htmlFor={"address"+index} className={!address.status && "hidden"}>
                            <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                                <div>
                                    <input 
                                        type="radio" 
                                        name="address"
                                        value={index}
                                        onChange={(e) => setSelectAddress(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>{address.address_line}</p>      
                                    <p>{address.city}</p>                    
                                    <p>{address.state}</p>                     
                                    <p>{address.country} - {address.pincode}</p>                    
                                    <p>{address.mobile}</p>                    
                                </div>
                            </div>
                        </label>
                    )
                })
            }
            <div onClick={() => setOpenAddAddress(true)} className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer">
                Add Address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2">
          <h3 className="text-lg font-semibold">Summary</h3>

          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill Details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {PriceInRupees(priceWithoutDiscount)}
                </span>
                <span>{PriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Quantity total</p>
              <p className="flex items-center gap-2">{totalQty} items</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center gap-4 justify-between">
              <p>Grand Total</p>
              <p>{PriceInRupees(totalPrice)}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <button onClick={handleOnlinePayment} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold">Online Payment</button>
            <button onClick={handleCashOnDelivery} className="px-4 py-2 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white hover:text-white rounded">Cash on Delivery</button>
          </div>
        </div>
      </div>

      {
        openAddAddress && (
            <AddAddress close={() => setOpenAddAddress(false)} />
        )
      }
    </section>
  );
};

export default CheckOutPage
