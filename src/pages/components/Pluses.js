import React from 'react'

export default function Pluses() {
  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',gap:3}}>
        <img src='../delivery.png'/>
        <h4>Free delivery</h4>
    
      </div>
      <span style={{color:'gray',width:200}}>We will bring products staright to your door!</span>
    </div>
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',gap:3}}>
        <img src='../secure.png'/>
        <h4>100% secure payment</h4>
    
      </div>
      <span style={{color:'gray',width:200}}>All transactions are safe and secure.</span>
    </div>
    
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',gap:3}}>
        <img src='../quality.png'/>
        <h4>Quality guarantee</h4>
    
      </div>
      <span style={{color:'gray',width:200}}>Our products are certified and sellers are licensed</span>
    </div>
    
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',gap:3}}>
        <img src='../save.png'/>
        <h4>Guaranteed Savings</h4>
    
      </div>
      <span style={{color:'gray',width:200}}>This shop will save you money and time</span>
    </div>
    
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',gap:3}}>
        <img src='../offers.png'/>
        <h4>Daily offers</h4>
    
      </div>
      <span style={{color:'gray', width:200}}>We have various promotions and discounts every week!</span>
    </div>
    
    
    
      </div>
  )
}
