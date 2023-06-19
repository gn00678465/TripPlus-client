import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { Box, Flex, Text, Spacer, List, ListItem } from '@chakra-ui/react';
import UserImage from '@/assets/images/user/user-image.png';
import { useAuthStore } from '@/store';
import { useCookie } from '@/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface MsgHeaderProp {
  photo: string;
  onClose?: () => void;
}

const MsgHeader = ({ photo, onClose }: MsgHeaderProp) => {
  const router = useRouter();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const [value, updateCookie, deleteCookie] = useCookie('token');

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const logout = () => {
    onClose?.();
    useAuthStore.persist.clearStorage();
    deleteCookie();
    router.push('/');
    setUserInfo(null);
  };

  return (
    <Box as="header" boxShadow={'0 2px 3px rgba(0,0,0,.05)'}>
      <Flex px={6} alignItems={'center'} h={'14'}>
        <Link href="/message" className="flex items-center">
          <Image
            src={Logo}
            width={129}
            height={36}
            alt="TripPlus Logo"
            className="mr-1"
            priority
          />
          <Text fontWeight={500} fontSize={'lg'}>
            訊息中心
          </Text>
        </Link>

        <Spacer />

        <Box onClick={() => setIsOpenMenu(!isOpenMenu)} cursor={'pointer'}>
          <Image
            src={photo || UserImage}
            alt="使用者圖片"
            width={30}
            height={30}
            priority
          />
        </Box>
      </Flex>

      {isOpenMenu && (
        <List
          position={'absolute'}
          right={5}
          top={'52px'}
          bg={'white'}
          boxShadow={'0 0 10px rgba(0,0,0,0.2)'}
          borderRadius={'lg'}
          fontSize={'sm'}
          py={2}
          zIndex={10}
        >
          <ListItem px={4} py={2} _hover={{ bg: 'secondary-emphasis.50' }}>
            <Link href="/" target="_blank">
              前往 TripPlus+ 首頁
            </Link>
          </ListItem>
          <ListItem
            px={4}
            py={2}
            cursor={'pointer'}
            onClick={logout}
            _hover={{ bg: 'secondary-emphasis.50' }}
          >
            登出
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default MsgHeader;
