import { Layout } from '@/components';
import Head from 'next/head';
import NextLink from 'next/link';
import type { ReactElement } from 'react';
import { useState } from 'react';
import {
  Box,
  Container,
  ListItem,
  OrderedList,
  Heading,
  Text,
  Flex,
  UnorderedList,
  Link,
  Icon,
  Spacer,
  Center
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';

const listItem = [
  { text: '準備項目頁面', href: '#paragraph1' },
  { text: '準備推廣活動', href: '#paragraph2' },
  { text: '開始募資', href: '#paragraph3' },
  { text: '收集贊助款', href: '#paragraph4' },
  { text: '與支持者保持聯繫', href: '#paragraph5' },
  { text: '完成募資', href: '#paragraph6' },
  { text: '實現項目', href: '#paragraph7' },
  { text: '交付回饋', href: '#paragraph8' },
  { text: '維護關係', href: '#paragraph9' }
];

const Teach: App.NextPageWithLayout = () => {
  const [currentItem, setCurrentItem] = useState('準備項目頁面');
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Head>
        <title>提案教學-TripPlus+</title>
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
            提案教學
          </Heading>

          <Flex flexFlow={{ base: 'column', md: 'row' }}>
            <Center
              bg={'gray.100'}
              py={3}
              px={5}
              cursor={'pointer'}
              onClick={() => setOpenMenu(!openMenu)}
              display={{ base: 'flex', md: 'none' }}
            >
              <Box>Menu</Box>
              <Spacer />
              <Icon as={GiHamburgerMenu}></Icon>
            </Center>

            <OrderedList
              w={'240px'}
              lineHeight={'3rem'}
              flexShrink={0}
              color={'gray.400'}
              display={{ base: openMenu ? 'block' : 'none', md: 'block' }}
            >
              {listItem.map((item) => (
                <ListItem
                  key={item.text}
                  color={
                    currentItem === item.text ? 'secondary-emphasis.500' : ''
                  }
                  fontWeight={600}
                  _hover={{ color: 'secondary-emphasis.500' }}
                  onClick={() => setCurrentItem(item.text)}
                >
                  <Link href={item.href} as={NextLink}>
                    {item.text}
                  </Link>
                </ListItem>
              ))}
            </OrderedList>

            <Box mt={{ base: 10, md: 2 }}>
              <Box mb={20} id="paragraph1">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  1. 準備項目頁面
                </Heading>
                <Text>
                  在註冊了您的帳戶後，您需要建立一個項目頁面。這個頁面是您與潛在支持者溝通的主要方式，因此它需要清晰、具體和有吸引力。您的項目頁面應該包括以下內容:
                </Text>
                <UnorderedList>
                  <ListItem>
                    項目概述:簡要描述您的項目，包括您打算做什麼，為什麼您要做這件事情以及這個項目的意義。
                  </ListItem>
                  <ListItem>
                    目標金額:明確指出您希望籌集多少資金來實現您的項目。
                  </ListItem>
                  <ListItem>
                    回饋計畫:說明您將向支持者提供什麼樣的回饋，例如商品、體驗或優惠。
                  </ListItem>
                  <ListItem>預期交付日期:指出您希望何時能夠交付回饋。</ListItem>
                  <ListItem>
                    影片或圖片:提供一些視覺材料，以使您的項目更具吸引力。
                  </ListItem>
                  <ListItem>
                    詳細說明:在項目概述下方提供更詳細的說明，說明您的項目是如何實現的，涉及哪些步驟，您需要哪些資源等等。
                  </ListItem>
                </UnorderedList>
              </Box>

              <Box mb={20} id="paragraph2">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  2. 準備推廣活動
                </Heading>
                <Text>
                  在您的項目上線之前，您需要開始進行推廣活動，以吸引更多的支持者。您可以使用社交媒體、電子郵件、廣告等多種方式來宣傳您的項目。推廣活動的目標是讓更多的人了解您的項目，並鼓勵他們支持您的項目。
                </Text>
              </Box>

              <Box mb={20} id="paragraph3">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  3. 開始募資
                </Heading>
                <Text>一旦您的項目頁面上線，您可以開始募資。</Text>
              </Box>

              <Box mb={20} id="paragraph4">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  4. 收集贊助款
                </Heading>
                <Text>
                  在您的項目上線之前，您需要開始進行推廣活動，以吸引更多的支持者。您可以使用社交媒體、電子郵件、廣告等多種方式來宣傳您的項目。推廣活動的目標是讓更多的人了解您的項目，並鼓勵他們支持您的項目。
                </Text>
              </Box>

              <Box mb={20} id="paragraph5">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  5. 與支持者保持聯繫
                </Heading>
                <Text>
                  在募資期間，您需要與支持者保持聯繫。您可以通過項目頁面上的留言板、電子郵件或社交媒體等方式回答支持者的問題，向他們提供更新並感謝他們的支持。這樣可以確保您的支持者感到與項目相關，並且了解項目的進展情況。
                </Text>
              </Box>

              <Box mb={20} id="paragraph6">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  6. 完成募資
                </Heading>
                <Text>
                  一旦您的募資期結束，您將收到所有贊助款。如果您的項目成功達成目標，您可以開始實現您的項目。如果您未達成目標，您的項目將不會獲得任何資金，並且您需要考慮下一步的行動。
                </Text>
              </Box>

              <Box mb={20} id="paragraph7">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  7. 實現項目
                </Heading>
                <Text>
                  如果您的項目成功募資，您可以開始實現項目。在實現項目期間，您需要繼續與支持者保持聯繫，讓他們了解項目的進展情況。如果您遇到任何問題，您需要及時通知支持者並解決問題。
                </Text>
              </Box>

              <Box mb={20} id="paragraph8">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  8. 交付回饋
                </Heading>
                <Text>
                  在實現項目之後，您需要開始交付回饋給支持者。回饋可能是商品、體驗、優惠等等。您需要確保您交付的回饋符合您在項目頁面上承諾的內容。如果您遇到任何延遲或問題，您需要及時通知支持者並解決問題。
                </Text>
              </Box>

              <Box mb={20} id="paragraph9">
                <Heading as="h1" fontSize={'2xl'} mb={2}>
                  9. 維護關係
                </Heading>
                <Text>
                  在實現項目之在您交付回饋之後，您需要繼續與支持者保持聯繫，建立長期關係。這可以通過定期更新、電子郵件或社交媒體等進行。
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Teach;

Teach.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
