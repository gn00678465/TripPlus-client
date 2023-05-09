import { FC } from 'react';
import BreadcrumbList from '@/components/Breadcrumb';
import UserMenu from '@/components/User/menu';
import { Box, Container } from '@chakra-ui/react';
import styles from '@/styles/user.module.scss';

interface UserHeaderProps {
  breadcrumb: ComponentsInterface.Breadcrumb[];
}

const UserHeader: FC<UserHeaderProps> = ({ breadcrumb }) => {
  return (
    <Box borderBottom={1} borderBottomColor={'gray.200'} borderStyle={'solid'}>
      <Container
        maxW="container.xl"
        mx={'auto'}
        className={`${styles['scroll-bar']} overflow-x-auto overflow-y-hidden pt-4 md:pt-10`}
      >
        <Box className="hidden md:block">
          <BreadcrumbList breadcrumb={breadcrumb} />
        </Box>

        <Box className="mb-3 md:mb-6 md:mt-10">
          <UserMenu />
        </Box>
      </Container>
    </Box>
  );
};

export default UserHeader;
