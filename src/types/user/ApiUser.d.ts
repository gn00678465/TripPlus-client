declare namespace ApiUser {
  interface Account {
    email: string;
    name: string;
    nickName?: string;
    phone?: string;
    address?: string;
    photo?: string;
    gender?: number;
    birthday?: string;
    country?: string;
    introduction?: string;
  }

  interface UploadFile {
    imageUrl: string;
  }
}
