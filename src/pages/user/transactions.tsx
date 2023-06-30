import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import RankModal from '@/components/User/rank-modal';
import type { ReactElement } from 'react';
import {
  Box,
  Flex,
  Center,
  Container,
  Heading,
  Icon,
  Button
} from '@chakra-ui/react';
import { IoIosArrowDroprightCircle, IoIosArrowForward } from 'react-icons/io';
import { FiMessageSquare } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { currency, request, safeAwait, utc2Local } from '@/utils';
import dayjs from 'dayjs';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const [err, res] = await safeAwait<ApiUser.Orders[]>(
    request('/user/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
  );

  if (err) {
    return {
      notFound: true
    };
  }

  const list = res.data.map((item) => {
    const isProject =
      item.projectId !== null && item.projectId.type === 'project';

    return {
      id: item._id,
      transactionId: item.transactionId,
      team: isProject
        ? item.projectId.teamId.title
        : item.productId.teamId.title,
      teamId: isProject ? item.projectId.teamId._id : item.productId.teamId._id,
      title: isProject ? item.projectId.title : item.productId.title,
      planTitle: item.planId.title,
      fundPrice: currency(item.fundPrice, 'zh-TW', 'TWD'),
      paymentStatus: item.paymentStatus,
      total: item.total,
      isProject: isProject,
      projectId: item.projectId,
      productId: item.productId,
      createdAt: item.createdAt ? item.createdAt : ''
    };
  });

  return {
    props: { list }
  };
};

const breadcrumb = [
  { name: '首頁', url: '/' },
  { name: '會員中心', url: '/user/account' },
  { name: '交易紀錄', url: '/user/transactions' }
];

const tab = [
  { id: 1, title: '成功交易紀錄' },
  { id: 0, title: '等待付款紀錄' }
];

interface TransactionsProps {
  list: User.Orders[];
}

const Transactions: App.NextPageWithLayout<TransactionsProps> = ({ list }) => {
  const [tabIdx, setTabIdx] = useState(1);
  const [listData, setListData] = useState<User.Orders[]>([]);

  const selectedTab = tab.find((item) => item.id === tabIdx);

  const [showRankModal, setShowRankModal] = useState(false);

  const [modalInfo, setModalInfo] = useState({
    orderId: '',
    productId: '',
    title: ''
  });

  const openModal = (item: User.Orders) => {
    setModalInfo({
      orderId: item.id,
      productId: item.productId,
      title: item.title
    });
    setShowRankModal(true);
  };

  useEffect(() => {
    setListData(() => {
      const data = list.filter((item) => item.paymentStatus === tabIdx);
      data.sort((a, b) => {
        const timestampA = dayjs(a.createdAt).valueOf();
        const timestampB = dayjs(b.createdAt).valueOf();
        return timestampB - timestampA;
      });
      return data;
    });
  }, [list, tabIdx]);

  return (
    <>
      <Head>
        <title>會員中心-交易紀錄-TripPlus+</title>
      </Head>

      <UserHeader breadcrumb={breadcrumb} />

      <Box pt={3} className="pb-10 md:pb-20">
        <Container maxW={'container.xl'}>
          <Flex
            justifyContent={'space-between'}
            className="mb-5 mt-9 flex-col md:mb-10 md:flex-row"
          >
            <Heading
              as="h1"
              size="lg"
              className="mb-5 text-center md:mb-0 md:text-left "
              fontWeight={700}
              fontSize={{ base: 28, md: 32 }}
            >
              {selectedTab ? selectedTab.title : ''}
            </Heading>
            <Center
              color={'gray.500'}
              fontWeight={500}
              className="space-x-3 text-sm md:space-x-6 md:text-base"
            >
              {tab.map((item) => {
                if (item.id !== tabIdx) {
                  return (
                    <Center
                      key={item.id}
                      onClick={() => setTabIdx(item.id)}
                      className="cursor-pointer hover:text-secondary-emphasis-500"
                    >
                      <span>{item.title}</span>
                      <Icon
                        as={IoIosArrowDroprightCircle}
                        mx={1}
                        color={'primary.500'}
                        className="text-xl"
                      />
                    </Center>
                  );
                }
              })}
            </Center>
          </Flex>

          <Box
            className="mb-4 bg-secondary-light py-4 text-sm tracking-widest md:mb-6 md:py-6 md:text-base"
            color={'secondary-emphasis.500'}
            textAlign={'center'}
            borderRadius={2}
            px={5}
          >
            可直接複製該筆交易編號，提供給平台或提案團隊聯繫查詢。
          </Box>

          <Box className="space-y-6">
            {listData.length <= 0 ? (
              <Box textAlign={'center'}>查無相關交易紀錄</Box>
            ) : (
              listData.map((item) => (
                <Box
                  key={item.transactionId}
                  bgColor={'white'}
                  className="p-5 md:p-10"
                >
                  <div className="mb-3 text-xs md:text-sm">
                    提案團隊：{item.team}
                  </div>
                  <div className="mb-4 font-medium md:mb-6 md:text-xl">
                    {item.title}
                  </div>

                  <Box
                    borderBottom={1}
                    borderBottomColor={'gray.200'}
                    borderStyle={'solid'}
                    className="pb-3 md:pb-4"
                  >
                    <Flex className="text-xs md:text-sm">
                      <div className="shrink-0 text-gray-400">購買項目</div>
                      <div className="ml-2">{item.planTitle}</div>
                    </Flex>

                    <Box className="mt-1 hidden space-x-4 text-xs md:flex md:text-sm">
                      <Flex>
                        <div className="shrink-0 text-gray-400">交易編號</div>
                        <div className="ml-2">{item.transactionId}</div>
                      </Flex>

                      <Flex>
                        <div className="shrink-0 text-gray-400">交易時間</div>
                        <div className="ml-2">
                          {utc2Local(item.createdAt).format('YYYY.MM.DD HH:mm')}
                        </div>
                      </Flex>

                      <Flex>
                        <div className="shrink-0 text-gray-400">交易金額</div>
                        <div className="ml-2">NT {item.total}</div>
                      </Flex>
                    </Box>
                  </Box>

                  <Flex className="mt-3 flex-col items-start justify-between text-sm md:mt-6 md:flex-row md:items-center md:text-base">
                    <Flex
                      color={'secondary-emphasis.500'}
                      fontWeight={500}
                      className="space-x-4 md:space-x-9"
                    >
                      <Flex
                        alignItems={'center'}
                        className="group cursor-pointer"
                      >
                        <Link href={`/organization/${item.teamId}`}>
                          <Icon as={FiMessageSquare} mx={1} />
                          <span>聯絡提案者</span>
                          <Icon
                            as={IoIosArrowForward}
                            mx={1}
                            className="transition-transform group-hover:translate-x-2"
                          />
                        </Link>
                      </Flex>

                      <Flex alignItems={'center'} className="group">
                        <Link
                          href={`/user/orders/${item.id}`}
                          className="flex items-center transition-colors group-hover:text-secondary-emphasis-400"
                        >
                          <span>查看細節</span>
                          <Icon
                            as={IoIosArrowForward}
                            mx={1}
                            className="transition-transform group-hover:translate-x-2"
                          />
                        </Link>
                      </Flex>
                    </Flex>

                    {!item.isProject && (
                      <Button
                        colorScheme="primary"
                        borderRadius={4}
                        className="mt-4 w-full md:mt-0 md:!h-12 md:w-[154px]"
                        fontSize={{ base: '0.875rem', md: '1rem' }}
                        onClick={() => openModal(item)}
                      >
                        評價
                      </Button>
                    )}
                  </Flex>
                </Box>
              ))
            )}
          </Box>
        </Container>
      </Box>

      <RankModal
        modalInfo={modalInfo}
        isOpen={showRankModal}
        onClose={() => setShowRankModal(false)}
      />
    </>
  );
};

export default Transactions;

Transactions.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
