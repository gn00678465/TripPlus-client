declare namespace User {
  interface AccountForm {
    photo: string;
    email: string;
    name: string;
    nickName: string;
    phone: string;
    address: string;
    photo: string;
    gender: number;
    year: number | null;
    month: number | null;
    day: number | null;
    country: string;
    introduction: string;
  }

  interface ChangePassword {
    password: string;
    confirmPassword: string;
    oldPassword: string;
  }

  interface rank {
    comment: string;
  }
}
