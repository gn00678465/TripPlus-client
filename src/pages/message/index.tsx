import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import MessageList, { type Message } from '@/components/Message/msg-list';
import MsgHeader from '@/components/Message/header';
import { TbMessages } from 'react-icons/tb';
import { useState } from 'react';
import { apiGetMessageMember } from '@/api';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { request, safeAwait, utc2Local } from '@/utils';

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

  const [err, res] = await safeAwait<ApiUser.Account>(
    request('/user/account', {
      headers: { Authorization: `Bearer ${token}` }
    })
  );

  if (err) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      userId: res.data._id,
      userPhoto: res.data.photo || ''
    }
  };
};

interface MessageProps {
  userId: string;
  userPhoto: string;
}

const Message = ({ userId, userPhoto }: MessageProps) => {
  const [messages, setMessages] = useState<Message.Member[]>([]);

  const { data: member, isLoading } = useSWR(
    ['get', '/api/message/member'],
    apiGetMessageMember,
    {
      onSuccess(data, key, config) {
        if (data && data.status === 'Success') {
          setMemberData(data.data);
        }
      }
    }
  );

  const setMemberData = (data: ApiMessage.Member[]) => {
    setMessages(() => {
      const latestMsgs = data.filter(
        (item, index, array) =>
          array.findIndex((el) => el.projectId === item.projectId) === index
      );

      return latestMsgs.map((item) => {
        const userIsSender = item.sender._id === userId ? true : false;

        return {
          id: item._id,
          projectId: item.projectId,
          name: userIsSender ? item.receiver.name : item.sender.name,
          createdAt: utc2Local(item.createdAt).format('YYYY/MM/DD HH:mm'),
          photo: userIsSender ? item.receiver.photo : item.sender.photo,
          content: item.content
        };
      });
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>訊息中心-TripPlus+</title>
      </Head>

      <MsgHeader photo={userPhoto} />

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
