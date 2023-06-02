import { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';
import { IoIosArrowUp } from 'react-icons/io';

const GoTop = () => {
  const [isShowBtn, setIsShowBtn] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    function setScroll() {
      setIsShowBtn(window.scrollY > 100 ? true : false);
    }
    window.addEventListener('scroll', setScroll);

    return () => {
      window.removeEventListener('scroll', setScroll);
    };
  }, []);

  return (
    <>
      {isShowBtn && (
        <Center
          position={'fixed'}
          bottom={8}
          right={8}
          zIndex={99}
          bgColor={'primary.500'}
          color={'white'}
          borderRadius={'full'}
          w={{ base: 10, md: 16 }}
          h={{ base: 10, md: 16 }}
          cursor={'pointer'}
          onClick={scrollTop}
          fontSize={{ base: 'md', md: '3xl' }}
        >
          <IoIosArrowUp />
        </Center>
      )}
    </>
  );
};

export default GoTop;
