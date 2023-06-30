import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { Layout } from '@/components';
import HomeData from '@/components/HomeData';
import type { ReactElement } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Center,
  Spacer
} from '@chakra-ui/react';
import Banner from '@/assets/images/about/banner.jpg';
import BannerMobile from '@/assets/images/about/banner-m.jpg';
import Logo from '@/assets/images/logo.png';
import ExCover1 from '@/assets/images/about/ex1.jpg';
import ExCover2 from '@/assets/images/about/ex2.jpg';
import ExCover3 from '@/assets/images/about/ex3.jpg';
import Photo1 from '@/assets/images/about/photo/1.png';
import Photo2 from '@/assets/images/about/photo/2.png';
import Photo3 from '@/assets/images/about/photo/3.png';
import Dot from '@/assets/images/about/dot.png';
import { request, safeAwait } from '@/utils';

export const getStaticProps: GetStaticProps = async () => {
  const [err, res] = await safeAwait<ApiHome.HomeData>(request('/home/data'));

  if (err) {
    return {
      notFound: true
    };
  }

  return {
    props: { homeData: res.data }
  };
};

const purpose = [
  { id: 0, text: '讓旅行不只是去某個地方<br/>而是發現生命中的旅程' },
  {
    id: 1,
    text: '支持有社會影響力的項目<br/>讓旅行成為一種積極的力量'
  },
  { id: 2, text: '建立一個支持性和合作的社群<br/>分享旅行經驗、故事和資源' }
];

const experience = [
  {
    id: 0,
    cover: ExCover1,
    text: '當初想推出超大容量行李箱，但因資源有限，無法大量生產。偶然間發現 TripPlus 募資網站，於是決定嘗試上傳提案，結果在短短幾週就達標，成功實現了我的商品。感謝 TripPlus提供了這樣的平台，讓我能夠實現自己的想法，並將產品推向市場。現在我的超大容量行李箱已經在市面上熱銷，真的很感謝 TripPlus。',
    name: '木魚小熊',
    photo: Photo1
  },
  {
    id: 1,
    cover: ExCover2,
    text: '我從山上撿拾到太多的人為垃圾，深感大自然需要我們更多的關注與愛護。於是我在 TripPlus 這個募資網站上提出了一個淨化山林的提案，希望能夠得到大家的支持和幫助。感謝許多善心人士的慷慨捐助和支持，我們成功地籌集到了足夠的資金，並開始實行我們的計劃。在這個過程中，我深刻體會到了眾人拾柴火焰高的道理，也感到了善心人士的溫暖和支持，讓我更有信心繼續走下去，為自然環境做出更多的貢獻。',
    name: 'Jill lala',
    photo: Photo2
  },
  {
    id: 2,
    cover: ExCover3,
    text: '當我們開始設計這款女性登山鞋時，我們深知市場上已經有很多類似的產品存在，因此我們必須找到一個創新的方式來使我們的產品脫穎而出。我們決定設計一款結合性能和美學的登山鞋，這款鞋子將不僅具有優異的功能性能，同時還擁有美麗的外觀設計，以迎合女性消費者的需求。通過在 TripPlus 這個募資網站上的募資，我們成功地籌集了足夠的資金，讓我們的理念成真。我們深信,創新是成功的關鍵所在，而 TripPlus 這樣的募資平台，為我們提供了寶貴的機會，讓我們的想法得以實現。',
    name: 'Wendy',
    photo: Photo3
  }
];

const contact = [
  { label: '服務信箱', value: 'service@travel-plus.com.tw' },
  { label: '聯繫電話', value: '(02) 1234-5678 #009' },
  { label: '客服電話', value: '09:00 - 18:00' }
];

interface HomeDataProp {
  homeData: ApiHome.HomeData;
}

const About: App.NextPageWithLayout<HomeDataProp> = ({ homeData }) => {
  return (
    <>
      <Head>
        <title>關於我們-TripPlus+</title>
      </Head>

      <Box
        as="section"
        bgColor={'#fafafa'}
        bgImage={{
          base: `url(${BannerMobile.src})`,
          md: `url(${Banner.src})`
        }}
        w={'full'}
        bgRepeat={'no-repeat'}
        bgPosition={{ base: 'bottom center', md: 'top center' }}
        bgSize={{ base: '100%', md: 'auto' }}
        h={{ base: '580px', sm: '680px' }}
        position={'absolute'}
        top={0}
      >
        <Container maxW={'container.xl'}>
          <Box maxW={'746px'} pt={{ base: 10, md: 40 }} mt={20}>
            <Heading
              as="h1"
              className="!font-alkatra"
              fontSize={{ base: '5xl', md: '6xl' }}
              fontWeight={400}
              lineHeight={{ base: '57.6px', md: '1.33' }}
            >
              Fund Your Next Adventure
            </Heading>
            <Text
              color={'gray.600'}
              fontSize={{ base: 'sm', md: 'md' }}
              letterSpacing={'1px'}
              mt={{ base: 3, md: 6 }}
            >
              旅行是一種探索未知的冒險，可以激發人的好奇心和創造力。我們的平台鼓勵人們通過旅行，挑戰自我、發掘潛力、成長進步。我們希望通過募資，讓更多人能夠實現自己的旅行夢想，體驗這種美好的成長過程。
            </Text>
          </Box>
        </Container>
      </Box>

      <Box
        as="section"
        py={{ base: 10, md: 24 }}
        mt={{ base: '500px', sm: '600px' }}
      >
        <Container maxW={'container.xl'}>
          <Center mb={{ base: 5, md: 10 }}>
            <Box>
              <Image
                src={Logo}
                width={172}
                height={48}
                alt="TripPlus Logo"
                priority
              />
            </Box>

            <Text
              flexShrink={0}
              fontSize={{ base: '1.75rem', md: '2rem' }}
              fontWeight={700}
              letterSpacing={'1px'}
            >
              品牌宗旨
            </Text>
          </Center>

          <Flex
            justifyContent={'space-between'}
            color={'secondary-emphasis.500'}
            fontWeight={500}
            textAlign={'center'}
            flexFlow={{ base: 'column', md: 'row' }}
          >
            {purpose.map((item) => (
              <Box
                key={item.id}
                w={{ base: 'full', md: '31%' }}
                border={4}
                borderColor={'secondary'}
                borderStyle={'solid'}
                borderRadius={'lg'}
                p={{ base: 4, md: 10 }}
                mb={{ base: 5, md: 0 }}
              >
                <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>

      <Box
        as="section"
        py={{ base: 14, md: 24 }}
        bgColor={'secondary-emphasis.500'}
        color={'white'}
        textAlign={'center'}
      >
        <Container maxW={'container.xl'} letterSpacing={'1px'}>
          <Center mb={{ base: 5, md: 10 }}>
            <Text
              fontSize={{ base: '1.75rem', md: '2rem' }}
              fontWeight={700}
              mr={2}
            >
              關於
            </Text>
            <Image
              src="/images/logo-white.png"
              width={172}
              height={48}
              alt="TripPlus Logo"
              priority
            />
          </Center>
          <Text maxW={'856px'} mx={'auto'}>
            我們相信，每個人的旅行風格和目的地都是獨特的，我們希望提供一個平台，讓旅行者們能夠共享自己的經驗和計畫，得到其他旅行者的支持和建議，實現他們的夢想旅程。我們希望告訴使用者：別讓別人的旅行計畫限制了你的想像力，做自己的旅行定義，成為你自己的旅行家。
          </Text>
        </Container>
      </Box>

      <Box as="section" py={{ base: 10, md: 20 }}>
        <Container maxW={'container.xl'}>
          <Heading
            as="h2"
            fontSize={{ base: '1.75rem', md: '2rem' }}
            textAlign={'center'}
            fontWeight={700}
            mb={{ base: 5, md: 10 }}
          >
            集資提案經驗談
          </Heading>

          <Flex
            justifyContent={'space-between'}
            flexFlow={{ base: 'column', md: 'row' }}
          >
            {experience.map((item) => (
              <Flex
                key={item.id}
                w={{ base: 'full', md: '31%' }}
                flexFlow={'column'}
                justifyContent={'space-between'}
                mb={{ base: 10, md: 0 }}
              >
                <Box>
                  <Box
                    borderRadius={'lg'}
                    overflow={'hidden'}
                    mb={{ base: 4, md: 6 }}
                  >
                    <Image
                      src={item.cover}
                      width={768}
                      height={549}
                      alt=""
                      priority
                    />
                  </Box>
                  <Text
                    color={'gray.600'}
                    textAlign={'justify'}
                    letterSpacing={'1px'}
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    {item.text}
                  </Text>
                </Box>

                <Flex my={{ base: 4, md: 6 }}>
                  <Flex alignItems={'center'}>
                    <Box mr={3}>
                      <Image
                        src={item.photo}
                        width={60}
                        height={60}
                        alt={item.name}
                        priority
                      />
                    </Box>
                    <Box>
                      <Text>{item.name}</Text>
                      <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        提案者代表
                      </Text>
                    </Box>
                  </Flex>

                  <Spacer />

                  <Box>
                    <Image
                      src={Dot}
                      width={60}
                      height={60}
                      alt={item.name}
                      priority
                    />
                  </Box>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Container>
      </Box>

      <HomeData
        successCount={homeData.successCount}
        sum={homeData.sum}
        sponsorCount={homeData.sponsorCount}
      />

      <Box
        as="section"
        textAlign={'center'}
        py={{ base: 10, md: 20 }}
        bg={'gray.100'}
      >
        <Container maxW={'container.xl'}>
          <Heading
            as="h2"
            fontSize={'1.75rem'}
            fontWeight={700}
            mb={{ base: 4, md: 6 }}
          >
            客服聯繫
          </Heading>
          <Box>
            {contact.map((item) => (
              <Center key={item.label} mb={1}>
                <Text
                  color={'gray.600'}
                  fontSize={{ base: 'xs', md: 'sm' }}
                  mr={2}
                  letterSpacing={'1px'}
                >
                  {item.label}
                </Text>
                <Text fontSize={{ base: 'sm', md: 'md' }}>
                  {item.label === '客服電話' && (
                    <span className="mr-1 text-xs md:text-sm">週一至週五</span>
                  )}
                  {item.value}
                </Text>
              </Center>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About;

About.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
