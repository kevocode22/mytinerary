import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react';
import '../styles/details.css'


export default function Details() {
    const [cities, setCities] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4000/api/cities/${id}`)
            .then(res => (setCities(res.data.response)))
        // eslint-disable-next-line
    }, [])

    return (

        <div className="containerfDetails">
            <div className="cardfDetails">
                <div className="card__image-container">
                    <img className="card__image" src={cities.image} alt=""></img>
                </div>
                <svg className="card__svg" viewBox="0 0 800 500">

                    <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                    <path className="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                </svg>
                <div className="card__content">
                    <h2 className="card__title">{cities.name}</h2>
                    <h4>{cities.country}</h4>
                    <p>{cities.description}</p>
                    <h5><p>UNDER CONSTRUCTION</p></h5>
                </div>
            </div>
        </div>

    )
}


