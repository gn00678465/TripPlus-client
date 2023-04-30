declare namespace SignupInterface {
  interface FormInputs {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }

  interface ModalState {
    isOpen: boolean;
    content: string;
    footer: React.ReactNode | null;
  }
}
