import React from 'react'
import Hero from '../Components/Hero/Hero'
import Poupular from '../Components/Popular/Poupular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'


const Shop = () => {
  return (
    <div>
      <Hero/>  
      <Poupular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
      
    </div>
  )
}

export default Shop