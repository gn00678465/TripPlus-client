import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import MessageList, { type MessageData } from '@/components/Message/msg-list';
import MsgHeader from '@/components/Message/header';
import { TbMessages } from 'react-icons/tb';
import { request, safeAwait } from '@/utils';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const [accountErr, accountRes] = await safeAwait<ApiUser.Account>(
    request('/user/account', {
      headers: { Authorization: `Bearer ${token}` }
    })
  );

  const [chatroomErr, chatroomRes] = await safeAwait<ApiMessage.Chatroom[]>(
    request('/user/chatroom', {
      headers: { Authorization: `Bearer ${token}` }
    })
  );

  if (accountErr || chatroomErr) {
    return {
      notFound: true
    };
  }

  const userId = accountRes.data._id;

  const chatroomList = chatroomRes.data.map((item) => {
    const userIsSender = item.sender._id === userId ? true : false;

    return {
      id: item._id,
      roomId: item.roomId._id,
      name: userIsSender ? item.receiver.name : item.sender.name,
      photo: userIsSender ? item.receiver.photo || '' : item.sender.photo || '',
      createdAt: item.createdAt,
      content: item.content
    };
  });

  chatroomList.sort((a, b) => {
    const timestampA = new Date(a.createdAt).getTime();
    const timestampB = new Date(b.createdAt).getTime();
    return timestampB - timestampA;
  });

  return {
    props: {
      userPhoto: accountRes.data.photo || '',
      chatroomList
    }
  };
};

interface MessageProps {
  userPhoto: string;
  chatroomList: MessageData[];
}

const Message = ({ userPhoto, chatroomList }: MessageProps) => {
  return (
    <>
      <Head>
        <title>訊息中心-TripPlus+</title>
      </Head>

      <MsgHeader photo={userPhoto} />

      <Flex h={'calc(100vh - 56px)'}>
        <MessageList chatroomMember={chatroomList} />

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
