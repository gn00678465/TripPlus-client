import { Layout } from '@/components';
import Link from 'next/link';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
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
  interface FormInputs {
    email: string;
    password: string;
    isRemember: boolean;
  }

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <Box py={20}>
      <Head>
        <title>會員登入-TripPlus+</title>
      </Head>
      <Container maxW="500px">
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          backgroundColor={'white'}
          p={10}
          borderRadius={10}
        >
          <Heading as="h1" size="lg" textAlign={'center'} mb={10}>
            登入
          </Heading>

          <FormControl isInvalid={!!errors.email} my={4}>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: '請填入 E-mail!',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'E-mail 格式錯誤'
                }
              })}
              placeholder="請輸入 E-mail"
            />

            {!!errors.email && (
              <FormErrorMessage className="visible">
                {errors.email.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password} my={4}>
            <FormLabel>密碼</FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: '請填入密碼!',
                minLength: { value: 8, message: '密碼至少需要8碼' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: '密碼至少需要包含1個大寫字母、1個小寫字母、1個數字'
                }
              })}
              placeholder="請輸入密碼"
            />

            {!!errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <Flex my={4}>
              <Checkbox {...register('isRemember')}>記住我</Checkbox>

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
          </FormControl>

          <Button type="submit" colorScheme="primary" width={'100%'} my={4}>
            登入
          </Button>

          <Flex alignItems={'center'} my={3}>
            <Divider borderColor={'light-gray'} />
            <Box px={2}>或</Box>
            <Divider borderColor={'light-gray'} />
          </Flex>

          <Button colorScheme="gray" width={'100%'} my={4}>
            <Icon as={FcGoogle} mr={1} className="text-xl" />
            使用 Google 帳號登入
          </Button>

          <Divider borderColor={'light-gray'} mt={3} mb={5} />

          <Flex>
            <Box mr={3}>尚未成為會員?</Box>
            <Link
              href="/signup"
              className="text-primary-700 hover:text-primary-500"
            >
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
