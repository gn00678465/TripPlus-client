import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import {
  ProjectLayout,
  ProjectLayoutProps,
  getServerSideProps as getSSRProps
} from '.';
import { Layout } from '@/components';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Divider
} from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { utc2Local } from '@/utils';

export const getServerSideProps: GetServerSideProps = getSSRProps;

interface ProjectContentProps extends ProjectLayoutProps {
  fallback: {
    [key: string]: ApiProject.Project;
  };
}

interface FAQItemProps extends ApiProject.FAQ {
  count: number;
}

const FAQItem = ({
  question,
  answer,
  updatedAt,
  count,
  ...rest
}: FAQItemProps) => {
  return (
    <Accordion allowToggle p="0" backgroundColor="gray.100" borderRadius={8}>
      <AccordionItem p="0" border="none">
        <h3>
          <AccordionButton
            p={{ base: 4, md: 6 }}
            borderRadius="8px"
            _hover={{ backgroundColor: 'gray.100' }}
            lineHeight={{ base: '21px', md: '24px' }}
            columnGap={{ base: 2, md: 4 }}
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Text as="span" fontSize={{ base: 'lg', md: 'xl' }}>
              Q{count}
            </Text>
            <Text
              as="span"
              textAlign="left"
              fontSize={{ base: 'sm', md: 'lg' }}
              mr="auto"
            >
              {question}
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h3>
        <AccordionPanel px={{ base: 4, md: '68px' }}>
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
          <Divider mt={{ base: 6, md: 10 }} mb={{ base: 3, md: 5 }} />
          <p className="space-x-1 md:space-x-2">
            <Text as="span" fontSize={{ base: 'sm' }} color="gray.500">
              更新時間
            </Text>
            <Text as="span" fontSize={{ base: 'md' }} color="gray.600">
              {utc2Local(updatedAt).format('YYYY.MM.DD HH:mm')}
            </Text>
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const ProjectFAQs: App.NextPageWithLayout<ProjectContentProps> = ({
  id,
  isFollowed,
  fallback
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProjectLayout id={id} isFollowed={isFollowed}>
        {(data) => (
          <Box className="space-y-4 md:space-y-6">
            {data?.faqs.map((item, index) => (
              <FAQItem key={index} count={index + 1} {...item} />
            ))}
          </Box>
        )}
      </ProjectLayout>
    </SWRConfig>
  );
};

export default ProjectFAQs;

ProjectFAQs.getLayout = function (page: ReactElement) {
  return <Layout headerProps={{ backgroundColor: 'gray.100' }}>{page}</Layout>;
};
