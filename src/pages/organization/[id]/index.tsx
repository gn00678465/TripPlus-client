import { Layout } from '@/components';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { apiGetProposer } from '@/api/index';
import { currencyTWD } from '@/utils';
import { GetStaticProps, GetStaticPaths } from 'next';
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import {
  Text,
  Box,
  Container,
  Flex,
  Button,
  IconButton,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiGlobe, FiMessageSquare } from 'react-icons/fi';

const Organization = () => {
  const router = useRouter();
  const { id } = router.query;

  const [teamInfo, setTeamInfo] = useState({
    _id: '',
    type: 0,
    title: '',
    photo: '',
    introduction: '',
    taxId: '',
    address: '',
    serviceTime: '',
    representative: '',
    email: '',
    phone: '',
    website: '',
    facebook: '',
    instagram: '',
    createdAt: ''
  });

  const [allProjects, setAllProjects] = useState<Project.ProjectItem[]>([]);
  const [progressProjects, setProgressProjects] = useState<
    Project.ProjectItem[]
  >([]);
  const [completeProjects, setCompleteProjects] = useState<
    Project.ProjectItem[]
  >([]);

  const { data, isLoading } = useSWR(id ? id : null, apiGetProposer, {
    onSuccess(data, key, config) {
      if (data && data.status === 'Success') {
        getTeamInfo(data.data.team);
        getProjectsInfo(data.data.projects);
      }
    }
  });

  const getTeamInfo = (data: ApiProposer.Team) => {
    setTeamInfo({
      _id: data._id,
      type: data.type,
      title: data.title,
      photo: data.photo,
      introduction: data.introduction,
      taxId: data.taxId,
      address: data.address,
      serviceTime: data.serviceTime,
      representative: data.representative,
      email: data.email,
      phone: data.phone,
      website: data.website,
      facebook: data.facebook,
      instagram: data.instagram,
      createdAt: data.createdAt
    });
  };

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

  const getProjectsInfo = (data: ApiProposer.Projects) => {
    const allProjectList = data.all.map((item) => {
      return {
        id: item.id,
        title: item.title,
        category: getCategory(item.category),
        team: item.teamId.title,
        teamId: item.teamId._id,
        keyVision: item.keyVision,
        target: currencyTWD(item.target),
        progressRate: item.progressRate,
        countDownDays: item.countDownDays,
        type: item.type,
        updatedAt: item.updatedAt
      };
    });
    const progressProjectList = data.progress.map((item) => {
      return {
        id: item.id,
        title: item.title,
        category: getCategory(item.category),
        team: item.teamId.title,
        teamId: item.teamId._id,
        keyVision: item.keyVision,
        target: currencyTWD(item.target),
        progressRate: item.progressRate,
        countDownDays: item.countDownDays,
        type: item.type,
        updatedAt: item.updatedAt
      };
    });
    const completeProjectList = data.complete.map((item) => {
      return {
        id: item.id,
        title: item.title,
        category: getCategory(item.category),
        team: item.teamId.title,
        teamId: item.teamId._id,
        keyVision: item.keyVision,
        target: currencyTWD(item.target),
        progressRate: item.progressRate,
        countDownDays: item.countDownDays,
        type: item.type,
        updatedAt: item.updatedAt
      };
    });
    setAllProjects(() => allProjectList);
    setProgressProjects(() => progressProjectList);
    setCompleteProjects(() => completeProjectList);
  };

  const getTeamType = (type: number) => {
    switch (type) {
      case 0:
        return '個人提案者';
      case 1:
        return '團隊提案者';
      default:
        break;
    }
  };

  const registerInfo = [
    {
      label: '提案者類型',
      value: getTeamType(teamInfo.type)
    },
    {
      label: '提案者名稱',
      value: teamInfo.title
    },
    {
      label: '統一編號',
      value: teamInfo.taxId
    },
    {
      label: '代表人姓名',
      value: teamInfo.representative
    },
    {
      label: '公司所在地',
      value: teamInfo.address
    }
  ];

  const contactInfo = [
    {
      label: '聯絡電話',
      value: teamInfo.phone
    },
    {
      label: '服務時間',
      value: teamInfo.serviceTime
    },
    {
      label: '聯絡信箱',
      value: teamInfo.email
    }
  ];

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>提案者資訊-TripPlus+</title>
      </Head>
      <Box as="section">
        <Container maxW="container.md">
          <Box className="flex flex-col items-center py-5 md:flex-row md:items-start">
            {teamInfo.photo && (
              <AspectRatio ratio={1 / 1} maxW={{ base: '180px' }} w="full">
                <Image
                  src={teamInfo.photo}
                  alt={teamInfo.title}
                  width={180}
                  height={180}
                  className=""
                  priority
                ></Image>
              </AspectRatio>
            )}
            <Box className="flex flex-col md:ml-5">
              <Text className="mt-2 text-center text-[28px] font-bold md:text-left md:text-[32px]">
                {teamInfo.title}
              </Text>
              <Text className="mt-3 text-center text-[16px] text-gray-500 md:text-left md:text-lg">
                加入時間：{dayjs(teamInfo.createdAt).format('YYYY-MM-DD')}
              </Text>
              <Flex columnGap={3} marginTop={4}>
                <IconButton
                  as="a"
                  target="_blank"
                  href={teamInfo.website}
                  cursor="pointer"
                  aria-label="website"
                  variant="outline"
                  borderRadius="full"
                  icon={<Icon as={FiGlobe} boxSize={{ base: '18px' }} />}
                  _hover={{ bgColor: 'gray.200' }}
                />
                <IconButton
                  as="a"
                  target="_blank"
                  href={teamInfo.facebook}
                  cursor="pointer"
                  aria-label="website"
                  variant="outline"
                  borderRadius="full"
                  icon={<Icon as={FaFacebookF} boxSize={{ base: '18px' }} />}
                  _hover={{ bgColor: 'gray.200' }}
                />
                <IconButton
                  as="a"
                  target="_blank"
                  href={teamInfo.instagram}
                  cursor="pointer"
                  aria-label="website"
                  variant="outline"
                  borderRadius="full"
                  icon={<Icon as={FaInstagram} boxSize={{ base: '18px' }} />}
                  _hover={{ bgColor: 'gray.200' }}
                />
                <Button
                  ml={{ md: 20 }}
                  leftIcon={<Icon as={FiMessageSquare} boxSize={{ base: 5 }} />}
                  colorScheme="primary"
                >
                  聯絡提案者
                </Button>
              </Flex>
            </Box>
          </Box>
          <Text className="py-5 md:text-lg">{teamInfo.introduction}</Text>
          <Box className="py-5">
            <Text className="mb-7 text-[16px] font-bold before:border-l-[3px] before:border-gray-900 before:pl-[10px] before:content-[''] md:text-xl">
              登記資訊
            </Text>
            <Box className="table">
              {registerInfo.map((info) => {
                return (
                  <Box
                    className="table-row text-sm md:text-[16px]"
                    key={info.label}
                  >
                    <span className="table-cell w-[120px] pb-7 pl-[13px] text-gray-500">
                      {info.label}
                    </span>
                    <span className="table-cell pb-7 pl-[13px]">
                      {info.value}
                    </span>
                  </Box>
                );
              })}
            </Box>
            <Text className="mb-7 mt-5 text-[16px] font-bold before:border-l-[3px] before:border-gray-900 before:pl-[10px] before:content-[''] md:text-xl">
              客服聯絡資訊
            </Text>
            <Box className="table">
              {contactInfo.map((info) => {
                return (
                  <Box
                    className="table-row text-sm md:text-[16px]"
                    key={info.label}
                  >
                    <span className="table-cell w-[120px] pb-7 pl-[13px] text-gray-500">
                      {info.label}
                    </span>
                    <span className="table-cell pb-7 pl-[13px]">
                      {info.value}
                    </span>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
        <Container maxW="container.xl" className="mt-12">
          <Tabs colorScheme="primary">
            <TabList>
              <Tab className="relative">
                發起的專案
                <span className="absolute right-1 top-[2px] text-xs">
                  {allProjects.length}
                </span>
              </Tab>
              <Tab className="relative">
                進行中專案
                <span className="absolute right-1 top-[2px] text-xs">
                  {progressProjects.length}
                </span>
              </Tab>
              <Tab className="relative">
                成功的專案
                <span className="absolute right-1 top-[2px] text-xs">
                  {completeProjects.length}
                </span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {!allProjects.length ? (
                  <Box className="flex h-[590px] items-center justify-center font-bold">
                    尚無資料
                  </Box>
                ) : (
                  allProjects.map((project) => {
                    return <Card item={project} key={project.id}></Card>;
                  })
                )}
              </TabPanel>
              <TabPanel>
                {!progressProjects.length ? (
                  <Box className="flex h-[590px] items-center justify-center font-bold">
                    尚無資料
                  </Box>
                ) : (
                  progressProjects.map((project) => {
                    return <Card item={project} key={project.id}></Card>;
                  })
                )}
              </TabPanel>
              <TabPanel>
                {!completeProjects.length ? (
                  <Box className="flex h-[590px] items-center justify-center font-bold">
                    尚無資料
                  </Box>
                ) : (
                  completeProjects.map((project) => {
                    return <Card item={project} key={project.id}></Card>;
                  })
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export default Organization;

Organization.getLayout = function (page: ReactElement) {
  return (
    <Layout>
      <div>{page}</div>
    </Layout>
  );
};
