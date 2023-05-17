declare namespace AuthInterface {
  interface SignupForm {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }

  interface LoginForm {
    email: string;
    password: string;
    isRemember: boolean;
  }
}
