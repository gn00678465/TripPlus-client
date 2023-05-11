import Head from 'next/head';
import Image, { type StaticImageData } from 'next/image';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import ModalBox, { type ModalState } from '@/components/Modal';
import type { ReactElement } from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
  apiGetUserAccount,
  apiPatchUserAccount,
  apiPostUpload
} from '@/service/api/index';
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
import { safeAwait } from '@/utils';
import dayjs from 'dayjs';
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

  const [userPhoto, setUserPhoto] = useState<string | StaticImageData>(NoImage);
  const [fileName, setFileName] = useState('');
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: '',
    footer: null
  });

  const setOpenModal = (boolean: boolean): void => {
    setModal((state) => ({
      ...state,
      isOpen: boolean
    }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1922 },
    (_, index) => currentYear - index - 1
  );

  const numberOptions = (length: number) => {
    return Array.from({ length }, (_, index) => index + 1);
  };
  const months = numberOptions(12);
  const days = numberOptions(31);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const formData = new FormData();
    if (!files) return;
    formData.append('file', files[0]);

    const [err, res] = await safeAwait(apiPostUpload(formData));
    if (err) {
      setModal(() => ({
        isOpen: true,
        content: err.message,
        footer: <Button onClick={() => setOpenModal(false)}>OK</Button>
      }));
    }
    if (res) {
      if (res.status !== 'Success') return;
      setUserPhoto(res.data.imageUrl);
      setFileName(files[0].name);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<UserAccountInterface.FormInputs>();

  const fetchAccount = useCallback(async () => {
    const [err, res] = await safeAwait(apiGetUserAccount());

    if (res) {
      if (res.status !== 'Success') return;
      const {
        email,
        name,
        nickName,
        phone,
        address,
        photo,
        gender,
        birthday,
        country,
        introduction
      } = res.data;

      reset({
        email,
        name,
        nickName,
        phone,
        address,
        gender,
        year: birthday ? dayjs(birthday).get('year') : null,
        month: birthday ? dayjs(birthday).add(1, 'month').get('month') : null,
        day: birthday ? dayjs(birthday).get('date') : null,
        country,
        introduction
      });

      setUserPhoto(photo || NoImage);
    }
  }, [reset]);

  const onSubmit = async (data: UserAccountInterface.FormInputs) => {
    const {
      email,
      name,
      nickName,
      phone,
      address,
      gender,
      year,
      month,
      day,
      country,
      introduction
    } = data;

    const payload = {
      email,
      name,
      nickName,
      phone,
      address,
      photo: typeof userPhoto === 'string' ? userPhoto : '',
      gender: Number(gender),
      birthday: dayjs(`${year}-${month}-${day}`).toDate(),
      country,
      introduction
    };

    const [err, res] = await safeAwait(apiPatchUserAccount(payload));

    if (err) {
      setModal(() => ({
        isOpen: true,
        content: err.message,
        footer: <Button onClick={() => setOpenModal(false)}>OK</Button>
      }));
    }

    if (res) {
      setModal(() => ({
        isOpen: true,
        content: res.message,
        footer: <Button onClick={() => setOpenModal(false)}>OK</Button>
      }));
    }
  };

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <>
      <Head>
        <title>會員中心-個人資料-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} className="pb-10 md:pb-20">
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
                  <Image
                    src={userPhoto}
                    alt=""
                    width={500}
                    height={500}
                    priority
                  />
                </Box>

                <Box mt={6}>
                  <FormControl
                    className="flex items-center justify-center rounded py-2"
                    textAlign={'center'}
                  >
                    <label
                      htmlFor="photo"
                      className="mr-2 cursor-pointer rounded bg-primary px-3 py-1 text-center text-sm text-white hover:bg-primary-600"
                    >
                      選擇檔案
                    </label>
                    <Input
                      id="photo"
                      type="file"
                      display={'none'}
                      {...register('photo')}
                      onChange={uploadImage}
                    />

                    <span className="text-sm">
                      {fileName ? fileName : '未選擇任何檔案'}
                    </span>
                  </FormControl>
                </Box>
              </Box>

              <Box className="w-full md:w-2/5">
                <FormControl my={10}>
                  <FormLabel>暱稱</FormLabel>
                  <Input
                    type="text"
                    {...register('nickName')}
                    placeholder="請輸入暱稱"
                  />
                </FormControl>

                <FormControl isRequired my={10}>
                  <FormLabel>真實身份 / 名稱</FormLabel>
                  <Input
                    type="text"
                    {...register('name', {
                      required: '請填入真實姓名'
                    })}
                    placeholder="請輸入真實身份 / 名稱"
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.email} my={10}>
                  <FormLabel className="!font-normal">E-mail</FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
                      required: '請填入 E-mail',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'E-mail 格式錯誤'
                      }
                    })}
                    placeholder="請輸入 E-mail"
                    disabled
                  />

                  {!!errors.email && (
                    <FormErrorMessage className="visible">
                      {errors.email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.phone} my={10}>
                  <FormLabel>手機</FormLabel>
                  <Input
                    type="text"
                    {...register('phone', {
                      pattern: {
                        value: /^09\d{8}$/,
                        message: '手機格式錯誤'
                      }
                    })}
                    placeholder="請輸入手機"
                  />

                  {!!errors.phone && (
                    <FormErrorMessage className="visible">
                      {errors.phone.message}
                    </FormErrorMessage>
                  )}
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
                        <option key={day} value={day}>
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

export default Account;

Account.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
