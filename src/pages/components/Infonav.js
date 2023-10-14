import React from 'react'
import Link from 'next/link'
import jwtDecode from 'jwt-decode';
import setToken from '../utilities/setToken'
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
export default function Infonav() {
  const [navstate,setNav]=useState(false)
  const toggleNav=()=>{
    setNav(curr=>!curr)
  }
  let jwtUser;
  if (typeof window!='undefined'){
    if (localStorage.token) {
      const jwt = localStorage.getItem("token");
      setToken(jwt);
      jwtUser = jwtDecode(jwt);
      console.log(jwtUser)
        }
}
const router = useRouter();
const currentRoute = router.pathname;
console.log(currentRoute)
  return (
    <div className='infonav' style={{display:'flex',justifyContent:'space-between', paddingTop:40}}>
<div style={{display:'flex',gap:6}}>
<div style={{display:'flex',alignItems:'center',gap:4}}>
        <span>Shop By Categories</span>
        <button onClick={()=>toggleNav()} style={{background:'transparent',border:'none'}}><img style={{height:16}} src='../../arrow.png'/></button>
       {navstate &&  <div  className="selectnav">
      
            
      <label>
    <select>
    <option id="0" >
  
       
            <span>Select category</span>
        </option>

    <option id="1" onClick={()=>router.push("/Fruits&Vegges")} >   <Link href={{
      pathname: "/[department]",
      query: {department:"Fruits&Vegges"}
    }} as={"/Fruits&Vegges"} 
  >
       
            <span>Fruits&Vegges</span>
        </Link></option>
        <option id="2" onClick={()=>router.push("/Breads&Sweets")} >   <Link href={{
      pathname: "/[department]",
      query: {department:"Breads&Sweets"}
    }} as={"/Breads&Sweets"} 
  >
       
            <span>Breads&Sweets</span>
        </Link></option>
        <option id="3" onClick={()=>router.push("/Alcohol&Soft Drinks")} >   <Link href={{
      pathname: "/[department]",
      query: {department:"Alcohol&Soft Drinks"}
    }} as={"/Alcohol&Soft Drinks"} 
  >
       
            <span>Alcohol&Soft Drinks</span>
        </Link></option>
        <option id="4" onClick={()=>router.push("/Oil&Ghee")} >   <Link href={{
      pathname: "/[department]",
      query: {department:"Oil&Ghee"}
    }} as={"/Oil&Ghee"}
  >
       
            <span>Oil&Ghee</span>
        </Link></option>
        <option id="5" onClick={()=>router.push("/Raw Meat")} >   <Link href={{
      pathname: "/[department]",
      query: {department:"Raw Meat"}
    }} as={"/Raw Meat"}
  >
       
            <span>Raw Meat</span>
        </Link></option>
        <option id="6" onClick={()=>router.push("/Natural Herbs")} >   <Link href={{
      pathname: "/[department]",
      query: {department:"Natural Herbs"}
    }} as={"/Natural Herbs"}
  >
       
            <span>Natural Herbs</span>
        </Link></option>

   
      </select>
      </label>
      </div>}
    </div>
    <div style={{display:'flex', gap:6}}>
        <Link className={currentRoute == "/"
       ? "yellowLink" 
       : "whiteLink"} href="/">Home</Link>
        <Link className={currentRoute == "/services"
       ? "yellowLink" 
       : "whiteLink"} href="/services">Our services</Link>
        <Link className={currentRoute == "/contacts"
       ? "yellowLink" 
       : "whiteLink"} href="/contacts">Contact</Link>
        <Link className={currentRoute == "/offers"
       ? "yellowLink" 
       : "whiteLink"} href="/offers">Offers</Link>
       {jwtUser!=null && jwtUser &&  jwtUser.targetrole=='Seller'?<>
       <Link className={currentRoute == "/upload"
       ? "yellowLink" 
       : "whiteLink"} href="/upload">Sell products</Link>
     <Link className={currentRoute == "/myproduction"
       ? "yellowLink" 
       : "whiteLink"} href="/myproduction">My production</Link>
       </>:null}
    
    </div>

</div>
     
              <div style={{display:'flex',gap:3, alignItems:'center'}}>
                <img src='../../gift.png'/>
                <span> Get Coupon card</span>
              </div>
      
    </div>
  )
}
