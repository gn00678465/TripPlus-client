declare namespace ApiUser {
  interface Account {
    email: string;
    name: string;
    nickName?: string;
    phone?: string;
    address?: string;
    photo?: string;
    gender?: number;
    birthday?: string;
    country?: string;
    introduction?: string;
  }

  interface UploadFile {
    imageUrl: string;
  }

  interface ChangePassword {
    password: string;
    confirmPassword: string;
    oldPassword: string;
  }

  interface BonusList {
    title: string;
    sendDate: string;
    expirationDate: string;
    transactionId: string;
    bonus: number;
  }

  interface Bonus {
    TotalBonus: number;
    userBonus: number;
    projects: BonusList[];
    products: BonusList[];
  }
}
