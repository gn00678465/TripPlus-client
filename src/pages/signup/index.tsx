import { Layout } from '@/components';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Divider,
  Icon
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { apiPostSignup } from '../../service/api/index';
import ModalBox from '@/components/Modal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { safeAwait } from '@/utils';

const Signup: App.NextPageWithLayout = () => {
  const router = useRouter();

  const [modal, setModal] = useState<SignupInterface.ModalState>({
    isOpen: false,
    content: '',
    footer: null
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const setOpenModal = (boolean: boolean): void => {
    setModal((state) => ({
      ...state,
      isOpen: boolean
    }));
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<SignupInterface.FormInputs>();

  const password = useRef('');
  watch('password', password.current);

  const onSubmit = async (data: SignupInterface.FormInputs) => {
    const [err, res] = await safeAwait(apiPostSignup(data));
    if (err) {
      setModal(() => ({
        isOpen: true,
        content: err.message,
        footer: <Button onClick={() => setOpenModal(false)}>OK</Button>
      }));
    }
    if (res) {
      if (res.status === 'Success') {
        setModal(() => ({
          isOpen: true,
          content: '註冊成功',
          footer: null
        }));

        const timerChange = setTimeout(() => {
          router.push('/login');
        }, 3000);

        setTimer(timerChange);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return (
    <>
      <Head>
        <title>會員註冊-TripPlus+</title>
      </Head>
      <Box py={20}>
        <Container maxW="500px">
          <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            backgroundColor={'white'}
            p={10}
            borderRadius={10}
          >
            <Heading as="h1" size="lg" textAlign={'center'} mb={10}>
              註冊新帳號
            </Heading>

            <FormControl isInvalid={!!errors.email} my={4}>
              <FormLabel className="!font-normal">E-mail</FormLabel>
              <Input
                type="email"
                {...register('email', {
                  required: '請填入 E-mail!',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'E-mail 格式錯誤'
                  }
                })}
              />

              {!!errors.email && (
                <FormErrorMessage className="visible">
                  {errors.email.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.name} my={4}>
              <FormLabel>真實姓名</FormLabel>
              <Input
                type="text"
                {...register('name', {
                  required: '請填入真實姓名!'
                })}
              />

              {!!errors.name && (
                <FormErrorMessage className="visible">
                  {errors.name.message}
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
              />

              {!!errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword} my={4}>
              <FormLabel>再次確認密碼</FormLabel>
              <Input
                type="password"
                {...register('confirmPassword', {
                  required: '請填入確認密碼!',
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return '兩次密碼輸入不一致，請檢查';
                    }
                  }
                })}
              />

              {!!errors.confirmPassword && (
                <FormErrorMessage>
                  {errors.confirmPassword.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" colorScheme="primary" width={'100%'} my={4}>
              註冊
            </Button>

            <Flex alignItems={'center'} my={3}>
              <Divider borderColor={'gray.300'} />
              <Box px={2}>或</Box>
              <Divider borderColor={'gray.300'} />
            </Flex>

            <Button colorScheme="gray" width={'100%'} my={4}>
              <Icon as={FcGoogle} mr={1} className="text-xl" />
              使用 Google 帳號登入
            </Button>

            <Divider borderColor={'gray.300'} mt={3} mb={5} />

            <Flex>
              <Box mr={3}>已有帳號?</Box>
              <Link
                href="/login"
                className="text-primary-700 hover:text-primary-500"
              >
                直接登入
              </Link>
            </Flex>
          </Box>
        </Container>
      </Box>

      <ModalBox
        content={modal.content}
        isOpen={modal.isOpen}
        onClose={() => setOpenModal(false)}
        header="提醒"
        footer={modal.footer}
      ></ModalBox>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Signup;

Signup.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-200">{page}</Box>
    </Layout>
  );
};
