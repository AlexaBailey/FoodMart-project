import React from 'react'
import Navbar from './components/Navbar'
import Infonav from './components/Infonav'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import axios from 'axios'
import setToken from './utilities/setToken'
import ProductItem from './components/ProductItem'
import jwtDecode from 'jwt-decode'
import Pluses from './components/Pluses'

import Footer from './components/Footer'

export default function Myproduction (){
    const router = useRouter()
     
const [products, setAllProducts] = useState([]);  
const [hasLoaded, setLoaded] = useState(false);
const [favourite,setFavourite]=useState('')
const [search,setSearch]=useState('')

let jwtUser;
const department = router.query.department

useEffect(() => {
  setLoaded(true);

  if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
    jwtUser = jwtDecode(jwt);
}

  
 
  const receiveInfo = async () => {
    
   

    try {
     
      
      const res = await axios.get(`https://foodmart-api-production.up.railway.app/cheapfoods/${jwtUser.id}`,{params:{id:jwtUser.id}});
      setAllProducts(res.data[0]);
      setFavourite(res.data[1])

       console.log("Data",res.data)
    } catch (err) {
      console.log(err);
    }
  };
  receiveInfo();
}, []);

const handleSubmit= async (e) => {
  
  try {
    e.preventDefault()
    const res = await axios.post(`https://foodmart-api-production.up.railway.app/foods/${department}/${jwtUser.id}`,{params:{id:jwtUser.id,department:department,},search:search});
    setAllProducts(res.data[1]);
    setFavourite(res.data[2])
        console.log(products)
 
     console.log("Data",res.data)
  } catch (err) {
    console.log(err);
  }
};

const sortByPriceAsc = () => {
	const fProducts = [];
  for (const product of products){
   
    fProducts.push(product)
  }
     fProducts.sort((a,b)=>a.price-b.price)
     console.log(fProducts)
   
    
  
  setAllProducts(fProducts)



	};

  			
			
const sortByPriceDesc = () => {
	const fProducts = [];
  for (const product of products){
   
    fProducts.push(product)
  }
     fProducts.sort((a,b)=>b.price-a.price)
     console.log(fProducts)
   
    
  
  setAllProducts(fProducts)



	};


if (hasLoaded){
  if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
    jwtUser = jwtDecode(jwt);
}

  return (
    <>
    <Navbar/>
    <Infonav/>
    <div className='dep-part'>
        <h2>Cheapest Goods of this Week!</h2>
        {
  jwtUser?<>
        <div style={{display:'flex',gap:3}}>
     
    <form className='searchform' onSubmit={handleSubmit}>
           
           <input name='search' placeholder='Search products' onChange={e=>setSearch(e.target.value)} />
           <img  src='../../search.png'/>
       </form>

    <button className='price-button' onClick={sortByPriceDesc}>$$$-$</button>
    <button className='price-button'  onClick={sortByPriceAsc}>$-$$$</button>
    </div>


        {products && products!=''? 
     <div class="product-container">
     <div class="product-box">
       {
products.map((product)=>{
              var favouriteitem=favourite.filter(i=> i.prodid==product.pid)

    return(
     <ProductItem
     key = {product.pid}
      product={product}
      jwtUser={jwtUser}
      products={products}
      favourite={favouriteitem}
      setAllProducts={setAllProducts}
  />)})}</div></div>:

    
                      

        
          
    
   
      
       <div className='empty' style={{padding:30}}>
            <img src="../basket.png"/>
            <p>Department is empty yet</p>
            <span style={{color:'darkgreen'}}>Become the seller!</span>
            </div> }</>:<>
  <div className='blurred'>
    <h1>Log in to see the products!</h1>
    
    </div></>
}
            <Pluses/>

    </div>
    <Footer/>
    </>
  )
}else{
    return null
}
}
