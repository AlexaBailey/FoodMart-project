import React, { useState } from 'react'
export default function Order({price,setPrice}) {
  let ship = 2.68
  let supership = 10
  const [credit, setCredit]= useState(false) 
  const [discount,setDiscount]=useState('') 
  function togglebuy(){
    setCredit(prev=>!prev)
  }
  const setCoupon=()=>{
    setDiscount(Number(price)-15)
    
  }
  return (
    <>
    {!credit && <> <div style={{display:'flex', alignItems:'center', gap:12}}>
    <img style={{height:35}} src="../offers.png"/>
     <p>Gift Coupon</p>
     <button style={{backgroundColor:'lightblue',borderRadius:12,border:'none',padding:6}} onClick={setCoupon}>Use</button>
    
  

    
   

    </div>
   
    <hr></hr>
    
    <div style={{display:'flex', flexDirection:'column', gap:12}}>

  <h3 style={{margin:0}}>Order Summary</h3>
  <div className='order-details'>
    <span>Subtotal</span>
    <span>${price}</span>
  </div>
  <div className='order-details'> 
    <span>Standard Shipping Cost</span>
    <span>${ship}</span>
  </div>
  <div className='order-details'>
    <span>Total</span>
    <span style={{fontWeight:'bold'}}>${price+ship}</span>
  </div>
  {discount!='' && discount!=null &&
    <div style={{color:'red'}} className='order-details'>
    <span>With Discount</span>
    <span style={{fontWeight:'bold'}}>${discount}</span>
  </div>
  }


  </div>

  
  <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:86}}>
  <small>Standard Shipping 20 days</small>
  <br/>
  <button  onClick={togglebuy} className='save-button'>Checkout ${price+ship}</button>
  </div>
  <div
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
      >
        <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />

        <div>
          <p style={{width: '70px', textAlign: 'center'}}>OR</p>
        </div>

        <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
      
    </div>
  <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
   <small>Fast Shipping 10 days</small>
  <button onClick={togglebuy} className='save-button'>Checkout ${price+supership}</button>
  </div></> }
   
  {credit ?  <div  >
    
<div  style={{display:'flex', alignItems:'center', gap:12, marginTop:0}}>
    
    <img style={{height:40}} src="https://img.icons8.com/external-nawicon-flat-nawicon/100/null/external-credit-card-finance-nawicon-flat-nawicon.png"/>
     <p>Payment Details</p>

    </div>
   
    <hr></hr>
    
    <div  className='credit'style={{display:'flex', flexDirection:'column', gap:12}}>
  <h3 style={{margin:0}}>Credit card details</h3>
  <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
  <img src="https://img.icons8.com/fluency/40/null/visa.png"/>
  <img src="https://img.icons8.com/color/40/null/mastercard-logo.png"/>
  <img src="https://img.icons8.com/color/40/null/unionpay.png"/>
  <img src="https://img.icons8.com/color/40/null/paypal.png"/>

  </div>

  <span>Card number</span>
  <input placeholder='1234 5678 7388 7388'/>
  <span>Cart Holder</span>
  <input placeholder='John Roberts '/>
  <span>Expiry date</span>
  <input placeholder='MM/YY'/>
  <span>CVV</span>
  <input placeholder='***'/>
  <button className='save-button'>Submit</button>
  <div style={{display:'flex', alignItems:'center', gap:6, margin:0}}>
    <button style={{backgroundColor:'transparent', border:'none', margin:0}} onClick={togglebuy}><img src="https://img.icons8.com/windows/30/null/circled-left-2.png"/></button>
    <span style={{fontSize:14}}>Back to order</span>

    </div>



  

 
  
  </div></div> : null}




    </>
   
  )
}
