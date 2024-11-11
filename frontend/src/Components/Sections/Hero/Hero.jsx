import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import "./Hero.css";
import bg_hero from "../../../assets/bg-hero.png";
import bg_hero_2 from "../../../assets/bg-hero-2.jpg";
import bg_hero_3 from "../../../assets/bg-hero-3.jpg";

const Hero = ({ text }) => {
  return (
    <div className="hero">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={bg_hero} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bg_hero_2} alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={bg_hero_3} alt="" />
        </SwiperSlide>
      </Swiper>
      <div className="content-hero">
        <h1>{text}</h1>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Hero;
