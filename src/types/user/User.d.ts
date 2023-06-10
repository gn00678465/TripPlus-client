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

  interface Bonus {
    title: string;
    sendDate: string;
    expirationDate: string;
    bonus: number;
    transactionId: string;
    isProject: boolean;
  }

  interface Order {
    title: string;
    payment: number;
    paymentStatus: number;
    id: string;
    transactionId: string;
    createdAt: string;
    total: string;
    keyVision: string;
    plan: {
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
    shipDate: string;
    shipmentId: string;
    count: number;
    extraFund: number;
  }
}
