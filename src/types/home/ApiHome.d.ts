declare namespace ApiHome {
  interface Item {
    category: number;
    content: string;
    countDownDays: number;
    createdAt: string;
    creator: string;
    endTime: string;
    id: string;
    isAbled: number;
    isAllowInstallment: number;
    isCommercialized: number;
    isLimit: number;
    isShowTarget: number;
    keyVision: string;
    payment: number;
    progressRate: number;
    seoDescription: string;
    sponsorCount: number;
    startTime: string;
    status: string;
    sum: number;
    summary: string;
    target: number;
    teamId: Team;
    title: string;
    type: string;
    updatedAt: string;
    url: string;
    __v: number;
    _id: string;
  }

  interface Team {
    _id: string;
    title: string;
  }

  interface Home {
    hot: [Item];
    latest: [Item];
    classic: [Item];
    success: [Item];
  }

  interface HomeData {
    successCount: number;
    sum: number;
    sponsorCount: number;
  }

  interface BannerItem {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
  }
}
