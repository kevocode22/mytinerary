import React from 'react'
import Slider from '../components/Slider'
import Hero from '../components/Hero'


export default function Home() {

  window.scrollTo({ top: 0, behavior: "smooth"})
  return (
    
    <>
    <Hero />
    <section className='swiper' style={{"width":"100%"}}><Slider /></section>
    </>
  )
}
