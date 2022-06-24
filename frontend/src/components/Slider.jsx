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
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';


const Slider = (props) => {
  return (
    <>
      <Typography sx={{ "fontSize": "5vh", "textAlign": "center", "fontFamily": "Bayon", "margin": "10px" }}>Popular MYtineraries</Typography>
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
        {(props.cities.map(city =>
          <SwiperSlide key={city._id} className="swiper-slide" data-swiper-autoplay="2000" style={{
            "backgroundImage": `url(${city.image})`,
            "backgroundSize": "cover",
            "backgroundPosition": "center",
            fontSize: "4vw", fontWeight: 'bold',
            boxShadow: "5px 5px 5px black",
            color: "white",
          }}>{city.name}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
const mapDispatchToProps = {
  getCities: citiesActions.getCities
}
const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
    auxiliar: state.citiesReducer.auxiliar

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Slider)
