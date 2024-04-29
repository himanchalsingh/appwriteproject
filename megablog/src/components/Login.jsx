import React ,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button , Input,Logo} from './index'
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
function Login() {
    const navigate =useNavigate();
    const dispatch =useDispatch();
    const {register,handdleSubmit} =useForm();
    const [error,setError] =useState("")
    const login=async(data)=>{
        setError("")
        try {
            const  session = await authService.login(data)
           if(session){
                const userData =await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(authLogin))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div 
    className='flex items-center justify-center w-full'
    >  
    <div className='mx-auto w-full max0w-lg bg-gray-100 rounded-xl
    p-10 border border-black/10'>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sing in to your Account
        </h2>
      
      <p className='mt-2 text-center text-base text-black-60'>
        Don&apos;t have any account?&nbsp;
        <Link
        to='/signup'
        className='font-medium text-primary 
        transition-all duration-200 
        hover:underline'
        >Sign Up</Link>
      </p>
      {error&& <p className='text-red-600 mt-8 text-center' >{error}</p>}

       <form action="" onSubmit={handdleSubmit(login)} className='mt-8'>
             <div className='space-y-5'>
            <Input 
            label='Email'
            placeholder="Enter your email"
            type="email"
            {//... mean is spread if we not use here then value of any other form value will overwrite it So use it every
                ...register("email" ,{
                    requried:true,
                    validate:{
                        matchPatern:(value)=>
                         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.
                         test(value) || "Email address must be valid address ",
                    }                 
                }
            )//email or other vallue data is transfer here to 
            }
            />
            <Input label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password",{
                requried:true
              })}
              />
              <Button type='submit' className='w-full'>Sign In</Button>
             </div>
       </form>
    </div>
    </div>
  )
}

export default Login
