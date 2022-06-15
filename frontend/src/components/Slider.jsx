import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/bundle"
import "swiper/css/autoplay"
import "../styles/styles.css";
import { Navigation, Pagination, Autoplay, Grid } from "swiper";
import "swiper/css/effect-fade"
import Typography from '@mui/material/Typography'
import {useState, useEffect} from 'react'
import axios from 'axios'


const Slider= () => {

const[cities, setCities]=useState([])  

  useEffect(() => {
    axios.get("http://localhost:4000/api/cities")
    .then(res => setCities(res.data.response.cities))
},[])
console.log(cities)
  return(
    <>
      <Typography sx={{"fontSize":"4vh","textAlign": "center", "fontFamily":"Bayon", "margin":"10px" }}>Popular MYtineraries</Typography>
      <Swiper className="Caroussel"
        modules={[Navigation, Pagination, Autoplay, Grid]}
        navigation
        pagination
        autoplay={true}
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={10}
        grid={{
          rows: 2,
        }}
      >
        {(cities.map(city =>
          <SwiperSlide key={city._id} class="swiper-slide" data-swiper-autoplay="2000" style={{
            "background-image": `url(${city.image})`,
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            fontSize: "4vw", fontWeight: 'bold',
            boxShadow: "5px 5px 5px black",
            color: "white",}}>{city.name}
            </SwiperSlide>
          ))}
      </Swiper>
      </>
  );
}
export default Slider
