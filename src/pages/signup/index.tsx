import { Layout } from '@/components';
import type { ReactElement } from 'react';

const Signup: App.NextPageWithLayout = () => {
  return <h2>註冊頁面</h2>;
};

export default Signup;

Signup.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
