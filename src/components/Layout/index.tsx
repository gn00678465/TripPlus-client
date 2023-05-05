import { FC, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { useEffect } from 'react';
import { useAuthStore } from '@/store';
import { localStg } from '@/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isLogin, setIsLogin } = useAuthStore();
  useEffect(() => {
    const userInfo = localStg.get('userInfo');
    if (userInfo && userInfo.token) setIsLogin(true);
  }, [isLogin, setIsLogin]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
