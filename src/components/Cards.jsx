import '../styles/cities.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import info from '../assets/data.json'
import { useState } from 'react';


const SearchBox = () => {
  const [filter, setFilter] = useState('')

  const searchText = (event) => {
    setFilter(event.target.value);
  }
  console.log(searchText)

  let dataSearch = info.cities.filter(item => {
    return Object.keys(item).some(key => 
      item[key].toString().toLowerCase().includes(filter.trim().toString().toLowerCase()))
  });
  console.log(dataSearch)
  return (
    <>
      <div className='input-container'>
        <input  type="text"
          className='input-style'
          value={filter}
          placeholder="Find your perfect trip..."
          onChange={searchText.bind(this)}
        /> 
      </div>

      {dataSearch.map((item) => {
        return(
        <Card className='card' sx={{ maxWidth: 345 }}>
          <CardMedia
            key={item.id}
            component="img"
            alt="green iguana"
            height="200"
            image={item.image}
          />
          <CardContent className="card-content">
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography fontSize={"13px"} color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>)})}
        </>
      
      )
      }
      
export default SearchBox