import { Layout } from '@/components';
import Link from 'next/link';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Heading,
  Flex,
  Spacer,
  Button,
  Divider,
  Icon
} from '@chakra-ui/react';

import { FcGoogle } from 'react-icons/fc';

const Login: App.NextPageWithLayout = () => {
  interface FormState {
    email: string;
    password: string;
    isRemember: boolean;
  }

  const [form, setForm] = useState({
    email: '',
    password: '',
    isRemember: false
  } as FormState);

  const changeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string
  ): void => {
    setForm((state) => ({
      ...state,
      [name]: e.target.value
    }));
  };

  const changeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((state) => ({
      ...state,
      isRemember: !form.isRemember
    }));
  };

  return (
    <Box py={10}>
      <Head>
        <title>會員登入-TripPlus+</title>
      </Head>
      <Container maxW="500px">
        <Box backgroundColor={'#FFF'} p={10} borderRadius={10}>
          <Heading as="h1" size="lg" textAlign={'center'}>
            登入
          </Heading>

          <FormControl my={4}>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => changeInput(e, 'email')}
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel>密碼</FormLabel>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => changeInput(e, 'password')}
            />
          </FormControl>

          <Flex my={4}>
            <Checkbox isChecked={form.isRemember} onChange={changeCheckbox}>
              記住我
            </Checkbox>

            <Spacer />

            <Box>
              <Link
                href="/"
                className="text-primary-700 hover:text-primary-500"
              >
                忘記密碼?
              </Link>
            </Box>
          </Flex>

          <Button colorScheme="primary" width={'100%'} my={4}>
            登入
          </Button>

          <Flex alignItems={'center'} my={3}>
            <Divider borderColor={'#E2E8F0'} />
            <Box px={2}>或</Box>
            <Divider borderColor={'#E2E8F0'} />
          </Flex>

          <Button colorScheme="gray" width={'100%'} my={4}>
            <Icon as={FcGoogle} mr={1} className="text-xl" />
            使用 Google 帳號登入
          </Button>

          <Divider borderColor={'#E2E8F0'} mt={3} mb={5} />

          <Flex>
            <Box mr={3}>尚未成為會員?</Box>
            <Link href="/" className="text-primary-700 hover:text-primary-500">
              註冊帳號
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;

Login.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-[#E7E7E7]">{page}</Box>
    </Layout>
  );
};
