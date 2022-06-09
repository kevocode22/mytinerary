import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/bundle"
import "swiper/css/autoplay"
import "../styles/styles.css";
import { Navigation, Pagination, Autoplay, Grid } from "swiper";
import info from '../assets/data.json'
import "swiper/css/effect-fade"
import Typography from '@mui/material/Typography'


export default function Slider() {
  let data = info.cities
  return (
    
    <>
      <Typography sx={{ "textAlign": "center", "fontWeight": "bold", "fontFamily": 'Cairo' }}> Popular MYtineraries</Typography>
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
        {data.map(city =>
          <SwiperSlide class="swiper-slide" data-swiper-autoplay="2000" style={{
            "background-image": `url(${city.image})`,
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            fontSize: "4vw", fontWeight: 'bold',
            boxShadow: "5px 5px 5px black",
            color: "white",
          }}>{city.name}</SwiperSlide>
        )}
      </Swiper>
      </>
  );
}