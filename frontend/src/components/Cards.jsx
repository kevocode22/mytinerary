import '../styles/cards.css'
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as LinkRouter } from 'react-router-dom'
import error404 from '../assets/404.svg'
import citiesActions from '../redux/actions/citiesActions';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';


const SearchBox = () => {
  const [search, setSearch] = useState("")
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(citiesActions.filterCities(search))
    //eslint-disable-next-line
  }, [search])

  let cityFilter = useSelector(store => store.citiesReducer.filter)
  

  //---------------Map and print of Cards filtered------------------//
  return (
    <>
      <div className="input-container">
        <input type='text' className='input-style' placeholder='Search by city...' onKeyUp={e => { setSearch(e.target.value) }} />
      </div>
      {cityFilter.length > 0 ? (
        cityFilter.map(city =>
          <Card className='cardsFromCards' sx={{ maxWidth: 345 }} key={Card.id}>
            <CardMedia
              key={CardMedia.id}
              component="img"
              alt="Card City"
              height="200"
              image={city.image} />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h4" component="div">
                {city.name}
              </Typography>
              <Typography fontSize={"22px"} color="textWhite">
                {city.country}
              </Typography>
              <LinkRouter to={`/cities/${city._id}`}> <Button className="btnL" size="small">Learn More</Button></LinkRouter>
            </CardContent>
          </Card>
        )) : (<img src={error404} alt="error404" />)}
    </>
  )
}

export default SearchBox
