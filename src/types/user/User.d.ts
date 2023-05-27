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
}
