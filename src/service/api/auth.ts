import { request } from '../request';

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponseData {
  id: string;
  token: string;
  expired: number;
}

interface SignupBody {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface SignupResponseData {
  token: string;
  name: string;
  roles: string[];
}

export function apiPostLogin(data: LoginBody) {
  return request.post<LoginResponseData>('/auth/login', data);
}

export function apiPostSignup(data: SignupBody) {
  return request.post<SignupResponseData>('/auth/signup', data);
}
