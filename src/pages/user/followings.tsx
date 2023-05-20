import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';

const Followings: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '追蹤專案', url: '/user/followings' }
  ];

  return (
    <>
      <Head>
        <title>會員中心-追蹤專案-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />
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
