import { request } from '../../config/axios';

export function apiGetUserAccount() {
  return request.get<ApiUser.Account>('/user/account');
}

export function apiPatchUserAccount(data: ApiUser.Account) {
  return request.patch<ApiUser.Account>('/user/account', data);
}

export function apiPatchChangePassword(data: ApiUser.ChangePassword) {
  return request.patch<ApiUser.ChangePassword>('/user/change-password', data);
}

export function apiGetBonus() {
  return request.get<ApiUser.Bonus>('/user/bonus');
}
