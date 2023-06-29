import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Text,
  Box,
  IconButton,
  Icon,
  AspectRatio,
  Textarea,
  AbsoluteCenter,
  Divider,
  Spinner
} from '@chakra-ui/react';
import { BsBoxArrowUpRight, BsXLg, BsFillImageFill } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';
import { io } from 'socket.io-client';
import { useEffect, useState, useRef, RefObject } from 'react';
import useSWR from 'swr';
import { apiGetProjectMessage, apiGetUserAccount } from '@/api';
import dayjs from 'dayjs';
import { formatDay } from '@/utils';

interface Team {
  title: string;
  photo: string;
}

interface ChatProps {
  teamInfo: Team;
  isOpen: boolean;
  projectId: string;
  onClose: () => void;
}

const Chat = ({ teamInfo, isOpen, projectId, onClose }: ChatProps) => {
  const router = useRouter();
  const chatWindow: RefObject<HTMLDivElement> = useRef(null);
  const isComposition = useRef(true);
  const [isScrollDown, setIsScrollDown] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const URL: string = process.env.BASE_API_URL || '';
  const socket = io(URL, { transports: ['websocket'] });

  const { data: accountData } = useSWR(
    isOpen ? '/api/user/account' : null,
    apiGetUserAccount,
    {
      onSuccess(data, key, config) {
        if (data && data.status === 'Success') {
          getUserAccount(data.data);
        }
      }
    }
  );

  const [userId, setUserId] = useState<string>('');
  const [projectCreatorId, setProjectCreatorId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  const getUserAccount = (data: ApiUser.Account) => {
    setUserId(() => data._id);
  };

  interface Message {
    id: string;
    content: string;
    chatMySelf: boolean;
    showDate: string;
    createdAt: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setConent] = useState('');

  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 10
  });

  const transformTime = (time: string) => {
    return dayjs(time).format('HH:mm');
  };

  const getRoomId = (data: ApiMessage.Chatroom | ApiMessage.EmptyChatroom) => {
    if ('roomId' in data) {
      setRoomId(() => data.roomId._id);
    } else {
      setRoomId(() => data._id);
    }
  };

  const getProjectCreatorId = (
    data: ApiMessage.Chatroom | ApiMessage.EmptyChatroom
  ) => {
    if ('roomId' in data) {
      setProjectCreatorId(() => data.roomId.projectCreator);
    } else {
      setProjectCreatorId(() => data.projectCreator);
    }
  };

  const getMessages = (data: ApiMessage.Chatroom[]) => {
    const messages = data.reverse().map((item) => {
      let message: any = {};
      message.id = item._id;
      message.createdAt = item.createdAt;
      message.content = item.content;
      message.chatMySelf = item.sender._id === userId;
      message.showDate = '';
      return message;
    });
    const newMessages = insertDateBefoeMsg(messages);
    setMessages((prev) => newMessages.concat(prev));
  };

  const insertDateBefoeMsg = (messages: Message[]) => {
    let latestDate = '';
    const dateList = JSON.parse(JSON.stringify(messages))
      .reverse()
      .map((message: Message) => {
        return dayjs(message.createdAt).format('YYYY-MM-DD');
      });
    for (let i = 0; i < messages.length - 1; i++) {
      if (!latestDate) {
        latestDate = dateList[0];
      }
      let beforeDateIndex = dateList.findIndex((date: string) => {
        return new Date(date).getTime() < new Date(latestDate).getTime();
      });
      if (beforeDateIndex > -1) {
        messages[messages.length - beforeDateIndex].showDate =
          dateList[beforeDateIndex - 1];
        latestDate = dateList[beforeDateIndex];
      }
    }
    return messages;
  };

  const showDateImmediately = (message: Message) => {
    if (
      dayjs(message.createdAt).isAfter(
        dayjs(messages[messages.length - 1].createdAt),
        'day'
      )
    ) {
      message.showDate = dayjs(message.createdAt).format('YYYY-MM-DD');
    }
    return message;
  };

  const {
    data: roomMessage,
    isLoading: isRoomMsgLoading,
    mutate: fetchMsgProject
  } = useSWR(
    isOpen && projectId && userId && !isLoading && !isEnd
      ? `/api/project/${projectId}/message?${userId}`
      : null,
    () =>
      apiGetProjectMessage(projectId as string, page.pageIndex, page.pageSize),
    {
      revalidateOnFocus: false,
      onSuccess(data, key, config) {
        if (
          data &&
          data.status === 'Success' &&
          data.message === '取得訊息' &&
          Array.isArray(data.data)
        ) {
          if (page.pageIndex === 1) {
            getRoomId(data.data[0]);
            getProjectCreatorId(data.data[0]);
          }
          if (data.data.length < page.pageSize) {
            setIsEnd(true);
          }
          getMessages(data.data);
          setPage((state) => {
            return {
              ...state,
              pageIndex: state.pageIndex++
            };
          });
        }

        if (
          data &&
          data.status === 'Success' &&
          data.message === '尚未建立訊息' &&
          page.pageIndex === 1 &&
          !Array.isArray(data.data)
        ) {
          getRoomId(data.data);
          getProjectCreatorId(data.data);
        }
      },

      onError: (err, key, config) => {
        console.log('err', err);
        alert(err.message);
      }
    }
  );

  useEffect(() => {
    if (isEnd) {
      messages[0].showDate = dayjs(messages[0].createdAt).format('YYYY-MM-DD');
    }
  }, [isEnd, messages]);

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConent(e.target.value);
  };

  const sendMessage = (e: { preventDefault: () => void }) => {
    if (!content.trim()) return;
    e.preventDefault();
    const messagePayload = {
      sender: userId,
      receiver: projectCreatorId,
      content,
      roomId
    };

    socket.emit('message', messagePayload);
    setConent('');
    setIsScrollDown(true);
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

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.emit('joinRoom', roomId);

    const handleNewMessage = (data: ApiMessage.msgBody) => {
      console.log('handleNewMessage', data);
      const message = {
        id: generateId(),
        showDate: '',
        content: data.content,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
        chatMySelf: data.sender === userId
      };
      const newMessage = showDateImmediately(message);
      setMessages((state) => {
        return [...state, newMessage];
      });
    };

    socket.on('message', handleNewMessage);
    return () => {
      socket.disconnect();
      socket.off('message');
      console.log('Disconnected from server');
    };
  }, [roomId, messages]);

  useEffect(() => {
    if (chatWindow.current && isScrollDown) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let currentChatWindow = chatWindow.current;

    const handleScroll = () => {
      if (
        currentChatWindow &&
        currentChatWindow.scrollTop <= 30 &&
        !isLoading &&
        !isEnd
      ) {
        setIsScrollDown(false);
        setIsLoading(true);
        setTimeout(() => {
          fetchMsgProject();
          currentChatWindow!.scrollTop = 100;
          setIsLoading(false);
        }, 1000);
      }
    };

    if (currentChatWindow && isOpen) {
      currentChatWindow.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentChatWindow) {
        currentChatWindow.removeEventListener('scroll', handleScroll);
      }
    };
  });

  return (
    <Box className="fixed bottom-0 right-0 z-[999999] overflow-visible">
      <Box
        className={`fixed bottom-[14px] right-6 h-[640px] w-[375px]  origin-[100%_100%] rounded-lg bg-white shadow-[0px_0px_24px_rgba(0,0,0,.1)] transition-all duration-300
            ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} 
          `}
      >
        <Box className="h-full overflow-hidden">
          <Box className="relative z-[1] h-full shadow-[0_0_0_1px_#e5e5e6]">
            <Box className="flex h-[52px] items-center justify-between bg-secondary-emphasis px-3">
              <Text className="text-xl font-bold text-white">
                TripPlus 訊息中心
              </Text>
              <Box className="flex text-white">
                <IconButton
                  colorScheme="white"
                  variant={'link'}
                  aria-label="go to message center"
                  icon={
                    <Icon as={BsBoxArrowUpRight} boxSize={{ base: '22px' }} />
                  }
                  onClick={() => {
                    router.push('/message');
                  }}
                />
                <IconButton
                  colorScheme="white"
                  variant={'link'}
                  aria-label="close"
                  icon={<Icon as={BsXLg} boxSize={{ base: '22px' }} />}
                  onClick={onClose}
                />
              </Box>
            </Box>
            <Box className="flex h-[calc(100%-52px)] w-full overflow-visible">
              <Box className="relative h-full w-full overflow-hidden border-0">
                <Box>
                  <Box className="absolute inset-x-0 top-0 z-[1] flex h-[52px]">
                    <Box className="flex w-full items-center justify-center border-b-[1px] border-b-gray-200 py-[10px]">
                      {teamInfo.photo && (
                        <AspectRatio
                          ratio={1 / 1}
                          maxW={{ base: '24px' }}
                          w="full"
                        >
                          <Image
                            src={teamInfo.photo}
                            alt={teamInfo.title}
                            width={24}
                            height={24}
                            priority
                          ></Image>
                        </AspectRatio>
                      )}
                      <Text className="ml-2 text-lg font-bold">
                        {teamInfo.title}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="absolute inset-x-0 bottom-[132px] top-[52px]">
                    <Box
                      className="relative h-full w-full overflow-y-auto"
                      ref={chatWindow}
                    >
                      {isRoomMsgLoading && page.pageIndex === 1 && (
                        <Box className="">
                          <Spinner
                            position="absolute"
                            top="50%"
                            left="50%"
                            size="lg"
                            transform="translate(-50%, -50%)"
                            color="secondary-emphasis.500"
                          />
                        </Box>
                      )}
                      <Box className="absolute top-0 h-full w-full px-3">
                        {isLoading && (
                          <Box className="my-5 flex justify-center">
                            <Spinner color="gray.500" />
                          </Box>
                        )}
                        {messages.map((message) => {
                          return message.chatMySelf ? (
                            <Box key={message.id}>
                              {message.showDate && (
                                <Box position="relative" py="5">
                                  <Divider borderColor={'gray.300'} />
                                  <AbsoluteCenter bg="white" px="4">
                                    {formatDay(message.showDate)}
                                  </AbsoluteCenter>
                                </Box>
                              )}
                              <Box className="my-[10px] flex justify-end">
                                <Box className="flex max-w-[70%] flex-col items-end">
                                  <Box className="rounded-lg rounded-br-none bg-secondary-emphasis p-[10px]">
                                    <Text className="text-white">
                                      {message.content}
                                    </Text>
                                  </Box>
                                  <Box className="text-sm text-gray-500">
                                    {transformTime(message.createdAt)}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box key={message.id}>
                              {message.showDate && (
                                <Box position="relative" py="5">
                                  <Divider borderColor={'gray.300'} />
                                  <AbsoluteCenter bg="white" px="4">
                                    {formatDay(message.showDate)}
                                  </AbsoluteCenter>
                                </Box>
                              )}
                              <Box className="my-[10px] flex justify-start">
                                <Box className="flex max-w-[70%] flex-col items-start">
                                  <Box className="rounded-lg rounded-bl-none bg-gray-200 p-[10px]">
                                    <Text>{message.content}</Text>
                                  </Box>
                                  <Box className="text-sm text-gray-500">
                                    {transformTime(message.createdAt)}
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    className="absolute inset-x-0 bottom-0"
                    as="form"
                    onSubmit={sendMessage}
                  >
                    <Box className="border-t-[1px] border-t-gray-200">
                      <Textarea
                        value={content}
                        placeholder="請輸入"
                        resize={'none'}
                        outline={'none'}
                        border={0}
                        onChange={changeContent}
                        onCompositionStart={() => {
                          isComposition.current = false;
                        }}
                        onCompositionEnd={() => {
                          isComposition.current = true;
                        }}
                        wrap="off"
                        onKeyDown={KeyPressContent}
                      />
                      <Box className="flex items-center justify-between px-[6px] py-[10px]">
                        {/* 暫時隱藏 */}
                        <Box className="flex items-center opacity-0">
                          <IconButton
                            colorScheme="secondary-emphasis"
                            variant={'link'}
                            aria-label="send file"
                            icon={
                              <Icon
                                as={FiPaperclip}
                                boxSize={{ base: '22px' }}
                              />
                            }
                            width={'24px'}
                          />
                          <IconButton
                            colorScheme="secondary-emphasis"
                            variant={'link'}
                            aria-label="send image"
                            icon={
                              <Icon
                                as={BsFillImageFill}
                                boxSize={{ base: '22px' }}
                              />
                            }
                          />
                        </Box>
                        <IconButton
                          colorScheme="secondary-emphasis"
                          variant={'solid'}
                          size={'sm'}
                          aria-label="send text"
                          type="submit"
                          icon={<Icon as={MdSend} boxSize={{ base: '20px' }} />}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
