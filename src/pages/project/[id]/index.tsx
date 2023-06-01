import { GetServerSideProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout, ImageFallback } from '@/components';
import { Carousel } from '@/components/Swiper';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import userSWRMutation from 'swr/mutation';
import {
  Box,
  BoxProps,
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
  ListItem,
  useDisclosure,
  useSteps,
  useToast,
  Image as Img
} from '@chakra-ui/react';
import BreadcrumbList, { type Breadcrumb } from '@/components/Breadcrumb';
import { MdBookmarkBorder, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiGlobe, FiMessageSquare } from 'react-icons/fi';
import { BsCheck2, BsCircleFill } from 'react-icons/bs';
import {
  currencyTWD,
  request,
  safeAwait,
  swrFetch,
  replaceTWDSymbol,
  utc2Local
} from '@/utils';
import { apiGetProjectInfo, apiPostFollow } from '@/api';
import NoImage from '@/assets/images/user/user-image.png';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  const [err, res] = await safeAwait<ApiProject.Project>(
    request(`/project/${id}`)
  );
  if (
    err &&
    (err.message === '路由資訊錯誤' ||
      err.message === '專案 id 資訊錯誤，找不到專案')
  ) {
    return {
      notFound: true
    };
  }
  if (res) {
    return {
      props: {
        id,
        fallback: {
          [`/project/${id}`]: res
        }
      }
    };
  }
  return {
    props: {}
  };
};

interface BoxBlockProps extends Omit<BoxProps, 'id'> {
  id?: string | string[];
  data?: ApiProject.Project;
}
const HeaderBlock = ({ id, data, ...rest }: BoxBlockProps) => {
  const categoryMap: Record<number, string> = {
    0: '社會計畫',
    1: '創新設計',
    2: '精選商品'
  };

  const menu: Breadcrumb[] = [
    {
      name: '首頁',
      url: '/'
    },
    {
      name: categoryMap[data?.category as number],
      url: `/projects?category=${data?.category}`
    },
    {
      name: data?.title as string,
      url: `/project/${id}`
    }
  ];

  const { trigger } = userSWRMutation(
    '/api/user/follow',
    (url, { arg }: { arg: string }) => apiPostFollow(arg)
  );

  console.log(data);

  return (
    <Box py={{ base: 6 }} {...rest}>
      <Container px={{ base: 3, xl: 0 }} maxW="container.xl">
        <BreadcrumbList
          display={{ base: 'none', lg: 'block' }}
          fontSize={{ base: 'sm' }}
          my={{ base: 5, xl: 10 }}
          breadcrumb={menu}
        />
        <Flex
          columnGap={{ base: 2, lg: 3 }}
          alignItems="center"
          mb={{ base: 3, lg: 5 }}
        >
          <Tag bg="red" color="white" py="1" px="2">
            紅利回饋
          </Tag>
          <Link
            as={NextLink}
            href={`/projects?category=${data?.category}`}
            fontSize={{ base: 'xs', md: 'sm' }}
            _hover={{
              textDecoration: 'none'
            }}
            fontWeight={400}
            color="gray.600"
          >
            {categoryMap[data?.category as number]}
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
            <ImageFallback
              src={data?.keyVision as string}
              fallbackSrc={NoImage.src}
              alt={data?.title as string}
              fill
              priority
              sizes="(max-width: 768px) 100%, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
          <Flex flexDirection="column">
            <Flex flexDirection={{ base: 'column' }}>
              <Text
                className="text-secondary-emphasis"
                fontSize={{ base: 'sm', lg: 'md' }}
                mb={{ base: 2, lg: 3 }}
              >
                {data?.teamId.title}
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
                {data?.title}
              </Heading>
              <Text
                fontSize={{ base: '20px', lg: '36px' }}
                className="font-medium text-secondary-emphasis"
              >
                NT$
                <span className="ml-1">
                  {replaceTWDSymbol(currencyTWD(data?.sum))}
                </span>
              </Text>
              <Progress
                value={data?.progressRate}
                borderRadius="full"
                height="6px"
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
                  {replaceTWDSymbol(currencyTWD(data?.target))}
                </span>
              </Text>
              <ul className="flex h-[44px] items-center justify-between gap-x-2 lg:justify-start">
                <li className="w-1/3 grow space-y-1 text-center lg:w-auto lg:grow-0">
                  <p className="text-xs leading-[18px] text-gray-600 lg:text-sm lg:leading-[21px]">
                    剩餘時間
                  </p>
                  <p className="text-lg  text-gray-900 lg:text-xl">
                    <span className="font-medium">{data?.countDownDays}</span>
                    <span className="ml-1 lg:text-lg">天</span>
                  </p>
                </li>
                <Divider orientation="vertical" mx={{ base: 0, lg: 6 }} />
                <li className="w-1/3 grow space-y-1 text-center lg:w-auto lg:grow-0">
                  <p className="text-xs leading-[18px] text-gray-600 lg:text-sm lg:leading-[21px]">
                    贊助人數
                  </p>
                  <p className="text-lg  text-gray-900 lg:text-xl">
                    <span className="font-medium">{data?.sponsorCount}</span>
                    <span className="ml-1 lg:text-lg">人</span>
                  </p>
                </li>
                <Divider orientation="vertical" mx={{ base: 0, lg: 6 }} />
                <li className="w-1/3 grow space-y-1 text-center lg:w-auto lg:grow-0">
                  <p className="text-xs leading-[18px] text-gray-600 lg:text-sm lg:leading-[21px]">
                    募資達成率
                  </p>
                  <p className="text-lg  font-medium text-gray-900 lg:text-xl">
                    <span>{data?.progressRate}</span>
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
                {utc2Local(data?.startTime as string).format(
                  'YYYY.MM.DD HH:mm'
                )}{' '}
                –{' '}
                {utc2Local(data?.endTime as string).format('YYYY.MM.DD HH:mm')}
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
                leftIcon={
                  <Icon as={MdBookmarkBorder} boxSize={{ base: 5, md: 6 }} />
                }
                variant="outline"
                _hover={{
                  color: 'white',
                  backgroundColor: 'secondary-emphasis.500'
                }}
                onClick={() => {
                  trigger(id as string, {
                    onError(err, key, config) {
                      console.log('error');
                    },
                    onSuccess(data, key, config) {
                      console.log('success');
                    }
                  });
                  console.log(id);
                }}
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

interface SocialBlockProps extends FlexProps {
  team?: ApiProject.Team;
}

const SocialBlock = ({ team, ...rest }: SocialBlockProps) => (
  <Flex columnGap={{ base: 2 }} {...rest}>
    <IconButton
      as="a"
      target="_blank"
      href={team?.website as string}
      cursor="pointer"
      aria-label="website"
      variant="outline"
      borderRadius="full"
      icon={<Icon as={FiGlobe} boxSize={{ base: '18px' }} />}
      _hover={{ bgColor: 'white' }}
    />
    <IconButton
      as="a"
      target="_blank"
      href={team?.facebook as string}
      cursor="pointer"
      aria-label="facebook"
      variant="outline"
      borderRadius="full"
      icon={<Icon as={FaFacebookF} boxSize={{ base: '18px' }} />}
      _hover={{ bgColor: 'white' }}
    />
    <IconButton
      as="a"
      target="_blank"
      href={team?.instagram as string}
      cursor="pointer"
      aria-label="instagram"
      variant="outline"
      borderRadius="full"
      icon={<Icon as={FaInstagram} boxSize={{ base: '18px' }} />}
      _hover={{ bgColor: 'white' }}
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

const SummaryBlock = ({ id, data, ...rest }: BoxBlockProps) => {
  return (
    <Box backgroundColor="gray.100" py={{ base: 6, md: 10 }} {...rest}>
      <Container px={{ base: 3, xl: 0 }} maxW="container.xl">
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          rowGap={{ base: 6, lg: 0 }}
          columnGap={{ base: 0, lg: '100px' }}
          w="full"
        >
          <Box maxW={{ base: 'full', lg: '45%', xl: '598px' }} w="full">
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
              {data?.content}
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
                <ImageFallback
                  src={data?.teamId.photo as string}
                  fallbackSrc={NoImage.src}
                  alt={data?.teamId.title as string}
                  fill
                />
              </AspectRatio>
              <ul className="flex w-full flex-col justify-center gap-y-2 text-xs tracking-[1px] md:justify-start md:gap-y-1 md:text-sm">
                <li className="flex flex-col gap-y-1 md:flex-row md:gap-x-5">
                  <p className="min-w-[75px] text-gray-500">提案者名稱</p>
                  <p className="text-gray-600">{data?.teamId.title}</p>
                </li>
                <li className="flex flex-col gap-y-1 md:flex-row md:gap-x-5">
                  <p className="min-w-[75px] text-gray-500">統一編號</p>
                  <p className="text-sm text-gray-600 md:text-base">
                    {data?.teamId.taxId}
                  </p>
                </li>
                <li className="mt-auto">
                  <SocialBlock
                    team={data?.teamId}
                    display={{ base: 'none', md: 'flex' }}
                  />
                </li>
              </ul>
            </Flex>
            <SocialBlock
              team={data?.teamId}
              display={{ base: 'flex', md: 'none' }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const StepBlock = () => {
  const steps = [
    { title: '企劃目的' },
    { title: '款項分配' },
    { title: '回饋品寄送' },
    { title: '實際執行' }
  ];

  const { activeStep } = useSteps({
    index: 0,
    count: steps.length
  });

  interface StepProps {
    title: string;
    index: number;
    complete?: ReactNode;
    incomplete?: ReactNode;
  }
  const Step = ({ title, index, complete, incomplete }: StepProps) => {
    return (
      <Box textAlign="center">
        <Box mb={2} display="inline-block">
          {activeStep >= index ? (
            <Box
              w="full"
              h="full"
              maxW="36px"
              maxH="36px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              backgroundColor="primary.500"
              color="white"
              borderRadius="50%"
            >
              {complete}
            </Box>
          ) : (
            <Box
              w="full"
              h="full"
              maxW="36px"
              maxH="36px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              backgroundColor="transparent"
              color="gray.100"
              borderRadius="50%"
            >
              {incomplete}
            </Box>
          )}
        </Box>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
          {title}
        </Text>
      </Box>
    );
  };

  return (
    <Center px={{ base: 3, md: 0 }} mt={{ base: 6, md: 10 }}>
      <Flex
        w="full"
        maxW="660px"
        pos="relative"
        alignItems="center"
        justifyContent="space-between"
        _before={{
          content: '""',
          position: 'absolute',
          width: 'calc(100% - 48px)',
          height: '2px',
          backgroundColor: 'gray.100',
          left: '24px',
          top: '18px',
          zIndex: -1
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            index={index}
            complete={<Icon as={BsCheck2} boxSize={5} />}
            incomplete={<Icon as={BsCircleFill} />}
            {...step}
          />
        ))}
      </Flex>
    </Center>
  );
};

interface MenuItem {
  title: string;
  href: string;
}
interface TabListProps extends FlexProps {
  menu: MenuItem[];
  path: string;
}
const TabList = ({ menu, path, ...rest }: TabListProps) => {
  return (
    <Flex
      w="full"
      pb={{ base: 3, lg: 6 }}
      borderBottomColor={{ base: 'gray.200' }}
      borderBottomWidth={{ base: 1 }}
      borderBottomStyle={{ base: 'solid' }}
      justifyContent={{ base: 'center' }}
      columnGap={{ base: 5, lg: 10 }}
      {...rest}
    >
      {menu.map((item) => (
        <Link
          pos="relative"
          key={item.href}
          as={NextLink}
          href={item.href}
          fontWeight={500}
          fontSize={{ base: 'xs', md: 'sm' }}
          textDecoration={{ base: 'none' }}
          aria-current={path === item.href ? 'page' : undefined}
          _hover={{}}
          _activeLink={{
            color: 'secondary-emphasis.500',
            textDecoration: 'none',
            _after: {
              base: {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '2px',
                backgroundColor: 'secondary-emphasis.500',
                left: 0,
                bottom: '-12px'
              },
              lg: {
                bottom: '-24px'
              }
            }
          }}
        >
          {item.title}
        </Link>
      ))}
    </Flex>
  );
};

const ContentBlock = ({ id, children, ...rest }: BoxBlockProps) => {
  const router = useRouter();

  const path = router.asPath;
  const menu: MenuItem[] = [
    {
      title: '專案介紹',
      href: `/project/${id}`
    },
    {
      title: '資訊揭露與承諾',
      href: `/project/${id}/disclosures`
    },
    {
      title: '最新消息',
      href: `/project/${id}/news`
    },
    {
      title: '常見問題',
      href: `/project/${id}/faqs`
    }
  ];

  return (
    <Box py={{ base: 10, md: 20 }} {...rest}>
      <TabList menu={menu} path={path} />
      <Container pt={{ base: 6, md: 10 }} maxW="856px">
        {children}
      </Container>
    </Box>
  );
};

interface PlanCardProps extends ApiProject.Plan {}
const PlanCard = (props: PlanCardProps) => {
  return (
    <Card
      mx="auto"
      maxW="416px"
      w="full"
      p={{ base: 4, md: 6 }}
      transition="all 0.2s ease-in-out"
      _hover={{
        top: '-2px',
        boxShadow: '0px 8px 60px rgba(0, 0, 0, 0.1);'
      }}
    >
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
          {props.price}元 - {props.title}
        </Text>
      </CardHeader>
      <CardBody py={{ base: 4 }} px="0">
        <p className="mb-1 space-x-1 text-lg font-medium">
          <span>NT$</span>
          <span>{props.price}</span>
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
        <NextLink
          href={`/checkout?project=${props?.projectId}&reward=${props?._id}`}
          passHref
          legacyBehavior
        >
          <Button w="full" py={{ base: 2 }} colorScheme="primary">
            贊助
          </Button>
        </NextLink>
      </CardFooter>
    </Card>
  );
};

const PlansBlock = ({ id, data, ...rest }: BoxBlockProps) => {
  const plans = (data && data.plans) || [];

  return (
    <Box backgroundColor="gray.100" py={{ base: 10 }} {...rest}>
      <Container px={{ base: 3, xl: 0 }} maxW="container.xl">
        <Center mb={{ base: 5 }}>
          <Heading fontSize={{ base: '28px' }} fontWeight="bold">
            贊助方案
          </Heading>
        </Center>
        <Carousel data={plans} card={(item) => <PlanCard {...item} />} />
      </Container>
    </Box>
  );
};

export interface ProjectLayoutProps {
  children: ReactNode;
  id?: string | string[];
}

export const ProjectLayout = ({ children, id }: ProjectLayoutProps) => {
  const { data } = useSWR(id ? `/project/${id}` : null, () =>
    swrFetch(apiGetProjectInfo(id as string))
  );

  return (
    <>
      <Head>
        <title>{`${data?.data?.title}-TripPlus+`}</title>
      </Head>
      <HeaderBlock id={id} data={data?.data}></HeaderBlock>
      <SummaryBlock id={id} data={data?.data}></SummaryBlock>
      <StepBlock></StepBlock>
      <ContentBlock id={id}>{children}</ContentBlock>
      <PlansBlock id={id} data={data?.data}></PlansBlock>
    </>
  );
};

interface ProjectContentProps extends ProjectLayoutProps {
  fallback: {
    [key: string]: ApiProject.Project;
  };
}

const ProjectContent: App.NextPageWithLayout<ProjectContentProps> = ({
  id,
  fallback
}) => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  return (
    <SWRConfig value={{ fallback }}>
      <ProjectLayout id={id}>
        <>
          <Box
            className="space-y-3 md:space-y-4"
            color="gray.600"
            fontSize={{ base: 'sm', md: 'md' }}
          >
            <Text>
              他是聾人，也是目前雲林縣聽語障福利協進會的總幹事，在加入協會之前，他擔任樂器拋光師，擁有穩定收入能夠照養家庭，但在發現不是每個聾人都能跟他一樣有一份穩定的工作後，決定開始協會工作生涯，沒想到一做就是20多年。
            </Text>
            <Text>
              因為本身是聾人，所以他更能夠深刻體會聾人的需求、看見了許多聾人的困境，他推動了許多聽語障相關計劃，不論是「聾文盲的識字教育計劃」、「聽語障環保清潔服務隊」等，也發現對於聾人來說，能夠有一個專屬的導覽是多麽期待的事情！
            </Text>
            <AspectRatio
              ratio={10 / 3}
              borderRadius={8}
              overflow="hidden"
              objectFit="cover"
              objectPosition="center"
            >
              <Img src="https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" />
            </AspectRatio>
            <Heading fontSize={{ base: 'lg', md: 'xl' }}>
              你有參加過導覽的經驗嗎？
            </Heading>
            <Text>
              導覽活動對大家而言是多麼稀鬆平常的事情，到了現場可以選擇參加固定的導覽場次或是使用多媒體導覽機租借認識各種議題和作品，但是聾人呢？
            </Text>
            <Text>
              近年來，雖然越來越多場館提供各種形式的手語導覽服務，甚至有聾人導覽員提供導覽服務，但是這些服務大多集中在北部，而多為聽人導覽員與手語翻譯員提供導覽服務。
            </Text>
          </Box>
          <Center mt={{ base: 6, md: 10 }}>
            <Box
              as="button"
              textAlign="center"
              color="secondary-emphasis.500"
              transition="color 0.3s ease-in-out"
              _hover={{
                color: 'secondary-emphasis.600'
              }}
            >
              <Text mb={{ base: 1 }}>閱讀更多</Text>
              <Icon
                as={MdOutlineKeyboardArrowDown}
                boxSize={{ base: 5, md: 6 }}
              />
            </Box>
          </Center>
        </>
      </ProjectLayout>
    </SWRConfig>
  );
};

export default ProjectContent;

ProjectContent.getLayout = function (page: ReactElement<ProjectContentProps>) {
  return <Layout headerProps={{ backgroundColor: 'gray.100' }}>{page}</Layout>;
};
