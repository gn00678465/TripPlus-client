import { Layout } from '@/components';
import Head from 'next/head';
import type { ReactElement } from 'react';
import {
  Box,
  Container,
  ListItem,
  OrderedList,
  Heading,
  Text
} from '@chakra-ui/react';

const Privacy: App.NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>隱私權政策-TripPlus+</title>
      </Head>
      <Box className="leading-8" my={10}>
        <Container maxW={'container.lg'}>
          <Heading
            as="h1"
            fontSize={'3xl'}
            textAlign={'center'}
            mb={{ base: 10, md: 16 }}
            color={'secondary-emphasis.500'}
            letterSpacing={'0.2rem'}
          >
            隱私權政策
          </Heading>
          <Box mb={10}>
            <Text fontWeight={500}>歡迎使用 TripPlus</Text>
            <Text>
              TripPlus 募資平台 (
              以下簡稱「本平台」)重視您的隱私權，並致力於保護您的個人資料。
              <br />
              本平台會依據本隱私權政策收集、處理、利用及保護您的個人資料，並依照相關法令規定進行管理。
            </Text>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              一、個人資料的收集與利用
            </Heading>
            <OrderedList>
              <ListItem>
                當您使用本平台時，本平台可能會蒐集您的個人資料，包括但不限於姓名、聯絡方式、信用卡號碼等，目的在於提供服務、完成交易及保障您的權益。
              </ListItem>
              <ListItem>
                當您使用本平台時，本公司可能會記錄您的IP位址、瀏覽器類型、瀏覽時間、點擊次數等資料，以分析網站流量並提供更好的服務。
              </ListItem>
              <ListItem>
                本平台會依照相關法令規定，於取得您的同意後，將您的個人資料提供給本平台合作的旅遊業者、金融機構等第三方，以協助您完成交易或提供相關服務。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              二、個人資料的保護
            </Heading>
            <OrderedList>
              <ListItem>
                本平台會採用合理的技術及組織措施，保障您的個人資料不會被不當利用、竊取或損毀。
              </ListItem>
              <ListItem>
                本平台僅會保留您的個人資料至必要期間，並於期限屆滿後立即刪除或銷毀。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              三、Cookie 的使用
            </Heading>
            <OrderedList>
              <ListItem>
                本平台可能會使用 Cookie 技術，藉以為您提供更好的使用體驗。
              </ListItem>
              <ListItem>
                您可以選擇關閉 Cookie
                功能，但可能導致您無法使用本平台的某些服務。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              四、未成年人之保護
            </Heading>
            <Text>
              本公司尊重未成年人之隱私權，若您為未成年人，請勿提供您的個人資料給本平台。
            </Text>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              五、隱私權政策之修正
            </Heading>
            <Text>
              本平台保留修改隱私權政策之權利，並將在網站上發佈最新版本。若本隱私權政策有任何重大修改，本平台將在網站上發佈告知。
            </Text>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              六、聯絡方式
            </Heading>
            <Text>
              若您對本公司之隱私權政策有任何疑問或意見，歡迎隨時聯絡我們:
              <br />
              電子信箱：
              <a
                href="mailto:privacy@tripplus.com"
                className="text-secondary-emphasis-500"
              >
                privacy@tripplus.com
              </a>
            </Text>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              七、生效日期
            </Heading>
            <Text>
              本隱私權政策自 2023 年 6 月 1 日生效，取代之前的任何版本。
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Privacy;

Privacy.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
