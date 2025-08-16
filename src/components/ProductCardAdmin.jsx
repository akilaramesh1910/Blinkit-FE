import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleCancel = () => {
    setDeleteOpen(false)
  }

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id
        }
      })

      const { data: responseData } = response
      
      if(responseData.success) {
        toast.success(responseData.message)
        if(fetchProductData) {
          fetchProductData()
        }
        setDeleteOpen(false)
      }

    } catch (error){
       AxiosToastError(error)
    }
  }

  return (
    <div className='w-36 p-4 bg-white rounded'>
        <div>
            <img 
                src={data?.image[0]}   
                alt={data.name}
                className='w-full h-full object-scale-down'
            />
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>
        <div className='grid grid-cols-2 gap-3 py-2'>
          <button onClick={() => setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 rounded hover:bg-green-600 '>Edit</button>
          <button onClick={() => setDeleteOpen(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-800 rounded hover:bg-red-600 '>Delete</button>
        </div>

        {
          editOpen && (
            <EditProductAdmin close={() => setEditOpen(false)} data={data} fetchProductData={fetchProductData}/>
          )
        }

        {
          deleteOpen && (
            <section className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-600 bg-opacity-60 p-4 flex items-center justify-center'>
              <div className='bg-white p-4 w-full max-w-md rounded-md'>
                <div className='flex items-center justify-between gap-4'>
                  <h3 className='font-semibold'>Delete Product</h3>
                  <button onClick={() => setDeleteOpen(false)}>
                    <IoClose size={25}/>
                  </button>
                </div>
                <p className='my-2'>Are you sure you want to delete this product permanently?</p>
                <div className='flex justify-end gap-5 py-4'>
                  <button onClick={handleCancel} className='px-3 py-1 border bg-red-100 rounded border-red-500 text-red-500 hover:bg-red-200 hover:text-white'>
                      Cancel
                  </button>
                  <button onClick={handleDelete} className='px-3 py-1 border bg-green-100 rounded border-green-500 text-green-500 hover:bg-green-200 hover:text-white'>
                      Confirm
                  </button>
                </div>
              </div>
            </section>
          )
        }
    </div>
  )
}

export default ProductCardAdmin