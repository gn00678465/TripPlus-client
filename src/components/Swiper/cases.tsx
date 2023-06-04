import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Text, Box, Heading, Flex } from '@chakra-ui/react';
import { currencyTWD } from '@/utils';

SwiperCore.use([Navigation]);

interface CasesProps {
  caseList: ApiHome.Item[];
}

const Cases = ({ caseList }: CasesProps) => {
  const getCategory = (value: number) => {
    switch (value) {
      case 0:
        return '社會計劃';
      case 1:
        return '創新設計';
      case 2:
        return '精選商品';
      default:
        return '';
    }
  };

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
    <div className="cases-slideshows">
      <div className="cases-slideshows-buttons">
        <div className="swiper-button-prev" ref={prevRef}>
          <div className="cases-slideshows-button-icon-wrapper">
            <MdChevronLeft />
          </div>
        </div>
        <div className="swiper-button-next" ref={nextRef}>
          <div className="cases-slideshows-button-icon-wrapper">
            <MdChevronRight />
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={true}
        loop={true}
        breakpoints={{
          375: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 3
          }
        }}
        pagination={{
          clickable: true
        }}
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined
        }}
        onBeforeInit={onBeforeInit}
        modules={[Pagination, Autoplay]}
      >
        {caseList.map((item, index) => {
          return (
            <SwiperSlide key={'case' + index}>
              <Link href="#">
                <Box className="rounded-lg bg-white p-6">
                  <Flex direction="column">
                    <Box className="aspect-ratio aspect-ratio-10x7">
                      <Image
                        src={item.keyVision}
                        alt={item.title}
                        width={368}
                        height={260}
                        className="aspect-ratio-object rounded-lg"
                      ></Image>
                    </Box>
                    <Box
                      mt={4}
                      height={160}
                      className="flex flex-col justify-between"
                    >
                      <Box>
                        <Text
                          fontSize={{ xs: '12px', md: '14px' }}
                          className="text-gray-600"
                        >
                          {getCategory(item.category)}
                        </Text>
                        <Heading
                          fontSize={{ xs: '16px', md: '20px' }}
                          fontWeight={500}
                          my={2}
                          className="line-clamp-2 text-gray-900"
                        >
                          {item.title}
                        </Heading>
                        <Text className="text-xs leading-6 text-secondary-emphasis md:text-sm">
                          {item.teamId.title}
                        </Text>
                      </Box>
                      <Box className="mt-6">
                        <Flex justify="space-between" align="center">
                          <Text
                            fontSize={{ xs: '18px', md: '20px' }}
                            className="font-ubuntu font-medium text-gray-900"
                          >
                            {currencyTWD(item.target)} | {item.progressRate}%
                          </Text>
                          <Text
                            fontSize={{ xs: '12px', md: '14px' }}
                            className="text-gray"
                            whiteSpace={'nowrap'}
                          >
                            已結束
                          </Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Cases;
