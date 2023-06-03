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
  Tag,
  List,
  ListItem,
  OrderedList,
  UnorderedList,
  Text
} from '@chakra-ui/react';
import { SWRConfig } from 'swr';

export const getServerSideProps: GetServerSideProps = getSSRProps;

interface ProjectContentProps extends ProjectLayoutProps {
  fallback: {
    [key: string]: ApiProject.Project;
  };
}

const ProjectDisclosures: App.NextPageWithLayout<ProjectContentProps> = ({
  id,
  isFollowed,
  fallback
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProjectLayout id={id} isFollowed={isFollowed}>
        <>
          <Box px={{ base: 3 }}>
            <Tag
              w="full"
              display="flex"
              justifyContent="center"
              py={{ base: 4, md: 6 }}
              color="secondary-emphasis.500"
              backgroundColor="secondary"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              TripPlus 平台會盡全力協助把關下列事項
            </Tag>
            <div className="mt-4 text-sm leading-[21px] tracking-[1px] text-gray-600 md:mt-6 md:text-base md:leading-6">
              <OrderedList mb={{ base: 3, md: 4 }}>
                <ListItem>
                  以下資訊為提案團隊於提案前提供的承諾與保證內容，TripPlus平台(以下簡稱「本平台」或「我們」)已與提案團隊簽署具有法律拘束力之契約以擔保下列資訊均正確屬實。
                </ListItem>
              </OrderedList>
              <OrderedList start={2}>
                <ListItem>
                  若您發現下列資訊有與實際情況不符之處,請透過【檢舉與回報】功能通報本平台，我們會盡速確認。若查證屬實,本平台將循下列方式處理：
                </ListItem>
              </OrderedList>
              <UnorderedList mb={{ base: 3, md: 4 }} className="mt-1 space-y-1">
                <ListItem>
                  專案進行中：本平台將依實際情形對專案採取警示、凍結或終止之因應處分，並於專案內說明處分原因與狀況。
                </ListItem>
                <ListItem>
                  專案已結案：本平台將協助受影響的贊助者維護其權益或採取必要的法律行動。
                </ListItem>
                <ListItem>
                  若遇特殊情形，本平台得依個案內容審酌處分決定，但我們仍會向贊助者提供詳實說明。
                </ListItem>
              </UnorderedList>
              <OrderedList start={3}>
                <ListItem>
                  贊助者於本平台進行贊助時，相關之權益說明如下:
                </ListItem>
              </OrderedList>
              <UnorderedList mb={{ base: 3, md: 4 }} className="mt-1 space-y-1">
                <ListItem>
                  本平台係由「TripPlus股份有限公司」(以下簡稱「本公司」)營運。贊助者支付之款項將透過本公司(按不同付款方式另可能包含本公司合作之金流服務廠商)代為收受並代為付款予提案團隊。提案團隊因提案而與贊助者產生交易關係，並由提案團隊負擔因此所生之責任，惟本平台會透過適當之審核與管理機制保障贊助者之權益。
                </ListItem>
                <ListItem>
                  若專案交易之發票係由本公司開立，贊助者之相關權益與責任由本公司負責處理。
                </ListItem>
              </UnorderedList>
              <List className="space-y-3">
                <ListItem>
                  一、提案身份
                  <Text mt={{ base: 1 }}>
                    提案者不是本專案原創者，但可出示其為原創者所合法授權的臺灣唯一代表方證明，具境內合法的自然人或法人身份並已公開揭露，並為本專案內容真實度與回饋項目履行負責。
                  </Text>
                </ListItem>
                <ListItem>
                  二、樣品狀態
                  <Text mt={{ base: 1 }}>回饋項目並非本專案的主要訴求。</Text>
                </ListItem>
                <ListItem>
                  三、揭載狀況
                  <Text mt={{ base: 1 }}>
                    由於回饋項目並非本專案的主要訴求，本專案之回饋品項並非未曾量產出貨的全新開發內容，專案主要回饋品項現於集資等銷售管道刊載中，TripPlus
                    平台並非目前全世界唯一取得專案主要回饋品項的管道。
                  </Text>
                </ListItem>
              </List>
            </div>
          </Box>
        </>
      </ProjectLayout>
    </SWRConfig>
  );
};

export default ProjectDisclosures;

ProjectDisclosures.getLayout = function (page: ReactElement) {
  return <Layout headerProps={{ backgroundColor: 'gray.100' }}>{page}</Layout>;
};
