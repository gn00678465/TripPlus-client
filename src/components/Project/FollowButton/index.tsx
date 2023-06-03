import NextLink from 'next/link';
import { Button, Icon, Link, Box, useToast } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { MdBookmarkBorder, MdOutlineBookmarkRemove } from 'react-icons/md';
import userSWRMutation from 'swr/mutation';
import { apiPostFollow, apiDeleteFollow } from '@/api';

export interface FollowButtonProps {
  id?: string | string[];
  isFollowed?: 0 | 1;
}

export const FollowButton = (props: FollowButtonProps) => {
  const toast = useToast();
  const [isFollowed, setIsFollowed] = useState(!!props.isFollowed);
  const id = useMemo(() => (props.id && props.id) || null, [props.id]);

  // query follow
  const { trigger: follow } = userSWRMutation(
    '/api/user/follow',
    (url, { arg }: { arg: string }) => apiPostFollow(arg)
  );
  const { trigger: disFollow } = userSWRMutation(
    '/api/user/disFollow',
    (url, { arg }: { arg: string }) => apiDeleteFollow(arg)
  );

  return isFollowed ? (
    <Button
      px={{ lg: '60px' }}
      color="red"
      leftIcon={
        <Icon as={MdOutlineBookmarkRemove} boxSize={{ base: 5, md: 6 }} />
      }
      borderColor="red"
      variant="outline"
      _hover={{
        color: 'white',
        backgroundColor: 'red'
      }}
      onClick={() => {
        disFollow(id as string, {
          onError(err, key, config) {},
          onSuccess(data, key, config) {
            setIsFollowed(false);
            toast({
              status: 'error',
              position: 'top',
              duration: 3000,
              isClosable: true,
              containerStyle: {
                width: '100%',
                maxWidth: '100%'
              },
              render: () => (
                <Box color="white" p={3} bg="red" textAlign={'center'}>
                  已取消追蹤，將來的最新消息將不會再主動通知您
                </Box>
              )
            });
          }
        });
      }}
    >
      取消追蹤
    </Button>
  ) : (
    <Button
      px={{ lg: '60px' }}
      colorScheme="secondary-emphasis"
      leftIcon={<Icon as={MdBookmarkBorder} boxSize={{ base: 5, md: 6 }} />}
      variant="outline"
      borderColor="secondary-emphasis.500"
      _hover={{
        color: 'white',
        backgroundColor: 'secondary-emphasis.500'
      }}
      onClick={() => {
        follow(id as string, {
          onError(err, key, config) {},
          onSuccess(data, key, config) {
            setIsFollowed(true);
            toast({
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true,
              containerStyle: {
                width: '100%',
                maxWidth: '100%'
              },
              render: () => (
                <Box
                  color="white"
                  p={3}
                  bg="secondary-emphasis.400"
                  textAlign={'center'}
                >
                  正在追蹤此專案，可以至
                  {
                    <Link
                      fontWeight={700}
                      href="/user/followings"
                      as={NextLink}
                    >
                      會員中心的追蹤專案頁面
                    </Link>
                  }
                  查看正在追蹤的專案
                </Box>
              )
            });
          }
        });
      }}
    >
      追蹤專案
    </Button>
  );
};
