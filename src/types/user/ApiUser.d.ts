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

  interface TeamId {
    _id: string;
    title: string;
  }

  interface FollowsProject {
    id: string;
    title: string;
    category: number;
    teamId: TeamId;
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
    teamId: TeamId;
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

  interface Orders {
    _id: string;
    transactionId: string;
    projectId: {
      _id: string;
      teamId: TeamId;
      type: string;
      title: string;
    };
    productId: {
      _id: string;
      teamId: TeamId;
      type: string;
      title: string;
    };
    planId: {
      _id: string;
      title: string;
    };
    paidAt?: string;
    fundPrice: number;
    paymentStatus: number;
  }

  interface Ranking {
    productId: string;
    rate: number;
    shortComment?: string;
    comment?: string;
    imageUrls?: string[];
  }
}
