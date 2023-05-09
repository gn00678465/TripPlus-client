import { FC, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  // const { isLogin, setIsLogin } = useAuthStore();

  // useEffect(() => {
  //   const token = getToken();
  //   if (token) setIsLogin(true);
  // }, [isLogin, setIsLogin]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
