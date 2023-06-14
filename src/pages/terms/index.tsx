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

const Terms: App.NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>使用條款-TripPlus+</title>
      </Head>
      <Box className="leading-8" my={10}>
        <Container maxW={'container.xl'}>
          <Heading
            as="h1"
            fontSize={'3xl'}
            textAlign={'center'}
            mb={{ base: 10, md: 16 }}
            color={'secondary-emphasis.500'}
            letterSpacing={'0.2rem'}
          >
            使用條款
          </Heading>
          <Box mb={10}>
            <Text fontWeight={500}>歡迎使用 TripPlus</Text>
            <Text>
              旅行募資平台(以下簡稱「本平台」)，本平台為旅遊愛好者提供旅遊募資、計畫發布及管理、預訂旅遊套餐、購買旅遊商品等服務，
              <br />
              以下為使用本平台之使用者(以下簡稱「您」)需遵守之使用條款:
            </Text>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              一、帳號註冊
            </Heading>
            <OrderedList>
              <ListItem>
                您需註冊帳號才能使用本平台之服務，請確保您提供的個人資料正確無誤，如有更動請及時更新。
              </ListItem>
              <ListItem>
                您需對您的帳號及密碼妥善保管，不得將帳號及密碼洩漏給任何第三方，否則應自負責任。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              二、使用限制
            </Heading>
            <OrderedList>
              <ListItem>
                您應遵守相關法令規定，不得透過本平台從事任何非法、侵權、騷擾、攻擊、詐騙、不當競爭等行為，如有違反應自負法律責任。
              </ListItem>
              <ListItem>
                您不得以任何方式干擾、損毀本平台之服務、系統、網站等，否則應自負相關法律責任。
              </ListItem>
              <ListItem>
                您不得透過本平台從事任何商業行為，如有商業需求請聯繫本平台之相關人員。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              三、內容使用權限
            </Heading>
            <OrderedList>
              <ListItem>
                您在本平台上發佈的內容，包括但不限於文字、圖片、音樂、影片等，應遵守相關法令規定，不得侵害他人之權益。
              </ListItem>
              <ListItem>
                您在本平台上發佈的內容，您應自行負責其合法性、正確性、真實性，且同意本平台有權對該內容進行審查、修改或刪除。
              </ListItem>
              <ListItem>
                您在本平台上發佈的內容，本平台擁有合理的使用權限，包括但不限於展示、散布、修改、複製、翻譯、發行等權利，但不影響您對該內容的智慧財產權。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              四、交易相關
            </Heading>
            <OrderedList>
              <ListItem>
                您在本平台上進行交易時，應確認您所提供之資訊(包括但不限於商品名稱、數量、金額等)正確無誤，如有任何錯誤或爭議，應與交易對象協商解決，本平台不承擔相關責任。
              </ListItem>
              <ListItem>
                您在本平台上進行交易時，應遵守相關法令規定，如有任何違法行為，應自負相關法律責任。
              </ListItem>
              <ListItem>
                本平台有權對交易進行審查、監控，如發現有違反法令或本使用條款之情形，本平台有權取消相關交易，並有權向相關主管機關報案或配合調查。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              五、智慧財產權
            </Heading>
            <OrderedList>
              <ListItem>
                本平台上之所有內容(包括但不限於文字、圖片、音樂、影片等)之智慧財產權均屬於本平台或其合法授權人所有，未經授權不得以任何形式使用、修改、複製、散布等。
              </ListItem>
              <ListItem>
                您在本平台上發佈之內容，應保證不侵害任何第三方之智慧財產權，如有侵權行為，應自負相關法律責任，且本平台有權刪除相關內容。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              六、免責事項
            </Heading>
            <OrderedList>
              <ListItem>
                本平台不保證服務之穩定、安全、無誤，如有任何技術問題或系統故障，本平台有權進行維護或停機，且不承擔任何責任。
              </ListItem>
              <ListItem>
                您使用本平台之服務時，應自行判斷其適用性及風險，如因使用本平台之服務而遭受任何損失或損害，本平台不承擔任何責任。
              </ListItem>
              <ListItem>
                本平台不對任何第三方之行為負責，包括但不限於交易對象、廣告商、合作夥伴等，您與該等第三方之間之紛爭或損害，應由您自行解決，本平台不承擔任何責任。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              七、協議變更
            </Heading>
            <Text>
              本平台有權隨時修改本使用條款，修改後之內容將公佈於本平台上，您應定期查閱本使用條款之最新版本，如您繼續使用本平台之服務，即表示您已閱讀、理解並同意接受本使用條款之所有內容及其修改。
            </Text>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              八、準據法與管轄法院
            </Heading>
            <OrderedList>
              <ListItem>
                本使用條款之解釋及適用，以及因本使用條款所引起或與之相關之任何糾紛或爭議，均應依照中華民國法律予以處理。
              </ListItem>
              <ListItem>
                因本使用條款所生之任何糾紛或爭議，如雙方協商不成，應以台灣台北地方法院為第一審管轄法院。
              </ListItem>
            </OrderedList>
          </Box>
          <Box mb={10}>
            <Heading as="h2" fontSize={'lg'} my={2}>
              九、其他條款
            </Heading>
            <OrderedList>
              <ListItem>
                本使用條款之任何條款如因違反法令或被認定為無效，不影響其他條款之效力及適用性。
              </ListItem>
              <ListItem>
                本使用條款之標題僅為方便閱讀而設置，不影響其解釋之效力。
              </ListItem>
              <ListItem>
                本使用條款中所使用之單數字詞，亦包括複數，其相應之複數字詞亦包括單數。
              </ListItem>
              <ListItem>
                本使用條款中所使用之男性詞，亦包括女性及法人，其相應之女性及法人詞亦包括男性。
              </ListItem>
            </OrderedList>
          </Box>
          <Text>
            以上為TripPlus旅行募資平台之使用條款，請您在使用本平台之前詳細閱讀並確認您已瞭解且同意本使用條款之所有內容。
            <br />
            若您對本使用條款有任何問題或疑慮，請勿使用本平台之服務，並隨時與本平台聯繫以獲取進一步的資訊。
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default Terms;

Terms.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
