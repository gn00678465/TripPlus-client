import Head from 'next/head';
import { Layout } from '@/components';
import ProList from '@/components/ProList';

import type { ReactElement } from 'react';

const Prodccts: App.NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>探索全部主題-TripPlus+</title>
      </Head>

      <ProList />
    </>
  );
};

export default Prodccts;

Prodccts.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
