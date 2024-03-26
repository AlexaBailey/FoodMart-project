import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Infonav from '../components/Infonav'
import { useEffect } from 'react'
import CartCard from '../components/CartItem'
import axios from 'axios'
import setToken from '../utilities/setToken'
import jwtDecode from 'jwt-decode'
import Order from '../components/Order'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'

export default function Cart() {
  const [hasMounted, setHasMounted] = useState(false);
  const router =useRouter()
  let jwtUser;
  if (typeof window!='undefined'){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
  }
    
  }

   
        const [products, setAllProducts] = useState('');  
        const [price,setPrice] = useState(0)

        useEffect(() => {
          setHasMounted(true)
         
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
        }, [products]);
        
        


          
       if (hasMounted){
    
        


        return (
          <div>
              <Navbar/>
              <div className='back' onClick={()=>router.push('/')}>
              <img className='back-image' src="../../back-arrow.png"/>
                  <h2>Back to Products</h2>
                
              
              </div>
              
              <hr style={{margin:0}}/>
              <h2 style={{paddingLeft:40}}>Shopping Cart</h2>
              <p style={{paddingLeft:40}}>You have {products.length} items in your cart</p>
              <div className='all-cart'>
              <div className='cart'>
              {products!='' ? products.map((product) => {
                

          return(
          
            <CartCard 
              key={product.pid}
              product = {product}
              jwtUser={jwtUser}
              setAllProducts={setAllProducts}

              />  
             
        
              
              
              
              )}):
                <div className='empty'>
                    <p>Your</p>
                  <img src="../../basket.png"/>
                  <p> is empty!</p>
                  <span style={{color:'darkgreen'}}>Do you first purchase!</span>
                  </div> }
                  
              </div>
              <div className='check'>
                <Order price={price}/>
           

            </div>
              
      


              </div>
              <Footer/>
             
          </div>
        )
      }
else{
  return null
}      
        
}