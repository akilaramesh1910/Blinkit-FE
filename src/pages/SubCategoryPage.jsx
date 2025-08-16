import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { HiPencil } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAppSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageURL, setImageURL] = useState("")
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })
  const [openConfirmBox, setOpenConfirmBox] = useState(false)

  const fetchSubCategory = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      })

      const {data: responseData} = response;

      if(responseData.success) {
        toast.success(responseData.message)
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({row}) => {
        return <div className='flex justify-center items-center'>
          <img 
            src={row.original.image} 
            alt={row.original.name} 
            className='w-8 h-8 cursor-pointer' 
            onClick={() => {
              setImageURL(row.original.image)
            }}
          />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: "Category",
      cell: ({row}) => {
        return (
          <>
            {
              row.original.category.map((category, index) => {
                return (
                  <p 
                    key={category._id+"table"}
                    className='shadow-md px-1 inline-block'
                  >
                    {
                      category.name
                    }
                  </p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor('_id', {
      header: "Action",
      cell: ({row}) => {
        return(
          <div className='flex items-center justify-center gap-3'>
            <button 
              className='p-2 rounded-full bg-green-100 hover:text-green-600'
              onClick={() => {
                setEditData(row.original)
                setOpenEditSubCategory(true)
              }}
            >
              <HiPencil size={20}/>
            </button>
            <button 
              className='p-2 rounded-full bg-red-100 text-red-500 hover:text-red-600'
              onClick={() => {
                setOpenConfirmBox(true)
                setDeleteSubCategory(row.original)
              }}
            >
              <MdDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })

      const {data: responseData} = response;

      if(responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenConfirmBox(false)
        setDeleteSubCategory({_id: ""})
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Sub Category</h2>
          <button onClick={() => setOpenAppSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 hover:text-white px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable 
          data={data}
          column={column}
        />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel 
            close={() => setOpenAppSubCategory(false)}
            fetchData = {fetchSubCategory}
          />
        )
      }

      {/* <ViewImage 
        url={imageURL}
        close={() => setImageURL("") }
      /> */}

      {
        openEditSubCategory && (
          <EditSubCategory 
            data={editData}
            close={() => setOpenEditSubCategory(false)}
            fetchData={fetchSubCategory}
          />
        )
      }

      {
        openConfirmBox && (
          <ConfirmBox 
            cancel = {() => setOpenConfirmBox(false)}
            close = {() => setOpenConfirmBox(false)}
            confirm = {handleDeleteSubCategory}
          />
        )
      }
    </section>
  )
}

export default SubCategoryPage 