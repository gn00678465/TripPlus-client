import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  footer: React.ReactNode;
  content: React.ReactNode;
}

export interface ModalState {
  isOpen: boolean;
  content: string;
  footer: React.ReactNode | null;
}

const ChakraModal = ({
  isOpen,
  onClose,
  header,
  footer,
  content
}: ModalBoxProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChakraModal;
