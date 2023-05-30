import { ReactElement } from 'react';
import { ProjectLayout } from '.';
import { Layout } from '@/components';
import { Box } from '@chakra-ui/react';

const ProjectNews: App.NextPageWithLayout = () => {
  return <Box>News</Box>;
};

export default ProjectNews;

ProjectNews.getLayout = function (page: ReactElement) {
  return (
    <Layout headerProps={{ backgroundColor: 'gray.100' }}>
      <ProjectLayout>{page}</ProjectLayout>
    </Layout>
  );
};
