import { FC } from 'react';
import BreadcrumbList, { type Breadcrumb } from '@/components/Breadcrumb';
import UserMenu from '@/components/User/menu';
import { Box, Container } from '@chakra-ui/react';
import ScrollBar from '@/components/ScrollBar/horizontal';

interface UserHeaderProps {
  breadcrumb: Breadcrumb[];
}

const UserHeader: FC<UserHeaderProps> = ({ breadcrumb }) => {
  return (
    <Box borderBottom={1} borderBottomColor={'gray.200'} borderStyle={'solid'}>
      <ScrollBar>
        <Container maxW="container.xl" mx={'auto'} className="pt-4 md:pt-10">
          <Box className="hidden md:block">
            <BreadcrumbList breadcrumb={breadcrumb} />
          </Box>

          <Box className="mb-3 md:mb-6 md:mt-10">
            <UserMenu />
          </Box>
        </Container>
      </ScrollBar>
    </Box>
  );
};

export default UserHeader;
