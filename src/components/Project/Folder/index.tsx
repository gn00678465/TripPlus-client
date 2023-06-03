import { Box, BoxProps, Center, Text, Icon } from '@chakra-ui/react';
import { ReactNode, useEffect, useState, useRef, useMemo } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export interface FolderProps extends BoxProps {
  children: ReactNode;
}

export const Folder = ({ children }: FolderProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpand, setIsExpand] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (
      contentRef.current?.clientHeight &&
      contentRef.current?.clientHeight > 600
    ) {
      setShowMore(true);
    }
  }, [contentRef.current]);

  return (
    <>
      <Box>
        <div className={`folder overflow-hidden ${isExpand ? 'active' : ''}`}>
          <div ref={contentRef}>{children}</div>
        </div>
        {showMore && (
          <Center mt={{ base: 6, md: 10 }}>
            <Box
              as="button"
              textAlign="center"
              color="secondary-emphasis.500"
              transition="color 0.3s ease-in-out"
              _hover={{
                color: 'secondary-emphasis.600'
              }}
              onClick={() => {
                setIsExpand(!isExpand);
              }}
            >
              <Text mb={{ base: 1 }}>閱讀更多</Text>
              <Icon
                as={MdOutlineKeyboardArrowDown}
                boxSize={{ base: 5, md: 6 }}
              />
            </Box>
          </Center>
        )}
      </Box>
      <style jsx global>
        {`
          .folder {
            max-height: 600px;
            transition: all 0.5s ease-in-out;
          }
          .folder.active {
            max-height: 9999px;
          }
        `}
      </style>
    </>
  );
};
