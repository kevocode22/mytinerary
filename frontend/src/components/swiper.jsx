import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/stylesActivities.css"
import { EffectFlip, Pagination, Navigation } from "swiper";
import { useSelector } from "react-redux";

export default function SwiperAc() {

    const oneItinerary = useSelector(store => store.itinerariesReducer.oneItineraryByCity)
console.log(oneItinerary)
  return (
    <>
    {oneItinerary.map(c => c.activities.map(act =>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
      >
       
        <SwiperSlide>
          <img src={act.actPhoto} alt="activityphoto"/>
        </SwiperSlide>
             </Swiper>
    ))}</>
  );
}
