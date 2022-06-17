import React from 'react'
import '../styles/cities.css'
import Cards from '../components/Cards'

export default function cities() {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return (
        <>
            <div className="divCards"><Cards /></div>

        </>
    )
}
