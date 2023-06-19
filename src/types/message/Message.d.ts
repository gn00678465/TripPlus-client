declare namespace Message {
  interface Member {
    id: string;
    projectId: string;
    name: string;
    createdAt: string;
    photo: string;
    content: string;
  }

  interface Project {
    name: string;
    photo: string;
    receiver: string;
    title: string;
    id: string;
  }

  interface ProjectMsg {
    id: string;
    content: string;
    photo: string;
    createdAt: string;
    isUserMsg: boolean;
  }

  interface MsgData {
    id: string;
    name: string;
    photo: string;
    content: string;
    isUserMsg: boolean;
    createdAt: string;
  }

  interface MsgList {
    id: string;
    createdAt: string;
    data: MsgData[];
  }
}
