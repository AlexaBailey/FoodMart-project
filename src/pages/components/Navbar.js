import React from 'react'
import jwtDecode from 'jwt-decode';
import setToken from '../utilities/setToken'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {
  let jwtUser;
  if (typeof window!='undefined'){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
      console.log(jwtUser)
        }
}

const [products, setAllProducts] = useState('');  
const [price,setPrice] = useState(0)

useEffect(() => {
 if (jwtUser){
  const fetchOrders = async () => {


    try {
     
      
      const res = await axios.get(`https://foodmart-api-production.up.railway.app/cart/orders`,{params:{id:jwtUser.id}});
      setAllProducts(res.data);
        let sum = products.reduce((accumulator, object) => {
          return accumulator + object.price*object.quantity;
        }, 0);
        setPrice(sum)
  

      
  
      
    } catch (err) {
      console.log(err);
    }
  };
  fetchOrders();

 }
  
}, [products]);





const router = useRouter();

  return (
    <div className='navbar'>
        <Link href="/" className='left'>
        <img src='../../foodmart-icon.png'/>
       
        </Link>
        <div className='right'>
        
        <div className='nav-support'>
            <span className='grey'>For Support</span>
            <span>+375295840610 </span>

             
        </div>
        {
          jwtUser? <>
           <Link href={`/profile/info/${jwtUser.id}`}><img src='../../profile.png'/></Link>
          <Link href={`/wishlist`}> <img src='../../wish.png'/></Link>
         <Link href={`/cart/${jwtUser.id}`}> <img src='../../cart.png'/></Link> 
           <div className='nav-support'>
               <span className='grey'>Your Cart</span>
               <span>{price} $</span>
           </div>
   
          </>:<Link className='custom-link' href={"/login"}>Start Shopping Now {">"}</Link>
          

        }

       
        </div>
      
      
    </div>
  )
}
