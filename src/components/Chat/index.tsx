import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Text,
  Box,
  IconButton,
  Icon,
  AspectRatio,
  Textarea
} from '@chakra-ui/react';
import { BsBoxArrowUpRight, BsXLg, BsFillImageFill } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';

interface Team {
  title: string;
  photo: string;
}

interface ChatProps {
  teamInfo: Team;
  isOpen: boolean;
  onClose: () => void;
}

const Chat = ({ teamInfo, isOpen, onClose }: ChatProps) => {
  const router = useRouter();
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
                      <Text className="ml-2 text-lg font-bold">
                        {teamInfo.title}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="absolute inset-x-0 bottom-[132px] top-[52px]">
                    <Box></Box>
                    <Box className="relative h-full w-full overflow-y-auto">
                      <Box className="absolute top-0 h-full w-full px-3">
                        <Box className="my-[10px] flex justify-end">
                          <Box className="flex max-w-[70%] flex-col items-end">
                            <Box className="rounded-lg rounded-br-none bg-secondary-emphasis p-[10px]">
                              <Text className="text-white">
                                台北條通日式酒店「光」，致力於保存五光十色的條通文化
                              </Text>
                            </Box>
                            <Box className="text-sm text-gray-500">10:10</Box>
                          </Box>
                        </Box>
                        <Box className="my-[10px] flex justify-start">
                          <Box className="flex max-w-[70%] flex-col items-start">
                            <Box className="rounded-lg rounded-bl-none bg-gray-200 p-[10px]">
                              <Text>
                                台北條通日式酒店「光」，致力於保存五光十色的條通文化
                              </Text>
                            </Box>
                            <Box className="text-sm text-gray-500">10:10</Box>
                          </Box>
                        </Box>
                        <Box className="my-[10px] flex justify-start">
                          <Box className="flex max-w-[70%] flex-col items-start">
                            <Box className="rounded-lg rounded-bl-none bg-gray-200 p-[10px]">
                              <Text>
                                台北條通日式酒店「光」，致力於保存五光十色的條通文化台北條通日式酒店「光」，致力於保存五光十色的條通文化台北條通日式酒店「光」，致力於保存五光十色的條通文化台北條通日式酒店「光」，致力於保存五光十色的條通文化台北條通日式酒店「光」，致力於保存五光十色的條通文化
                              </Text>
                            </Box>
                            <Box className="text-sm text-gray-500">10:10</Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="absolute inset-x-0 bottom-0">
                    <Box className="border-t-[1px] border-t-gray-200">
                      <Textarea
                        placeholder="請輸入"
                        resize={'none'}
                        outline={'none'}
                        border={0}
                      />
                      <Box className="flex items-center justify-between px-[6px] py-[10px]">
                        <Box className="flex items-center">
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
