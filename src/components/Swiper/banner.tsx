import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

SwiperCore.use([Navigation]);

const Banner = () => {
  const bannerList = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1630148494091-e1f9e2ba6cb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80',
      title: '帶上夢想．輕鬆出發',
      subtitle: '超大容量行李箱，旅行必備良伴'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1541777458150-cb0f90c9da07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: '帶上夢想．輕鬆出發',
      subtitle: '超大容量行李箱，旅行必備良伴'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: '帶上夢想．輕鬆出發',
      subtitle: '超大容量行李箱，旅行必備良伴'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1630148494091-e1f9e2ba6cb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80',
      title: '帶上夢想．輕鬆出發',
      subtitle: '超大容量行李箱，旅行必備良伴'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1541777458150-cb0f90c9da07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: '帶上夢想．輕鬆出發',
      subtitle: '超大容量行李箱，旅行必備良伴'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      title: '帶上夢想．輕鬆出發',
      subtitle: '超大容量行李箱，旅行必備良伴'
    }
  ];

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const onBeforeInit = (Swiper: SwiperCore): void => {
    if (typeof Swiper.params.navigation !== 'boolean') {
      const navigation = Swiper.params.navigation;
      navigation!.prevEl = prevRef.current;
      navigation!.nextEl = nextRef.current;
    }
  };

  return (
    <section className="banner-slideshows">
      <Swiper
        spaceBetween={100}
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
        onBeforeInit={onBeforeInit}
        modules={[Pagination, Autoplay]}
      >
        {bannerList.map((banner, index) => {
          return (
            <SwiperSlide key={'banner' + index}>
              <Link href="#" className="aspect-ratio aspect-ratio-25x14">
                <Image
                  src={banner.imgUrl}
                  alt="banner"
                  width={740}
                  height={414}
                  className="aspect-ratio-object "
                ></Image>
              </Link>
              <div className="banner-text-block">
                <div className="banner-text-block__title">{banner.title}</div>
                <div className="banner-text-block__subtitle">
                  {banner.subtitle}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className="banner-slideshows-buttons">
          <div className="swiper-button-prev" ref={prevRef}>
            <div className="banner-slideshows-button-icon-wrapper">
              <MdChevronLeft />
            </div>
          </div>
          <div className="banner-slideshows-buttons-middle-frame"></div>
          <div className="swiper-button-next" ref={nextRef}>
            <div className="banner-slideshows-button-icon-wrapper">
              <MdChevronRight />
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
};
export default Banner;
