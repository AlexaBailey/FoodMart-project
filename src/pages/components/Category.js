import React from 'react'
import Link from 'next/link'
export default function Category() {
  return (
    <div className='categories'>
        <Link href={{
      pathname: "/[department]",
      query: {department:"Fruits&Vegges"}
    }} as={"/Fruits&Vegges"}
    className='cate-part'>
            <img src='../fv-icon.png'/>
            <span>Fruits & Veges</span>
        </Link>
        <Link  href={{
      pathname: "/[department]",
      query: {department:"Breads&Sweets"}
    }} as={"/Breads&Sweets"} className='cate-part'>
            <img src='../bread baguette.png'/>
            <span>Breads & Sweets</span>
        </Link>
        <Link  href={{
      pathname: "/[department]",
      query: {department:"Alcohol&Soft Drinks"}
    }} as={"/Alcohol&Soft Drinks"} className='cate-part'>
            <img src='../wine glass bottle.png'/>
            <span>Alcohol&Soft Drinks</span>
        </Link>
        <Link  href={{
      pathname: "/[department]",
      query: {department:"Oil&Ghee"}
    }} as={"/Oil&Ghee"} className='cate-part'>
            <img src='../oil.png'/>
            <span>Oil & Ghee</span>
        </Link>
        <Link  href={{
      pathname: "/[department]",
      query: {department:"Raw Meat"}
    }} as={"/Raw Meat"} className='cate-part'>
            <img src='../animal.png'/>
            <span>Raw Meat</span>
        </Link>
        <Link  href={{
      pathname: "/[department]",
      query: {department:"Natural Herbs"}
    }} as={"/Natural Herbs"} className='cate-part'>
            <img src='../bread.png'/>
            <span>Natural Herbs</span>
        </Link>
    </div>
  )
}
