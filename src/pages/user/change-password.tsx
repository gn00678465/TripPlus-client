import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Heading
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const ChangePassword: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '變更密碼', url: '/user/change-password' }
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = useForm<User.ChangePassword>();

  const password = useRef('');
  watch('password', password.current);

  const onSubmit = async (data: User.ChangePassword) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>會員中心-變更密碼-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} className="pb-10 md:pb-20">
        <Container maxW={'container.xl'}>
          <Box backgroundColor={'white'} className="p-5 md:p-10">
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              maxW="500px"
              mx={'auto'}
            >
              <Heading as="h1" size="lg" textAlign={'center'} my={10}>
                變更密碼
              </Heading>

              <FormControl isInvalid={!!errors.password} my={10}>
                <FormLabel>設定新密碼</FormLabel>
                <Input
                  type="text"
                  {...register('password', {
                    required: '請填入新密碼!',
                    minLength: { value: 8, message: '密碼至少需要8碼' },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                      message:
                        '密碼至少需要包含1個大寫字母、1個小寫字母、1個數字'
                    }
                  })}
                  placeholder="請輸入新密碼"
                />

                {!!errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword} my={10}>
                <FormLabel>確認新密碼</FormLabel>
                <Input
                  type="text"
                  {...register('confirmPassword', {
                    required: '請填入確認新密碼!',
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return '兩次密碼輸入不一致，請檢查';
                      }
                    }
                  })}
                  placeholder="請再次輸入新密碼"
                />

                {!!errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.oldPassword} my={10}>
                <FormLabel>目前密碼</FormLabel>
                <Input
                  type="text"
                  {...register('oldPassword', {
                    required: '請填入目前密碼!'
                  })}
                  placeholder="請輸入目前密碼"
                />

                {!!errors.oldPassword && (
                  <FormErrorMessage>
                    {errors.oldPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button type="submit" colorScheme="primary" width={'100%'} my={4}>
                確認修改密碼
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default ChangePassword;

ChangePassword.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
