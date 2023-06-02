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
  CardFooter
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
}

export const PlanCard = (props: PlanCardProps) => {
  return (
    <Card
      mx="auto"
      maxW="416px"
      w="full"
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
            src="https://images.unsplash.com/photo-1437914983566-976d85602771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="提案者 Logo"
          ></Image>
        </AspectRatio>
        <Text fontSize={{ base: 'md' }} fontWeight="medium">
          {props.price}元 - {props.title}
        </Text>
      </CardHeader>
      <CardBody py={{ base: 4 }} px="0">
        <p className="mb-1 space-x-1 text-lg font-medium">
          <span>NT$</span>
          <span>{props.price}</span>
        </p>
        <div className="mb-4 space-x-2 md:mb-6">
          <SponsorTag count={props.sponsorCount} />
        </div>
        <Box fontSize={{ base: 'xs' }} color="gray.600">
          <Text mb={{ base: 1 }}>您將收到</Text>
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
          {/* <UnorderedList>
            <ListItem>捐款收據</ListItem>
            <ListItem>一封協會致贈的電子感謝函</ListItem>
            <ListItem>一封協會完成專案的成果報告</ListItem>
          </UnorderedList> */}
        </Box>
        <Divider my={{ base: 4 }}></Divider>
        <Text color="gray.600" fontSize={{ base: 'xs' }}>
          預計 2023 年 07 月出貨
        </Text>
        <Text color="gray.600" fontSize={{ base: 'xs' }}>
          贊助專案可享
          <span className="text-secondary-emphasis-500">0.5%</span>
          紅利回饋
        </Text>
      </CardBody>
      <CardFooter p="0">
        <NextLink
          href={`/checkout?project=${props?.projectId}&reward=${props?._id}`}
          passHref
          legacyBehavior
        >
          <Button w="full" py={{ base: 2 }} colorScheme="primary">
            贊助
          </Button>
        </NextLink>
      </CardFooter>
    </Card>
  );
};
