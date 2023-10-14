import React from 'react'
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();
    return(
    <div className='footer'>
        <div className='f-all'>
        <div className='companyform'>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <img src='../../foodmart-icon.png'/>

<img src='../../social.png'/>

            </div>
  
        

        </div>
        <div className='f1'>
            <span style={{fontWeight:'bold'}}>Shop</span>
            <span>Contacts</span>
            <span>Services</span>
            <span>Offers</span>
            <span>Login</span>
            <span>Signup</span>
            
        </div>
        <div className='f2'>
            <span style={{fontWeight:'bold'}}>About</span>
            <span>About</span>
            <span>Partner Program</span>
            <span>Sell your products</span>
            <span>Jobs</span>
            
            
        </div>
        <div className='f3'>
            <span style={{fontWeight:'bold'}}>Help</span>
            <span>Delivery</span>
            <span>Returns</span>
            <span>Help Center</span>
            <span>Copyright</span>
            <span>Contact Us</span>
            
        </div>
        <div className='f3'>
            <span style={{fontWeight:'bold'}}>Social</span>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Twitter</span>
            <span>Pinterest</span>
         
            
        </div>
       
       
        
    
        
        </div>
        
        
        
        
        
        

       
    </div>
  )
}
