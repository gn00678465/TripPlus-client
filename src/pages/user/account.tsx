import { Layout } from '@/components';
import { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

const Account: NextPageWithLayout = () => {
  return <h2>Account</h2>;
};

export default Account;

Account.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
