import { Button } from '@chakra-ui/react';

interface PageBtnProps {
  page: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const PageBtn = ({ page, currentPage, onPageChange }: PageBtnProps) => {
  return (
    <Button
      w={10}
      mx={1}
      _hover={{
        bg: 'primary.500',
        color: 'white'
      }}
      bg={page === currentPage ? 'primary.500' : ''}
      color={page === currentPage ? 'white' : ''}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
};

export default PageBtn;
