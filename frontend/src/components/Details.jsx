import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import React from 'react'
import '../styles/details.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import itinerariesActions from '../redux/actions/itinerariesActions'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(itinerariesActions.getOneItineraryByCity(id))
        dispatch(citiesActions.getOneCity(id))
        //eslint-disable-next-line
    }, [])

    const city = useSelector(store => store.citiesReducer.oneCity)
    const oneItinerary = useSelector(store => store.itinerariesReducer.oneItineraryByCity)


    return (
        <>
            <div className="cardDetailsContainer">
            <div>
                    <img src={city.image} alt="CityImage" />
                    <h2>{city.name}</h2>
                </div>
                <div className="containerItineraries"><h3>Itineraries</h3></div>
                {oneItinerary.map(tinerary =>
                    <div className='itineraryCard'>
                        <h4 className="itineraryTitle">{tinerary.itinerary}</h4>
                        <div className="containerAvatar"> <img className="avatarImg" src={tinerary.author.authorimg} alt="avatar" />
                            <h5>{tinerary.author.name}</h5></div>
                        <div className="containerPriceAndDuration"><p>Price: {tinerary.price}</p>
                            <p>Duration: {tinerary.duration} hours</p>
                        </div>
                        <div className="containerFav"><FavoriteBorderIcon className='heartIcon' />
                            <p>{tinerary.hashtags}</p>
                            <Accordion>
                                <AccordionSummary className="accordionClass"
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>See More</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Activities Soon!
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>

                )}
            </div>
        </>

    )
}
