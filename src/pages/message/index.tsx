import Head from 'next/head';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import MessageList, { type Message } from '@/components/Message/msg-list';
import MsgHeader from '@/components/Message/header';
import { TbMessages } from 'react-icons/tb';

const messages = [
  {
    id: '0',
    name: 'Trista 微笑女孩手作革物',
    photo: 'https://picsum.photos/200/200',
    createdAt: '10:45',
    content:
      '您好，皮夾最好不要碰水，因為水可能會使皮革變形、發霉、變色、脫皮等。但如果不慎將皮夾弄濕了，應該盡快用乾布擦拭表面，然後在通風處晾乾，避免陽光直射或用吹風機吹乾，以免皮革變硬或開裂。如果有必要，可以使用專門的皮革保養產品進行清潔和保養。'
  },
  {
    id: '1',
    name: '電腦 3C 產品',
    photo: 'https://picsum.photos/id/0/200/200',
    createdAt: '10:45',
    content: '您好，這裡是電腦 3C 產品'
  }
];

const Message = () => {
  return (
    <>
      <Head>
        <title>訊息中心-TripPlus+</title>
      </Head>

      <MsgHeader />

      <Flex h={'calc(100vh - 56px)'}>
        <MessageList messages={messages} />

        <Box
          flexGrow={1}
          p={6}
          textAlign={'center'}
          justifyContent={'center'}
          alignItems={'center'}
          className="hidden md:flex"
        >
          <Box>
            <Icon
              as={TbMessages}
              fontSize={'260px'}
              color={'primary.500'}
              mb={6}
            />
            <Box fontWeight={500} fontSize={'3xl'} mb={4}>
              歡迎來到訊息中心
            </Box>
            <Text color={'gray.500'}>請從左邊列表選擇想要談話的對象</Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Message;
