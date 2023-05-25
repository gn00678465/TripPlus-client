import Image from 'next/image';
import { Box, Center } from '@chakra-ui/react';
import Logo from '@/assets/images/logo.png';

const Loading = () => {
  return (
    <div>
      <Center
        position={'fixed'}
        top={0}
        left={0}
        zIndex={99}
        bgColor={'whiteAlpha.800'}
        w={'full'}
        h={'full'}
      >
        <div>
          <div className="absolute left-1/2 top-1/2 animate-bounce">
            <Image
              src={Logo}
              className="w-40 translate-x-[-80px] translate-y-[-12px]"
              alt="loading"
              width={344}
              height={96}
            />
          </div>

          <Box
            position={'relative'}
            w={64}
            h={64}
            border={8}
            borderStyle={'solid'}
            borderColor={'primary.400'}
            borderTopColor={'gray.100'}
            borderRightColor={'gray.100'}
            borderBottomColor={'gray.100'}
            borderRadius={'full'}
            className="animate-circle"
          ></Box>
        </div>
      </Center>
    </div>
  );
};

export default Loading;
