import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {useNavigate, Link} from 'react-router-dom'

const ForgotPassword = () => {

  const [data, setData] = useState({
    email: "",
  })

  const navigate = useNavigate()


  const handleChange = (e) => {
    const {name, value} = e.target

    setData((prev) => {
        return{
            ...prev,
            [name]: value
        }
    })
  }

  const validateField = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
        const response = await Axios({
            ...SummaryApi.forgotPassword,
            data: data
        })

        if(response.data.error) {
            toast.error(response.data.message)
        }

        if(response.data.success) {
            toast.success(response.data.message)
            navigate("/otp-verification", {
                state: data
            })
            setData({
                email: "",
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
            <p className='font-semibold text-lg'>Forgot Password</p>

            <form className='grid gap-4' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email" 
                        id="email"
                        autoFocus
                        className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                        name='email'
                        placeholder='Enter your email'
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>

                <button disabled={!validateField} className={`${validateField ? "bg-green-800 hover:bg-green-700" : "bg-gray-400"} text-white rounded font-semibold py-2 cursor-pointer my-3`}>
                    Send OTP
                </button>
            </form>

            <p>
                Already have an account ? <Link className='font-semibold text-green-800 hover:text-green-700' to={"/login"}>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default ForgotPassword