import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import ScrollBar from '@/components/ScrollBar/horizontal';
import type { ReactElement } from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import { apiGetBonus } from '@/api/index';
import dayjs from 'dayjs';
import Loading from '@/components/Loading';

import {
  Box,
  Container,
  Heading,
  Flex,
  ListItem,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

const breadcrumb = [
  { name: '首頁', url: '/' },
  { name: '會員中心', url: '/user/account' },
  { name: '紅利紀錄', url: '/user/bonus' }
];

const list = [
  { title: '紅利點數將於「專案結束」後的 30 天統一發送。' },
  { title: '如果專案結束時間延期，不會變更您原預定收到紅利點數的時間。' },
  { title: '無限期的專案，將於訂單成立後 30 天發送紅利點數。' }
];

const Bonus: App.NextPageWithLayout = () => {
  const [totalBonus, setTotalBonus] = useState(0);
  const [bonusData, setBonusData] = useState<User.Bonus[]>([]);

  const getBonus = (data: ApiUser.Bonus) => {
    setBonusData(() => {
      let projects: User.Bonus[] = [];
      let products: User.Bonus[] = [];

      if (data.projects.length > 0) {
        projects = data.projects.map((item) => {
          return {
            ...item,
            isProject: true
          };
        });
      }

      if (data.products.length > 0) {
        products = data.products.map((item) => {
          return {
            ...item,
            isProject: false
          };
        });
      }

      const lists = [...projects, ...products];

      const listSort = lists.sort((a, b) => {
        const timestampA = dayjs(a.expirationDate).valueOf();
        const timestampB = dayjs(b.expirationDate).valueOf();
        return timestampB - timestampA;
      });

      return listSort;
    });
  };

  const { data: bonus, isLoading } = useSWR('/api/user/bonus', apiGetBonus, {
    onSuccess(data, key, config) {
      if (data && data.status === 'Success') {
        setTotalBonus(data.data.TotalBonus);
        getBonus(data.data);
      }
    }
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>會員中心-紅利紀錄-TripPlus+</title>
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
            紅利紀錄
          </Heading>

          <Box backgroundColor={'white'} className="p-5 md:p-10">
            <Flex alignItems={'end'}>
              <Box fontWeight={500} color={'gray.500'} className="text-lg">
                累積紅利點數
              </Box>
              <Box
                color={'secondary-emphasis.400'}
                fontWeight={700}
                className="ml-4 text-2xl"
              >
                {totalBonus} pt
              </Box>
            </Flex>

            <UnorderedList my={8} color={'gray.500'}>
              {list.map((item) => (
                <ListItem key={item.title} py={1}>
                  {item.title}
                </ListItem>
              ))}
            </UnorderedList>

            <Box mt={16}>
              <ScrollBar>
                <Table variant="striped">
                  <Thead className="whitespace-nowrap">
                    <Tr>
                      <Th fontSize={'1rem'}>獲得點數</Th>
                      <Th fontSize={'1rem'}>
                        <div className="w-[280px] md:w-[500px]">紅利名稱</div>
                      </Th>
                      <Th fontSize={'1rem'}>訂單編號</Th>
                      <Th fontSize={'1rem'}>發送時間</Th>
                      <Th fontSize={'1rem'}>使用期限</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {bonusData.length <= 0 ? (
                      <Tr>
                        <Td colSpan={5} textAlign={'center'}>
                          沒有紅利紀錄，立即去
                          <Link
                            href="/projects"
                            className="text-secondary-emphasis hover:text-secondary-emphasis-400"
                          >
                            探索集資專案
                          </Link>
                          ！
                        </Td>
                      </Tr>
                    ) : (
                      bonusData.map((item) => (
                        <Tr key={item.transactionId}>
                          <Td
                            color={'secondary-emphasis.400'}
                            fontWeight={600}
                            lineHeight={1.5}
                          >
                            + {item.bonus} pt
                          </Td>
                          <Td lineHeight={1.5}>
                            {item.isProject ? '專案' : '商品'}：{item.title}
                          </Td>
                          <Td lineHeight={1.5}>{item.transactionId}</Td>
                          <Td lineHeight={1.5}>{item.sendDate}</Td>
                          <Td lineHeight={1.5}>{item.expirationDate}</Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </ScrollBar>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Bonus;

Bonus.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
