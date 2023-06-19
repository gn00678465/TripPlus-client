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
import MessageList, { type Message } from '@/components/Message/msg-list';
import MsgHeader from '@/components/Message/header';
import PopoverBox from '@/components/Popover';
import { FiPaperclip } from 'react-icons/fi';
import { BsImage, BsSendFill } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';
import io from 'socket.io-client';
import { useEffect, useState, useMemo, useRef, RefObject } from 'react';
import { request, safeAwait, utc2Local, formatDay } from '@/utils';
import { apiGetMessageMember, apiGetMessageProject } from '@/api';
import useSWR, { useSWRConfig } from 'swr';
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
    props: { userId: res.data._id, userPhoto: res.data.photo || '' }
  };
};

interface MessageProps {
  userId: string;
  userPhoto: string;
}

const Message = ({ userId, userPhoto }: MessageProps) => {
  const URL: string = process.env.BASE_API_URL || '';
  const socket = io(URL, { transports: ['websocket'] });
  const router = useRouter();
  const projectId = useMemo(() => router.query.id, [router]);

  const chatWindow: RefObject<HTMLDivElement> = useRef(null);

  const [messages, setMessages] = useState<Message.Member[]>([]);

  const [projectInfo, setProjectInfo] = useState<Message.Project>({
    name: '',
    photo: '',
    receiver: '',
    title: '',
    id: ''
  });

  const [projectMsg, setProjectMsg] = useState<Message.MsgList[]>([]);

  const [currentMsg, setCurrentMsg] = useState<Message.MsgData>({
    id: '',
    name: '',
    photo: '',
    content: '',
    isUserMsg: true,
    createdAt: ''
  });

  const [content, setConent] = useState('');

  const { data: member, isLoading: isMemberLoading } = useSWR(
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

  const {
    data: msgProject,
    isLoading: isProjectLoading,
    mutate: fetchMsgProject
  } = useSWR(
    ['get', '/api/message/projectId'],
    () => apiGetMessageProject(projectId as string),
    {
      onSuccess(data, key, config) {
        if (data && data.status === 'Success') {
          setProject(data.data[0]);
          getProjectMsg(data.data);
        }
      },

      onError: (err, key, config) => {
        alert(err.message);
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

  const setProject = (project: ApiMessage.ProjectMsg) => {
    setProjectInfo(() => {
      const userIsSender = project.sender._id === userId ? true : false;

      return {
        name: userIsSender ? project.receiver.name : project.sender.name,
        photo: userIsSender ? project.receiver.photo : project.sender.photo,
        receiver: userIsSender ? project.receiver._id : project.sender._id,
        title: project.projectId.title,
        id: project.projectId._id
      };
    });
  };

  const getProjectMsg = (data: ApiMessage.ProjectMsg[]) => {
    setProjectMsg(() => {
      let msgList: Message.MsgList[] = [];
      let dateIndexes: any = {}; // 記錄每個日期的索引

      data.forEach((item) => {
        const userIsSender = item.sender._id === userId ? true : false;
        const dateKey: string = utc2Local(item.createdAt).format('YYYY-MM-DD');

        if (dateIndexes[dateKey] === undefined) {
          // 如果該日期不存在，添加新的數據
          msgList.push({
            id: item._id,
            createdAt: item.createdAt,
            data: [
              {
                id: item._id,
                name: userIsSender ? item.receiver.name : item.sender.name,
                photo: userIsSender ? item.receiver.photo : item.sender.photo,
                content: item.content,
                isUserMsg: userIsSender ? true : false,
                createdAt: item.createdAt
              }
            ]
          });
          // 記錄該日期的索引
          dateIndexes[dateKey] = msgList.length - 1;
        } else {
          // 如果日期已存在，更新現有數據
          const index = dateIndexes[dateKey];
          msgList[index].data.push({
            id: item._id,
            name: userIsSender ? item.receiver.name : item.sender.name,
            photo: userIsSender ? item.receiver.photo : item.sender.photo,
            content: item.content,
            isUserMsg: userIsSender ? true : false,
            createdAt: item.createdAt
          });
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

  const KeyPressContent = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const generateId = () => {
    const now = new Date();
    const timestamp = now.getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNum}`;
  };

  const sendMessage = () => {
    const messagePayload = {
      sender: userId,
      receiver: projectInfo.receiver,
      content,
      projectId
    };

    socket.emit('message', messagePayload);

    setCurrentMsg({
      id: generateId(),
      name: projectInfo.name,
      photo: projectInfo.photo,
      content,
      isUserMsg: true,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm')
    });

    setConent('');
  };

  useEffect(() => {
    fetchMsgProject();
  }, [projectId, fetchMsgProject]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data) => {
      console.log('接收', data);

      setProjectMsg((state) => {
        const lastDate = projectMsg[projectMsg.length - 1].createdAt;
        const isSameDay = dayjs(lastDate).isSame(new Date(), 'day')
          ? true
          : false;

        const newMsg = {
          id: currentMsg.id,
          createdAt: currentMsg.createdAt,
          data: [
            {
              ...currentMsg,
              isUserMsg: data.sender === userId ? true : false,
              content: data.content
            }
          ]
        };

        if (state.length === 0) {
          return [newMsg];
        }

        if (!isSameDay) {
          return [...state, newMsg];
        }

        const lastItemIndex = state.length - 1;
        const lastData = state[lastItemIndex].data;
        const updatedData = [
          ...lastData,
          {
            ...currentMsg,
            isUserMsg: data.sender === userId ? true : false,
            content: data.content
          }
        ];
        const updatedItem = { ...state[lastItemIndex], data: updatedData };
        const updatedState = [...state.slice(0, lastItemIndex), updatedItem];

        return updatedState;
      });

      setMessages((state) => {
        const hasSame = messages.some((item) => item.projectId === projectId);

        const newData: Message.Member = {
          id: currentMsg.id,
          projectId: projectId as string,
          name: projectInfo.name,
          createdAt: currentMsg.createdAt,
          photo: projectInfo.photo,
          content: data.content
        };

        if (!hasSame) return [newData, ...state];

        const removeProjIdData = state.filter(
          (item, idx) => item.projectId !== projectId
        );
        return [newData, ...removeProjIdData];
      });
    });

    return () => {
      socket.disconnect();
      console.log('Disconnected from server');
    };
  }, [projectMsg, messages, projectId]);

  useEffect(() => {
    if (!chatWindow.current) return;
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
  }, [projectMsg]);

  if (isMemberLoading || isProjectLoading) return <Loading />;

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
          <MessageList messages={messages} />
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
                src={projectInfo.photo || NoImage.src}
                fallbackSrc={NoImage.src}
                alt={projectInfo.name}
                width={40}
                height={40}
                priority
                className="mr-2"
              ></ImageFallback>

              <Box fontWeight={500} mt={1}>
                <Box className="line-clamp-1">{projectInfo.name}</Box>
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
            {projectMsg.map((item, idx) => (
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
                    <label htmlFor="file" className="cursor-pointer p-2">
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
                    <label htmlFor="image" className="cursor-pointer p-2">
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
