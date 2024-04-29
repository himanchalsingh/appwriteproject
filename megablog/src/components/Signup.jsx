import React, { useState}from 'react'
import authService  from '../appwrite/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
function Signup() {
    const navigate =useNavigate()
    const [error,setError]=useState("")
    const dispatch= useDispatch()
    const {register,handleSubmit}=useForm();

    const create =async(data)=>{
        setError("")
        try {
           await authService.createAccont(data)
           if(userData){
            const userData =await authService.getCurrentUser()
            if(userData)dispatch(login(userData));
            navigate('/')
           } 
        } catch (error) {
            setError(error);
        }
    }
  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-log
      bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign up to your Account
        </h2>
      
      <p className='mt-2 text-center text-base text-black/60'>
        Already have  an account?&nbsp;
        <Link
        to='/login'
        className='font-medium text-primary 
        transition-all duration-200 
        hover:underline'
        >Sign Ip</Link>
      </p>
     {error && <p className='text-red-600 mt-8 text-center' >{error}</p>}

     <form action="" onSubmit={handleSubmit(create)}>
        <div className='space-y-5'>
            <Input label="Full Name :" 
            Placeholder="Enter your full name" {
                ...register("name",{
                    required:true,
                })
            }>
            </Input>
{/* email */}
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

            {/* password */}
            <Input 
            label="password" 
            type="password"
            placeholder="enter your password"
            {...register("oassword",{
                required:true,
            })}/>
            <Button  type="submit" className='"w-full'>Create Account</Button>
        </div>
     </form>

      </div>
    </div>
  )
}

export default Signup
