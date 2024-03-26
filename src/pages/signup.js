import Link from 'next/link'
import React, { useState } from 'react'

import axios from 'axios'
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Router, useRouter } from 'next/router';
export default function Signup() {

  axios.defaults.withCredentials = true;

const [role,setRole]=useState('')

const router=useRouter()
  const formik = useFormik({

    initialValues: {

      nickname: '',

      email: '',

      password: '',
      address: '',


      role:role,

    },

    onSubmit: async (values)=> {

      try {
        await axios.post("https://foodmart-api-production.up.railway.app//signup", values);
        router.push('/login')
   
      } catch (err) {
  

    }
  },
  validate:values=>{
    let errors = {};
    const regex1 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
    const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i;
    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex1.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.nickname) {
      errors.nickname = "Cannot be blank";
    } else if (values.nickname.length < 4) {
      errors.nickname = "nickname must be more than 4 characters";
    }
    else if (!regex2.test(values.nickname)){
      errors.nickname = "Start with letters, exclude symbols"
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 7) {
      errors.password = "Password must be more than 7 characters";
    }
    else if (!regex3.test(values.password)){
      errors.password = "Use uppercase, lowercase, symbols and numbers";

    }
    return errors;
  }

  
  }
)


  return (
  
    <div className='login'>
    <div className='signup-left'>
        <h1 >Welcome to <span style={{color:"#ED8939"}}> FoodMart</span> </h1>

    </div>
    <div className='signup-right'>
    <form className='loginform sig' onSubmit={formik.handleSubmit} > 
  <h1 className='title'>Create your account</h1>
  <h3>Nickname</h3>
  <input className='special-input' onChange={formik.handleChange}  onBlur={formik.handleBlur}
              value={formik.values.nickname} placeholder='Create your nickname' name="nickname"/>
   {formik.errors.nickname ? <small className="error" >
              {formik.errors.nickname}
            </small> :null}
<h3>Target role</h3>
            <div  className="selecti">
      
            
      <label>
    <select  name='role'  value={role} onChange={formik.handleChange}>
    <option id="0"  onClick={()=>setRole('')} >Seller/customer</option>
    <option id="1"  onClick={()=>setRole('Seller')} >Seller</option>
    <option id="2"  onClick={()=>setRole('Customer')} >Customer</option>

   
      </select>
      </label>
      </div>
            <h3>Email</h3>
  <input className='special-input' onChange={formik.handleChange}  onBlur={formik.handleBlur}
              value={formik.values.email} placeholder='Enter your email' name="email"/>
   {formik.errors.email ? <small className="error" >
              {formik.errors.email}
            </small> :null}
  <h3>Password</h3>
  <input className='special-input' onChange={formik.handleChange}  onBlur={formik.handleBlur}
              value={formik.values.password} placeholder='Create your password' name="password"/>
              {formik.errors.password ? <small className="error">
              {formik.errors.password}
            </small> :null} 
            <h3>Delivery Address</h3>
  <input className='special-input' onChange={formik.handleChange}  onBlur={formik.handleBlur}
              value={formik.values.address} placeholder='Enter your Address' name="address"/>
              {formik.errors.address ? <small className="error">
              {formik.errors.address}
            </small> :null} 
  <button className='login-button sig' type='submit' onClick={formik.handleSubmit}>Submit</button>
  <div className='yet'>
  <span>Already a memeber? </span>
      <Link  style={{color:'#a16a2c'}} href="/login" className='sign'>Log In</Link>
     

  </div>
 
</form>
    </div>
  </div>
   
    
  )
}
