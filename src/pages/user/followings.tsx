import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { Box, Container, Heading, Flex, Button } from '@chakra-ui/react';
import { currency } from '@/utils';

const Followings: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '追蹤專案', url: '/user/followings' }
  ];

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

  const list = [
    {
      id: 0,
      image: 'https://picsum.photos/300/300?random=1',
      title:
        '台灣世界展望會「籃海計畫」|用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      category: getCategory(0),
      team: '臺灣世界展望會',
      price: currency(10000000, 'zh-TW', 'TWD'),
      deadline: 3,
      progress: 20
    },
    {
      id: 1,
      image: 'https://picsum.photos/300/300?random=2',
      title:
        '台灣世界展望會「籃海計畫」|用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      category: getCategory(0),
      team: '臺灣世界展望會',
      price: currency(10000000, 'zh-TW', 'TWD'),
      deadline: 5,
      progress: 50
    },
    {
      id: 2,
      image: 'https://picsum.photos/300/300?random=3',
      title:
        '台灣世界展望會「籃海計畫」|用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      category: getCategory(0),
      team: '臺灣世界展望會',
      price: currency(10000000, 'zh-TW', 'TWD'),
      deadline: 10,
      progress: 80
    },
    {
      id: 3,
      image: 'https://picsum.photos/300/300?random=4',
      title:
        '台灣世界展望會「籃海計畫」|用籃球教育翻轉偏鄉孩子人生，追「球」夢想、站穩舞台！',
      category: getCategory(0),
      team: '臺灣世界展望會',
      price: currency(10000000, 'zh-TW', 'TWD'),
      deadline: 3,
      progress: 100
    }
  ];

  return (
    <>
      <Head>
        <title>會員中心-追蹤專案-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} className="pb-10 md:pb-20">
        <Container maxW={'container.xl'}>
          <Heading
            as="h1"
            my={10}
            className="text-center md:text-left"
            fontSize={{ base: 28, md: 32 }}
          >
            追蹤專案
          </Heading>

          <Box backgroundColor={'white'} className="p-5 md:p-10">
            <Flex flexWrap={'wrap'}>
              {list.map((item) => (
                <Box
                  key={item.id}
                  className="mb-16 mt-3 w-full md:w-1/3 md:px-3"
                >
                  <Link
                    href="/"
                    className="relative flex w-full items-start justify-end rounded-lg bg-[length:100%] bg-center pb-[70%] transition-all duration-500 ease-in-out hover:bg-[length:120%]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute right-3 top-3 rounded bg-[#F15761] px-2 py-1 text-xs text-white md:text-sm">
                      紅利回饋
                    </div>
                  </Link>

                  <Box>
                    <div className="mt-4 text-xs text-gray-500 md:text-sm">
                      {item.category}
                    </div>
                    <Link
                      href="/"
                      className="mt-1 line-clamp-2 font-medium transition-colors hover:text-secondary-emphasis md:mt-2 md:text-xl"
                    >
                      {item.title}
                    </Link>
                    <Link
                      href="/"
                      className="mt-1 text-xs text-secondary-emphasis hover:text-secondary-emphasis-400 md:mt-2 md:text-sm"
                    >
                      {item.team}
                    </Link>
                  </Box>

                  <Box className="mt-4 md:mt-6">
                    <div className="text-lg font-medium text-gray-900 md:text-xl">
                      {item.price}
                    </div>
                    <Box
                      bgColor={'gray.200'}
                      width={'100%'}
                      height={'6px'}
                      borderRadius={8}
                      className="mt-3 md:mt-4"
                    >
                      <div
                        className="h-full rounded-xl bg-primary"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </Box>
                    <Flex
                      justifyContent={'space-between'}
                      color={'gray.900'}
                      className="mt-3 text-sm md:mt-[1.125rem] md:text-base"
                    >
                      <div>{item.progress}%</div>
                      <div>
                        <span className="text-xs md:text-sm">倒數</span>
                        <span className="px-1">{item.deadline}</span>
                        <span className="text-xs md:text-sm">天</span>
                      </div>
                    </Flex>
                  </Box>

                  <Button
                    colorScheme="primary"
                    width={'100%'}
                    mt={4}
                    variant="outline"
                  >
                    取消追蹤
                  </Button>
                </Box>
              ))}
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Followings;

Followings.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
