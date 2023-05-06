import { Layout } from '@/components';
import type { ReactElement } from 'react';

const ChangePassword: App.NextPageWithLayout = () => {
  return <h2>ChangePassword</h2>;
};

export default ChangePassword;

ChangePassword.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
