import Link from 'next/link'
import React from 'react'
import axios from "axios";
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
const Login=()=> {


  const router = useRouter()
  axios.defaults.withCredentials =true
  const formik = useFormik({

    initialValues: {

      nickname: '',

      password: '',

    },

    onSubmit: async (values)=> {

      try {
        const {data} = await axios.post("http://localhost:8800/login", values)
        localStorage.setItem("token", data);
      
      
        router.push('/')
        
       
   
      } catch (err) {
  

    }
  },
  validate:values=>{
    let errors = {};
    const regex2 = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
    const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/i;
    if (!values.nickname) {
      errors.nickname = "Cannot be blank";
    } else if (values.nickname.length < 4) {
      errors.nickname = "Username must be more than 4 characters";
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
})


// Creating schema


  
 
  return (
   
          <div className='login'>
        <div className='login-left'>
            <h1 >Welcome to <span style={{color:"#ED8939"}}> FoodMart</span> </h1>

        </div>
        <div className='login-right'>
        <form className='loginform' onSubmit={formik.handleSubmit} > 
      <h1 className='title'>Log into account</h1>
      <h3>Nickname</h3>
      <input className='special-input' onChange={formik.handleChange}  onBlur={formik.handleBlur}
                  value={formik.values.nickname} placeholder='Enter your name' name="nickname"/>
       {formik.errors.nickname ? <p className="error" >
                  {formik.errors.nickname}
                </p> :null}
      <h3>Password</h3>
      <input className='special-input' onChange={formik.handleChange}  onBlur={formik.handleBlur}
                  value={formik.values.password} placeholder='Enter your password' name="password"/>
                  {formik.errors.password ? <p className="error">
                  {formik.errors.password}
                </p> :null} 
      <button className='login-button' type='submit' onClick={formik.handleSubmit}>Submit</button>
      <div className='yet'>
      <span>Not a memeber yet? </span>
      <Link style={{color:'#a16a2c'}} href="/signup" >Sign up</Link>

      </div>
     
    </form>
        </div>
      </div>

    
  
     

    
     
   
   
    
  )
}
export default Login;
