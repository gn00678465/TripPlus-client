import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { Box, Flex, Text, Spacer } from '@chakra-ui/react';
import UserImage from '@/assets/images/user/user-image.png';

const MsgHeader = () => {
  return (
    <Flex
      as="header"
      px={6}
      alignItems={'center'}
      boxShadow={'0 2px 3px rgba(0,0,0,.05)'}
      h={'14'}
    >
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

      <Box>
        <Image
          src={UserImage}
          alt="使用者圖片"
          width={30}
          height={30}
          priority
        />
      </Box>
    </Flex>
  );
};

export default MsgHeader;
