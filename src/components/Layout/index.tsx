import { FC, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { BoxProps } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
  headerProps?: BoxProps;
}

const Layout: FC<LayoutProps> = ({ children, headerProps }) => {
  return (
    <>
      <Header {...headerProps} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
