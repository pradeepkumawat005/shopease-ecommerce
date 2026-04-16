import React from 'react'
import { FaRegEyeSlash  , FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({setIsLogedIn , setShowModal}) => {
   const navigate = useNavigate();
   const [formData , setFormData] = useState({email:'' , password:''  });
    const [showPassword , setShowPassword]  = useState(false);
    const [showConfPassword , setShowConfPassword]  = useState(false);
  
    function changeHandler(event){  
          setFormData((prev) => ({
              ...prev,
              [event.target.name]:  event.target.value
          }))
    } 
  
    function submitHandler(event){
      event.preventDefault();
      const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(
            (user) =>
            user.email === formData.email &&
            user.password === formData.password
        );

        if(!validUser){
            toast.error("User not found, please sign up");
            return;
        }

      toast.success('Login successfully');
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      setIsLogedIn(true);
      navigate('/');
      setShowModal(false);
    }
  
  return (
    <div className='login-form' >
        <form onSubmit={submitHandler} >
                <label>
                    <input type='email' placeholder='Email' name='email' value={formData.email} onChange={changeHandler} required />
                </label><br/>
                <label>
                    <input type={showPassword ? 'text' : 'password'} placeholder='password' name='password' value={formData.password} onChange={changeHandler} required />
                    <span onClick={() => setShowPassword(prev => !prev)} className='eyebtn' >
                        {showPassword ? (<FaEye />) : (<FaRegEyeSlash />)} 
                    </span>
                </label><br/>
                <button className='submitbtn'>Submit</button>
        </form>
    </div>
  )
}
