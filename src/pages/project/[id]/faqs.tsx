import { ReactElement } from 'react';
import { ProjectLayout } from '.';
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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface FAQ {
  question: string;
  answer: string;
  updatedAt: string;
}
interface FAQItemProps extends FAQ {
  count: number;
}

const FAQItem = ({ question, answer, updatedAt, count }: FAQItemProps) => {
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
              {dayjs(updatedAt).local().format('YYYY.MM.DD HH:mm')}
            </Text>
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const ProjectFAQs: App.NextPageWithLayout = () => {
  const faqs: FAQ[] = [
    {
      question: '為什麼會是由社團法人台灣一起夢想公益協會提案？',
      answer:
        '一起夢想公益協會主要的服務內容，是協助微型社福得到更多的募款幫助，本次的專案單位：中華民國身障棒壘球協會為一起夢想支持的微型社福。 以下為',
      updatedAt: '2023-05-11T07:23:27.017Z'
    },
    {
      question: '請問會開立捐款收據嗎？',
      answer: '會，當然會，哪次不會呢?',
      updatedAt: '2023-05-12T06:02:36.245Z'
    }
  ];

  return (
    <Box className="space-y-4 md:space-y-6">
      {faqs.map((item, index) => (
        <FAQItem
          key={index}
          count={index + 1}
          question={item.question}
          answer={item.answer}
          updatedAt={item.updatedAt}
        />
      ))}
    </Box>
  );
};

export default ProjectFAQs;

ProjectFAQs.getLayout = function (page: ReactElement) {
  return (
    <Layout headerProps={{ backgroundColor: 'gray.100' }}>
      <ProjectLayout>{page}</ProjectLayout>
    </Layout>
  );
};
