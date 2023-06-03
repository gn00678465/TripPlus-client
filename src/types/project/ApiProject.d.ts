declare namespace ApiProject {
  interface Projects {
    items: ProjectItem[];
    page: number;
    limit: number;
    totalPages: number;
  }

  interface ProjectItem {
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

  interface Plan {
    _id: string;
    projectId: string;
    title: string;
    price: number;
    content: string;
    isAllowMulti: 0 | 1;
    isDelete: 0 | 1;
    createdAt: string;
    updatedAt: string;
    sponsorCount: number;
    __v: 0;
  }

  interface FAQ {
    _id: string;
    projectId: string;
    question: string;
    answer: string;
    isPublish: 0 | 1;
    publishedAt: string;
    isDelete: 0 | 1;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  }

  interface News {
    _id: string;
    projectId: string;
    title: string;
    content: string;
    isPublish: 0 | 1;
    isDelete: 0 | 1;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    publishedAt: string;
  }

  interface Team {
    _id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    address: string;
    email: string;
    facebook: string;
    instagram: string;
    introduction: string;
    phone: string;
    photo: string;
    representative: string;
    serviceTime: string;
    taxId: string;
    type: 0 | 1;
    website: string;
  }

  interface History {
    _id: string;
    projectId?: string;
    status: 0 | 1 | 2 | 3;
    createdAt: string;
  }

  interface Project {
    _id: string;
    keyVision: string;
    creator: string;
    title: string;
    startTime: string;
    endTime: string;
    target: number;
    category: 0 | 1 | 2;
    sum: number;
    sponsorCount: number;
    isShowTarget: 0 | 1;
    isLimit: 0 | 1;
    isAbled: 0 | 1;
    isCommercialized: 1;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    productId: string;
    content: string;
    progressRate: number;
    countDownDays: number;
    id: string;
    teamId: Team;
    plans: Plan[];
    news: New[];
    faqs: FAQ[];
    histories: History[];
  }
}
