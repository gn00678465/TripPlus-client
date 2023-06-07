import { Layout } from '@/components';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
  currencyTWD,
  request,
  safeAwait,
  replaceTWDSymbol,
  utc2Local
} from '@/utils';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import {
  Text,
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Progress,
  OrderedList,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Checkbox,
  AspectRatio
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { apiPostOrder } from '@/api/index';
import ModalBox, { type ModalState } from '@/components/Modal';

interface CheckoutProps {
  accountData: ApiUser.Account;
  rewardData: ApiProject.ProjectWithPlan;
}

const Checkout = ({ accountData, rewardData }: CheckoutProps) => {
  const proData = rewardData;
  const reward = rewardData.plans[0];

  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, '');

  const { handleSubmit, register, watch, reset, getValues, control, setValue } =
    useForm({
      defaultValues: {
        count: '1',
        isBonusUsed: false,
        buyerEmail: '',
        buyerName: '',
        buyerPhone: '',
        recipient: '',
        recipientPhone: '',
        recipientEmail: '',
        shipment: 0,
        recipientAddress: '',
        note: '',
        payment: 0
      }
    });

  const setUserInfo = () => {
    setValue('buyerEmail', accountData.email);
    setValue('buyerName', accountData.name);
    setValue('buyerPhone', accountData.phone ? accountData.phone : '');
  };

  useEffect(() => {
    setUserInfo();
  });

  const setRecipientInfo = () => {
    setValue('recipient', accountData.name);
    setValue('recipientPhone', accountData.phone ? accountData.phone : '');
    setValue('recipientEmail', accountData.email);
    setValue(
      'recipientAddress',
      accountData.address ? accountData.address : ''
    );
  };

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const [extraMoney, setExtraMoney] = useState<string>('0');

  const [shipment, setShipment] = useState<string>('0');

  const [payment, setPayment] = useState<string>('0');

  const [bonus, setBonus] = useState<number>(0);

  const [totalMoney, setTotalMoney] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: '',
    footer: null
  });

  const setModalOpen = (boolean: boolean): void => {
    setModal((state) => ({
      ...state,
      isOpen: boolean
    }));
  };

  const setShipmentTime = (time: string) => {
    const date = utc2Local(time).add(2, 'month').format('YYYY/MM');
    return `${date.split('/')[0]} 年 ${date.split('/')[1]} 月`;
  };

  const searchParams = useSearchParams();

  const projectId = searchParams.get('project');

  const rewardId = searchParams.get('reward');

  const isProject = searchParams.has('project');

  const watchCount = watch('count');

  const isBonusUsed = watch('isBonusUsed');

  interface FormData {
    buyerEmail: string;
    buyerName: string;
    buyerPhone: string;
    count: string;
    isBonusUsed: boolean;
    note: string;
    payment: number;
    recipient: string;
    recipientAddress: string;
    recipientEmail: string;
    recipientPhone: string;
    shipment: number;
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (isProject) {
      const postData = {
        projectId: projectId as string,
        planId: rewardId as string,
        payment: data.payment,
        fundPrice: reward.price,
        count: Number(data.count),
        shipPrice: deliveryFee,
        shipment: data.shipment,
        extraFund: Number(extraMoney),
        total: totalMoney,
        buyerName: data.buyerName,
        buyerPhone: data.buyerPhone,
        buyerEmail: data.buyerEmail,
        buyerAddress: accountData.address as string,
        shipAddress: data.recipientAddress,
        recipient: data.recipient,
        recipientPhone: data.recipientPhone,
        recipientEmail: data.recipientEmail,
        note: data.note
      };
      const [err, res] = await safeAwait(apiPostOrder(postData));
      if (err) {
        setLoading(false);
        setModal(() => ({
          isOpen: true,
          content: err.message,
          footer: <Button onClick={() => setModalOpen(false)}>OK</Button>
        }));
      }
      if (res) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = res.data;
        document.querySelector('#section')!.appendChild(newDiv);
        const paymentForm = document.querySelector<HTMLFormElement>(
          "form[name='payment']"
        );
        paymentForm!.submit();
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let total = 0;
    if (isProject) {
      total =
        deliveryFee + Number(extraMoney) + reward.price * Number(watchCount);
    } else {
      if (!isBonusUsed) setBonus(0);
      total = deliveryFee + reward.price * Number(watchCount) - bonus;
    }
    setTotalMoney(() => total);
  }, [isProject, watchCount, extraMoney]);

  return (
    <>
      <Head>
        <title>填寫訂單資料-TripPlus+</title>
      </Head>
      <Box
        as="section"
        id="section"
        className="border-b-[1px] border-b-gray-200"
      >
        <Container maxW="container.xl">
          <Flex className="flex-col md:flex-row">
            <AspectRatio
              maxW={{ base: 'full', lg: '50%', xl: '300px' }}
              w="full"
              ratio={10 / 7}
            >
              <Image
                src={proData.keyVision}
                alt={proData.title}
                width={300}
                height={210}
                priority
                className="rounded-lg"
              ></Image>
            </AspectRatio>
            <Box className="py-4 pl-0 md:pl-4">
              <Link
                href={`/organization/${proData.teamId._id}`}
                className="block text-xs leading-6 text-secondary-emphasis md:text-sm"
              >
                {proData.teamId.title}
              </Link>
              <Link
                href={
                  isProject
                    ? `/project/${proData._id}`
                    : `/product/${proData._id}`
                }
              >
                <Heading
                  fontSize={{ xs: '16px', md: '20px' }}
                  fontWeight={500}
                  className="mb-4 mt-3 line-clamp-2 text-gray-900"
                >
                  {proData.title}
                </Heading>
              </Link>
              <Text
                fontSize={{ xs: '20px', md: '24px' }}
                fontWeight={500}
                className="text-secondary-emphasis"
              >
                NT$ {replaceTWDSymbol(currencyTWD(proData.sum))}
              </Text>
              <Progress
                colorScheme="primary"
                size="sm"
                h={'6px'}
                value={proData.progressRate}
                className="mb-2 mt-3 rounded-[6px] !bg-gray-200"
              />

              <Text
                fontSize={{ xs: '12px', md: '14px' }}
                className="text-gray-800"
              >
                目標：NT$ {replaceTWDSymbol(currencyTWD(proData.target))}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Container maxW="container.xl">
          <Flex
            pt={10}
            pb={5}
            className="flex-col-reverse items-center md:flex-row md:items-start"
          >
            <Box as="section" w={{ xs: '100%', md: 'auto' }}>
              <Box
                p={6}
                w={{ xs: '100%', md: 420 }}
                className="mt-6 rounded-lg border-[1px] border-b-gray-200 bg-white md:mt-0"
              >
                <Box className="aspect-ratio aspect-ratio-19x10 relative">
                  <Image
                    src={proData.keyVision}
                    alt={reward.title}
                    width={368}
                    height={140}
                    className="aspect-ratio-object rounded-lg"
                    priority
                  ></Image>
                </Box>
                <Box className="border-b-[1px] border-gray-200 pb-[60px]">
                  <Text
                    fontSize={{ xs: '18px', md: '20px' }}
                    fontWeight={500}
                    mt={{ xs: '12px', md: '16px' }}
                    mb={{ xs: '16px', md: '24px' }}
                  >
                    {reward.title}
                  </Text>
                  <Text fontWeight={500} fontSize={{ xs: '18px', md: '20px' }}>
                    NT {replaceTWDSymbol(currencyTWD(reward.price))}
                  </Text>
                  <Box className="mb-6 mt-2 inline-block rounded bg-gray-200 p-1 text-xs text-gray-600 md:text-sm">
                    已被贊助 {reward.sponsorCount} 次
                  </Box>
                  <div
                    className="text-xs text-gray-600 md:text-sm"
                    dangerouslySetInnerHTML={{ __html: reward.content }}
                  />
                </Box>
                <Box fontSize={{ xs: '12px', md: '14px' }} py={4}>
                  <Text>預計 {setShipmentTime(proData.endTime)} 出貨</Text>
                  <Text>
                    贊助專案可享
                    <span className="text-secondary-emphasis"> 0.5% </span>
                    紅利回饋
                  </Text>
                </Box>
              </Box>
              <Box as="section" w={{ xs: '100%', md: 420 }} py={6}>
                <Box className="mb-4 flex items-center justify-between">
                  <span>運費</span>
                  <span>{currencyTWD(deliveryFee)}</span>
                </Box>
                <Box className="mb-4 flex items-center justify-between">
                  <span>選項金額</span>
                  <span>{currencyTWD(reward.price)}</span>
                </Box>
                <Box className="mb-4 flex items-center justify-between">
                  <span>選擇數量</span>
                  <Controller
                    control={control}
                    name="count"
                    render={({ field: { ref, ...restField } }) => (
                      <NumberInput {...restField} defaultValue={1} min={1}>
                        <NumberInputField ref={ref} name={restField.name} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                </Box>
                {isProject ? (
                  <Box className="mb-4 flex items-center justify-between">
                    <span>額外贊助</span>
                    <NumberInput
                      min={0}
                      onChange={(valueString) =>
                        setExtraMoney(parse(valueString))
                      }
                      value={format(extraMoney)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                ) : (
                  <Box className="mb-4 flex items-center justify-between">
                    <span>使用紅利</span>
                    <Checkbox
                      colorScheme="primary"
                      {...register('isBonusUsed')}
                    >
                      折抵 {currencyTWD(bonus)} 元
                    </Checkbox>
                  </Box>
                )}

                <Box className="mb-5 border-2 border-gray-200"></Box>
                <Box className="mb-6 flex items-center justify-between">
                  <span className="text-lg font-bold">總計</span>
                  <span className="text-lg font-bold">
                    {currencyTWD(totalMoney)}
                  </span>
                </Box>
                <Button
                  colorScheme="primary"
                  w="100%"
                  size="lg"
                  type="submit"
                  isLoading={loading}
                >
                  前往付款
                </Button>
              </Box>
            </Box>
            <Box as="section" pl={{ xs: 0, md: 8 }} w="100%">
              <Box p={4} className="rounded bg-white">
                <Heading fontSize={{ xs: '20px', md: '22px' }} mb={3}>
                  會員資料
                </Heading>
                <FormControl isDisabled>
                  <FormLabel>Email 帳號</FormLabel>
                  <Input type="email" {...register('buyerEmail')} />
                </FormControl>
                <Flex mt={3} className="justify-between">
                  <FormControl w="48%" isDisabled>
                    <FormLabel>會員姓名</FormLabel>
                    <Input type="text" {...register('buyerName')} />
                  </FormControl>
                  <FormControl w="48%" isRequired>
                    <FormLabel>手機</FormLabel>
                    <Input type="tel" {...register('buyerPhone')} />
                  </FormControl>
                </Flex>
              </Box>
              <Box mt={5} p={4} className="rounded bg-white">
                <Flex className="items-center justify-between">
                  <Heading fontSize={{ xs: '20px', md: '22px' }} mb={3}>
                    收件人
                  </Heading>
                  <span
                    className="rounded bg-gray-200 p-2 text-sm hover:cursor-pointer hover:bg-gray-300"
                    onClick={setRecipientInfo}
                  >
                    同會員資料
                  </span>
                </Flex>
                <Flex mb={3} className="justify-between">
                  <FormControl w="48%" isRequired>
                    <FormLabel>真實姓名</FormLabel>
                    <Input
                      placeholder="請輸入真實姓名"
                      {...register('recipient')}
                    />
                  </FormControl>
                  <FormControl w="48%" isRequired>
                    <FormLabel>手機</FormLabel>
                    <Input
                      type="tel"
                      placeholder="請輸入手機"
                      {...register('recipientPhone')}
                    />
                  </FormControl>
                </Flex>
                <FormControl mb={3} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="請輸入 email"
                    {...register('recipientEmail')}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>運送方式</FormLabel>
                  <RadioGroup
                    onChange={setShipment}
                    value={shipment}
                    colorScheme="primary"
                  >
                    <Radio value="0" {...register('shipment')}>
                      宅配到府
                    </Radio>
                  </RadioGroup>
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel>地址</FormLabel>
                  <Input
                    placeholder="請輸入地址"
                    {...register('recipientAddress')}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>備註</FormLabel>
                  <Textarea placeholder="請輸入備註" {...register('note')} />
                </FormControl>
              </Box>
              <Box mt={5} p={4} className="rounded bg-white">
                <Heading fontSize={{ xs: '20px', md: '22px' }} mb={3}>
                  付款方式
                </Heading>
                <FormControl mb={3}>
                  <RadioGroup
                    onChange={setPayment}
                    value={payment}
                    colorScheme="primary"
                  >
                    <Radio value="0" {...register('payment')}>
                      線上刷卡
                    </Radio>
                  </RadioGroup>
                </FormControl>
                <OrderedList className="text-sm text-gray-400" spacing={1}>
                  <ListItem>
                    您將會導入付款頁面，請勿返回其他頁面，以免造成交易失敗。
                  </ListItem>
                  <ListItem>
                    信用卡授權成功後，本系統不會存留該刷卡人信用卡相關資料，只會保留刷卡成功之授權碼。
                  </ListItem>
                </OrderedList>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
      <ModalBox
        content={modal.content}
        isOpen={modal.isOpen}
        onClose={() => setModalOpen(false)}
        header="提醒"
        footer={modal.footer}
      ></ModalBox>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { project, reward } = context.query;
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  const [userErr, userRes] = await safeAwait<ApiUser.Account>(
    request('/user/account', {
      headers: { Authorization: `Bearer ${token}` }
    })
  );
  if (userErr) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false
      }
    };
  }
  const accountData = userRes.data;
  // TODO: 待有商品 api 後進行修改
  const [rewardErr, rewardRes] = await safeAwait<ApiProject.ProjectWithPlan>(
    request(`/project/${project}/plan/${reward}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  );
  if (rewardErr) {
    return {
      notFound: true
    };
  }
  const rewardData = rewardRes.data;

  return {
    props: { accountData, rewardData }
  };
};

export default Checkout;

Checkout.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
