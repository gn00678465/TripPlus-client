import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import UserHeader from '@/components/User/user-header';
import type { ReactElement } from 'react';
import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  useToast
} from '@chakra-ui/react';
import { currency } from '@/utils';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { apiGetFollows, apiDeleteFollow, apiGetProposer } from '@/api/index';
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import dayjs from 'dayjs';

const breadcrumb = [
  { name: '首頁', url: '/' },
  { name: '會員中心', url: '/user/account' },
  { name: '追蹤專案', url: '/user/followings' }
];

const Followings: App.NextPageWithLayout = () => {
  const { mutate } = useSWRConfig();
  const toast = useToast();

  const getCategory = (value: number) => {
    switch (value) {
      case 0:
        return '社會計劃';
      case 1:
        return '創新設計';
      case 2:
        return '精選商品';
      default:
        return '';
    }
  };

  const [list, setList] = useState<User.Follows[]>([]);
  const [cancelIdx, setCancelIdx] = useState<number | null>(null);
  const [isGetFollowsEnd, setIsGetFollowsEnd] = useState(false);

  const getFollows = async (data: ApiUser.Follows) => {
    const followsList: User.Follows[] = [];

    await Promise.all(
      data.follows.map(async (item) => {
        if (item.productId) {
          followsList.push({
            id: item.productId.id,
            title: item.productId.title,
            category: getCategory(item.productId.category),
            teamId: item.productId.teamId._id,
            team: item.productId.teamId.title,
            keyVision: item.productId.keyVision,
            progressRate: 100,
            type: item.productId.type,
            updatedAt: item.productId.updatedAt
          });
        }

        if (item.projectId) {
          followsList.push({
            id: item.projectId.id,
            title: item.projectId.title,
            category: getCategory(item.projectId.category),
            teamId: item.projectId.teamId._id,
            team: item.projectId.teamId.title,
            keyVision: item.projectId.keyVision,
            target: currency(item.projectId.target, 'zh-TW', 'TWD'),
            progressRate: item.projectId.progressRate,
            countDownDays: item.projectId.countDownDays,
            type: item.projectId.type,
            updatedAt: item.projectId.updatedAt
          });
        }
      })
    );

    const listSort = followsList.sort((a, b) => {
      const timestampA = dayjs(a.updatedAt).valueOf();
      const timestampB = dayjs(b.updatedAt).valueOf();
      return timestampB - timestampA;
    });

    setList(() => {
      setIsGetFollowsEnd(true);
      return listSort;
    });
  };

  const { data: follows } = useSWR(
    ['get', '/api/user/follows'],
    apiGetFollows,
    {
      onSuccess(data, key, config) {
        if (data && data.status === 'Success') {
          getFollows(data.data);
        }
      }
    }
  );

  const { trigger: deleteFollow } = useSWRMutation(
    ['delete', '/api/user/follow'],
    (url, { arg }: { arg: string }) => apiDeleteFollow(arg),
    {
      onSuccess: async (data, key, config) => {
        await mutate(['get', '/api/user/follows']);
        setCancelIdx(null);
        toast({
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
          containerStyle: {
            width: '100%',
            maxWidth: '100%'
          },
          render: () => (
            <Box
              color="white"
              p={3}
              bg="secondary-emphasis.400"
              textAlign={'center'}
            >
              已取消追蹤，將來的最新消息將不會再主動通知您
            </Box>
          )
        });
      }
    }
  );

  const cancelFollow = (id: string, idx: number | null) => {
    if (idx !== null) setCancelIdx(idx);
    deleteFollow(id);
  };

  const isLoading = !follows || !isGetFollowsEnd;

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>會員中心-追蹤專案-TripPlus+</title>
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
            追蹤專案
          </Heading>

          <Box backgroundColor={'white'} className="p-5 md:p-10">
            <Flex flexWrap={'wrap'}>
              {list.length <= 0 ? (
                <Box textAlign={'center'} w={'full'}>
                  目前沒有追蹤專案，立即去
                  <Link
                    href="/projects"
                    className="text-secondary-emphasis hover:text-secondary-emphasis-400"
                  >
                    探索
                  </Link>
                  ！
                </Box>
              ) : (
                list.map((item, idx) => (
                  <Card
                    item={item}
                    key={item.id}
                    content={
                      <Button
                        colorScheme="primary"
                        width={'100%'}
                        mt={4}
                        variant="outline"
                        onClick={() => cancelFollow(item.id, idx)}
                        isLoading={cancelIdx === idx}
                      >
                        取消追蹤
                      </Button>
                    }
                  />
                ))
              )}
            </Flex>
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

export default Followings;

Followings.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <Box className="bg-gray-100">{page}</Box>
    </Layout>
  );
};
