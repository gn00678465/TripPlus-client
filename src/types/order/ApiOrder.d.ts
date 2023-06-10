declare namespace ApiOrder {
  interface Payment {
    projectId?: string;
    productId?: string;
    planId: string;
    payment: number;
    fundPrice: number;
    count: number;
    shipPrice: number;
    shipment: number;
    extraFund: number;
    bonusDiscount?: number;
    total: number;
    buyerName: string;
    buyerPhone: string;
    buyerEmail: string;
    buyerAddress: string;
    shipAddress: string;
    recipient: string;
    recipientPhone: string;
    recipientEmail: string;
    note: string;
  }
}
