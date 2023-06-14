import Link from 'next/link';
import Image from 'next/image';
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
  Input
} from '@chakra-ui/react';

import MessageList, { type Message } from '@/components/Message/msg-list';
import MsgHeader from '@/components/Message/header';
import PopoverBox from '@/components/Popover';
import { FiPaperclip } from 'react-icons/fi';
import { BsImage, BsSendFill } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const [file, setFile] = useState<undefined | File>();
  const [image, setImage] = useState<undefined | File>();
  const [content, setConent] = useState('');

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

  const sendMessage = () => {
    setConent('');
    console.log(content);
  };

  const { handleSubmit, register } = useForm<Message.MessageForm>();

  const onSubmit = (data: Message.MessageForm) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>訊息中心-TripPlus+</title>
      </Head>

      <Box className="hidden md:block">
        <MsgHeader />
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

            <Flex px={{ base: 10, md: 0 }}>
              <Image
                src="https://picsum.photos/200/200"
                width={40}
                height={40}
                alt=""
                priority
                className="mr-2"
              />
              <Center fontWeight={500}>
                <Link href="/organization/1" className="line-clamp-1">
                  Trista 微笑女孩手作革物
                </Link>
              </Center>
            </Flex>
          </Flex>

          <Box
            p={6}
            h={{ base: 'calc(100vh - 52px - 164px)', md: 'auto' }}
            fontSize={{ base: 'sm', md: 'md' }}
            className="overflow-y-auto"
          >
            <Box position="relative" py="10">
              <Divider borderColor={'gray.300'} />
              <AbsoluteCenter bg="white" px="4">
                今天
              </AbsoluteCenter>
            </Box>

            <Box mt={4}>
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
                  您好，我想請問短夾是不是不能碰到水？
                </Box>
                <Text color={'gray.500'}>10:39</Text>
              </Flex>
            </Box>

            <Flex alignItems={'start'} mt={4}>
              <Box className="mr-2 shrink-0">
                <Image
                  src="https://picsum.photos/200/200"
                  width={40}
                  height={40}
                  alt=""
                  priority
                />
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
                  您好，皮夾最好不要碰水，因為水可能會使皮革變形、發霉、變色、脫皮等。但如果不慎將皮夾弄濕了，應該盡快用乾布擦拭表面，然後在通風處晾乾，避免陽光直射或用吹風機吹乾，以免皮革變硬或開裂。如果有必要，可以使用專門的皮革保養產品進行清潔和保養。
                </Box>
                <Text color={'gray.500'}>10:45</Text>
              </Flex>
            </Flex>
          </Box>

          <Box
            as={'form'}
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register('content')}
                  onChange={changeContent}
                  onKeyDown={KeyPressContent}
                ></Textarea>
              </FormControl>

              <Flex w={'full'} p={2} fontSize={'lg'} zIndex={10} bg={'white'}>
                <Flex alignItems={'center'}>
                  <PopoverBox text={'上傳檔案'}>
                    <Input
                      id="file"
                      type="file"
                      display={'none'}
                      {...register('file')}
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
                      {...register('image')}
                    />
                    <label htmlFor="image" className="cursor-pointer p-2">
                      <Icon as={BsImage}></Icon>
                    </label>
                  </PopoverBox>
                </Flex>
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
