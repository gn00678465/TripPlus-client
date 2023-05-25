import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Text, Box, Heading, Flex } from '@chakra-ui/react';

SwiperCore.use([Navigation]);

const Cases = () => {
  const CaseList = [
    {
      id: 1,
      imgUrl:
        'https://images.unsplash.com/photo-1603030908455-4a4588c0acdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: '社會企劃',
      title:
        '台灣世界展望會「籃海計畫」| 用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      team: '台灣世界展望會',
      targetMoney: '10,000,000',
      currentStatus: 20000
    },
    {
      id: 2,
      imgUrl:
        'https://images.unsplash.com/photo-1611489704164-6f73c62bd810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      category: '創新設計',
      title: 'ARKY Somnus Travel Pillow 咕咕旅行枕',
      team: 'ARKY',
      targetMoney: '10,000,000',
      currentStatus: 10000
    },
    {
      id: 3,
      imgUrl:
        'https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      category: '社會企劃',
      title:
        '兒童鐵道美術館｜來自山林的大山箱｜「居家體驗、戶外探索」 二合一的親子美感教材，陪伴孩子走進自然',
      team: '兒童鐵道圖書館',
      targetMoney: '5,000,000',
      currentStatus: 5000
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
        {CaseList.map((item, index) => {
          return (
            <SwiperSlide key={'case' + index}>
              <Link href="#">
                <Box className="rounded-lg bg-white p-6">
                  <Flex direction="column">
                    <Box className="aspect-ratio aspect-ratio-10x7">
                      <Image
                        src={item.imgUrl}
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
                        <Text fontSize={14} className="text-gray-600">
                          {item.category}
                        </Text>
                        <Heading
                          fontSize={20}
                          fontWeight={500}
                          my={2}
                          className="line-clamp-2 text-gray-900"
                        >
                          {item.title}
                        </Heading>
                        <Text className="text-sm leading-6 text-secondary-emphasis">
                          {item.team}
                        </Text>
                      </Box>
                      <Box className="mt-6">
                        <Flex justify="space-between" align="center">
                          <Text
                            fontSize={20}
                            className="font-ubuntu font-medium text-gray-900"
                          >
                            ${item.targetMoney} | {item.currentStatus}%
                          </Text>
                          <Text fontSize={14} className="text-gray">
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
