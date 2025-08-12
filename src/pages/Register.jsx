import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {useNavigate, Link} from 'react-router-dom'

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    if(data.password !== data.confirmPassword) {
        toast.error(
            "Password & ConfirmPassword must be same"
        )
        return
    }

    try {
        const response = await Axios({
            ...SummaryApi.register,
            data: data
        })

        if(response.data.error) {
            toast.error(response.data.message)
        }

        if(response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            navigate("/login")
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
            <p>Welcome to Blinkit</p>

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type="text" 
                        id="name"
                        autoFocus
                        className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                        name='name'
                        placeholder='Enter your name'
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>

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

                <div className='grid gap-1'>
                    <label htmlFor="password">Password: </label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoFocus
                            className='w-full outline-none'
                            name='password'
                            placeholder='Enter your password'
                            value={data.password}
                            onChange={handleChange}
                        />
                        <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
                            {
                                showPassword ? (<IoMdEye />) : ( <IoMdEyeOff />)
                            }
                        </div>
                    </div>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                        <input 
                            type= {showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            autoFocus
                            className='w-full outline-none'
                            // className='w-full bg-blue-50 p-2 border rounded  outline-none focus-within:border-primary-200'
                            name='confirmPassword'
                            placeholder='Confirm your password'
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                        <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
                            {
                                showConfirmPassword ? (<IoMdEye />) : ( <IoMdEyeOff />)
                            }
                        </div>
                    </div>
                </div>

                <button disabled={!validateField} className={`${validateField ? "bg-green-800 hover:bg-green-700" : "bg-gray-400"} text-white rounded font-semibold py-2 cursor-pointer my-3`}>
                    Register
                </button>
            </form>

            <p>
                Already have an account ? <Link className='font-semibold text-green-800 hover:text-green-700' to={"/login"}>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default Register