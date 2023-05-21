import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { useAuthStore } from '@/store';
import { useCookie } from '@/hooks';
import { useRouter } from 'next/router';

const MemberMenu = () => {
  const router = useRouter();

  const menu = [
    { title: '個人資料', url: '/user/account' },
    { title: '交易紀錄', url: '/user/transactions' },
    { title: '追蹤專案', url: '/user/followings' },
    { title: '紅利紀錄', url: '/user/bonus' },
    { title: '變更密碼', url: '/user/change-password' }
  ];

  const [value, updateCookie, deleteCookie] = useCookie('token');

  const logout = () => {
    useAuthStore.persist.clearStorage();
    deleteCookie();
    router.push('/');
  };

  return (
    <ul>
      {menu.map((item) => (
        <li key={item.title}>
          <Link
            href={item.url}
            className="my-1 block px-10 py-1.5 hover:bg-white md:hover:bg-secondary-emphasis-50"
          >
            {item.title}
          </Link>
        </li>
      ))}
      <li className="border-t border-gray-200 p-3">
        <Button
          variant={'outline'}
          colorScheme="primary"
          fontSize={14}
          width={'100%'}
          height={{ base: 10, md: 8 }}
          onClick={logout}
        >
          登出
        </Button>
      </li>
    </ul>
  );
};

export default MemberMenu;
