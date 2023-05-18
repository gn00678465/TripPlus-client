import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { Box, Flex, Container, Heading, FormLabel } from '@chakra-ui/react';
import dayjs from 'dayjs';

const Followings: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '交易紀錄', url: '/user/transactions' },
    { name: '訂單資訊', url: '/user/orders' }
  ];

  const getShipment = (shipment: number) => {
    switch (shipment) {
      case 0:
        return '信用卡付款';
      case 1:
        return '信用卡付款';
      case 2:
        return '超商付款';
    }
  };

  const getShipmentStatus = (shipment: number) => {
    switch (shipment) {
      case 0:
        return '未出貨';
      case 1:
        return '出貨中';
      case 2:
        return '已抵達';
    }
  };

  const list = {
    title: '為自由而站:烏克蘭難民援助計畫 #TaiwanStandsWithUkraine',
    paymentStatus: 0,
    id: 'REG1619481646443263',
    createdAt: dayjs('2023-05-16T09:25:32.884Z').format(
      'YYYY 年 MM 月 DD 日 hh:mm'
    ),
    total: '3000',
    image: 'https://picsum.photos/400/500?random=1',
    plan: {
      title: '自由支持 | 攜手前進',
      price: '3000'
    },
    note: '無',
    creditCard: '4929460590580904',
    paidAt: dayjs('2023-05-16T09:25:32.884Z').format(
      'YYYY 年 MM 月 DD 日 hh:mm'
    ),
    buyerName: '宋慧喬',
    buyerPhone: '09123456789',
    buyerEmail: 'test@gmail.com',
    buyerAddress: '臺灣臺中市六角區六角路666號',
    recipient: '王小明',
    recipientPhone: '04-9989898#4301',
    recipientEmail: 'test@gmail.com',
    shipAddress: '台中市西屯區台灣大道7段2100號',
    shipment: getShipment(0),
    shipmentStatus: getShipmentStatus(0),
    shipmentId: '1234567890',
    shipDate: dayjs('2023-05-16T09:25:32.884Z').format(
      'YYYY 年 MM 月 DD 日 hh:mm'
    )
  };

  return (
    <>
      <Head>
        <title>會員中心-訂單資訊-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} className="pb-10 md:pb-20">
        <Container maxW={'container.xl'}>
          <Heading
            as="h1"
            size="lg"
            my={10}
            className="text-center md:text-left"
          >
            訂單資訊
          </Heading>

          <Flex
            backgroundColor={'white'}
            className="p-5 md:p-10"
            justifyContent={'center'}
          >
            <Box maxW={'800px'} width={'100%'}>
              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  專案名稱
                </FormLabel>
                <Box color={'secondary-emphasis.500'}>{list.title}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  交易狀態
                </FormLabel>
                <Box>{list.paymentStatus === 0 ? '未付款' : '完成付款'}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  交易編號
                </FormLabel>
                <Box>{list.id}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  交易成立時間
                </FormLabel>
                <Box>{list.createdAt}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  訂單總額
                </FormLabel>
                <Box>NT$ {list.total}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel
                  className="w-40 shrink-0"
                  fontWeight={500}
                  color={'gray.500'}
                >
                  購買項目
                </FormLabel>
                <Flex
                  border={1}
                  borderStyle={'solid'}
                  borderColor={'gray.300'}
                  borderRadius={8}
                  className="flex-col p-6 sm:flex-row"
                  width={'100%'}
                >
                  <Box
                    width={'80px'}
                    height={'80px'}
                    overflow={'hidden'}
                    className="mb-3 sm:mr-10"
                  >
                    <Image
                      src={list.image}
                      alt=""
                      width={80}
                      height={80}
                      priority
                    />
                  </Box>

                  <Box lineHeight={2}>
                    <div>
                      <div>{list.plan.title}</div>
                      <div>NT$ {list.plan.price} X 1</div>
                    </div>
                    <div className="mt-3">
                      <div>請填入捐款收據抬頭：{list.recipient}</div>
                      <div>備註：{list.note}</div>
                    </div>
                  </Box>
                </Flex>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel
                  className="w-40 shrink-0"
                  fontWeight={500}
                  color={'gray.500'}
                >
                  付款資訊
                </FormLabel>
                <Flex
                  border={1}
                  borderStyle={'solid'}
                  borderColor={'gray.300'}
                  borderRadius={8}
                  className="p-6"
                  width={'100%'}
                >
                  <Box className="space-y-10 md:space-y-3">
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        付款方式
                      </FormLabel>
                      <Box>信用卡</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        付款狀態
                      </FormLabel>
                      <Box>完成付款</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        卡號
                      </FormLabel>
                      <Box>{list.creditCard}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        付款日期
                      </FormLabel>
                      <Box>{list.paidAt}</Box>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel
                  className="w-40 shrink-0"
                  fontWeight={500}
                  color={'gray.500'}
                >
                  購買/贊助人
                </FormLabel>
                <Flex
                  border={1}
                  borderStyle={'solid'}
                  borderColor={'gray.300'}
                  borderRadius={8}
                  className="p-6"
                  width={'100%'}
                >
                  <Box className="space-y-10 md:space-y-3">
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        姓名
                      </FormLabel>
                      <Box>{list.buyerName}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        聯絡電話
                      </FormLabel>
                      <Box>{list.buyerPhone}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        Email
                      </FormLabel>
                      <Box>{list.buyerEmail}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        地址
                      </FormLabel>
                      <Box>{list.buyerAddress}</Box>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel
                  className="w-40 shrink-0"
                  fontWeight={500}
                  color={'gray.500'}
                >
                  收件資訊
                </FormLabel>
                <Flex
                  border={1}
                  borderStyle={'solid'}
                  borderColor={'gray.300'}
                  borderRadius={8}
                  className="p-6"
                  width={'100%'}
                >
                  <Box className="space-y-10 md:space-y-3">
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        收件人
                      </FormLabel>
                      <Box>{list.recipient}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        聯絡電話
                      </FormLabel>
                      <Box>{list.recipientPhone}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        Email
                      </FormLabel>
                      <Box>{list.recipientEmail}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        地址
                      </FormLabel>
                      <Box>{list.shipAddress}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        寄送方式
                      </FormLabel>
                      <Box>{list.shipment}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        物流狀態
                      </FormLabel>
                      <Box>{list.shipmentStatus} (查詢)</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        物流編號
                      </FormLabel>
                      <Box>{list.shipmentId}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        出貨日期
                      </FormLabel>
                      <Box>{list.shipDate}</Box>
                    </Flex>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Followings;

Followings.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
