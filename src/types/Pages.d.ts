declare namespace PagesInterface {
  interface SignupInputs {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }

  interface LoginInputs {
    email: string;
    password: string;
    isRemember: boolean;
  }
}
