import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow
} from '@chakra-ui/react';
import { useState } from 'react';

interface PopoverProps {
  children: React.ReactNode;
  text: string;
}

const PopoverBox = ({ children, text }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      autoFocus={false}
      isOpen={isOpen}
      onOpen={handleMouseEnter}
      onClose={handleMouseLeave}
    >
      <PopoverTrigger>
        <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent
        textAlign={'center'}
        bg={'secondary-emphasis.500'}
        color={'white'}
        maxW={32}
        fontSize={'sm'}
      >
        <PopoverArrow bg="secondary-emphasis.500" />
        <PopoverBody>{text}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverBox;
