import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components';
import ProList from '@/components/ProList';
import type { ReactElement } from 'react';
import { SWRConfig, unstable_serialize } from 'swr';
import { handleQueryParams, safeAwait, request } from '@/utils';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const paramsQuery = handleQueryParams(context.query);
  const query = new URLSearchParams(paramsQuery).toString();

  const [err, res] = await safeAwait<ApiProject.Projects>(
    request(`/project?${query}`)
  );

  if (res) {
    return {
      props: {
        fallback: {
          [unstable_serialize(['/api/projects', paramsQuery])]: res
        }
      }
    };
  }

  return {
    props: {}
  };
};

interface ProductsProps {
  fallback: any;
}
const Products: App.NextPageWithLayout<ProductsProps> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>探索全部主題-TripPlus+</title>
      </Head>

      <SWRConfig value={{ fallback }}>
        <ProList />
      </SWRConfig>
    </>
  );
};

export default Products;

Products.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
