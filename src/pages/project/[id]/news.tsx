import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { ProjectLayout, ProjectLayoutProps } from '.';
import { Layout } from '@/components';
import {
  Box,
  Icon,
  Flex,
  Heading,
  Text,
  Divider,
  Button
} from '@chakra-ui/react';
import { BsBell } from 'react-icons/bs';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { SWRConfig } from 'swr';
import { request, safeAwait } from '@/utils';
import { utc2Local } from '@/utils';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  const [err, res] = await safeAwait<ApiProject.Project>(
    request(`/project/${id}`)
  );
  if (err && err.message === '路由資訊錯誤') {
    return {
      notFound: true
    };
  }
  if (res) {
    return {
      props: {
        id,
        data: res.data,
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

interface News {
  title: string;
  content: string;
  publishedAt: string;
}

interface NewsItemProps extends News {}

const NewsItem = ({ title, content, publishedAt }: NewsItemProps) => {
  return (
    <Flex
      px={{ base: 6, md: 10 }}
      py={{ base: 4, md: 6 }}
      alignItems="flex-start"
      columnGap={{ base: 4, md: 6 }}
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius={8}
    >
      <Box
        color="secondary-emphasis.500"
        backgroundColor="secondary"
        borderRadius="full"
        p={{ base: '15px', md: 6 }}
        flexShrink={0}
      >
        <Icon as={BsBell} boxSize={{ base: '30px', md: 10 }} />
      </Box>
      <Box className="flex w-full flex-col items-start gap-y-2 md:gap-y-4">
        <Heading as="h4" color="gray.900" fontSize={{ base: 'md', md: 'xl' }}>
          {title}
        </Heading>
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          className="line-clamp-1"
          color="gray.600"
        >
          {content}
        </Text>
        <Divider my={{ base: 1, md: 2 }} />
        <p className="flex w-full items-center gap-x-2">
          <Text as="span" fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
            發佈日期
          </Text>
          <Text as="span" fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
            {utc2Local(publishedAt).format('YYYY.MM.DD HH:mm')}
          </Text>
          <Button
            display={{ base: 'none', md: 'flex' }}
            ml="auto"
            color="secondary-emphasis.500"
            variant="link"
            fontSize={{ base: 'sm', md: 'md' }}
            alignItems="center"
            rightIcon={
              <Icon
                as={MdOutlineKeyboardArrowRight}
                boxSize={{ base: 5, md: 6 }}
              />
            }
          >
            查看完整訊息
          </Button>
        </p>
        <Button
          display={{ base: 'flex', md: 'none' }}
          color="secondary-emphasis.500"
          variant="link"
          lineHeight={{ base: '21px' }}
          fontSize={{ base: 'sm', md: 'md' }}
          alignItems="center"
          rightIcon={
            <Icon as={MdOutlineKeyboardArrowRight} boxSize={{ base: 5 }} />
          }
        >
          查看完整訊息
        </Button>
      </Box>
    </Flex>
  );
};

interface ProjectContentProps extends ProjectLayoutProps {
  fallback: {
    [key: string]: ApiProject.Project;
  };
}

const ProjectNews: App.NextPageWithLayout<ProjectContentProps> = ({
  id,
  fallback
}) => {
  const news: News[] = [
    {
      title: '您的捐款已於05/15星期一100%到社團法人雲林縣聽語障福利協進會',
      content: '您的捐款已於05/15星期一100%到社團法人雲林縣聽語障福利協進會',
      publishedAt: '2023-05-15T02:13:05.639Z'
    },
    {
      title: '集資正式結束，由衷感謝每位贊助者',
      content: '集資正式結束，由衷感謝每位贊助者',
      publishedAt: '2023-05-30T10:36:10.807Z'
    },
    {
      title: '重要公告：募資計畫將延長期限！',
      content:
        '申請延長募資天數，希望能夠有更多的時間找到更多的贊助者一起支持這個專案！',
      publishedAt: '2023-05-31T10:36:10.807Z'
    }
  ];

  return (
    <SWRConfig value={{ fallback }}>
      <ProjectLayout id={id}>
        {(data) => (
          <Box className="space-y-2 md:space-y-4">
            {news.map((item, index) => (
              <NewsItem key={index} {...item} />
            ))}
          </Box>
        )}
      </ProjectLayout>
    </SWRConfig>
  );
};

export default ProjectNews;

ProjectNews.getLayout = function (page: ReactElement) {
  return <Layout headerProps={{ backgroundColor: 'gray.100' }}>{page}</Layout>;
};
