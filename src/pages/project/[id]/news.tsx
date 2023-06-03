import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import {
  ProjectLayout,
  ProjectLayoutProps,
  getServerSideProps as getSSRProps
} from '.';
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
import { utc2Local } from '@/utils';

export const getServerSideProps: GetServerSideProps = getSSRProps;

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
  isFollowed,
  fallback
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProjectLayout id={id} isFollowed={isFollowed}>
        {(data) => (
          <Box className="space-y-2 md:space-y-4">
            {(data?.news.length &&
              data?.news.map((item, index) => (
                <NewsItem key={index} {...item} />
              ))) || (
              <Box
                textAlign="center"
                py="10"
                bg="gray.100"
                borderRadius={8}
                color="gray.900"
              >
                目前沒有最新消息
              </Box>
            )}
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
