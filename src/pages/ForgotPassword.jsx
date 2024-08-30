import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import EmailImg from '../assets/emailimg.gif'

const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const[help,setHelp ] =useState(false);
    const[loading,setLoading] = useState(false);

      const handleOnChange = (e)=>{
        setEmail(e.target.value)
      }

      const handleSubmit = async()=>{
       try {
        if(email){
            setLoading(true);
            const response = await axios({
                method:'post',
                url:`${process.env.REACT_APP_BACKEND_URL}/api/send-reset-password-link`,
                data:{
                    email : email
                }
            })
            setLoading(false);
            if(response.data.success){
                toast.success(response.data.message);
                setEmail("")
            }else{
                toast.error(response.data.message)
            }
            
        }else{
            toast.error("Please enter email ")
        }
       } catch (error) {
        setLoading(false);
        toast.error("Something went wrong ! , try again later");
       }
      }
  return (
    <div className='container'>
                <div className="flex max-w-xl flex-col gap-10 px-4 mt-10  mx-auto ">
                    <div className='flex flex-col gap-1 w-full mx-auto'>
                        <div className='flex mx-auto'>
                        <img src={EmailImg } className='h-32 w-32 scale-150 mix-blend-multiply' alt="email gif" />
                        </div>
                    </div>
                <div className='flex flex-col gap-1 w-full'>
                <label htmlFor='password'>Email :</label>
                <div className='relative'>
                <input
                  type="email"
                  id='email'
                  name='email'
                  placeholder='enter your email' 
                  className='bg-slate-100 px-2 py-1 w-full focus:outline-primary'
                  value={email}
                  onChange={handleOnChange}
                  required
                />
                  </div>
              </div>
        <div className='flex gap-3 flex-col'>
          <button onClick={handleSubmit} className='bg-primary hover:bg-blue-500 text-white w-full px-6 py-2  rounded-full transition-all mx-auto block'>{loading ? (<div className='flex justify-center'>
       <div className='h-6 w-6 border-[3px] rounded-full animate-spin text-center border-red-white border-t-[transparent]'>
       </div>
    </div>): (<div>Send</div>)}</button>
    <small onClick={()=>setHelp(!help)} className='text-red-600 underline cursor-pointer ml-auto'>Not received password reset link ?</small>
    
    {
      help && (
      <div className='pt-3'>
      <p>1. Check your internet connection.</p>
      <p>2. Check your email spam mails section.</p>
      <p>3. Try again later.</p>
    </div>
      )
    }
          </div>
        </div>
    </div>
  )
}

export default ForgotPassword
