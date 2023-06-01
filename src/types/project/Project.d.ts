declare namespace Project {
  interface ProjectItem {
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

  interface Pagination {
    page: number;
    limit: number;
    totalPages: number;
  }
}
