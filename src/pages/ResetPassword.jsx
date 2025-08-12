import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'

const ResetPassword = () => {

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const validateField = Object.values(data).every(el => el)

  useEffect(() => {
    // if(!(location?.state?.data?.success)) {
    //     navigate("/")
    // }

    if(location?.state?.email) {
        setData((prev) => {
            return {
                ...prev,
                email: location?.state?.email
            }
        })
    }
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target

    setData((prev) => {
        return{
            ...prev,
            [name]: value
        }
    })
  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(data.newPassword !== data.confirmPassword) {
        toast.error("New Password and Confirm Password does not match")
        return
    }

    try {
        const response = await Axios({
            ...SummaryApi.resetPassword,
            data: data
        })

        if(response.data.error) {
            toast.error(response.data.message)
        }

        if(response.data.success) {
            toast.success(response.data.message)
            navigate("/login", {
                state: data
            })
            setData({
                email: "",
                newPassword: "",
                confirmPassword: ""
            })
        }
    }
    catch(error) {
        console.log(error)
        AxiosToastError(error)
    }
  }

  return (
    <section className='w-full conatiner mx-auto px-2'>
        <div className='bg-white my-2 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold text-lg'>Enter Your New Password</p>

            <form className='grid gap-4' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="newPassword">New Password: </label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            autoFocus
                            className='w-full outline-none'
                            name='newPassword'
                            value={data.newPassword}
                            onChange={handleChange}
                            placeholder='Enter your new password'
                        />
                        <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
                            {
                                showPassword ? (<IoMdEye />) : ( <IoMdEyeOff />)
                            }
                        </div>
                    </div>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="password">Password: </label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            id="password"
                            autoFocus
                            className='w-full outline-none'
                            name='confirmPassword'
                            placeholder='Enter your confirm password'
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                        <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
                            {
                                showConfirmPassword ? (<IoMdEye />) : ( <IoMdEyeOff />)
                            }
                        </div>
                    </div>
                    <Link to={"/forgot-password"} className='block ml-auto hover:text-green-700 text-1xl'>
                        Forgot Password
                    </Link>
                </div>

                <button disabled={!validateField} className={`${validateField ? "bg-green-800 hover:bg-green-700" : "bg-gray-400"} text-white rounded font-semibold py-2 cursor-pointer my-3`}>
                    Change Password
                </button>
            </form>

            <p>
                Already have an account ? <Link className='font-semibold text-green-800 hover:text-green-700' to={"/login"}>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default ResetPassword