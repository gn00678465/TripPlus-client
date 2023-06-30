import { Layout } from '@/components';
import Head from 'next/head';
import type { ReactElement } from 'react';
import {
  Box,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon
} from '@chakra-ui/react';
import { AiOutlineTags } from 'react-icons/ai';

const faqInfo = [
  {
    title: '集資的時間有限制嗎？',
    text: '建議計畫在 35-45 天左右。計畫時間太長對於達標少有幫助，贊助人也會因此看不到您需要資金的急迫性，集資期限並不包括計畫執行時間，計畫執行時間並沒有限制。'
  },
  {
    title: '集資目標有限制嗎？',
    text: '是的，集資目標通常有限制。在 TripPlus+ 平台上，我們建議您設定一個具體的集資目標，以確保您能夠實現計畫所需的資金。'
  },
  {
    title: '發起計畫需要付錢嗎？',
    text: '在 TripPlus+ 平台上，發起計畫是免費的，您不需要支付任何費用。我們希望提供一個開放和容易使用的平台，讓旅行者能夠分享和實現他們的旅行計畫。'
  },
  {
    title: '我發起的計畫集資成功了，什麼時候才能拿到贊助的款項呢？',
    text: '一旦您的計畫在 TripPlus+ 平台上成功集資，款項將會根據您在計畫中設定的贊助回報和贊助者的選擇進行處理。通常情況下，款項會在計畫結束後的一段時間內進行結算和轉帳。具體的時間表可能因情況而有所不同，我們建議您在計畫結束後保持聯繫，以獲取有關款項處理的最新資訊。'
  },
  {
    title: '我發起的計畫集資成功了，我該怎麼聯絡贊助人？',
    text: '當您的計畫成功集資後，您可以透過 TripPlus+ 平台內建的訊息系統與贊助人進行聯繫。您可以在平台上查看贊助者的個人資料，並透過私人訊息功能向他們發送訊息。這樣您就可以與贊助人討論有關計畫進展、贊助回報或其他相關事宜。我們建議您保持及時和透明的溝通，以建立良好的關係並確保計畫的順利執行。'
  }
];
const Faq: App.NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>常見問題-TripPlus+</title>
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
            常見問題
          </Heading>
          {faqInfo.map((item) => (
            <Accordion allowMultiple key={item.title} my={5}>
              <AccordionItem border={0}>
                <h2>
                  <AccordionButton bg={'gray.100'}>
                    <Box as="span" flex="1" textAlign="left">
                      <Icon
                        as={AiOutlineTags}
                        mr={3}
                        fontSize={'xl'}
                        color={'secondary-emphasis.500'}
                      ></Icon>
                      {item.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{item.text}</AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default Faq;

Faq.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
