import { Layout } from '@/components';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { currency } from '@/utils';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Text,
  Box,
  Container,
  Heading,
  Flex,
  Button,
  Progress,
  OrderedList,
  UnorderedList,
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
  Checkbox
} from '@chakra-ui/react';

const Checkout = () => {
  const project = {
    imgUrl:
      'https://images.unsplash.com/photo-1491485326079-8713ae1e00a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: '「跟著手語去旅行」| 讓聾人打造一個專屬於聾人團員的遊程活動！',
    team: '社團法人台灣一起夢想公益協會',
    targetMoney: 20000000,
    currentMoney: 328300,
    currentStatus: 50
  };

  const reward = {
    imgUrl:
      'https://images.unsplash.com/photo-1522426266214-ec2d2abb9ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
    title: '100元 - 理念認同，可於本方案的「加碼」欄中，自由增加贊助金額',
    money: 100,
    hasSponsored: 12,
    remains: null,
    receives: [
      '捐款收據',
      '一封協會致贈的電子感謝函',
      '一封協會完成專案的成果報告'
    ],
    releaseDate: '2023/07'
  };

  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, '');

  const [extraMoney, setExtraMoney] = useState<string>('0');

  const [shipment, setShipment] = useState<string>('0');

  const [payment, setPayment] = useState<string>('0');

  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');
  const rewardId = searchParams.get('reward');
  const isProject = searchParams.has('project');

  return (
    <>
      <Head>
        <title>填寫訂單資料-TripPlus+</title>
      </Head>
      <Box as="section" className="border-b-[1px] border-b-gray-200">
        <Container maxW="container.xl">
          <Flex className="flex-col items-center md:flex-row md:items-start">
            <Image
              src={project.imgUrl}
              alt={project.title}
              width={300}
              height={210}
            ></Image>
            <Box pl={4} py={4}>
              <Link
                href="#"
                className="block text-xs leading-6 text-secondary-emphasis md:text-sm"
              >
                {project.team}
              </Link>
              <Link href="#">
                <Heading
                  fontSize={{ xs: '16px', md: '20px' }}
                  fontWeight={500}
                  className="mb-4 mt-3 line-clamp-2 text-gray-900"
                >
                  {project.title}
                </Heading>
              </Link>
              <Text
                fontSize={{ xs: '20px', md: '24px' }}
                fontWeight={500}
                className="text-secondary-emphasis"
              >
                NT {currency(project.currentMoney, 'zh-TW', 'TWD')}
              </Text>
              <Progress
                colorScheme="primary"
                size="sm"
                h={'6px'}
                value={project.currentStatus}
                className="mb-2 mt-3 rounded-[6px] !bg-gray-200"
              />

              <Text
                fontSize={{ xs: '12px', md: '14px' }}
                className="text-gray-800"
              >
                目標：NT {currency(project.targetMoney, 'zh-TW', 'TWD')}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box as="section">
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
                    src={reward.imgUrl}
                    alt={reward.title}
                    width={368}
                    height={140}
                    className="aspect-ratio-object rounded-lg"
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
                    NT {currency(reward.money, 'zh-TW', 'TWD')}
                  </Text>
                  <Box className="mb-6 mt-2 inline-block rounded bg-gray-200 p-1 text-xs text-gray-600 md:text-sm">
                    已被贊助 {reward.hasSponsored} 次
                  </Box>
                  <Text className="mb-1 text-xs md:text-sm">您將收到</Text>
                  <UnorderedList className="text-sm" spacing={1}>
                    {reward.receives.map((item) => {
                      return <ListItem key={item}>{item}</ListItem>;
                    })}
                  </UnorderedList>
                </Box>
                <Box fontSize={{ xs: '12px', md: '14px' }} py={4}>
                  <Text>預計 2023 年 07 月出貨</Text>
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
                  <span>$0</span>
                </Box>
                <Box className="mb-4 flex items-center justify-between">
                  <span>選項金額</span>
                  <span>${reward.money}</span>
                </Box>
                <Box className="mb-4 flex items-center justify-between">
                  <span>選擇數量</span>
                  <NumberInput defaultValue={1} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
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
                    <Checkbox colorScheme="primary">折抵 50 元</Checkbox>
                  </Box>
                )}

                <Box className="mb-5 border-2 border-gray-200"></Box>
                <Box className="mb-6 flex items-center justify-between">
                  <span className="text-lg font-bold">總計</span>
                  <span className="text-lg font-bold">${reward.money}</span>
                </Box>
                <Button colorScheme="primary" w="100%" size="lg">
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
                  <Input type="email" />
                </FormControl>
                <Flex mt={3} className="justify-between">
                  <FormControl w="48%" isDisabled>
                    <FormLabel>會員姓名</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl w="48%" isRequired>
                    <FormLabel>手機</FormLabel>
                    <Input type="tel" />
                  </FormControl>
                </Flex>
              </Box>
              <Box mt={5} p={4} className="rounded bg-white">
                <Heading fontSize={{ xs: '20px', md: '22px' }} mb={3}>
                  收件人
                </Heading>
                <Flex mb={3} className="justify-between">
                  <FormControl w="48%" isRequired>
                    <FormLabel>真實姓名</FormLabel>
                    <Input placeholder="請輸入真實姓名" />
                  </FormControl>
                  <FormControl w="48%" isRequired>
                    <FormLabel>手機</FormLabel>
                    <Input type="tel" placeholder="請輸入手機" />
                  </FormControl>
                </Flex>
                <FormControl mb={3}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="請輸入 email" />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>運送方式</FormLabel>
                  <RadioGroup
                    onChange={setShipment}
                    value={shipment}
                    colorScheme="primary"
                  >
                    <Radio value="0">宅配到府</Radio>
                  </RadioGroup>
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel>地址</FormLabel>
                  <Input placeholder="請輸入地址" />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>備註</FormLabel>
                  <Textarea placeholder="請輸入備註" />
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
                    <Radio value="0">線上刷卡</Radio>
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
    </>
  );
};

export default Checkout;

Checkout.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
