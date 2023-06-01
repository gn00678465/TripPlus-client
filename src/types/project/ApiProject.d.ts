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
}
