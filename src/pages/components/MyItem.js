import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ProductItem({product,jwtUser,favourite,setAllProducts,products}) {
 

  
const [heart,setHeart]=useState(false)

const [bought,setBought]=useState(0)

  useEffect(()=>{
  if (favourite.length>0){
    setHeart(true)
    console.log("favourite",favourite)

  }

    const getData = async () => {
      


      try { 

      
    
        
        const res = await axios.get(`https://foodmart-api-production.up.railway.app//quantity/${product?.pid}/${jwtUser?.id}`,{params:{userid:jwtUser?.id, id:product?.pid}});
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
 console.log(favourite)
 const router =useRouter()

 const incrementData = async () => {
  try {
    
    const res = await axios.post(`https://foodmart-api-production.up.railway.app//cart/orders`,null, {params:{sign:'+', pId:product?.pid, cId:jwtUser?.id}});
    setBought(curr=>curr+1)


   
    
  } catch (err) {
    console.log(err);
  }
};
const decrementData = async () => {
  try {
  
    const res = await axios.post(`https://foodmart-api-production.up.railway.app//cart/orders`,null, {params:{sign:'-', pId:product?.pid, cId:jwtUser?.id}});
    setBought(curr=>curr-1)

  } catch (err) {
    console.log(err);
  }
} 

  const addLike = async () => {
    try {
    
        setHeart(true)      
      
       const res=await axios.post(`https://foodmart-api-production.up.railway.app//liked/${product?.pid}/${jwtUser.id}/${product?.usersid}`,{ id: product?.pid, userid:jwtUser.id, sellerid:product?.usersid});
     
    } catch (err) {
      console.log(err);
    }
  };
  const removeLike = async () => {
    try {

    
     
   setHeart(false)


      
       const res = await axios.post(`https://foodmart-api-production.up.railway.app//disliked/${product?.pid}/${jwtUser.id}`,{ id: product?.pid, userid:jwtUser.id});
       
    } catch (err) {
      console.log(err);
    }
  };
  const removeProduct = async () => {
    try {
      console.log("delete")
      const res = await axios.delete(`https://foodmart-api-production.up.railway.app//products/${product?.pid}`,{params:{pid:product?.pid}});
        setAllProducts(products.filter(obj=>obj.pid!=product?.pid))
  
  


     
    


       console.log("Data deleted",res.data)
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
       {!heart? <button onClick={()=>addLike()} style={{background:'transparent',border:'none'}}><img src='../empty.png'/></button>:<button onClick={()=>removeLike()} style={{background:'transparent',border:'none'}}><img src='../redheart.png'/></button>}
       <button className='prod-button' onClick={()=>removeProduct()}><img style={{height:35}} src='../../trash.png'/></button>
        </div>
       
    </div>
  )
}
