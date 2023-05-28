import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import { Layout } from '@/components';
import type { ReactElement } from 'react';
import {
  Box,
  Heading,
  Tag,
  AspectRatio,
  Link,
  Flex,
  Button,
  Container,
  Progress,
  Text,
  Divider
} from '@chakra-ui/react';
import BreadcrumbList from '@/components/Breadcrumb';
import { MdBookmarkBorder } from 'react-icons/md';
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

const SummaryBlock = () => {
  return <Box></Box>;
};

const ProjectContent: App.NextPageWithLayout = () => {
  return (
    <>
      <HeaderBlock></HeaderBlock>
      <SummaryBlock></SummaryBlock>
      step
      <Box></Box>
      <Box></Box>
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
