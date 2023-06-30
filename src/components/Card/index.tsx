import Link from 'next/link';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { CgInfinity } from 'react-icons/cg';

interface Card {
  id: string;
  title: string;
  category: string;
  team: string;
  teamId: string;
  keyVision: string;
  target?: string;
  progressRate: number;
  countDownDays?: number;
  type: string;
  updatedAt: string;
}

interface CardProps {
  item: Card;
  content?: React.ReactNode;
}

const Card = ({ item, content }: CardProps) => {
  return (
    <Box className="mb-16 mt-3 w-full md:w-1/3 md:px-3">
      <Link
        href={
          item.type === 'project'
            ? `/project/${item.id}`
            : `/product/${item.id}`
        }
        className="relative flex w-full items-start justify-end rounded-lg bg-cover bg-center pb-[70%] transition-opacity duration-300 hover:opacity-75"
        style={{
          backgroundImage: `url(${item.keyVision})`
        }}
      >
        <div className="absolute right-3 top-3 rounded bg-[#F15761] px-2 py-1 text-xs text-white md:text-sm">
          紅利回饋
        </div>
      </Link>

      <Box h={{ md: 20 }}>
        <div className="mt-4 text-xs text-gray-500 md:text-sm">
          {item.category}
        </div>
        <Link
          href={
            item.type === 'project'
              ? `/project/${item.id}`
              : `/product/${item.id}`
          }
          className="mt-1 line-clamp-2 font-medium transition-colors hover:text-secondary-emphasis md:mt-2 md:text-xl"
        >
          {item.title}
        </Link>
        <Link
          href={`/organization/${item.teamId}`}
          className="mt-1 text-xs text-secondary-emphasis hover:text-secondary-emphasis-400 md:mt-2 md:text-sm"
        >
          {item.team}
        </Link>
      </Box>

      <Flex
        className="mt-4 md:mt-6 md:h-[92px]"
        justifyContent={'end'}
        flexFlow={'column'}
      >
        {item.type === 'project' && (
          <div className="text-lg font-medium text-gray-900 md:text-xl">
            {item.target}
          </div>
        )}
        <Box
          bgColor={'gray.200'}
          width={'100%'}
          height={'6px'}
          borderRadius={8}
          className="mt-3 md:mt-4"
        >
          <div
            className={`h-full rounded-xl  ${
              item.type === 'project' ? 'bg-primary' : 'bg-success'
            }`}
            style={{
              width: `${
                item.progressRate && item.progressRate >= 100
                  ? 100
                  : item.progressRate
              }%`
            }}
          ></div>
        </Box>
        {item.type === 'project' ? (
          <Flex
            justifyContent={'space-between'}
            color={'gray.900'}
            className="mt-3 text-sm md:mt-[1.125rem] md:text-base"
          >
            <div>{item.progressRate}%</div>
            {item.countDownDays && item.countDownDays > 0 ? (
              <div>
                <span className="text-xs md:text-sm">倒數</span>
                <span className="px-1">{item.countDownDays}</span>
                <span className="text-xs md:text-sm">天</span>
              </div>
            ) : (
              <div>已結束</div>
            )}
          </Flex>
        ) : (
          <Flex
            justifyContent={'end'}
            className="mt-3 text-sm md:mt-[1.125rem] md:text-base"
          >
            <Icon as={CgInfinity} mr={1} className="text-xl" />
            長期販售
          </Flex>
        )}
      </Flex>

      <Box>{content}</Box>
    </Box>
  );
};

export default Card;
