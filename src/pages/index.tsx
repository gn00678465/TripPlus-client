import { Layout } from '@/components';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import landscape from '@/assets/images/index/mountains-nature-landscape.png';
import landscapeMobile from '@/assets/images/index/mountains-nature-landscape-mobile.png';
import CTA from '@/assets/images/index/CTA.png';
import CTAMobile from '@/assets/images/index/CTA-mobile.png';
import plus from '@/assets/images/plus.png';
import lightbulb from '@/assets/images/identity/lightbulb.svg';
import calendar from '@/assets/images/identity/calendar.svg';
import cardSearch from '@/assets/images/identity/card-search.svg';
import moneyBag from '@/assets/images/identity/money-bag.svg';
import userCheck from '@/assets/images/identity/user-check.svg';
import Banner from '@/components/Swiper/banner';
import Cases from '@/components/Swiper/cases';
import { CgInfinity } from 'react-icons/cg';
import {
  Text,
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Progress
} from '@chakra-ui/react';

const Index = () => {
  const category = [
    {
      title: '社會企劃',
      url: '/'
    },
    {
      title: '創新設計',
      url: '/'
    },
    {
      title: '精選商品',
      url: '/'
    }
  ];

  const identityList = [
    {
      image: lightbulb,
      width: 38,
      height: 50,
      text: '100% 原創設計'
    },
    {
      image: userCheck,
      width: 45,
      height: 50,
      text: '完整提案者資訊'
    },
    {
      image: moneyBag,
      width: 50,
      height: 50,
      text: '平台基金保障'
    },
    {
      image: cardSearch,
      width: 60,
      height: 60,
      text: '公信力檢驗'
    },
    {
      image: calendar,
      width: 50,
      height: 49,
      text: '專案進度公開透明'
    }
  ];

  const hotItemList = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1603030908455-4a4588c0acdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: '社會企劃',
      title:
        '台灣世界展望會「籃海計畫」| 用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      team: '台灣世界展望會',
      targetMoney: '10,000,000',
      currentStatus: 1000,
      countdownDays: 10
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1611489704164-6f73c62bd810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      category: '創新設計',
      title: 'ARKY Somnus Travel Pillow 咕咕旅行枕',
      team: 'ARKY',
      targetMoney: '10,000,000',
      currentStatus: 1000,
      countdownDays: 3
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      category: '社會企劃',
      title:
        '兒童鐵道美術館｜來自山林的大山箱｜「居家體驗、戶外探索」 二合一的親子美感教材，陪伴孩子走進自然',
      team: '兒童鐵道圖書館',
      targetMoney: '500,000',
      currentStatus: 40,
      countdownDays: 20
    }
  ];

  const newItemList = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1603030908455-4a4588c0acdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: '社會企劃',
      title:
        '台灣世界展望會「籃海計畫」| 用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      team: '台灣世界展望會',
      targetMoney: '100,000',
      currentStatus: 40,
      countdownDays: 50
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1611489704164-6f73c62bd810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      category: '創新設計',
      title: 'ARKY Somnus Travel Pillow 咕咕旅行枕',
      team: 'ARKY',
      targetMoney: '70,000',
      currentStatus: 8,
      countdownDays: 30
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      category: '社會企劃',
      title:
        '兒童鐵道美術館｜來自山林的大山箱｜「居家體驗、戶外探索」 二合一的親子美感教材，陪伴孩子走進自然',
      team: '兒童鐵道圖書館',
      targetMoney: '500,000',
      currentStatus: 40,
      countdownDays: 20
    }
  ];

  const productList = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1603030908455-4a4588c0acdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: '精選商品',
      title:
        '台灣世界展望會「籃海計畫」| 用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      team: '台灣世界展望會'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1611489704164-6f73c62bd810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
      category: '精選商品',
      title: 'ARKY Somnus Travel Pillow 咕咕旅行枕',
      team: 'ARKY'
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      category: '精選商品',
      title:
        '兒童鐵道美術館｜來自山林的大山箱｜「居家體驗、戶外探索」 二合一的親子美感教材，陪伴孩子走進自然',
      team: '兒童鐵道圖書館'
    }
  ];

  return (
    <>
      <Box className="flex flex-col items-center justify-center">
        <Image
          src={landscape}
          alt="mountains-nature-landscape"
          width={1920}
          height={240}
          className="absolute left-0 top-0 hidden object-cover md:block md:h-[440px]"
          priority
        ></Image>
        <Image
          src={landscapeMobile}
          alt="mountains-nature-landscape"
          width={768}
          height={508}
          className="absolute left-0 top-0 object-cover md:hidden md:h-[440px]"
          priority
        ></Image>
      </Box>
      <Box className="mt-[210px] md:mb-5 md:mt-[380px]">
        <Flex justifyContent="center">
          {category.map((item) => {
            return (
              <Link
                key={item.title}
                href={item.url}
                className="border-r-[1px] border-gray-200 px-5 text-sm font-medium last:border-r-0 md:px-12 md:text-base"
              >
                {item.title}
              </Link>
            );
          })}
        </Flex>
      </Box>
      <Banner />
      <Box as="section" className="bg-gray-100 py-10 md:py-20">
        <Container maxW="container.xl">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={{ xs: '20px', md: '40px' }}
            className="text-gray-600"
          >
            <Text
              fontSize={{ xs: '28px', md: '32px' }}
              fontWeight={700}
              className="relative"
            >
              熱門項目
              <Image
                src={plus}
                alt="plus"
                width={20}
                height={20}
                priority
                className="absolute right-[-20px] top-0"
              ></Image>
            </Text>
            <Link href="#" className="text-sm md:text-base">
              查看更多 {'>'}
            </Link>
          </Flex>
          <Box className="flex flex-wrap">
            <Box className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {hotItemList.map((item) => {
                return (
                  <Flex direction="column" key={item.title}>
                    <Link
                      href="#"
                      className="aspect-ratio aspect-ratio-10x7 relative"
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.title}
                        width={800}
                        height={560}
                        priority
                        className="aspect-ratio-object rounded-lg"
                      ></Image>
                      <span className="absolute right-3 top-3 z-[200] rounded bg-red p-2 text-xs text-white md:text-sm">
                        紅利回饋
                      </span>
                    </Link>
                    <Box
                      py={4}
                      height={250}
                      className="flex flex-col justify-between"
                    >
                      <Box>
                        <Text
                          fontSize={{ xs: '12px', md: '14px' }}
                          className="text-gray-600"
                        >
                          {item.category}
                        </Text>
                        <Link href="#">
                          <Heading
                            fontSize={{ xs: '16px', md: '20px' }}
                            fontWeight={500}
                            my={2}
                            className="line-clamp-2 text-gray-900"
                          >
                            {item.title}
                          </Heading>
                        </Link>
                        <Link
                          href="#"
                          className="text-xs leading-6 text-secondary-emphasis md:text-sm"
                        >
                          {item.team}
                        </Link>
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ xs: '18px', md: '20px' }}
                          fontWeight={500}
                          className="text-gray-900"
                        >
                          ${item.targetMoney}
                        </Text>
                        <Progress
                          colorScheme="primary"
                          size="sm"
                          value={item.currentStatus}
                          className="mb-[18px] mt-4 rounded-[6px] !bg-gray-200"
                        />
                        <Box className="flex justify-between">
                          <Text
                            fontSize={{ xs: '14px', md: '16px' }}
                            className="text-gray-900"
                          >
                            {item.currentStatus}%
                          </Text>
                          <Text fontSize={{ xs: '12px', md: '14px' }}>
                            倒數 {item.countdownDays} 天
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box as="section" className="bg-gray-100 pb-[80px]">
        <Container maxW="container.xl">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={{ xs: '20px', md: '40px' }}
            className="text-gray-600"
          >
            <Text
              fontSize={{ xs: '28px', md: '32px' }}
              fontWeight={700}
              className="relative"
            >
              最新項目
              <Image
                src={plus}
                alt="plus"
                width={20}
                height={20}
                priority
                className="absolute right-[-20px] top-0"
              ></Image>
            </Text>
            <Link href="#" className="text-sm md:text-base">
              查看更多 {'>'}
            </Link>
          </Flex>
          <Box className="flex flex-wrap">
            <Box className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {newItemList.map((item) => {
                return (
                  <Flex direction="column" key={item.title}>
                    <Link
                      href="#"
                      className="aspect-ratio aspect-ratio-10x7 relative"
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.title}
                        width={800}
                        height={560}
                        priority
                        className="aspect-ratio-object rounded-lg"
                      ></Image>
                      <span className="absolute right-3 top-3 z-[200] rounded bg-red p-2 text-xs text-white md:text-sm">
                        紅利回饋
                      </span>
                    </Link>
                    <Box
                      py={4}
                      height={250}
                      className="flex flex-col justify-between"
                    >
                      <Box>
                        <Text
                          fontSize={{ xs: '12px', md: '14px' }}
                          className="text-gray-600"
                        >
                          {item.category}
                        </Text>
                        <Link href="#">
                          <Heading
                            fontSize={{ xs: '16px', md: '20px' }}
                            fontWeight={500}
                            my={2}
                            className="line-clamp-2 text-gray-900"
                          >
                            {item.title}
                          </Heading>
                        </Link>
                        <Link
                          href="#"
                          className="text-xs leading-6 text-secondary-emphasis md:text-sm"
                        >
                          {item.team}
                        </Link>
                      </Box>
                      <Box>
                        <Text
                          fontSize={{ xs: '18px', md: '20px' }}
                          fontWeight={500}
                          className="text-gray-900"
                        >
                          ${item.targetMoney}
                        </Text>
                        <Progress
                          colorScheme="primary"
                          size="sm"
                          value={item.currentStatus}
                          className="mb-[18px] mt-4 rounded-[6px] !bg-gray-200"
                        />
                        <Box className="flex justify-between">
                          <Text
                            fontSize={{ xs: '14px', md: '16px' }}
                            className="text-gray-900"
                          >
                            {item.currentStatus}%
                          </Text>
                          <Text fontSize={{ xs: '12px', md: '14px' }}>
                            倒數 {item.countdownDays} 天
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box as="section" className="bg-secondary-light">
        <Container maxW="container.xl" className="py-[60px] md:py-[100px]">
          <Box className="flex justify-center">
            <Text
              fontSize={{ xs: '36px', md: '48px' }}
              className="flex content-center items-center font-alkatra"
            >
              Why
              <Image
                src="/images/logo.png"
                alt="logo"
                width={208}
                height={58}
                priority
                className="md:[208px] mx-3 w-[130px]"
              ></Image>
              ?
            </Text>
          </Box>
          <Box className="mt-[45px] flex flex-col items-center md:mt-[65px]  md:flex-row md:justify-between md:[&>*:last-child]:mb-[44px] [&>*:not(:last-child)]:mb-[44px]">
            {identityList.map((identity) => {
              return (
                <Box
                  className="flex flex-col items-center md:mb-0"
                  key={identity.text}
                >
                  <Image
                    src={identity.image}
                    alt={identity.text}
                    width={identity.width}
                    height={identity.height}
                    style={{
                      width: identity.width + 'px',
                      height: identity.height + 'px'
                    }}
                  ></Image>
                  <Text
                    fontSize={{ xs: '16px', md: '18px' }}
                    fontWeight={500}
                    className="mt-[20px]"
                  >
                    {identity.text}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
      <Box as="section" className="py-[80px]">
        <Container maxW="container.xl">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={{ xs: '20px', md: '40px' }}
            className="text-gray-600"
          >
            <Text
              fontSize={{ xs: '28px', md: '32px' }}
              fontWeight={700}
              className="relative"
            >
              精選商品
              <Image
                src={plus}
                alt="plus"
                width={20}
                height={20}
                priority
                className="absolute right-[-20px] top-0"
              ></Image>
            </Text>
            <Link href="#" className="text-sm md:text-base">
              查看更多 {'>'}
            </Link>
          </Flex>
          <Box className="flex flex-wrap">
            <Box className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {productList.map((item) => {
                return (
                  <Flex direction="column" key={item.title}>
                    <Link
                      href="#"
                      className="aspect-ratio aspect-ratio-10x7 relative"
                    >
                      <Image
                        src={item.imgUrl}
                        alt={item.title}
                        width={800}
                        height={560}
                        priority
                        className="aspect-ratio-object rounded-lg"
                      ></Image>
                      <span className="absolute right-3 top-3 z-[200] rounded bg-red p-2 text-xs text-white md:text-sm">
                        可用紅利
                      </span>
                    </Link>
                    <Box
                      py={4}
                      height={210}
                      className="flex flex-col justify-between"
                    >
                      <Box>
                        <Text
                          fontSize={{ xs: '12px', md: '14px' }}
                          className="text-gray-600"
                        >
                          {item.category}
                        </Text>
                        <Link href="#">
                          <Heading
                            fontSize={{ xs: '16px', md: '20px' }}
                            fontWeight={500}
                            my={2}
                            className="line-clamp-2 text-gray-900"
                          >
                            {item.title}
                          </Heading>
                        </Link>
                        <Link
                          href="#"
                          className="text-xs leading-6 text-secondary-emphasis md:text-sm"
                        >
                          {item.team}
                        </Link>
                      </Box>
                      <Box>
                        <Progress
                          colorScheme="success"
                          size="sm"
                          value={100}
                          className="mb-[18px] mt-4 rounded-[6px] !bg-gray-200"
                        />
                        <Box className="flex items-center justify-end text-gray">
                          <CgInfinity className="mr-1 text-lg md:text-xl" />
                          <Text fontSize={{ xs: '12px', md: '14px' }}>
                            長期販售
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box as="section" className="bg-gray-100 py-[40px] md:py-[80px]">
        <Container maxW="container.xl">
          <Heading className="mb-5 text-center text-[32px] font-bold md:mb-10">
            成功案例
          </Heading>
          <Cases />
        </Container>
      </Box>
      <Box
        as="section"
        className="bg-cover bg-center bg-no-repeat pb-[100%] pt-[60px] text-white md:py-[100px]"
        backgroundImage={{ base: CTAMobile.src, md: CTA.src }}
      >
        <Container maxW="container.xl" className="flex flex-col ">
          <Box className="flex items-center justify-center text-[28px] font-bold md:justify-start md:text-[40px]">
            <Text>在</Text>
            <Image
              src="/images/logo-white.png"
              alt="logo"
              width={208}
              height={58}
              priority
              className="mx-[14px] w-[130px] md:w-[208px]"
            ></Image>
            <Text>已有</Text>
          </Box>
          <Box className="mt-[63px] flex flex-wrap items-center justify-center font-medium md:mt-[124px]">
            <Box className="mb-10 flex flex-col items-center md:mb-0">
              <Box className="mb-4 flex md:mb-6">
                <span className="mr-2 text-[36px] md:text-[54px]">
                  1,000,000
                </span>
                <span className="mt-5 text-[18px] md:mt-8 md:text-[24px]">
                  件
                </span>
              </Box>
              <Box className="text-[16px] md:text-[24px]">成功募資案</Box>
            </Box>
            <Box className="mb-10 flex flex-col items-center md:mx-[78px] md:mb-0 md:border-x-[1px] md:border-white/[.3] md:px-12">
              <Box className="mb-4 flex md:mb-6">
                <span className="mr-2 text-[36px] md:text-[54px]">
                  $100,000,000
                </span>
                <span className="mt-5 text-[18px] md:mt-8 md:text-[24px]">
                  元
                </span>
              </Box>
              <Box className="text-[16px] md:text-[24px]">募資金額</Box>
            </Box>
            <Box className="flex flex-col items-center">
              <Box className="mb-4 flex md:mb-6">
                <span className="mr-2 text-[36px] md:text-[54px]">
                  10,000,000
                </span>
                <span className="mt-5 text-[18px] md:mt-8 md:text-[24px]">
                  位
                </span>
              </Box>
              <Box className="text-[16px] md:text-[24px]">參與者</Box>
            </Box>
          </Box>
          <Box className="mt-[60px] flex flex-col items-center md:mt-[132px] md:flex-row md:justify-end">
            <Text
              fontSize={{ xs: '24px', md: '28px' }}
              className="mb-8 md:mb-0 md:mr-9"
            >
              點燃你的創意．集眾人之力
            </Text>
            <Button
              className="relative z-10 !h-[96px] !w-[96px] !rounded-[100%] !text-[14px] after:absolute after:left-[50%] after:top-[50%]
              after:h-[112px] after:w-[112px]  after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[100%] after:border-[1px] after:border-dashed after:border-white after:bg-transparent md:!h-[140px] md:!w-[140px] md:!text-[20px] md:after:h-[164px] md:after:w-[164px] md:after:border-2"
              colorScheme="secondary-emphasis"
            >
              我要提案
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Index;

Index.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};
