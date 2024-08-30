import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Typewriter } from 'react-simple-typewriter'
import profile_gif from '../assets/profile_pic.webp'
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const RegisterPage = () => {
  const [loading,setLoading] = useState(false);
  const [imgLoading,setImgLoading] = useState(false);
  const[showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword , setShowConfirmPassword] = useState(false);
  const [checkPassword , setCheckPassword] = useState(true);
  const [checkConfirmPassword , setCheckConfirmPassword] = useState(true);
  const [checkName , setCheckName] = useState(true);
  const[checkEmail , setCheckEmail ] = useState(true);
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    confirm_password : "",
    profile_pic : "",
  })
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;

  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]
    
    setImgLoading(true)
    const uploadPhoto = await uploadFile(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
    setImgLoading(false);
  }

  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setData((preve)=>{
      return{
        ...preve,
        profile_pic : ""
      }
    })
  }

  const handleSubmit = async(e)=>{
    
    e.preventDefault()
    e.stopPropagation()
    if(!checkName || !checkEmail || !checkPassword || !checkConfirmPassword){
      toast.error("Please enter valid info!")
      return;
    }
    setLoading(true);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
    try {
        data.name = data.name.trim();
        data.name = data.name[0].toUpperCase() + data.name.slice(1);
        const response = await axios.post(URL,data)
        setLoading(false);
        toast.success("Registered successful")
        if(response.data.success){
            setData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {
      setLoading(false);
        toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
          <h3 className='text-primary font-semibold'><Typewriter
            words={['Welcome to Talkera!']}
            loop={false}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            /></h3>
          <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>

            <div className='flex justify-center'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>
                  {
                    data?.profile_pic? <div className='h-28 relative rounded-full overflow-hidden  w-28 bg-slate-300 flex justify-center items-center border hover:border-primary cursor-pointer'>
                    <div className='h-full w-full flex justify-center items-center'>
                      {
                       <div> 
                        <img src={data?.profile_pic} alt='profile pic' className='rounded-full h-full w-full object-scale-down '/>
                        <div className='absolute text-2xl text-red-600 left-16 top-16 z-10'>
                        <button title='remove photo' className='text-4xl font-bold bg-white rounded-full   hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <MdDelete/>
                          </button>
                        </div></div>
                      }
                    </div>
                      
                    
                </div> : <div className='h-28 relative rounded-full overflow-hidden  w-28 bg-slate-300 flex justify-center items-center border hover:border-primary cursor-pointer'>
                  {
                    imgLoading ? <div>                     <div className='h-full w-full'>
                    <img src={profile_gif} alt='profile pic' className='scale-125 rounded-full '/>
                  </div>
                    <div className='absolute text-4xl text-primary left-12 top-12 z-10 '><div className='flex justify-center items-center py-1'><div className='h-6 w-6 rounded-full border-t-transparent animate-spin border-4 border-primary'></div></div></div></div> :  <div><div className='h-full w-full'>
                    <img src={profile_gif} alt='profile pic' className='scale-125 rounded-full '/>
                  </div>
                    <div className='absolute text-2xl text-primary left-16 top-16 z-10'><FaCamera/></div></div>
                  }

                </div>
                  }
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>
            </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name :</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Enter name' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.name}
                  onChange={(e)=>{handleOnChange(e);setCheckName(e.target.value.length >= 2)}}
                  required
                />
                        {
                            !checkName && (
                                <small className='text-red-600 transition-all'>Invalid Name !</small>
                            )
                        }
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter email' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.email}
                  onChange={(e)=>{handleOnChange(e);setCheckEmail(emailRegex.test(e.target.value))}}
                  required
                />
                {
                  !checkEmail && (
                    <small className='text-red-600 transition-all'>Invalid Email !</small>
                )
                }
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='password'>Password :</label>
                <div className='relative w-full'>
                <input
                  type= {showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  placeholder='create a strong password' 
                  className='bg-slate-100 px-2 w-full py-1 focus:outline-primary'
                  value={data.password}
                  onChange={(e)=>{handleOnChange(e); setCheckPassword(passwordRegex.test(e.target.value))}}
                  required
                />
                <div className='cursor-pointer text-xl absolute top-1.5 right-1 ' onClick={()=>{setShowPassword(!showPassword)}}>
                            <span>
                                {
                                    showPassword ? (
                                        <FaEyeSlash />
                                    ): (
                                        <FaEye />
                                    )
                                }
                            </span>
                  </div>

                </div>
                {
                            !checkPassword && (
                                <small className='text-red-600 transition-all'>Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character (!@#$%^&*)</small>
                            )
                        }
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='confirm_password'>Confirm password :</label>
                <div className='relative'>
                <input
                  type= {showConfirmPassword ? "text" : "password"}
                  id='confirm_password'
                  name='confirm_password'
                  placeholder='Enter confirm password' 
                  className='bg-slate-100 px-2 py-1 w-full focus:outline-primary'
                  value={data.confirm_password }
                  onChange={(e)=>{handleOnChange(e);setCheckConfirmPassword(data.password === e.target.value)}}
                  required
                />

                    <div className='cursor-pointer text-xl absolute top-1.5 right-2 ' onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}>
                            <span>
                                {
                                    showConfirmPassword ? (
                                        <FaEyeSlash />
                                    ): (
                                        <FaEye />
                                    )
                                }
                            </span>
                  </div>

                </div>
                {
                            !checkConfirmPassword && (

                                <small className='text-red-600'>Password and confirm password not matched </small>
                            )
                        }
              </div>


              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white  leading-relaxed tracking-wide'
              >
                {loading ? <div className='flex justify-center items-center py-1'><div className='h-6 w-6 rounded-full border-t-transparent animate-spin border-2 border-white'></div></div> : <div>Register</div>}
              </button>

          </form>

          <p className='my-3 text-center'>Already have an account ? <Link to={"/email"} className=' underline text-primary font-semibold '>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage
