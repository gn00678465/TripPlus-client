import { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface Scrollbar {
  children: ReactNode;
}

const Scrollbar: FC<Scrollbar> = ({ children }) => {
  return (
    <Box
      className="overflow-x-auto overflow-y-hidden "
      css={{
        '&::-webkit-scrollbar': {
          height: 0,
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent'
        },
        scrollbarColor: 'transparent transparent',
        scrollbarWidth: 'thin'
      }}
    >
      {children}
    </Box>
  );
};

export default Scrollbar;
