import { request } from '../request';

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function apiPostLogin(data: LoginBody) {
  return request.post<ApiAuth.UserInfo>('/auth/login', data);
}

export function apiPostSignup(data: SignupBody) {
  return request.post<ApiAuth.UserInfo>('/auth/signup', data);
}
