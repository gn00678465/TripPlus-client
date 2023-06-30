import { ReactNode } from 'react';
import { Box, Flex, Text, Icon, Center, useSteps } from '@chakra-ui/react';
import { BsCheck2, BsCircleFill } from 'react-icons/bs';

interface StepIndicatorProps {
  title: string;
  complete?: ReactNode;
  incomplete?: ReactNode;
  isActive: boolean;
}
const StepIndicator = ({
  title,
  complete,
  incomplete,
  isActive
}: StepIndicatorProps) => {
  return (
    <Box textAlign="center">
      <Box mb={2} display="inline-block">
        {isActive ? (
          <Box
            w="full"
            h="full"
            maxW="36px"
            maxH="36px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
            backgroundColor="primary.500"
            color="white"
            borderRadius="50%"
          >
            {complete}
          </Box>
        ) : (
          <Box
            w="full"
            h="full"
            maxW="36px"
            maxH="36px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
            backgroundColor="transparent"
            color="gray.100"
            borderRadius="50%"
          >
            {incomplete}
          </Box>
        )}
      </Box>
      <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
        {title}
      </Text>
    </Box>
  );
};

export interface StepItem {
  title: string;
  step: number;
}

export const Step = ({
  step,
  stepList
}: {
  step: number;
  stepList: StepItem[];
}) => {
  const { activeStep } = useSteps({
    index: step,
    count: stepList.length
  });

  return (
    <Center px={{ base: 3, md: 0 }} mt={{ base: 6, md: 10 }}>
      <Flex
        w="full"
        maxW="660px"
        pos="relative"
        alignItems="center"
        justifyContent="space-between"
        _before={{
          content: '""',
          position: 'absolute',
          width: 'calc(100% - 48px)',
          height: '2px',
          backgroundColor: 'gray.100',
          left: '24px',
          top: activeStep === -1 ? '15px' : '18px',
          zIndex: -1
        }}
      >
        {stepList.map((step, index) => (
          <StepIndicator
            key={index}
            isActive={activeStep >= step.step}
            complete={<Icon as={BsCheck2} boxSize={5} />}
            incomplete={<Icon as={BsCircleFill} />}
            {...step}
          />
        ))}
      </Flex>
    </Center>
  );
};
