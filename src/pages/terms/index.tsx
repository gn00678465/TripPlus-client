import { Layout } from '@/components';
import type { ReactElement } from 'react';

const Terms: App.NextPageWithLayout = () => {
  return <h2>使用條款頁面</h2>;
};

export default Terms;

Terms.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
