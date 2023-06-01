import { useRef } from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Swiper as SwiperType, Pagination } from 'swiper';
import { IconButton, Icon, IconButtonProps } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { IconType } from 'react-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export interface PlansSwiperProps<T> extends SwiperProps {
  data: T[];
  card: (arg: T) => JSX.Element;
}

interface NavigationButtonProps extends Omit<IconButtonProps, 'icon'> {
  icon: IconType;
}

const NavigationButton = ({ icon, ...rest }: NavigationButtonProps) => {
  return (
    <IconButton
      borderRadius="full"
      h="auto"
      w="auto"
      p="18px"
      zIndex={10}
      icon={<Icon as={icon} boxSize={6} />}
      cursor="pointer"
      userSelect="none"
      color="gray.600"
      backgroundColor="white"
      borderColor="gray.200"
      _hover={{
        backgroundColor: 'primary.500',
        borderColor: 'primary.500',
        color: 'white'
      }}
      _active={{
        backgroundColor: 'secondary-emphasis.500',
        borderColor: 'secondary-emphasis.500',
        color: 'white'
      }}
      {...rest}
    />
  );
};

function Carousel<T>({ data, card, ...rest }: PlansSwiperProps<T>) {
  const swiperRef = useRef<SwiperType>();

  return (
    <>
      <div className="relative">
        <Swiper
          pagination={{
            el: '.carousel-pagination',
            clickable: true
          }}
          modules={[Pagination]}
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 24
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          {...rest}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>{card?.(item)}</SwiperSlide>
          ))}
        </Swiper>
        <NavigationButton
          display={{ base: 'none', '2xl': 'block' }}
          aria-label="previous"
          pos="absolute"
          top="50%"
          left="0"
          sx={{ transform: 'translate(-84px, calc(-50% - 40px))' }}
          icon={MdChevronLeft}
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <NavigationButton
          display={{ base: 'none', '2xl': 'block' }}
          aria-label="next"
          pos="absolute"
          top="50%"
          right="0"
          sx={{ transform: 'translate(84px, calc(-50% - 40px))' }}
          icon={MdChevronRight}
          onClick={() => swiperRef.current?.slideNext()}
        />
        <div className="carousel-pagination mt-5 text-center md:mt-10"></div>
      </div>
      <style jsx global>
        {`
          .swiper-pagination-bullet {
            background-color: #e9e9e9;
          }
          .swiper-pagination-bullet.swiper-pagination-bullet-active {
            background-color: #00bdbd;
          }
        `}
      </style>
    </>
  );
}

export default Carousel;
