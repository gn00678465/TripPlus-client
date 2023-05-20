import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { useState } from 'react';
import ScrollBar from '@/components/ScrollBar/horizontal';
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

const Bonus: App.NextPageWithLayout = () => {
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

  const [bonus, setBonus] = useState(33);

  const [bonusData, setBonusData] = useState([
    {
      bonus: 15,
      title: 'Canvas:忘憂繪卷 | 你的第一款恣意創作桌遊',
      shipmentId: 'REG1600481670252161',
      shipDate: '2023/02/06 05:00',
      limitDate: '2023/12/31 23:59',
      isProject: true
    },
    {
      bonus: 18,
      title: '蔡璧名的《醫道習慣》線上課程集資計畫 | 心身情食寢，習慣成自然',
      shipmentId: 'REG1600481670252161',
      shipDate: '2023/02/06 05:00',
      limitDate: '2023/12/31 23:59',
      isProject: true
    },
    {
      bonus: 15,
      title: 'Canvas:忘憂繪卷 | 你的第一款恣意創作桌遊2',
      shipmentId: 'REG1600481670252161',
      shipDate: '2023/02/06 05:00',
      limitDate: '2023/12/31 23:59',
      isProject: true
    },
    {
      bonus: 18,
      title: '蔡璧名的《醫道習慣》線上課程集資計畫 | 心身情食寢，習慣成自然2',
      shipmentId: 'REG1600481670252161',
      shipDate: '2023/02/06 05:00',
      limitDate: '2023/12/31 23:59',
      isProject: true
    }
  ]);

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
                {bonus} pt
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
                    {bonusData.map((item) => (
                      <Tr key={item.title}>
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
                        <Td lineHeight={1.5}>{item.shipmentId}</Td>
                        <Td lineHeight={1.5}>{item.shipDate}</Td>
                        <Td lineHeight={1.5}>{item.limitDate}</Td>
                      </Tr>
                    ))}
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Bonus;

Bonus.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
