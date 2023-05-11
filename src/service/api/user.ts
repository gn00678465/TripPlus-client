import { request } from '../request';

export function apiGetUserAccount() {
  return request.get<ApiAuth.Account>('/user/account');
}

export function apiPatchUserAccount(data: ApiAuth.Account) {
  return request.patch<ApiAuth.Account>('/user/account', data);
}
