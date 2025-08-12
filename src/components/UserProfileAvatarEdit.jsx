import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { useDispatch } from 'react-redux'
import { updatedAvatar } from '../store/userSlice'
import { IoClose } from 'react-icons/io5'
import toast from 'react-hot-toast'

const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector(state => state?.user)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0]

    if(!file) {
        return
    }

    const formData = new FormData()
    formData.append("avatar", file)

    try {
        setLoading(true)
        const response = await Axios({
            ...SummaryApi.uploadAvatar,
            data: formData
        })

        const {data: responseData} = response

        dispatch(updatedAvatar(responseData.data.avatar))
        toast.success(responseData.message)
    } catch (error) {
        AxiosToastError(error)
    } finally {
        setLoading(false)
    }
    
  }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full p-4 rounded flex flex-col items-center justify-center'>
            <button onClick={close} className='text-neutral-800 block w-fit ml-auto'>
                <IoClose size={25}/>
            </button>
           <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                   {
                     user.avatar ? (
                       <img 
                         src={user.avatar} 
                         alt={user.name} 
                         className='w-full h-full'
                       />
                     ) : (
                       <FaRegUserCircle size={65} />
                     )
                   }
            </div>
            <form onSubmit={handleSubmit} >
                <label htmlFor="uploadProfile">
                  <div className='border cursor-pointer border-primary-200 hover:bg-primary-200 px-2 py-1 rounded text-sm my-3'>
                    {
                        loading ? "Uploading..." : "Upload"
                    }
                  </div>
                </label>
                <input onChange={handleUploadAvatarImage} type="file" id="uploadProfile" className='hidden' />
            </form>
        </div>
    </section>
  )
}

export default UserProfileAvatarEdit