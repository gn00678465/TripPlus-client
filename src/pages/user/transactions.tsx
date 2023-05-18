import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
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
import { useState } from 'react';

const Transactions: App.NextPageWithLayout = () => {
  const breadcrumb = [
    { name: '首頁', url: '/' },
    { name: '會員中心', url: '/user/account' },
    { name: '交易紀錄', url: '/user/transactions' }
  ];

  const [list, setList] = useState([
    {
      id: '1',
      team: '財團法人賑災基金會',
      title: '為自由而站：烏克蘭難民援助計畫 #TaiwanStandsWithUkraine',
      plan: '自由支持｜攜手前進',
      shipmentId: 'REG1619481646443263',
      paidAt: '2021.09.09 01:38',
      fundPrice: '790',
      isProduct: false
    },
    {
      id: '2',
      team: 'SUNSHING',
      title:
        '【S+ PURE純粹杯】全台首創!高分子抗垢技術，輕鬆清潔不卡垢，體驗最純淨的喝水',
      plan: '【獨享純粹的喝水】｜一入純粹杯',
      shipmentId: 'REG16194816464432632',
      paidAt: '2021.09.09 01:38',
      fundPrice: '790',
      isProduct: true
    },
    {
      id: '3',
      team: '財團法人賑災基金會',
      title: '為自由而站：烏克蘭難民援助計畫 #TaiwanStandsWithUkraine',
      plan: '自由支持｜攜手前進',
      shipmentId: 'REG16194816464432633',
      paidAt: '2021.09.09 01:38',
      fundPrice: '790',
      isProduct: false
    }
  ]);

  const tab = [
    { id: 0, title: '成功交易紀錄' },
    { id: 1, title: '取消/退款紀錄' },
    { id: 2, title: '等待付款紀錄' }
  ];

  const [tabIdx, setTabIdx] = useState(0);

  const selectedTab = tab.find((item) => item.id === tabIdx);

  const [showRankModal, setShowRankModal] = useState(false);

  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title: string) => {
    setModalTitle(title);
    setShowRankModal(true);
  };

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
            className="my-10 flex-col md:flex-row"
          >
            <Heading
              as="h1"
              size="lg"
              className="mb-5 text-center md:mb-0 md:text-left"
              fontWeight={700}
            >
              {selectedTab ? selectedTab.title : ''}
            </Heading>
            <Center
              color={'gray.500'}
              fontWeight={500}
              className="space-x-3 md:space-x-6"
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
            className="mb-4 bg-secondary-light py-4 tracking-widest md:mb-6 md:py-6"
            color={'secondary-emphasis.500'}
            textAlign={'center'}
            borderRadius={2}
            px={5}
          >
            可直接複製該筆交易編號，提供給平台或提案團隊聯繫查詢。
          </Box>

          <Box className="space-y-6">
            {list.map((item) => (
              <Box
                key={item.shipmentId}
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
                    <div className="ml-2">{item.plan}</div>
                  </Flex>

                  <Box className="mt-1 hidden space-x-4 text-xs md:flex md:text-sm">
                    <Flex>
                      <div className="shrink-0 text-gray-400">交易編號</div>
                      <div className="ml-2">{item.shipmentId}</div>
                    </Flex>

                    <Flex>
                      <div className="shrink-0 text-gray-400">交易時間</div>
                      <div className="ml-2">{item.paidAt}</div>
                    </Flex>

                    <Flex>
                      <div className="shrink-0 text-gray-400">交易金額</div>
                      <div className="ml-2">{item.fundPrice}</div>
                    </Flex>
                  </Box>
                </Box>

                <Flex className="mt-6 flex-col items-start justify-between md:flex-row md:items-center">
                  <Flex
                    color={'secondary-emphasis.500'}
                    fontWeight={500}
                    className="space-x-4 md:space-x-9"
                  >
                    <Flex
                      alignItems={'center'}
                      className="group cursor-pointer"
                    >
                      <Icon as={FiMessageSquare} mx={1} />
                      <span>聯絡提案者</span>
                      <Icon
                        as={IoIosArrowForward}
                        mx={1}
                        className="transition-transform group-hover:translate-x-2"
                      />
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

                  {item.isProduct && (
                    <Button
                      colorScheme="primary"
                      borderRadius={4}
                      className="mt-4 w-full md:mt-0 md:!h-12 md:w-[154px]"
                      onClick={() => openModal(item.title)}
                    >
                      評價
                    </Button>
                  )}
                </Flex>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <RankModal
        title={modalTitle}
        isOpen={showRankModal}
        onClose={() => setShowRankModal(false)}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Transactions;

Transactions.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
