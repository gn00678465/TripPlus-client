import { useRef } from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Swiper as SwiperType, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export interface PlansSwiperProps extends SwiperProps {
  data: any[];
  card: (arg: any) => JSX.Element;
}

const Carousel = ({ data, card, ...rest }: PlansSwiperProps) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="">
      <Swiper
        pagination={{
          el: '.carousel-pagination',
          clickable: true
        }}
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={3}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        {...rest}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>{card?.(item)}</SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => swiperRef.current?.slidePrev()}>Prev</button>
      <button onClick={() => swiperRef.current?.slideNext()}>Next</button>
      <div className="carousel-pagination mt-5 text-center md:mt-10"></div>
    </div>
  );
};

export default Carousel;
