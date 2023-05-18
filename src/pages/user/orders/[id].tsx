import Head from 'next/head';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';

const Followings: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '交易紀錄', url: '/user/transactions' },
    { name: '訂單資訊', url: '/user/orders' }
  ];

  return (
    <>
      <Head>
        <title>會員中心-訂單資訊-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} className="pb-10 md:pb-20">
        <Container maxW={'container.xl'}>
          <Heading
            as="h1"
            size="lg"
            my={10}
            className="text-center md:text-left"
          >
            訂單資訊
          </Heading>
        </Container>
      </Box>
    </>
  );
};

export default Followings;

Followings.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
