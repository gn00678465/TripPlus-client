import Image from 'next/image';
import NextLink from 'next/link';
import {
  Box,
  Tag,
  AspectRatio,
  Button,
  Text,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex
} from '@chakra-ui/react';

const SponsorTag = ({ count }: { count: number }) => (
  <Tag
    px={{ base: 2 }}
    py={{ base: 1 }}
    className="space-x-1"
    backgroundColor="gray.200"
    color="gray.600"
    borderRadius={4}
    fontSize={{ base: 'xs' }}
  >
    <span>已被贊助</span>
    <span className="text-sm">{count}</span>
    <span>次</span>
  </Tag>
);

const RemainTag = ({ count }: { count: number }) => (
  <Tag
    px={{ base: 2 }}
    py={{ base: 1 }}
    className="space-x-1"
    backgroundColor="secondary"
    color="secondary-emphasis.500"
    borderRadius={4}
    fontSize={{ base: 'xs' }}
  >
    <span>剩餘</span>
    <span className="text-sm">{count}</span>
    <span>個</span>
  </Tag>
);

export interface PlanCardProps extends ApiProject.Plan {
  photo: string;
  bonus: string;
  sendYear: string;
  sendMonth: string;
  isFinish: boolean;
}

export const PlanCard = ({ isFinish, ...rest }: PlanCardProps) => {
  return (
    <Card
      mx="auto"
      maxW="416px"
      w="full"
      h="full"
      pos="relative"
      p={{ base: 4, md: 6 }}
      transition="all 0.2s ease-in-out"
      _hover={{
        top: '-2px',
        boxShadow: '0px 8px 60px rgba(0, 0, 0, 0.1);'
      }}
    >
      <CardHeader p="0">
        <AspectRatio
          mb={{ base: 3 }}
          borderRadius={8}
          overflow="hidden"
          ratio={4 / 3}
          maxH={{ base: '120px' }}
          w="full"
        >
          <Image
            fill
            src={rest.photo}
            alt={rest.title}
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 50vw, 33vw"
          ></Image>
        </AspectRatio>
        <Text fontSize={{ base: 'md' }} fontWeight="medium">
          {rest.price}元 - {rest.title}
        </Text>
      </CardHeader>
      <CardBody py={{ base: 4 }} px="0">
        <p className="mb-1 space-x-1 text-lg font-medium">
          <span>NT$</span>
          <span>{rest.price}</span>
        </p>
        <div className="mb-4 space-x-2 md:mb-6">
          <SponsorTag count={rest.sponsorCount} />
        </div>
        <Box fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
          <Text mb={{ base: 1 }}>您將收到</Text>
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: rest.content }}
          />
        </Box>
        <Divider my={{ base: 4 }}></Divider>
        <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }}>
          預計<span className="mx-1 text-sm md:text-base">{rest.sendYear}</span>
          年<span className="mx-1 text-sm md:text-base">{rest.sendMonth}</span>
          月出貨
        </Text>
        <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }}>
          贊助專案可享
          <span className="mx-1 text-sm text-secondary-emphasis-500 md:text-base">
            {rest.bonus}
          </span>
          紅利回饋
        </Text>
      </CardBody>
      <CardFooter p="0">
        <NextLink
          href={`/checkout?project=${rest?.projectId}&reward=${rest?._id}`}
          passHref
          legacyBehavior
        >
          <Button
            w="full"
            py={{ base: 2 }}
            isDisabled={isFinish}
            backgroundColor={isFinish ? 'gray.200' : undefined}
            color={isFinish ? 'gray.600' : undefined}
            colorScheme={isFinish ? undefined : 'primary'}
            _hover={
              isFinish
                ? {
                    bg: 'gray.200',
                    color: 'gray.600'
                  }
                : undefined
            }
          >
            贊助
          </Button>
        </NextLink>
      </CardFooter>
      {isFinish && (
        <Flex
          backgroundColor="gray.600"
          pos="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          borderRadius={8}
          alignItems="center"
          justifyContent="center"
          color="white"
          opacity={0.5}
          fontSize={{ base: '2xl', md: '3xl' }}
        >
          已結束
        </Flex>
      )}
    </Card>
  );
};
