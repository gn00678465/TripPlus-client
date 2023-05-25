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

  interface rank {
    comment: string;
  }

  interface Bonus {
    title: string;
    sendDate: string;
    expirationDate: string;
    bonus: number;
    transactionId: string;
    isProject: boolean;
  }
}
