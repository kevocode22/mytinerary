import React from 'react'
import error from '../assets/error.png'

export default function Error() {
  return (
    <div className="containerError"><img className='error404' src={error} alt='Error 404'></img></div>
  )
}
