import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import React from 'react'
import '../styles/details.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'


export default function Details() {
    const {id} = useParams()
    const dispatch= useDispatch()

useEffect(()=>{
    dispatch(citiesActions.getOnecity(id))
    //eslint-disable-next-line
},[])

const oneCity = useSelector(store => store.citiesReducer.oneCity)

    return (        
        <div className="containerfDetails">
            <div className="cardfDetails">
                <div className="card__image-container">
                    <img className="card__image" src={oneCity.image} alt=""></img>
                </div>
                <svg className="card__svg" viewBox="0 0 800 500">
                    <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333" />
                    <path className="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent" />
                </svg>
                <div className="card__content">
                    <h2 className="card__title">{oneCity.name}</h2>
                    <h4>{oneCity.country}</h4>
                    <p>{oneCity.description}</p>
                    <h5 className="textUnderC"><p>UNDER CONSTRUCTION</p></h5>
                    <LinkRouter to="/cities"><button type="button" className="btnBack"> Back to Cities </button></LinkRouter>
                </div>
            </div>
        </div>
        
    )
}
