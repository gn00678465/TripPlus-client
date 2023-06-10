import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Layout, ImageFallback } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { Box, Flex, Container, Heading, FormLabel } from '@chakra-ui/react';
import { request, safeAwait } from '@/utils';
import dayjs from 'dayjs';
import NoImage from '@/assets/images/user/no-image.png';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const [err, res] = await safeAwait<ApiUser.Order>(
    request(`/user/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  );

  if (err) {
    return {
      notFound: true
    };
  }

  const getPayment = (payment: number) => {
    switch (payment) {
      case 0:
        return '信用卡付款';
      case 1:
        return 'ATM轉帳';
      case 2:
        return '超商付款';
    }
  };

  const getShipment = (shipment: number) => {
    switch (shipment) {
      case 0:
        return '宅配';
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
  const resData = res.data;

  const isProject =
    resData.projectId !== null && resData.projectId.type === 'project';

  const data = {
    title: isProject ? resData.projectId.title : resData.productId.title,
    type: isProject ? 'project' : 'product',
    payment: getPayment(resData.payment),
    paymentStatus: resData.paymentStatus,
    id: resData._id,
    transactionId: resData.transactionId,
    createdAt: dayjs(resData.createdAt).format('YYYY 年 MM 月 DD 日 hh:mm'),
    total: resData.total,
    keyVision: isProject
      ? resData.projectId.keyVision
      : resData.productId.keyVision,
    proId: isProject ? resData.projectId._id : resData.productId._id,
    plan: {
      _id: resData.planId._id,
      title: resData.planId.title,
      price: resData.planId.price
    },
    count: resData.count,
    extraFund: resData.extraFund,
    note: resData.note || '無',
    paidAt: resData.paidAt
      ? dayjs(resData.paidAt).format('YYYY 年 MM 月 DD 日 hh:mm')
      : '',
    buyerName: resData.buyerName,
    buyerPhone: resData.buyerPhone,
    buyerEmail: resData.buyerEmail,
    buyerAddress: resData.buyerAddress,
    recipient: resData.recipient,
    recipientPhone: resData.recipientPhone,
    recipientEmail: resData.recipientEmail,
    shipAddress: resData.shipAddress,
    shipment: getShipment(resData.shipment),
    shipmentStatus: getShipmentStatus(resData.shipmentStatus),
    shipmentId: resData.shipmentId || '',
    shipDate: resData.shipDate
      ? dayjs(resData.shipDate).format('YYYY 年 MM 月 DD 日 hh:mm')
      : ''
  };

  return {
    props: { data }
  };
};

const breadcrumb = [
  { name: '首頁', url: '/' },
  { name: '會員中心', url: '/user/account' },
  { name: '交易紀錄', url: '/user/transactions' },
  { name: '訂單資訊', url: '/user/orders' }
];

interface OrderProps {
  data: User.Order;
}

const Order: App.NextPageWithLayout<OrderProps> = ({ data }) => {
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
            my={10}
            className="text-center md:text-left"
            fontSize={{ base: 28, md: 32 }}
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
                <Box color={'secondary-emphasis.500'}>{data.title}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  交易狀態
                </FormLabel>
                <Box>
                  {data.paymentStatus === 0 ? (
                    <Link
                      href={`/checkout?${data.type}=${data.proId}&reward=${data.plan._id}`}
                      className="text-secondary-emphasis-500"
                    >
                      未付款
                    </Link>
                  ) : (
                    '完成付款'
                  )}
                </Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  交易編號
                </FormLabel>
                <Box>{data.transactionId}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  交易成立時間
                </FormLabel>
                <Box>{data.createdAt}</Box>
              </Flex>

              <Flex my={10} className="flex-col md:flex-row">
                <FormLabel className="w-40" fontWeight={500} color={'gray.500'}>
                  訂單總額
                </FormLabel>
                <Box>NT$ {data.total}</Box>
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
                    <ImageFallback
                      src={data.keyVision as string}
                      fallbackSrc={NoImage.src}
                      alt={data.title as string}
                      priority
                      width={100}
                      height={100}
                    />
                  </Box>

                  <Box lineHeight={2}>
                    <div>
                      <div>{data.plan.title}</div>
                      <div>
                        NT$ {data.plan.price} X {data.count}
                      </div>
                    </div>

                    <div>
                      <div>額外贊助：{data.extraFund}</div>
                    </div>

                    <div className="mt-3">
                      <div>請填入捐款收據抬頭：{data.recipient}</div>
                      <div>備註：{data.note}</div>
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
                      <Box>{data.payment}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        付款狀態
                      </FormLabel>
                      <Box>
                        {data.paymentStatus === 0 ? '未付款' : '完成付款'}
                      </Box>
                    </Flex>
                    {data.paidAt && (
                      <Flex className="flex-col md:flex-row">
                        <FormLabel
                          className="w-28"
                          fontWeight={500}
                          color={'gray.500'}
                        >
                          付款日期
                        </FormLabel>
                        <Box>{data.paidAt}</Box>
                      </Flex>
                    )}
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
                      <Box>{data.buyerName}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        聯絡電話
                      </FormLabel>
                      <Box>{data.buyerPhone}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        Email
                      </FormLabel>
                      <Box>{data.buyerEmail}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        地址
                      </FormLabel>
                      <Box>{data.buyerAddress}</Box>
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
                      <Box>{data.recipient}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        聯絡電話
                      </FormLabel>
                      <Box>{data.recipientPhone}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        Email
                      </FormLabel>
                      <Box>{data.recipientEmail}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        地址
                      </FormLabel>
                      <Box>{data.shipAddress}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        寄送方式
                      </FormLabel>
                      <Box>{data.shipment}</Box>
                    </Flex>
                    <Flex className="flex-col md:flex-row">
                      <FormLabel
                        className="w-28"
                        fontWeight={500}
                        color={'gray.500'}
                      >
                        物流狀態
                      </FormLabel>
                      <Box>{data.shipmentStatus}</Box>
                    </Flex>

                    {data.shipmentId && (
                      <Flex className="flex-col md:flex-row">
                        <FormLabel
                          className="w-28"
                          fontWeight={500}
                          color={'gray.500'}
                        >
                          物流編號
                        </FormLabel>
                        <Box>{data.shipmentId}</Box>
                      </Flex>
                    )}

                    {data.shipDate && (
                      <Flex className="flex-col md:flex-row">
                        <FormLabel
                          className="w-28"
                          fontWeight={500}
                          color={'gray.500'}
                        >
                          出貨日期
                        </FormLabel>
                        <Box>{data.shipDate}</Box>
                      </Flex>
                    )}
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

export default Order;

Order.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
