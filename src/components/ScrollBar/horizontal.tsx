import { FC, ReactNode, useState } from 'react';
import { Box } from '@chakra-ui/react';

interface Scrollbar {
  children: ReactNode;
}

const Scrollbar: FC<Scrollbar> = ({ children }) => {
  const [isShowScrollBar, setIsShowScrollBar] = useState(false);

  const showScrollBar = (boolean: boolean) => {
    return () => {
      setIsShowScrollBar(boolean);
    };
  };

  return (
    <Box
      className={`overflow-y-hidden ${
        isShowScrollBar ? 'md:overflow-x-auto' : 'md:overflow-x-hidden'
      }`}
      onMouseEnter={showScrollBar(true)}
      onMouseLeave={showScrollBar(false)}
      css={{
        '&::-webkit-scrollbar': {
          height: 2,
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#D3D3D3'
        },
        scrollbarColor: '#D3D3D3 transparent',
        scrollbarWidth: 'thin'
      }}
    >
      {children}
    </Box>
  );
};

export default Scrollbar;
