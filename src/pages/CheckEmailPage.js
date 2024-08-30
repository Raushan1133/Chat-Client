import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import { Typewriter } from 'react-simple-typewriter';

const CheckEmailPage = () => {
  const [data,setData] = useState({
    email : "",
  })
  const [loading,setLoading] = useState(false);
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

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
        setLoading(true);
        const response = await axios.post(URL,data)
        
        toast.success(response.data.message)
        setLoading(false);

        if(response.data.success){
            setData({
              email : "",
            })
            navigate('/password',{
              state : response?.data?.data
            })
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

            <div className='w-fit mx-auto mb-2'>
                <PiUserCircle
                  size={80}
                />
            </div>

         

          <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
              

              <div className='flex flex-col gap-1'>
                <label htmlFor='email'>Email :</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='enter your email' 
                  className='bg-slate-100 px-2 py-1 focus:outline-primary'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                {loading ? <div className='flex justify-center items-center py-1'><div className='h-6 w-6 rounded-full border-t-transparent animate-spin border-2 border-white'></div></div> : <div>Next</div>}
              </button>

              <Link to={'/register'}
               className='bg-primary text-center text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                create new account
              </Link>

          </form>
        </div>
    </div>
  )
}

export default CheckEmailPage
