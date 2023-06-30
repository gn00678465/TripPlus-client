import Link from 'next/link';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const UserMenu = () => {
  const router = useRouter();
  const pathName = router.pathname;

  interface Menu {
    title: string;
    url: string;
    children: string[];
  }

  const menu: Menu[] = [
    { title: '個人資料', url: '/user/account', children: [] },
    {
      title: '交易紀錄',
      url: '/user/transactions',
      children: ['/user/orders/[id]']
    },
    { title: '追蹤專案', url: '/user/followings', children: [] },
    { title: '紅利紀錄', url: '/user/bonus', children: [] },
    { title: '變更密碼', url: '/user/change-password', children: [] }
  ];

  return (
    <Flex as="ul" className="whitespace-nowrap sm:justify-center">
      {menu.map((item, index) => (
        <li className="px-2.5 md:px-5" key={index}>
          <Link
            href={item.url}
            className={`group relative font-medium text-gray-900 transition-colors hover:text-secondary-emphasis-500 ${
              pathName === item.url || item.children.includes(pathName)
                ? 'text-secondary-emphasis-500'
                : ''
            }`}
          >
            {item.title}
            <span
              className={`absolute bottom-[-16px] left-0 h-0.5 w-full scale-y-100 bg-secondary-emphasis-500 transition-transform group-hover:scale-x-100 md:bottom-[-28px] ${
                pathName === item.url || item.children.includes(pathName)
                  ? 'scale-x-100'
                  : 'scale-x-0'
              }`}
            ></span>
          </Link>
        </li>
      ))}
    </Flex>
  );
};

export default UserMenu;
