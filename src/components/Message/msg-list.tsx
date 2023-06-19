import Image from 'next/image';
import { Box, Flex, Text, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { formatDay } from '@/utils';
import UserImage from '@/assets/images/user/user-image.png';

export interface Message {
  id: string;
  projectId: string;
  name: string;
  photo: string;
  createdAt: string;
  content: string;
}

interface MessagesProp {
  messages: Message[];
}

const MessageList = ({ messages }: MessagesProp) => {
  const router = useRouter();
  const routerTo = (id: string) => {
    router.push(`/message/${id}`);
  };

  return (
    <>
      {messages.length <= 0 ? (
        <Flex
          p={6}
          alignItems={'center'}
          justifyContent={'center'}
          h={'full'}
          borderRight={1}
          borderColor={'gray.300'}
          borderStyle={'solid'}
          w={{ base: 'full', md: '355px' }}
        >
          <Box>
            <Box fontWeight={500} fontSize={'xl'} textAlign={'center'} mb={4}>
              您的對話列表是空的
            </Box>
            <Text color={'gray.500'}>
              透過專案頁面的「聯絡提案者」與訂單頁面的「傳送訊息」開啟對話
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex
          h={'full'}
          alignItems={'flex-start'}
          flexFlow={'column'}
          borderRight={1}
          borderColor={'gray.300'}
          borderStyle={'solid'}
          w={{ base: 'full', md: '355px' }}
        >
          {messages.map((item) => (
            <Flex
              alignItems={'center'}
              key={item.id}
              p={4}
              cursor={'pointer'}
              _hover={{ bg: 'gray.100' }}
              transition={'background-color .4s ease'}
              onClick={() => routerTo(item.projectId)}
              w="full"
            >
              <Box className="shrink-0">
                <Image
                  src={item.photo || UserImage}
                  width={40}
                  height={40}
                  alt=""
                  priority
                  className="mr-2"
                />
              </Box>
              <Box w="full">
                <Flex alignItems={'center'}>
                  <Box fontWeight={500} className="line-clamp-1">
                    {item.name}
                  </Box>
                  <Spacer />
                  <Text fontSize={'sm'} color={'gray.500'}>
                    {formatDay(item.createdAt)}
                  </Text>
                </Flex>
                <Text
                  className="line-clamp-1"
                  fontSize={'sm'}
                  color={'gray.500'}
                >
                  {item.content}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default MessageList;
