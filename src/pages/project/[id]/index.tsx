import { GetServerSideProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Layout, ImageFallback } from '@/components';
import { Carousel } from '@/components/Swiper';
import { ReactElement, ReactNode, useMemo, MouseEvent } from 'react';
import useSWR, { SWRConfig } from 'swr';
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
  Image as Img
} from '@chakra-ui/react';
import BreadcrumbList, { type Breadcrumb } from '@/components/Breadcrumb';
import {
  PlanCard,
  Step,
  Folder,
  FollowButton,
  Content
} from '@/components/Project';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiGlobe, FiMessageSquare } from 'react-icons/fi';
import {
  currencyTWD,
  request,
  safeAwait,
  swrFetch,
  replaceTWDSymbol,
  utc2Local
} from '@/utils';
import { apiGetProjectInfo } from '@/api';
import NoImage from '@/assets/images/user/user-image.png';
import { categoryEnum, projectStepEnum, ProductStepEnum } from '@/enum';
import dayjs from 'dayjs';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  const { token } = context.req.cookies;

  let isFollowed: 0 | 1 = 0;

  if (token) {
    const [err, res] = await safeAwait<ApiUser.Follows>(
      request('/user/follows', {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
    if (res && res.status === 'Success') {
      const result = res.data.follows.find((item) => item.projectId?.id === id);
      isFollowed = !result ? 0 : 1;
    }
  }

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
        isFollowed,
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
  isFollowed?: 0 | 1;
}
const HeaderBlock = ({ id, data, isFollowed, ...rest }: BoxBlockProps) => {
  const menu: Breadcrumb[] = [
    {
      name: '首頁',
      url: '/'
    },
    {
      name: categoryEnum[data?.category as number],
      url: `/projects?category=${data?.category}`
    },
    {
      name: data?.title as string,
      url: `/project/${id}`
    }
  ];

  const handleScroll = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const href = (e.target as HTMLButtonElement).dataset.href;
    const targetId = href?.replace(/.*\#/, '');
    if (!targetId) return;
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth'
    });
  };

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
            transition="all 0.3s ease-in-out"
            _hover={{
              textDecoration: 'none',
              color: 'gray.500',
              filter:
                'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))'
            }}
            fontWeight={400}
            color="gray.600"
          >
            {categoryEnum[data?.category as number]}
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
              <FollowButton id={id} isFollowed={isFollowed} />
              <Button
                px={{ lg: '60px' }}
                className="text-secondary-emphasis"
                backgroundColor="secondary"
                data-href="#plans"
                _hover={{
                  backgroundColor: 'secondary-emphasis.50'
                }}
                onClick={handleScroll}
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
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 50vw, 33vw"
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

const StepBlock = ({ data }: { data?: ApiProject.Project }) => {
  const stepList = useMemo(() => {
    if (data?.category === 2) return ProductStepEnum;
    return projectStepEnum;
  }, [data?.category]);

  const step = useMemo(() => {
    if (!data?.histories || data?.histories.length === 0) return -1;
    return data.histories.length - 1;
  }, [data?.histories]);

  return <Step stepList={stepList} step={step} />;
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
          transition="all 0.3s ease-in-out"
          sx={{
            ':not([aria-current="page"]):hover': {
              color: 'secondary-emphasis.500',
              filter:
                'drop-shadow(0 20px 13px rgb(0 142 134 / 0.08)) drop-shadow(0 8px 5px rgb(0 142 134 / 0.15));',
              textDecoration: 'none'
            }
          }}
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

const PlansBlock = ({ id, data, ...rest }: BoxBlockProps) => {
  const plans = (data && data.plans) || [];

  return (
    <Box id="plans" backgroundColor="gray.100" py={{ base: 10 }} {...rest}>
      <Container px={{ base: 3, xl: 0 }} maxW="container.xl">
        <Center mb={{ base: 5 }}>
          <Heading fontSize={{ base: '28px' }} fontWeight="bold">
            贊助方案
          </Heading>
        </Center>
        <Carousel
          data={plans}
          card={(item) => (
            <PlanCard
              photo={data?.keyVision as string}
              sendYear={utc2Local(data?.endTime as string)
                .add(2, 'month')
                .format('YYYY')}
              sendMonth={utc2Local(data?.endTime as string)
                .add(2, 'month')
                .format('MM')}
              bonus="0.5%"
              isFinish={dayjs().isAfter(utc2Local(data?.endTime as string))}
              {...item}
            />
          )}
        />
      </Container>
    </Box>
  );
};

export interface ProjectLayoutProps {
  children: ReactNode | ((arg?: ApiProject.Project) => ReactNode);
  id?: string | string[];
  isFollowed: 0 | 1;
}

export const ProjectLayout = ({
  children,
  isFollowed,
  id
}: ProjectLayoutProps) => {
  const { data } = useSWR(id ? `/project/${id}` : null, () =>
    swrFetch(apiGetProjectInfo(id as string))
  );

  return (
    <>
      <Head>
        <title>{`${data?.data?.title}-TripPlus+`}</title>
      </Head>
      <HeaderBlock
        id={id}
        data={data?.data}
        isFollowed={isFollowed}
      ></HeaderBlock>
      <SummaryBlock id={id} data={data?.data}></SummaryBlock>
      <StepBlock data={data?.data} />
      <ContentBlock id={id}>
        {typeof children === 'function' ? children(data?.data) : children}
      </ContentBlock>
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
  isFollowed,
  fallback
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProjectLayout id={id} isFollowed={isFollowed}>
        {(data) => (
          <Folder>
            <Content>
              <div
                dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}
              ></div>
            </Content>
          </Folder>
        )}
      </ProjectLayout>
    </SWRConfig>
  );
};

export default ProjectContent;

ProjectContent.getLayout = function (page: ReactElement<ProjectContentProps>) {
  return <Layout headerProps={{ backgroundColor: 'gray.100' }}>{page}</Layout>;
};
