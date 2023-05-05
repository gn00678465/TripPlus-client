declare namespace ApiAuth {
  interface UserInfo {
    name: string;
    roles: string[];
    token: string;
  }

  interface SignupResponse {
    token: string;
    name: string;
    roles: string[];
  }
}
