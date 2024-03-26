import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function WishProduct({product,jwtUser,setAllProducts,products}) {
 



const [bought,setBought]=useState(0)

  useEffect(()=>{


    const getData = async () => {
      


      try { 
        console.log("id",jwtUser.id)
      
    
        
        const res = await axios.get(`https://foodmart-api-production.up.railway.app//quantity/${product?.pid}/${jwtUser.id}`,{params:{userid:jwtUser.id, id:product?.pid}});
          if (res.data.length>0){
            setBought(Number(res.data[0].num))


          }
          else{
            setBought(res.data)
          }
          
 

        
       
  
         console.log("Data",res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getData();


  }, []); 
 const router =useRouter()

 const incrementData = async () => {
  try {
    
    const res = await axios.post(`https://foodmart-api-production.up.railway.app//cart/orders`,null, {params:{sign:'+', pId:product?.pid, cId:jwtUser.id}});
    setBought(curr=>curr+1)


   
    
  } catch (err) {
    console.log(err);
  }
};
const decrementData = async () => {
  try {
  
    const res = await axios.post(`https://foodmart-api-production.up.railway.app//cart/orders`,null, {params:{sign:'-', pId:product?.pid, cId:jwtUser.id}});
    setBought(curr=>curr-1)

  } catch (err) {
    console.log(err);
  }
} 


  const removeLike = async () => {
    try {

    
     


      
       const res = await axios.post(`https://foodmart-api-production.up.railway.app//disliked/${product.pid}/${jwtUser.id}`,{ id: product?.pid, userid:jwtUser.id});
       setAllProducts(products.filter(obj=>obj.pid!=product?.pid))

    } catch (err) {
      console.log(err);
    }
  };
 
 
 
  return (
    <div className='productcover' style={{display:'flex',flexDirection:'column', alignItems:'flex-heartt' ,  padding:10, paddingTop:0}}>

        <div style={{display:'flex', alignSelf:'center'}}>
            <img className='order-img' src={product?.prodimage}/>
        </div>
        <h3 style={{marginBottom:2}}>{product?.pname}</h3>
        <small style={{color:'gray'}}>by {product?.brand}</small>
        <div style={{display:'flex',gap:3, alignItems:'center'}}>

        <h3>{product?.price} $ </h3>
        <span>/ {product?.weight}</span>
      </div>
        <div style={{display:'flex',gap:6, alignItems:'center'}}>
            <button className='count-button' onClick={()=>incrementData()}>
                +

            </button>
            <span>{bought && bought!=''?bought:"0"}</span>
            <button className='count-button'  onClick={()=>decrementData()}>-</button>
        </div>
        <div style={{display:'flex',gap:6,marginTop:10}}>
        <button className='prod-button' onClick={()=>incrementData()}><span>Add to cart</span><img src='../smallcart.png'/></button>
       <button onClick={()=>removeLike()} style={{background:'transparent',border:'none'}}><img src='../redheart.png'/></button>
       <button className='prod-button' onClick={()=>removeProduct()}><img style={{height:35}} src='../../trash.png'/></button>
        </div>
       
    </div>
  )
}
