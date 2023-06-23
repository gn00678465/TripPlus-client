declare namespace ApiMessage {
  interface Chatter {
    name: string;
    photo: string;
    _id: string;
  }

  interface Chatroom {
    _id: string;
    content: string;
    sender: Chatter;
    receiver: Chatter;
    roomId: {
      _id: string;
      participants: string[];
      projectId: {
        _id: string;
        creator: string;
        title: string;
        type: string;
        id: string;
      };
      projectCreator: string;
    };
    createdAt: string;
  }

  interface msgBody {
    sender: string;
    receiver: string;
    content: string;
    roomId: string;
  }
}
