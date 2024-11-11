import "./Media.css";
import vedio from "../../../assets/gallary/vedio-school.mp4";
import img_1 from "../../../assets/gallary/1.jpg";
import img_3 from "../../../assets/gallary/3.jpg";
import img_4 from "../../../assets/gallary/4.jpg";
import img_5 from "../../../assets/gallary/5.jpg";
import { GoFileMedia } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
const Media = () => {
  return (
    <div className="section-media">
      <h2>
        <span>
          <GoFileMedia />
        </span>
        Media
      </h2>
      <div className="media container flex between">
        <div className="gallory-image flex">
          <Swiper
            spaceBetween={10}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }}
          >
            <SwiperSlide>
              <img src={img_1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img_3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img_4} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img_5} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
        <video className="flex" controls>
          <source src={vedio} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Media;
