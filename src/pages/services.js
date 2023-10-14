import Head from 'next/head'
import React from 'react'
import Navbar from './components/Navbar'
import Infonav from './components/Infonav'

export default function Services() {
  return (
<>
<Navbar/>
<Infonav/>
<Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Services Section</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles/globals.css" />
  </Head>
    <section>
      <div class="row">
        <h2 class="section-heading">Our Services</h2>
      </div>
      <div class="row">
        <div class="column">
          <div class="card">
            <div class="icon-wrapper">
              <i class="fas fa-leaf"></i>
            </div>
            <h3>Organic Products</h3>
            <p>
              Our production is organicalyy clean and certified in order to improve your health and avoid pesticides
            </p>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="icon-wrapper">
              <i class="fas fa-carrot"></i>
            </div>
            <h3>Fruits&Vegges from farms</h3>
            <p>
              All earth-grown foods are produced by qualified farmers who send their best prouction to our shop
            </p>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="icon-wrapper">
              <i class=" 	fas fa-truck"></i>
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Our delivery is really quick and and usually comes in 20-30 minutes after a call depending on size of the order.
            </p>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="icon-wrapper">
              <i class=" 	fas fa-gift"></i>
            </div>
            <h3>Gift Promotions</h3>
            <p>
              You can buy or win a coupon for a weekly discount to present a friend or just for yourself
            </p>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="icon-wrapper">
              <i class=" 	fas fa-tags"></i>
            </div>
            <h3>Daily offers</h3>
            <p>
              Every week we have various discounts which will suit everyones needs
            </p>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="icon-wrapper">
              <i class=" 	fas fa-smile"></i>
            </div>
            <h3>Customers Care</h3>
            <p>
              We care about our cusomers, so if anyone has suggestions or complaints we are open for discussion
            </p>
          </div>
        </div>
      </div>
    </section>
</>
  
  )
}
