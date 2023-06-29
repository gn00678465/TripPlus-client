import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Box,
  Flex,
  Text,
  Spacer,
  Center,
  AbsoluteCenter,
  Divider,
  FormControl,
  Textarea,
  Icon,
  Button,
  Input,
  Link
} from '@chakra-ui/react';
import { ImageFallback } from '@/components';
import NoImage from '@/assets/images/user/user-image.png';
import MessageList, { type MessageData } from '@/components/Message/msg-list';
import MsgHeader from '@/components/Message/header';
import PopoverBox from '@/components/Popover';
import { FiPaperclip } from 'react-icons/fi';
import { BsImage, BsSendFill } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';
import io from 'socket.io-client';
import { useEffect, useState, useMemo, useRef, RefObject } from 'react';
import { request, safeAwait, utc2Local, formatDay } from '@/utils';
import { apiGetUserRoomMessage } from '@/api';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
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
      userId,
      userPhoto: accountRes.data.photo || '',
      chatroomList
    }
  };
};

interface MessageProps {
  userId: string;
  userPhoto: string;
  chatroomList: MessageData[];
}

const Message = ({ userId, userPhoto, chatroomList }: MessageProps) => {
  const URL: string = process.env.BASE_API_URL || '';
  const socket = io(URL, { transports: ['websocket'] });
  const router = useRouter();
  const roomId = useMemo(() => router.query.id, [router]);
  const chatWindow: RefObject<HTMLDivElement> = useRef(null);
  const isComposition = useRef(true);
  const [chatroomMember, setChatroomMember] =
    useState<MessageData[]>(chatroomList);

  const [projectInfo, setProjectInfo] = useState<Message.Project>({
    creatorName: '',
    creatorPhoto: '',
    creatorId: '',
    title: '',
    id: ''
  });

  const [userInfo, setUserInfo] = useState<Message.Chatter>({
    id: '',
    name: '',
    photo: ''
  });

  const [receiverInfo, setReceiverInfo] = useState<Message.Chatter>({
    id: '',
    name: '',
    photo: ''
  });

  const [isScrollDown, setIsScrollDown] = useState(true);
  const [roomMsg, setRoomMsg] = useState<Message.RoomMsg[]>([]);

  const [content, setConent] = useState('');

  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 10
  });

  const {
    data: roomMessage,
    isLoading: isRoomMsgLoading,
    mutate: fetchMsgProject
  } = useSWR(
    ['get', `/api/user/${roomId}/message`],
    () =>
      apiGetUserRoomMessage(roomId as string, page.pageIndex, page.pageSize),
    {
      onSuccess(data, key, config) {
        if (data && data.status === 'Success') {
          setInfo(data.data[0]);
          getRoomMsg(data.data);
        }
      },

      onError: (err, key, config) => {
        alert(err.message);
      }
    }
  );

  const setInfo = (firstRoomMsg: ApiMessage.Chatroom) => {
    const creatorIsSender =
      firstRoomMsg.sender._id === firstRoomMsg.roomId.projectCreator
        ? true
        : false;
    const userIsSender = firstRoomMsg.sender._id === userId ? true : false;

    setProjectInfo({
      creatorName: creatorIsSender
        ? firstRoomMsg.sender.name
        : firstRoomMsg.receiver.name,
      creatorPhoto: creatorIsSender
        ? firstRoomMsg.sender.photo
        : firstRoomMsg.receiver.photo,
      creatorId: creatorIsSender
        ? firstRoomMsg.sender._id
        : firstRoomMsg.receiver._id,
      title: firstRoomMsg.roomId.projectId.title,
      id: firstRoomMsg.roomId.projectId._id
    });

    setUserInfo({
      id: userIsSender ? firstRoomMsg.sender._id : firstRoomMsg.receiver._id,
      name: userIsSender
        ? firstRoomMsg.sender.name
        : firstRoomMsg.receiver.name,
      photo: userIsSender
        ? firstRoomMsg.sender.photo
        : firstRoomMsg.receiver.photo
    });

    setReceiverInfo({
      id: userIsSender ? firstRoomMsg.receiver._id : firstRoomMsg.sender._id,
      name: userIsSender
        ? firstRoomMsg.receiver.name
        : firstRoomMsg.sender.name,
      photo: userIsSender
        ? firstRoomMsg.receiver.photo
        : firstRoomMsg.sender.photo
    });
  };

  const getRoomMsg = (data: ApiMessage.Chatroom[]) => {
    setRoomMsg(() => {
      let msgList: Message.RoomMsg[] = [];
      let dateIndexes: any = {}; // 記錄每個日期的索引

      data.forEach((item) => {
        const userIsSender = item.sender._id === userId ? true : false;
        const dateKey: string = utc2Local(item.createdAt).format('YYYY-MM-DD');

        const msgData = {
          id: item._id,
          name: userIsSender ? item.receiver.name : item.sender.name,
          photo: userIsSender ? item.receiver.photo : item.sender.photo,
          content: item.content,
          isUserMsg: userIsSender ? true : false,
          createdAt: item.createdAt
        };

        if (dateIndexes[dateKey] === undefined) {
          // 如果該日期不存在，添加新的數據
          msgList.push({
            id: item._id,
            createdAt: item.createdAt,
            data: [msgData]
          });
          // 記錄該日期的索引
          dateIndexes[dateKey] = msgList.length - 1;
        } else {
          // 如果日期已存在，更新現有數據
          const index = dateIndexes[dateKey];
          msgList[index].data.push(msgData);
        }
      });

      msgList.sort((a, b) => {
        const timestampA = dayjs(a.createdAt).valueOf();
        const timestampB = dayjs(b.createdAt).valueOf();
        return timestampA - timestampB;
      });

      msgList.forEach((obj) => {
        obj.data.sort((a, b) => {
          const timestampA = dayjs(a.createdAt).valueOf();
          const timestampB = dayjs(b.createdAt).valueOf();
          return timestampA - timestampB;
        });
      });

      return msgList;
    });
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConent(e.target.value);
  };

  const KeyPressContent = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter' && isComposition.current) {
      sendMessage(e);
    }
  };

  const generateId = () => {
    const now = new Date();
    const timestamp = now.getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNum}`;
  };

  const sendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const messagePayload = {
      sender: userInfo.id,
      receiver: receiverInfo.id,
      content,
      roomId
    };

    socket.emit('message', messagePayload);
    setConent('');
    setIsScrollDown(true);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.emit('joinRoom', roomId);

    const handleNewMessage = (data: ApiMessage.msgBody) => {
      console.log('handleNewMessage', data);
      setRoomMsg((state) => {
        const userIsSender = data.sender === userId ? true : false;
        const lastItemIndex = state.length - 1;
        const lastDate = state[lastItemIndex].createdAt;
        const isSameDay = dayjs(lastDate).isSame(new Date(), 'day')
          ? true
          : false;

        const msgData = {
          id: generateId(),
          name: receiverInfo.name,
          photo: receiverInfo.photo,
          content: data.content,
          isUserMsg: userIsSender ? true : false,
          createdAt: dayjs().format('YYYY-MM-DD HH:mm')
        };

        const newMsg = {
          id: generateId(),
          createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
          data: [msgData]
        };

        if (state.length === 0) {
          return [newMsg];
        }

        if (!isSameDay) {
          return [...state, newMsg];
        }

        const lastData = state[lastItemIndex].data;
        const updatedData = [...lastData, msgData];
        const updatedItem = { ...state[lastItemIndex], data: updatedData };
        const updatedState = [...state.slice(0, lastItemIndex), updatedItem];

        return updatedState;
      });

      setChatroomMember((state) => {
        const index = state.findIndex((item) => item.roomId === roomId);
        if (index === -1) {
          return state;
        }

        const updatedItem = state[index];
        const updatedState = [
          updatedItem,
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];

        return updatedState.map((item) => {
          return {
            ...item,
            content: item.roomId === roomId ? data.content : item.content
          };
        });
      });
    };

    socket.on('message', handleNewMessage);

    return () => {
      socket.disconnect();
      console.log('Disconnected from server');
    };
  }, [roomMsg, roomId]);

  useEffect(() => {
    if (chatWindow.current && isScrollDown) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
  }, [roomMsg]);

  useEffect(() => {
    let currentChatWindow = chatWindow.current;

    const handleScroll = () => {
      if (currentChatWindow && currentChatWindow.scrollTop <= 30) {
        setIsScrollDown(false);

        setPage((state) => {
          return {
            ...state,
            pageSize: state.pageSize + 10
          };
        });

        fetchMsgProject();
      }
    };

    if (currentChatWindow) {
      currentChatWindow.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentChatWindow) {
        currentChatWindow.removeEventListener('scroll', handleScroll);
      }
    };
  });

  if (isRoomMsgLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>訊息中心-TripPlus+</title>
      </Head>

      <Box className="hidden md:block">
        <MsgHeader photo={userPhoto} />
      </Box>

      <Flex h={{ base: '100vh', md: 'calc(100vh - 56px)' }}>
        <Box className="hidden md:block">
          <MessageList chatroomMember={chatroomMember} />
        </Box>

        <Box flexGrow={1} position={'relative'}>
          <Flex
            p={{ md: 6 }}
            h={{ base: '52px', md: 'auto' }}
            borderBottom={1}
            borderColor={'gray.300'}
            borderStyle={'solid'}
            alignItems={'center'}
            justifyContent={{ base: 'center', md: 'start' }}
            position={'relative'}
          >
            <Box display={{ md: 'none' }} position={'absolute'} left={4}>
              <Link href="/message">
                <Icon as={MdArrowBackIosNew} fontSize={'xl'} />
              </Link>
            </Box>

            <Flex px={{ base: 10, md: 0 }} alignItems={'center'}>
              <ImageFallback
                src={projectInfo.creatorPhoto || NoImage.src}
                fallbackSrc={NoImage.src}
                alt={projectInfo.creatorName}
                width={40}
                height={40}
                priority
                className="mr-2"
              ></ImageFallback>

              <Box fontWeight={500} mt={1}>
                <Box className="line-clamp-1">{projectInfo.creatorName}</Box>
                <Link
                  href={`/project/${projectInfo.id}`}
                  as={NextLink}
                  fontSize={'sm'}
                  color={'secondary-emphasis.500'}
                  className="line-clamp-1"
                >
                  {projectInfo.title}
                </Link>
              </Box>
            </Flex>
          </Flex>

          <Box
            p={6}
            h={{
              base: 'calc(100vh - 52px - 164px)',
              md: 'calc(100vh - 52px - 96px - 164px)'
            }}
            fontSize={{ base: 'sm', md: 'md' }}
            className="overflow-y-auto"
            ref={chatWindow}
          >
            {roomMsg.map((item, idx) => (
              <Box key={item.id}>
                <Box position="relative" py="10">
                  <Divider borderColor={'gray.300'} />
                  <AbsoluteCenter bg="white" px="4">
                    {formatDay(item.createdAt)}
                  </AbsoluteCenter>
                </Box>

                {item.data.map((subItem) =>
                  subItem.isUserMsg ? (
                    <Box mt={4} key={subItem.id + subItem.content}>
                      <Flex alignItems={'end'} flexFlow={'column'}>
                        <Box
                          bg={'secondary-emphasis.500'}
                          px={4}
                          py={3}
                          borderRadius={10}
                          borderBottomRightRadius={0}
                          maxW={'360px'}
                          color={'white'}
                        >
                          {subItem.content}
                        </Box>
                        <Text color={'gray.500'}>
                          {utc2Local(subItem.createdAt).format('HH:mm')}
                        </Text>
                      </Flex>
                    </Box>
                  ) : (
                    <Flex
                      key={subItem.id + subItem.content}
                      alignItems={'start'}
                      mt={4}
                    >
                      <Box className="mr-2 shrink-0">
                        <ImageFallback
                          src={subItem.photo || NoImage.src}
                          fallbackSrc={NoImage.src}
                          alt={subItem.name}
                          width={40}
                          height={40}
                          priority
                          className="mr-2"
                        ></ImageFallback>
                      </Box>

                      <Flex alignItems={'start'} flexFlow={'column'}>
                        <Box
                          bg={'gray.100'}
                          px={4}
                          py={3}
                          borderRadius={10}
                          borderTopLeftRadius={0}
                          maxW={'360px'}
                        >
                          {subItem.content}
                        </Box>
                        <Text color={'gray.500'}>
                          {utc2Local(subItem.createdAt).format('HH:mm')}
                        </Text>
                      </Flex>
                    </Flex>
                  )
                )}
              </Box>
            ))}
          </Box>

          <Box
            as={'form'}
            onSubmit={sendMessage}
            bg={'gray.200'}
            p={5}
            position={'absolute'}
            w={'full'}
            bottom={0}
            h={'164px'}
          >
            <Box position={'relative'}>
              <FormControl>
                <Textarea
                  value={content}
                  bg={'white'}
                  color={'gray.900'}
                  border={1}
                  borderRadius={1}
                  placeholder="請輸入訊息..."
                  rows={2}
                  p={3}
                  resize={'none'}
                  onChange={changeContent}
                  onCompositionStart={() => {
                    isComposition.current = false;
                  }}
                  onCompositionEnd={() => {
                    isComposition.current = true;
                  }}
                  wrap="off"
                  onKeyDown={KeyPressContent}
                ></Textarea>
              </FormControl>

              <Flex w={'full'} p={2} fontSize={'lg'} zIndex={10} bg={'white'}>
                {/* 先不做上傳檔案、圖片 */}
                {/* <Flex alignItems={'center'}>
                  <PopoverBox text={'上傳檔案'}>
                    <Input
                      id="file"
                      type="file"
                      display={'none'}
                    />
                    <label htmlFor="file" className="p-2 cursor-pointer">
                      <Icon as={FiPaperclip}></Icon>
                    </label>
                  </PopoverBox>

                  <PopoverBox text={'上傳圖片'}>
                    <Input
                      id="image"
                      type="file"
                      display={'none'}
                      accept="image/*"
                    />
                    <label htmlFor="image" className="p-2 cursor-pointer">
                      <Icon as={BsImage}></Icon>
                    </label>
                  </PopoverBox>
                </Flex> */}
                <Spacer />
                <Box>
                  <Button
                    type="submit"
                    color={'primary.500'}
                    _hover={{ color: 'primary.700' }}
                    isDisabled={content === ''}
                  >
                    <Icon as={BsSendFill}></Icon>
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Message;
