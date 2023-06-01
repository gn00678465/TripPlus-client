import Head from 'next/head';
import { Layout } from '@/components';
import ProList from '@/components/ProList';

import type { ReactElement } from 'react';

const Projects: App.NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>探索全部主題-TripPlus+</title>
      </Head>

      <ProList />
    </>
  );
};

export default Projects;

Projects.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
