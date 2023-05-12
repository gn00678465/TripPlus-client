declare namespace ApiAuth {
  interface UserInfo {
    name: string;
    roles: string[];
    token: string;
  }

  interface Account {
    email: string;
    name: string;
    nickName: string;
    phone: string;
    address: string;
    photo: string;
    gender: number;
    birthday: string;
    country: string;
    introduction: string;
  }

  interface UploadFile {
    imageUrl: string;
  }
}
