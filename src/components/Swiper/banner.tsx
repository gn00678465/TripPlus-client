import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

SwiperCore.use([Navigation]);

interface BannerProps {
  bannerList: ApiHome.BannerItem[];
}

const Banner = ({ bannerList }: BannerProps) => {
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
        slidesPerView="auto"
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined
        }}
        breakpoints={{
          375: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2.5
          }
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
        onBeforeInit={onBeforeInit}
        modules={[Pagination, Autoplay]}
      >
        {bannerList.map((banner: ApiHome.BannerItem, index) => {
          return (
            <SwiperSlide key={'banner' + index}>
              <Link href="#" className="aspect-ratio aspect-ratio-25x14">
                <Image
                  src={banner.imageUrl}
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
