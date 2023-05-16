import { request } from '../../config/axios';

export function apiGetUserAccount() {
  return request.get<ApiUser.Account>('/user/account');
}

export function apiPatchUserAccount(data: ApiUser.Account) {
  return request.patch<ApiUser.Account>('/user/account', data);
}
