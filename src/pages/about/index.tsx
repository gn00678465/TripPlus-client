import { Layout } from '@/components';
import type { ReactElement } from 'react';

const About: App.NextPageWithLayout = () => {
  return <h2>關於我們頁面</h2>;
};

export default About;

About.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
