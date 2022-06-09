import React from 'react'
import Slider from '../components/Slider'
import Cta from '../components/Cta'


export default function Home() {
  return (
    <>
    <Cta />
    <section className='swiper' style={{"backgroundColor":"red", "width":"100%"}}><Slider /></section>
    </>
  )
}
