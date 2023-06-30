import Image from 'next/image';
import CTA from '@/assets/images/index/CTA.png';
import CTAMobile from '@/assets/images/index/CTA-mobile.png';
import NextLink from 'next/link';
import { Text, Box, Container, Button } from '@chakra-ui/react';
import { currencyTWD, replaceTWDSymbol } from '@/utils';

interface HomeDataProps {
  successCount: number;
  sum: number;
  sponsorCount: number;
}

const backendUrl: string | undefined = process.env.BACKEND_URL;

const HomeData = ({ successCount, sum, sponsorCount }: HomeDataProps) => {
  return (
    <Box
      as="section"
      className="bg-cover bg-[center_bottom] bg-no-repeat pb-[45%] pt-[60px] text-white md:bg-center md:py-[100px]"
      backgroundImage={{ base: CTAMobile.src, md: CTA.src }}
    >
      <Container maxW="container.xl" className="flex flex-col ">
        <Box className="flex items-center justify-center text-[28px] font-bold md:justify-start md:text-[40px]">
          <Text>在</Text>
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={208}
            height={58}
            priority
            className="mx-[14px] w-[130px] md:w-[208px]"
          ></Image>
          <Text>已有</Text>
        </Box>
        <Box className="mt-[63px] flex flex-col flex-wrap items-center justify-center font-medium md:mt-[124px] md:flex-row">
          <Box className="mb-10 flex flex-col items-center md:mb-0">
            <Box className="mb-4 flex md:mb-6">
              <span className="mr-2 text-[36px] md:text-[54px]">
                {replaceTWDSymbol(currencyTWD(successCount))}
              </span>
              <span className="mt-5 text-[18px] md:mt-8 md:text-[24px]">
                件
              </span>
            </Box>
            <Box className="text-[16px] md:text-[24px]">成功募資案</Box>
          </Box>
          <Box className="mb-10 flex flex-col items-center md:mx-[78px] md:mb-0 md:border-x-[1px] md:border-white/[.3] md:px-12">
            <Box className="mb-4 flex md:mb-6">
              <span className="mr-2 text-[36px] md:text-[54px]">
                {currencyTWD(sum)}
              </span>
              <span className="mt-5 text-[18px] md:mt-8 md:text-[24px]">
                元
              </span>
            </Box>
            <Box className="text-[16px] md:text-[24px]">募資金額</Box>
          </Box>
          <Box className="flex flex-col items-center">
            <Box className="mb-4 flex md:mb-6">
              <span className="mr-2 text-[36px] md:text-[54px]">
                {replaceTWDSymbol(currencyTWD(sponsorCount))}
              </span>
              <span className="mt-5 text-[18px] md:mt-8 md:text-[24px]">
                位
              </span>
            </Box>
            <Box className="text-[16px] md:text-[24px]">參與者</Box>
          </Box>
        </Box>
        <Box className="mt-[60px] flex flex-col items-center md:mt-[132px] md:flex-row md:justify-end">
          <Text
            fontSize={{ xs: '24px', md: '28px' }}
            className="mb-8 md:mb-0 md:mr-9"
          >
            點燃你的創意．集眾人之力
          </Text>
          <NextLink href={backendUrl || ''} target="_blank">
            <Button
              className="relative z-10 !h-[96px] !w-[96px] !rounded-[100%] !text-[14px] after:absolute after:left-[50%] after:top-[50%]
              after:h-[112px] after:w-[112px]  after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-[100%] after:border-[1px] after:border-dashed after:border-white after:bg-transparent md:!h-[140px] md:!w-[140px] md:!text-[20px] md:after:h-[164px] md:after:w-[164px] md:after:border-2"
              colorScheme="secondary-emphasis"
            >
              我要提案
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeData;
