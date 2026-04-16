import React, { useState } from 'react';
import { FaRegEyeSlash  , FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const SignUpForm = ({setIsLogedIn , setShowModal}) => {
  const navigate = useNavigate();
  const [formData , setFormData] = useState({firstName:'', lastName:'', email:'' , password:'' , conformPassword:'' , policy:false });
  const [showPassword , setShowPassword]  = useState(false);
  const [showConfPassword , setShowConfPassword]  = useState(false);

  function changeHandler(event){
    const {name , value , type , checked} = event.target;
  
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
  }

  function submitHandler(event){
    event.preventDefault();
    if(formData.password !== formData.conformPassword){
        toast.error('Password Not matched');
        return;
    }

    if(!formData.policy){
      toast.error('Please accept terms & policy');
      return;
    }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find(
      (user) => user.email === formData.email
    ); 

      if(userExists){
    toast.error("User already exists, please login");
    return;
  }

  // 🔥 Create unique ID
  const newUser = {
    id: Date.now(), // unique id
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password
  };
 

  //Save user
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  toast.success('Account Created');



    toast.success('Account Created');
    setIsLogedIn(true);
    navigate('/');
    setShowModal(false);
  }

  

  return (
    <div className='signupForm login-form'>
         <form onSubmit={submitHandler} >
            <div className='top-feilds'>
                <label>
                  <input type='text' placeholder='First name' name='firstName' value={formData.firstName} onChange={changeHandler} required />
                </label>
                 <label>
                  <input type='text' placeholder='Last name' name='lastName' value={formData.lastName} onChange={changeHandler} required />
                </label>
            </div>
            <label>
                <input type='email' placeholder='Email' name='email' value={formData.email} onChange={changeHandler} required />
            </label><br/>
            <label>
                <input type={showPassword ? 'text' : 'password'} placeholder='password' name='password' value={formData.password} onChange={changeHandler} required />
                <span onClick={() => setShowPassword(prev => !prev)} className='eyebtn' >
                   {showPassword ? (<FaEye />) : (<FaRegEyeSlash />)} 
                </span>
            </label><br/>
                <label>
                <input type={showConfPassword ? 'text' : 'password'} placeholder='password' name='conformPassword' value={formData.conformPassword} onChange={changeHandler} required />
                <span onClick={() => setShowConfPassword(prev => !prev)} className='eyebtn' >
                   {showConfPassword ? (<FaEye />) : (<FaRegEyeSlash />)} 
                </span>
            </label><br/>
            <label className='policybox'>
                <input type='checkbox' placeholder='Email' name='policy' checked={formData.policy}  onChange={changeHandler}  />
                <span>I accept the Terms of Service and Privacy Policy</span>
            </label><br/>
           <button className='submitbtn'>Submit</button>
         </form>
    </div>
  )
}
