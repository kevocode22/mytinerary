import '../styles/cities.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link as LinkRouter} from 'react-router-dom'


const SearchBox = () => {
  const [cities, setCities] = useState([])
  const [search, setSearch] = useState("")

  //-----------------Get Api------------------//
  useEffect(() => {
    axios.get("http://localhost:4000/api/cities")
      .then(res => setCities(res.data.response.cities))
  }, [])

  //-----------Filter results from input-------//
  let cityFilter = cities.filter(value => value.name.toLowerCase().startsWith(search.trim().toLowerCase()));

   //---------------Map and print of Cards filtered------------------//
  return(
    <>
      <div className="input-container">
        <input type='text' className='input-style' placeholder='Search by city...' onKeyUp={e => { setSearch(e.target.value) }}/>
      </div>
    {cityFilter.length > 0 ? (
    cityFilter.map(city =>
        <Card className='card' sx={{ maxWidth: 345 }}>
          <CardMedia
            key={city._id}
            component="img"
            alt="green iguana"
            height="200"
            image={city.image}/>
          <CardContent className="card-content">
            <Typography gutterBottom variant="h5" component="div">
              {city.name}
            </Typography>
            <Typography fontSize={"13px"} color="text.secondary">
              {city.country}
            </Typography>
          </CardContent>
          <LinkRouter to={`/cities/${city._id}`}> <Button size="small">Learn More</Button></LinkRouter>
        </Card> )) : (<p>No se encontraron resultados</p>)}
        </>
  )
}


export default SearchBox