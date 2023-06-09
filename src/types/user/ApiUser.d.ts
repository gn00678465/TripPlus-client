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

  interface Order {
    _id: string;
    transactionId: string;
    projectId: {
      title: string;
      type: string;
      keyVision: string;
    };
    productId: {
      title: string;
      type: string;
      keyVision: string;
    };
    payment: number;
    paymentStatus: number;
    createdAt: string;
    total: number;
    planId: {
      title: string;
      price: number;
    };
    note: string;
    paidAt?: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    buyerAddress: string;
    recipient: string;
    recipientPhone: string;
    recipientEmail: string;
    shipAddress: string;
    shipment: number;
    shipmentStatus: number;
    shipDate?: string;
    shipmentId?: string;
  }
}
