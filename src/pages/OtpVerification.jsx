import React, { useEffect, useRef, useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {useNavigate, Link, useLocation} from 'react-router-dom'

const OtpVerification = () => {

  const [data, setData] = useState(["", "", "", "", "",""])

  const navigate = useNavigate()
  const inputRef = useRef([])

  const validateField = data.every(el => el)
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
        const response = await Axios({
            ...SummaryApi.forgot_password_otp_verification,
            data: {
                otp: data.join(''),
                email: location?.state?.email
            }
        })

        if(response.data.error) {
            toast.error(response.data.message)
        }

        if(response.data.success) {
            toast.success(response.data.message)
            setData(["", "", "", "", "",""])
            navigate("/reset-password", {
                state: {
                    data: response.data,
                    email: location?.state?.email
                }
            })
        }
    }
    catch(error) {
        console.log(error)
        AxiosToastError(error)
    }
  }

  useEffect(() => {
    if(!location?.state?.email) {
        navigate("/forgot-password")
    }
  })

  return (
    <section className='w-full conatiner mx-auto px-2'>
        <div className='bg-white my-2 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold text-lg'>OTP Verification</p>

            <form className='grid gap-4' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="otp">Enter your OTP:</label>

                    <div className='flex items-center gap-2 justify-between t-3'>
                        {
                            data.map((el, index) => {
                                return(            
                                    <input 
                                        key={"otp" + index}
                                        type="text" 
                                        id="otp"
                                        ref={(ref) => {
                                            inputRef.current[index] = ref
                                            return ref
                                        }}
                                        value={data[index]}
                                        onChange={(e) => {
                                                const value = e.target.value
                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)

                                                if(value && index < 5) {
                                                    inputRef.current[index + 1].focus()
                                                }
                                            }
                                        }
                                        maxLength={1}
                                        autoFocus
                                        className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus-within:border-primary-200 text-center font-semibold'
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <button disabled={!validateField} className={`${validateField ? "bg-green-800 hover:bg-green-700" : "bg-gray-400"} text-white rounded font-semibold py-2 cursor-pointer my-3`}>
                    verify OTP
                </button>
            </form>

            <p>
                Already have an account ? <Link className='font-semibold text-green-800 hover:text-green-700' to={"/login"}>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default OtpVerification