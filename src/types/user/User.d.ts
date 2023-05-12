declare namespace User {
  interface ChangePassword {
    password: string;
    confirmPassword: string;
    oldPassword: string;
  }
}
