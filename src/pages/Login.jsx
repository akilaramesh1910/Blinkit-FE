import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


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
        console.log('Attempting login with data:', data);
        const response = await Axios({
            ...SummaryApi.login,
            data: data
        });

        console.log('Login response:', response);

        if(response.data.error) {
            console.error('Login error:', response.data.message);
            toast.error(response.data.message);
            return; // Exit early on error
        }

        if(response.data.success) {
            const { accessToken, refreshToken } = response.data.data;
            console.log('Login successful, tokens received:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
            
            // Store tokens
            localStorage.setItem('accesstoken', accessToken);
            localStorage.setItem('refreshtoken', refreshToken);

            console.log('Fetching user details...');
            const userDetails = await fetchUserDetails();
            console.log('User details response:', userDetails);

            if (userDetails?.data) {
                console.log('Dispatching user details:', userDetails.data);
                dispatch(setUserDetails(userDetails.data));
                
                // Clear form
                setData({
                    email: "",
                    password: "",
                });
                
                // Navigate to home
                navigate("/");
                toast.success("Login successful!");
            } else {
                console.error('No user data received:', userDetails);
                toast.error("Failed to load user details");
                // Clear tokens if we can't get user details
                localStorage.removeItem('accesstoken');
                localStorage.removeItem('refreshtoken');
            }
        }
    } catch(error) {
        console.error('Login error:', error);
        AxiosToastError(error);
    }
  }

  return (
    <section className='w-full conatiner mx-auto px-2'>
        <div className='bg-white my-2 w-full max-w-lg mx-auto rounded p-7'>
            <p>Welcome to Blinkit</p>

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
                    <Link to={"/forgot-password"} className='block ml-auto hover:text-green-700 text-1xl'>
                        Forgot Password
                    </Link>
                </div>

                <button disabled={!validateField} className={`${validateField ? "bg-green-800 hover:bg-green-700" : "bg-gray-400"} text-white rounded font-semibold py-2 cursor-pointer my-3`}>
                    Login
                </button>
            </form>

            <p>
                Don't have an account ? <Link className='font-semibold text-green-800 hover:text-green-700' to={"/register"}>Register</Link>
            </p>
        </div>
    </section>
  )
}

export default Login