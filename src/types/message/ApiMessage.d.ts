declare namespace ApiMessage {
  interface Chatter {
    name: string;
    photo: string;
    _id: string;
  }

  interface Member {
    _id: string;
    content: string;
    createdAt: string;
    projectId: string;
    receiver: Chatter;
    sender: Chatter;
  }

  interface ProjectMsg {
    _id: string;
    content: string;
    createdAt: string;
    receiver: Chatter;
    sender: Chatter;
    projectId: {
      _id: string;
      title: string;
    };
  }
}
