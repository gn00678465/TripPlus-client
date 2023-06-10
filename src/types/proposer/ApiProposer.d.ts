declare namespace ApiProposer {
  interface Proposer {
    team: Team;
    projects: Projects;
  }

  interface Team {
    _id: string;
    type: number;
    title: string;
    photo: string;
    introduction: string;
    taxId: string;
    address: string;
    serviceTime: string;
    representative: string;
    email: string;
    phone: string;
    website: string;
    facebook: string;
    instagram: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Projects {
    all: ApiProject.ProjectItem[];
    progress: ApiProject.ProjectItem[];
    complete: ApiProject.ProjectItem[];
  }
}
