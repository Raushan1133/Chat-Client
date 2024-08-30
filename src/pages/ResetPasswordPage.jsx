import { useState } from 'react';
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ResetPasswordPage = () => {
    const[showPassword, setShowPassword] = useState(false);
    const[showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [checkPassword , setCheckPassword] = useState(true);
    const [checkConfirmPassword , setCheckConfirmPassword] = useState(true);
    const [loading,setLoading] = useState(false);

    const params = useParams();
    const {userId , token} = params;
    

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{8,}$/;
    const [data,setData] = useState({
        password : "",
        confirm_password : "",
      })
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
        e.preventDefault();
        if(!checkConfirmPassword || ! checkPassword){
            toast.error("Please enter valid password");
            return;
        }
        try {
            setLoading(true);
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/reset-password`
            const response = await axios({
                method:'post',
                url:URL,
                data :{
                    password : data.password,
                    id:userId,
                    token:token
                }
            })
            setLoading(false);
            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong , please try again");
        }
      }
  return (
    <div>
      <div className="container">
        <div className='flex max-w-lg mx-auto px-4 justify-center items-center'>
        <form className='w-full grid gap-4 mt-5' onSubmit={handleSubmit}>
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
               className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white  leading-relaxed tracking-wide' type='submit'
              >
                {loading ? <div className='flex justify-center items-center py-1'><div className='h-6 w-6 rounded-full border-t-transparent animate-spin border-2 border-white'></div></div> : <div>Reset Password</div>}
              </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
