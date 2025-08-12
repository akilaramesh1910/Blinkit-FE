import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {

  const orders = useSelector((state) => state?.orders?.order)

  return (
    <div className='bg-white shadow-xl p-3 font-semibold'>
      <div>
        <h1>Order</h1>
      </div>
      {
        !orders?.[0] && (
          <NoData />
        )
      }
      {
        orders.map((order, index) => {
          return (
            <div key={order._id+"myOrders"+index} className='order rounded p-4'>
              <p>Order No: {order?.orderId}</p>
              <div className='flex gap-3'>
                <img 
                  src={order.product_details.image} 
                  alt="" 
                  className='w-14 h-14'
                />
                <p>{order.product_details.name}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrders