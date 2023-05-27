declare namespace ApiProposer {
  interface Proposer {
    team: Team;
  }

  interface Team {
    _id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }
}
