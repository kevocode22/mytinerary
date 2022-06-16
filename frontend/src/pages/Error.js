import React from 'react'
import error from '../assets/error.png'

export default function Error() {
  window.scrollTo({ top: 0, behavior: "smooth"})
  return (
    <div className="containerError"><img className='error404' src={error} alt='Error 404'></img></div>
  )
}
