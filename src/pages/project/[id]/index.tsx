import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components';
import { Carousel } from '@/components/Swiper';
import type { ReactElement } from 'react';
import {
  Box,
  Heading,
  Tag,
  AspectRatio,
  Link,
  Flex,
  FlexProps,
  Button,
  IconButton,
  Container,
  Progress,
  Text,
  Divider,
  Icon,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import BreadcrumbList from '@/components/Breadcrumb';
import { MdBookmarkBorder } from 'react-icons/md';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiGlobe, FiMessageSquare } from 'react-icons/fi';
import { currencyTWD } from '@/utils';

const HeaderBlock = () => {
  return (
    <Box py={{ base: 6 }}>
      <Container px={{ base: 3, xl: 0 }} maxW="1296px">
        {/* <BreadcrumbList /> */}
        <Flex
          columnGap={{ base: 2 }}
          alignItems="center"
          mb={{ base: 3, lg: 5 }}
        >
          <Tag bg="red" color="white" py="1" px="2">
            紅利回饋
          </Tag>
          <Link
            as={NextLink}
            href="/"
            fontSize={{ base: 'xs' }}
            _hover={{
              textDecoration: 'none'
            }}
            color="gray.600"
          >
            社會計畫
          </Link>
        </Flex>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          columnGap={{ base: 0, lg: '48px' }}
        >
          <AspectRatio
            maxW={{ base: 'full', lg: '50%', xl: '636px' }}
            w="full"
            ratio={10 / 7}
            borderRadius={{ base: 8 }}
            mb={{ base: 4, lg: 0 }}
            overflow="hidden"
          >
            <Image
              fill
              src="https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="「跟著手語去旅行」| 讓聾人打造一個專屬於聾人團員的遊程活動！"
            />
          </AspectRatio>
          <Flex flexDirection="column">
            <Flex flexDirection={{ base: 'column' }}>
              <Text
                className="text-secondary-emphasis"
                fontSize={{ base: 'sm', lg: 'md' }}
                mb={{ base: 2, lg: 3 }}
              >
                社團法人台灣一起夢想公益協會
              </Text>
              <Heading
                as="h3"
                fontSize={{ base: '20px', lg: '28px' }}
                lineHeight={{ base: '24px', lg: '33px' }}
                fontWeight={{ lg: 700 }}
                mb={{ base: 4, lg: 6 }}
                color="gray.900"
                className="md:line-clamp-2"
              >
                「跟著手語去旅行」| 讓聾人打造一個專屬於聾人團員的遊程活動！
              </Heading>
              <Text
                fontSize={{ base: '20px', lg: '36px' }}
                className="font-medium text-secondary-emphasis"
              >
                NT$
                <span className="ml-1">
                  {currencyTWD(328300).replace('$', '')}
                </span>
              </Text>
              <Progress
                value={80}
                borderRadius="full"
                size={{ base: 'sm', lg: 'md' }}
                colorScheme="primary"
                my={{ base: 3, lg: 4 }}
              ></Progress>
              <Text
                color="gray.600"
                fontSize={{ base: 'xs', lg: 'sm' }}
                mb={{ base: 5, lg: 6 }}
              >
                <span>目標金額</span>
                <span className="ml-2 text-sm lg:text-base">NT$</span>
                <span className="ml-1 text-sm lg:text-base">
                  {currencyTWD(328300)}
                </span>
              </Text>
              <ul className="flex h-[44px] items-center justify-between gap-x-2 lg:justify-start">
                <li className="w-1/3 grow space-y-1 text-center lg:w-auto lg:grow-0">
                  <p className="text-xs leading-[18px] text-gray-600 lg:text-sm lg:leading-[21px]">
                    剩餘時間
                  </p>
                  <p className="text-lg  text-gray-900 lg:text-xl">
                    <span className="font-medium">43</span>
                    <span className="ml-1 lg:text-lg">天</span>
                  </p>
                </li>
                <Divider orientation="vertical" mx={{ base: 0, lg: 6 }} />
                <li className="w-1/3 grow space-y-1 text-center lg:w-auto lg:grow-0">
                  <p className="text-xs leading-[18px] text-gray-600 lg:text-sm lg:leading-[21px]">
                    贊助人數
                  </p>
                  <p className="text-lg  text-gray-900 lg:text-xl">
                    <span className="font-medium">43</span>
                    <span className="ml-1 lg:text-lg">人</span>
                  </p>
                </li>
                <Divider orientation="vertical" mx={{ base: 0, lg: 6 }} />
                <li className="w-1/3 grow space-y-1 text-center lg:w-auto lg:grow-0">
                  <p className="text-xs leading-[18px] text-gray-600 lg:text-sm lg:leading-[21px]">
                    募資達成率
                  </p>
                  <p className="text-lg  font-medium text-gray-900 lg:text-xl">
                    <span>50</span>
                    <span className="ml-1">%</span>
                  </p>
                </li>
              </ul>
            </Flex>
            <Text
              color="gray.600"
              fontSize={{ base: 'xs', lg: 'sm' }}
              mt={{ base: 5, lg: 'auto' }}
              mb={{ base: 3, lg: 4 }}
            >
              專案期間
              <span className="ml-2 text-sm lg:text-base">
                2022.12.12 12:00 – 2023.01.17 23:59
              </span>
            </Text>
            <Flex
              flexDirection={{ base: 'column', lg: 'row' }}
              rowGap={{ base: 3, lg: 0 }}
              columnGap={{ base: 0, lg: 4 }}
            >
              <Button
                px={{ lg: '60px' }}
                colorScheme="secondary-emphasis"
                leftIcon={<MdBookmarkBorder />}
                variant="outline"
              >
                追蹤專案
              </Button>
              <Button
                px={{ lg: '60px' }}
                className="text-secondary-emphasis"
                backgroundColor="secondary"
                _hover={{
                  backgroundColor: 'secondary-emphasis.50'
                }}
              >
                贊助專案
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

const SocialBlock = ({ ...rest }: FlexProps) => (
  <Flex columnGap={{ base: 2 }} {...rest}>
    <IconButton
      aria-label="website"
      variant="outline"
      borderRadius="full"
      icon={<Icon as={FiGlobe} boxSize={{ base: '18px' }} />}
    />
    <IconButton
      aria-label="facebook"
      variant="outline"
      borderRadius="full"
      icon={<Icon as={FaFacebookF} boxSize={{ base: '18px' }} />}
    />
    <IconButton
      aria-label="instagram"
      variant="outline"
      borderRadius="full"
      icon={<Icon as={FaInstagram} boxSize={{ base: '18px' }} />}
    />
    <Button
      ml={{ base: 'auto' }}
      leftIcon={<Icon as={FiMessageSquare} boxSize={{ base: 5 }} />}
      colorScheme="primary"
    >
      聯絡提案者
    </Button>
  </Flex>
);

const SummaryBlock = () => {
  return (
    <Box backgroundColor="gray.100" py={{ base: 6, md: 10 }}>
      <Container px={{ base: 3, xl: 0 }} maxW="1296px">
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          rowGap={{ base: 6, md: 0 }}
          columnGap={{ base: 0, md: '100px' }}
          w="full"
        >
          <Box maxW={{ base: 'full', md: '45%', xl: '598px' }}>
            <Heading
              as="h4"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="medium"
              mb={{ base: 4, md: 6 }}
              color="gray.900"
            >
              專案摘要
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight={{ base: '21px', md: '24px' }}
              pl={{ base: 4, md: 6 }}
              borderLeftColor={{ base: 'gray.300' }}
              borderLeftWidth={{ base: '1px' }}
              borderLeftStyle={{ base: 'solid' }}
              color="gray.600"
            >
              社團法人雲林縣聽語障福利協進會將貫徹「聾人事務,聾人參與」的精神，由聾人導覽員量身打造一個專屬於聾人團員的遊程活動，活動完全符合聾人視覺無障礙的需求，預計辦理2場次的斗六小旅行活動，每一場活動都會結合雲林在地美食、走在地人才知道的小秘境、還有結合聽障職人的手作點心，實現聾式態度！
            </Text>
          </Box>
          <Box w="full">
            <Heading
              as="h4"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="medium"
              mb={{ base: 4, md: 6 }}
              color="gray.900"
            >
              關於提案者
            </Heading>
            <Flex
              columnGap={{ base: 4, md: 6 }}
              mb={{ base: 4, md: 0 }}
              pos="relative"
            >
              <AspectRatio ratio={4 / 3} maxW={{ base: '160px' }} w="full">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="提案者 Logo"
                ></Image>
              </AspectRatio>
              <ul className="flex w-full flex-col justify-center gap-y-2 text-xs tracking-[1px] md:justify-start md:gap-y-1 md:text-sm">
                <li className="flex flex-col gap-y-1 md:flex-row md:gap-x-5">
                  <p className="text-gray-500">提案者名稱</p>
                  <p className="text-gray-600">社團法人台灣一起夢想公益協會</p>
                </li>
                <li className="flex flex-col gap-y-1 md:flex-row md:gap-x-5">
                  <p className="text-gray-500">統一編號</p>
                  <p className="text-sm text-gray-600 md:text-base">31894406</p>
                </li>
                <li className="mt-auto">
                  <SocialBlock display={{ base: 'none', md: 'flex' }} />
                </li>
              </ul>
            </Flex>
            <SocialBlock display={{ base: 'flex', md: 'none' }} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const PlanCard = () => {
  return (
    <Card maxW="416px" w="full" p={{ base: 4, md: 6 }}>
      <CardHeader p="0">
        <AspectRatio
          mb={{ base: 3 }}
          borderRadius={8}
          overflow="hidden"
          ratio={4 / 3}
          maxH={{ base: '120px' }}
          w="full"
        >
          <Image
            fill
            src="https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="提案者 Logo"
          ></Image>
        </AspectRatio>
        <Text fontSize={{ base: 'md' }} fontWeight="medium">
          100元 - 理念認同，可於本方案的「加碼」欄中，自由增加贊助金額
        </Text>
      </CardHeader>
      <CardBody py={{ base: 4 }} px="0">
        <p className="mb-1 space-x-1 text-lg font-medium">
          <span>NT$</span>
          <span>100</span>
        </p>
        <div className="mb-4 space-x-2 md:mb-6">
          <Tag
            px={{ base: 2 }}
            py={{ base: 1 }}
            className="space-x-1"
            backgroundColor="gray.200"
            color="gray.600"
            borderRadius={4}
            fontSize={{ base: 'xs' }}
          >
            <span>已被贊助</span>
            <span className="text-sm">12</span>
            <span>次</span>
          </Tag>
          <Tag
            px={{ base: 2 }}
            py={{ base: 1 }}
            className="space-x-1"
            backgroundColor="secondary"
            color="secondary-emphasis.500"
            borderRadius={4}
            fontSize={{ base: 'xs' }}
          >
            <span>剩餘</span>
            <span className="text-sm">72</span>
            <span>個</span>
          </Tag>
        </div>
        <Box fontSize={{ base: 'xs' }} color="gray.600">
          <Text mb={{ base: 1 }}>您將收到</Text>
          <UnorderedList>
            <ListItem>捐款收據</ListItem>
            <ListItem>一封協會致贈的電子感謝函</ListItem>
            <ListItem>一封協會完成專案的成果報告</ListItem>
          </UnorderedList>
        </Box>
        <Divider my={{ base: 4 }}></Divider>
        <Text color="gray.600" fontSize={{ base: 'xs' }}>
          預計 2023 年 07 月出貨
        </Text>
        <Text color="gray.600" fontSize={{ base: 'xs' }}>
          贊助專案可享
          <span className="text-secondary-emphasis-500">0.5%</span>
          紅利回饋
        </Text>
      </CardBody>
      <CardFooter p="0">
        <Button w="full" py={{ base: 2 }} colorScheme="primary">
          贊助
        </Button>
      </CardFooter>
    </Card>
  );
};

const PlansBlock = () => {
  const plans = [
    {
      _id: '645c91c5666244ff5b1f3533',
      projectId: '645b436d20590d1a6d38ebd7',
      title: 'example plan',
      price: 1000,
      content: 'example content ',
      isAllowMulti: 1,
      isDelete: 1,
      createdAt: '2023-05-11T06:57:09.378Z',
      updatedAt: '2023-05-11T06:57:09.378Z',
      __v: 0
    },
    {
      _id: '645c91d8666244ff5b1f3536',
      projectId: '645b436d20590d1a6d38ebd7',
      title: 'edit plan',
      price: 777898,
      content: '7777777',
      isAllowMulti: 0,
      isDelete: 1,
      createdAt: '2023-05-11T06:57:28.997Z',
      updatedAt: '2023-05-15T02:17:56.672Z',
      __v: 0
    },
    {
      _id: '645c93e2c7c7f6a1e36c5c2c',
      projectId: '645b436d20590d1a6d38ebd7',
      title: 'edit plan',
      price: 777898,
      content: '7777777',
      isAllowMulti: 0,
      isDelete: 0,
      createdAt: '2023-05-11T07:06:10.028Z',
      updatedAt: '2023-05-15T02:14:59.453Z',
      __v: 0
    },
    {
      _id: '645c97ef85ed310e3818dfa7',
      projectId: '645b436d20590d1a6d38ebd7',
      title: 'example plan',
      price: 989898,
      content: 'example content ',
      isAllowMulti: 0,
      isDelete: 0,
      createdAt: '2023-05-11T07:23:27.017Z',
      updatedAt: '2023-05-11T07:23:27.017Z',
      __v: 0
    }
  ];

  return (
    <Box backgroundColor="gray.100" py={{ base: 10 }}>
      <Container px={{ base: 3, xl: 0 }} maxW="1296px">
        <Center mb={{ base: 5 }}>
          <Heading fontSize={{ base: '28px' }} fontWeight="bold">
            贊助方案
          </Heading>
        </Center>
        <Carousel data={plans} card={(item) => <PlanCard />} />
        {/* <PlanCard></PlanCard> */}
      </Container>
    </Box>
  );
};

const ProjectContent: App.NextPageWithLayout = () => {
  return (
    <>
      <HeaderBlock></HeaderBlock>
      <SummaryBlock></SummaryBlock>
      step
      <Box></Box>
      <PlansBlock></PlansBlock>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};

export default ProjectContent;

ProjectContent.getLayout = function (page: ReactElement) {
  return (
    <Layout headerProps={{ backgroundColor: 'gray.100' }}>
      <Box>{page}</Box>
    </Layout>
  );
};
