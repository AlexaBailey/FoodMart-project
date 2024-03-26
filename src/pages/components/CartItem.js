import React, { useState, useTransition } from 'react'
import axios from 'axios';
export default function CartCard({product,products,setAllProducts,jwtUser}) {

  const incrementData = async () => {
    try {
      const res = await axios.post(`http://localhost:8800/cart/orders`,null, {params:{sign:'+', pId:product?.pid, cId:jwtUser?.id}});
      

     
      
    } catch (err) {
      console.log(err);
    }
  };
  const decrementData = async () => {
    try {
      const res = await axios.post(`http://localhost:8800/cart/orders`,null, {params:{sign:'-', pId:product?.pid, cId:jwtUser?.id}});
      
    } catch (err) {
      console.log(err);
    }
  } 
  const removeProduct = async () => {
    try {
      console.log("delete")
      const res = await axios.delete(`http://localhost:8800/cart/remove/${product?.pid}/${jwtUser?.id}`,{params:{pid:product?.pid,id:jwtUser?.id}});
        setAllProducts(products.filter(obj=>obj?.pid!=product?.pid))
  
  


     
    


       console.log("Data deleted",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <div className='cartcard'>
        <img className='order-img' src= {product?.prodimage}/>
     

        <div className='description'>
          <h3  style={{marginTop:0}}>{product?.pname}</h3>
          <small>by {product?.brand}</small>
        </div>
        <div className='each'>
            <h3 style={{margin:0}}>Cost per each</h3>
           <h3>${product?.price}</h3>
        </div>
        <div className='quantity'>
            <h3 style={{margin:0}} >Quantity</h3>
            <div className='q-button'>
            <button className='count-button' onClick={incrementData}><span name="sign">+</span></button>
            {product?.quantity}
            <button className='count-button' onClick={decrementData} name="sign">-</button>

            </div>
           <button style={{marginTop:10,border:'none', background:'transparent'}} onClick={()=>removeProduct()}>✘ Clear All</button> 
            </div>
            <div className='total'>
                <h3 style={{margin:0}}>Total Cost</h3>
                {product?.price *product?.quantity}
            </div>
          
           

        </div>
        

    
        

    </>
    
        
  )
}
 