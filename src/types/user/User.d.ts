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

  interface Follows {
    id: string;
    title: string;
    category: string;
    team: string;
    teamId: string;
    keyVision: string;
    target?: string;
    progressRate: number;
    countDownDays?: number;
    type: string;
    updatedAt: string;
  }

  interface Bonus {
    title: string;
    sendDate: string;
    expirationDate: string;
    bonus: number;
    transactionId: string;
    isProject: boolean;
  }

  interface TeamId {
    _id: string;
    title: string;
  }

  interface Orders {
    id: string;
    transactionId: string;
    team: string;
    teamId: string;
    title: string;
    planTitle: string;
    paidAt: string;
    fundPrice: number;
    paymentStatus: number;
    isProject: boolean;
    projectId: string;
    productId: string;
  }
}
