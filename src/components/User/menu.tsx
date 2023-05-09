import Link from 'next/link';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
const UserMenu = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  interface Menu {
    title: string;
    url: string;
  }

  const menu: Menu[] = [
    { title: '個人資料', url: '/user/account' },
    { title: '交易紀錄', url: '' },
    { title: '追蹤專案', url: '' },
    { title: '紅利紀錄', url: '' },
    { title: '變更密碼', url: '/user/change-password' }
  ];

  return (
    <Flex as="ul" className="whitespace-nowrap sm:justify-center">
      {menu.map((item, index) => (
        <li
          className="px-2.5 md:px-5"
          key={index}
          onClick={() => handleTabClick(index)}
        >
          <Link
            href={item.url}
            className={`relative font-semibold text-gray-900 transition-colors hover:text-secondary-emphasis-500 ${
              selectedTab === index ? 'text-secondary-emphasis-500' : ''
            }`}
          >
            {item.title}
            {selectedTab === index && (
              <span className="absolute bottom-[-16px] left-0 h-0.5 w-full bg-secondary-emphasis-500 md:bottom-[-28px]"></span>
            )}
          </Link>
        </li>
      ))}
    </Flex>
  );
};

export default UserMenu;
