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
  Icon,
  useToast
} from '@chakra-ui/react';
import { currency } from '@/utils';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { apiGetFollows, apiDeleteFollow, apiGetProposer } from '@/api/index';
import Loading from '@/components/Loading';
import { CgInfinity } from 'react-icons/cg';
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

  const { trigger: getProposer } = useSWRMutation(
    'proposer',
    (url, { arg }: { arg: string }) => apiGetProposer(arg)
  );

  const fetchTeam = async (teamId: string) => {
    const data = await getProposer(teamId);
    if (data && data.status === 'Success') {
      return data.data.team.title;
    }
    return '';
  };

  const getFollows = async (data: ApiUser.Follows) => {
    const followsList: User.Follows[] = [];

    await Promise.all(
      data.follows.map(async (item) => {
        if (item.productId) {
          const teamTitle = await fetchTeam(item.productId.teamId);

          followsList.push({
            id: item.productId.id,
            title: item.productId.title,
            category: getCategory(item.productId.category),
            teamId: item.productId.teamId,
            team: teamTitle,
            keyVision: item.productId.keyVision,
            progressRate: 100,
            type: item.productId.type,
            updatedAt: item.productId.updatedAt
          });
        }

        if (item.projectId) {
          const teamTitle = await fetchTeam(item.projectId.teamId);

          followsList.push({
            id: item.projectId.id,
            title: item.projectId.title,
            category: getCategory(item.projectId.category),
            teamId: item.projectId.teamId,
            team: teamTitle,
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
                  <Box
                    key={item.id}
                    className="mb-16 mt-3 w-full md:w-1/3 md:px-3"
                  >
                    <Link
                      href={
                        item.type === 'project'
                          ? `/project/${item.id}`
                          : `/product/${item.id}`
                      }
                      className="relative flex w-full items-start justify-end rounded-lg bg-cover bg-center pb-[70%]"
                      style={{
                        backgroundImage: `url(${item.keyVision})`
                      }}
                    >
                      <div className="absolute right-3 top-3 rounded bg-[#F15761] px-2 py-1 text-xs text-white md:text-sm">
                        紅利回饋
                      </div>
                    </Link>

                    <Box h={{ md: 20 }}>
                      <div className="mt-4 text-xs text-gray-500 md:text-sm">
                        {item.category}
                      </div>
                      <Link
                        href={
                          item.type === 'project'
                            ? `/project/${item.id}`
                            : `/product/${item.id}`
                        }
                        className="mt-1 line-clamp-2 font-medium transition-colors hover:text-secondary-emphasis md:mt-2 md:text-xl"
                      >
                        {item.title}
                      </Link>
                      <Link
                        href={`/organization/${item.teamId}`}
                        className="mt-1 text-xs text-secondary-emphasis hover:text-secondary-emphasis-400 md:mt-2 md:text-sm"
                      >
                        {item.team}
                      </Link>
                    </Box>

                    <Flex
                      className="mt-4 md:mt-6 md:h-[92px]"
                      justifyContent={'end'}
                      flexFlow={'column'}
                    >
                      {item.type === 'project' && (
                        <div className="text-lg font-medium text-gray-900 md:text-xl">
                          {item.target}
                        </div>
                      )}
                      <Box
                        bgColor={'gray.200'}
                        width={'100%'}
                        height={'6px'}
                        borderRadius={8}
                        className="mt-3 md:mt-4"
                      >
                        <div
                          className={`h-full rounded-xl  ${
                            item.type === 'project'
                              ? 'bg-primary'
                              : 'bg-success'
                          }`}
                          style={{
                            width: `${
                              item.progressRate && item.progressRate >= 100
                                ? 100
                                : item.progressRate
                            }%`
                          }}
                        ></div>
                      </Box>
                      {item.type === 'project' ? (
                        <Flex
                          justifyContent={'space-between'}
                          color={'gray.900'}
                          className="mt-3 text-sm md:mt-[1.125rem] md:text-base"
                        >
                          <div>{item.progressRate}%</div>
                          <div>
                            <span className="text-xs md:text-sm">倒數</span>
                            <span className="px-1">{item.countDownDays}</span>
                            <span className="text-xs md:text-sm">天</span>
                          </div>
                        </Flex>
                      ) : (
                        <Flex
                          justifyContent={'end'}
                          className="mt-3 text-sm md:mt-[1.125rem] md:text-base"
                        >
                          <Icon as={CgInfinity} mr={1} className="text-xl" />
                          長期販售
                        </Flex>
                      )}
                    </Flex>

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
                  </Box>
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
