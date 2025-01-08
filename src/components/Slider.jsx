// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import PerSlide from './PerSlide';

const Slider = () => {
    return (
        <div>
            <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <PerSlide 
            image='https://github.com/shakilahmedatik/soloSphere-resources/blob/main/images/carousel1.jpg?raw=true' text='Get your web development projects done in minutes'/>
        </SwiperSlide>
        <SwiperSlide>
            <PerSlide 
            image = "https://github.com/shakilahmedatik/soloSphere-resources/blob/main/images/carousel2.jpg?raw=true"
            text="Get your graphics design projects done in minutes"/>
        </SwiperSlide>
        <SwiperSlide>
            <PerSlide 
            image= "https://github.com/shakilahmedatik/soloSphere-resources/blob/main/images/carousel3.jpg?raw=true"
            text="Start your digital marketing campaign up and running"/>
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Slider;