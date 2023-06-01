import { Text, Button, Icon, Flex } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import PageBtn from './PageBtn';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange
}: PaginationProps) => {
  const setPages = (page: number) => {
    console.log(page);

    if (totalPage <= 6) {
      return Array.from(
        { length: totalPage },
        (_, index) => totalPage - index
      ).sort();
    }

    if (totalPage - page < 5) {
      return Array.from({ length: 5 }, (_, index) => totalPage - index).sort();
    }

    return Array.from({ length: 5 }, (_, index) => page + index);
  };

  const pages = setPages(currentPage);

  return (
    <Flex alignItems={'center'} flexWrap={'wrap'}>
      <Button
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        w={10}
        mx={1}
      >
        <Icon as={IoIosArrowBack} />
      </Button>

      {totalPage > 6 && currentPage !== 1 && (
        <PageBtn page={1} onPageChange={onPageChange} />
      )}

      {totalPage > 6 && currentPage > 2 && (
        <Text w={10} textAlign={'center'}>
          ...
        </Text>
      )}

      {pages.map((item) => (
        <PageBtn
          key={item}
          page={item}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}

      {totalPage - currentPage > 5 && totalPage > 6 && (
        <Text w={10} textAlign={'center'}>
          ...
        </Text>
      )}

      {totalPage - currentPage >= 5 && totalPage > 6 && (
        <PageBtn page={totalPage} onPageChange={onPageChange} />
      )}

      <Button
        isDisabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        w={10}
        mx={1}
      >
        <Icon as={IoIosArrowForward} />
      </Button>
    </Flex>
  );
};

export default Pagination;
