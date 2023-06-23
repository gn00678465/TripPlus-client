declare namespace Message {
  interface Project {
    creatorName: string;
    creatorPhoto: string;
    creatorId: string;
    title: string;
    id: string;
  }

  interface MsgData {
    id: string;
    name: string;
    photo: string;
    content: string;
    isUserMsg: boolean;
    createdAt: string;
  }

  interface RoomMsg {
    id: string;
    createdAt: string;
    data: MsgData[];
  }

  interface Chatter {
    id: string;
    name: string;
    photo: string;
  }
}
