import React from 'react'
import Services from './components/Services';
import Trusted from './components/Trusted';
import HeroSection from './components/HeroSection';
import FeatureProduct from './components/FeatureProducts';

const Home = () => { 
  const data = {
    name: 'Thapa Store'
  }
  return (
    <>
    <HeroSection data={data}/>
    <FeatureProduct/>
    <Services/>
    <Trusted/>
    </>
  )
}



export default Home