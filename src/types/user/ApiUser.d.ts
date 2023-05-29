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

  interface Follows {
    follows: FollowsList[];
  }

  interface FollowsList {
    projectId?: FollowsProject;
    productId?: FollowsProduct;
  }

  interface FollowsProject {
    id: string;
    title: string;
    category: number;
    teamId: string;
    keyVision: string;
    target: number;
    progressRate: number;
    countDownDays: number;
    type: string;
    updatedAt: string;
  }

  interface FollowsProduct {
    id: string;
    title: string;
    category: number;
    teamId: string;
    keyVision: string;
    type: string;
    updatedAt: string;
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
