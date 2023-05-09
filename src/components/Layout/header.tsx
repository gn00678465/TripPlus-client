import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Flex,
  List,
  ListItem,
  Container,
  Spacer,
  Button,
  Center,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Input,
  Icon
} from '@chakra-ui/react';

import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import { localStg } from '@/utils';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store';

const Header = () => {
  const router = useRouter();
  const { isLogin, setIsLogin } = useAuthStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

  const [placement, setPlacement] = useState<DrawerPlacement>('top');

  const logout = () => {
    if (!isLogin) {
      router.push('/login');
      return;
    }
    setIsLogin(false);
    localStg.remove('userInfo');
    router.push('/');
  };

  const menu = [
    { title: '首頁', url: '/', isShowPc: false },
    { title: '探索', url: '/', isShowPc: true },
    { title: '提案', url: '/', isShowPc: true }
  ];

  return (
    <Box
      as="header"
      className={`relative border-none bg-transparent font-semibold ${
        isOpen ? '!z-[1500]' : ''
      }`}
      py={5}
      borderBottom="1px"
      borderColor="#E9E9E9"
    >
      <Container maxW="container.xl">
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={172}
                height={48}
                alt="TripPlus Logo"
                className="mr-16"
                priority
              />
            </Link>

            <List gap="12" className="hidden md:flex">
              {menu.map(
                (item) =>
                  item.isShowPc && (
                    <ListItem key={item.title}>
                      <Link href={item.url} className="hover:text-[#757575]">
                        {item.title}
                      </Link>
                    </ListItem>
                  )
              )}
            </List>
          </Flex>

          <Spacer />

          <Box alignItems="center" className="hidden md:flex">
            <Center className="mr-8 cursor-pointer">
              <Icon as={AiOutlineSearch} mr={1} className=" text-xl" />
              搜尋
            </Center>
            <Button colorScheme="primary" width={81} onClick={logout}>
              {isLogin ? '登出' : '登入'}
            </Button>
          </Box>

          <Box className="cursor-pointer text-xl md:hidden">
            {isOpen ? (
              <Icon as={GrClose} onClick={onClose} />
            ) : (
              <Icon as={FaBars} onClick={onOpen} />
            )}
          </Box>
        </Flex>
      </Container>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className="!top-20 !z-10" backgroundColor={'#F9F9F9'}>
          <DrawerHeader pt={5} pb={0}>
            <Box pos="relative">
              <Icon
                as={AiOutlineSearch}
                mr={1}
                pos="absolute"
                top="2.5"
                left="5"
                zIndex={2}
                className="cursor-pointer text-xl"
              />

              <Input
                placeholder="搜尋關鍵字"
                backgroundColor={'#ededed'}
                pl={12}
              />
            </Box>
          </DrawerHeader>

          <DrawerBody>
            <List className="text-center">
              {menu.map((item) => (
                <ListItem
                  key={item.title}
                  className="border-b border-[#E9E9E9] last:border-b-0 hover:bg-white"
                >
                  <Link href={item.url} className="block py-3">
                    {item.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter pt={0}>
            <Button colorScheme="primary" width={'100%'}>
              {isLogin ? '登出' : '登入'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default Header;
