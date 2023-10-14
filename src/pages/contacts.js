import React from 'react'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import Navbar from './components/Navbar';
import Infonav from './components/Infonav';

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_105ovjj', 'template_p5hovkf', form.current, 'm-nTF6BspaZIaWyhQ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
    <Navbar/>
    <Infonav/>
    <div className='cont'>
    <div className='contact'  style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <h2>Have questions or suggestions?</h2>
        <h4>Write us and we will follow!</h4>
        
<form ref={form}  onSubmit={sendEmail} style={{alignSelf:'center',display:'flex', justifyContent:'center',flexDirection:'column', margin:6, gap:10}}>
      <p>Your Full Name</p>
      <input className='special-input green' type="text" name="user_name" />
      <p>Email</p>
      <input className='special-input green' type="email" name="myemail" />
      <p>Question/complaint/offer</p>
      <textarea className='special-input green' name="message" />
      <button type='submit' className='save-button'>Send</button>
    </form>
  
    </div>
    </div>

   
    </>
    
  )
}
