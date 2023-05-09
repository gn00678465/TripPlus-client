import Head from 'next/head';
import Image from 'next/image';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Textarea
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import NoImage from '@/assets/images/user/no-image.png';

const Account: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '個人資料', url: '/user/account' }
  ];

  const gender = [
    { id: 0, name: '男性' },
    { id: 1, name: '女性' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1922 },
    (_, index) => currentYear - index
  );

  const numberOptions = (length: number) => {
    return Array.from({ length }, (_, index) => index + 1);
  };

  const months = numberOptions(12);
  const days = numberOptions(31);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<UserAccountInterface.FormInputs>();

  const onSubmit = async (data: UserAccountInterface.FormInputs) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>會員中心-個人資料-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} pb={20}>
        <Container maxW={'container.xl'}>
          <Box backgroundColor={'white'} className="p-5 md:p-10">
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              className="justify-center md:flex"
            >
              <Box className="mx-auto mt-10 w-60 md:mx-0 md:mr-28">
                <Box
                  borderRadius={'full'}
                  overflow={'hidden'}
                  className="mx-auto h-60 w-60"
                >
                  <Image src={NoImage} alt="" />
                </Box>

                <Box mt={6}>
                  <FormControl
                    className="flex items-center justify-center rounded py-2"
                    textAlign={'center'}
                  >
                    <label
                      htmlFor="file"
                      className="mr-2 cursor-pointer rounded bg-primary px-3 py-1 text-center text-sm text-white hover:bg-primary-600"
                    >
                      選擇檔案
                    </label>
                    <Input
                      id="file"
                      type="file"
                      display={'none'}
                      {...register('file')}
                    />
                    <span className="text-sm">未選擇任何檔案</span>
                  </FormControl>
                </Box>
              </Box>

              <Box className="w-full md:w-2/5">
                <FormControl my={10}>
                  <FormLabel>暱稱</FormLabel>
                  <Input
                    type="text"
                    {...register('nikeName')}
                    placeholder="請輸入暱稱"
                  />
                </FormControl>

                <FormControl my={10}>
                  <FormLabel>真實身份 / 名稱</FormLabel>
                  <Input
                    type="text"
                    {...register('name')}
                    placeholder="請輸入真實身份 / 名稱"
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.email} my={10}>
                  <FormLabel className="!font-normal">E-mail</FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
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

                <FormControl my={10}>
                  <FormLabel>電話</FormLabel>
                  <Input
                    type="text"
                    {...register('phone')}
                    placeholder="請輸入電話"
                  />
                </FormControl>

                <FormControl my={10}>
                  <FormLabel>地址</FormLabel>
                  <Input
                    type="text"
                    {...register('address')}
                    placeholder="請輸入地址"
                  />
                </FormControl>

                <FormControl my={10}>
                  <FormLabel>性別</FormLabel>
                  <Select {...register('gender')}>
                    {gender.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl my={10}>
                  <FormLabel>生日</FormLabel>
                  <Box className="items-center space-y-3 md:flex md:space-y-0">
                    <Select placeholder="年" {...register('year')}>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    <span className="mx-3 hidden md:block">-</span>

                    <Select placeholder="月" {...register('month')}>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </Select>
                    <span className="mx-3 hidden md:block">-</span>

                    <Select placeholder="日" {...register('day')}>
                      {days.map((day) => (
                        <option key={day} value="option1">
                          {day}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </FormControl>

                <FormControl my={10}>
                  <FormLabel>來自</FormLabel>
                  <Input
                    type="text"
                    {...register('country')}
                    placeholder="台北, 台灣"
                  />
                </FormControl>

                <FormControl my={10}>
                  <FormLabel>個人介紹</FormLabel>
                  <Textarea
                    {...register('introduction')}
                    placeholder="請輸入個人介紹"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="primary"
                  width={'100%'}
                  my={4}
                >
                  更新
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;

Account.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
