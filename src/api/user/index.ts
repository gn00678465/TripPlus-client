import { request } from '@/config/axios';
import { AxiosRequestConfig } from 'axios';

export function apiGetUserAccount() {
  return request.get<ApiUser.Account>('/user/account');
}

export function apiPatchUserAccount(data: ApiUser.Account) {
  return request.patch<ApiUser.Account>('/user/account', data);
}

export function apiPatchChangePassword(data: ApiUser.ChangePassword) {
  return request.patch<ApiUser.ChangePassword>('/user/change-password', data);
}

export function apiGetFollows() {
  return request.get<ApiUser.Follows>('/user/follows');
}

export function apiDeleteFollow(id: string) {
  return request.delete<ApiUser.Follows>(`/user/follow/${id}`);
}

export function apiGetBonus() {
  return request.get<ApiUser.Bonus>('/user/bonus');
}

export function apiPostFollow(id: string, config?: AxiosRequestConfig) {
  return request.post<ApiUser.Follows>(`/user/follow/${id}`, config);
}

export function apiPostOrders(orderId: string, data: ApiUser.Ranking) {
  return request.post<ApiUser.Ranking>(`/user/order/${orderId}/ranking`, data);
}

export function apiGetUserRoomMessage(
  roomId: string,
  pageIndex: number,
  pageSize: number
) {
  return request.get<ApiMessage.Chatroom[]>(`/user/${roomId}/message`, {
    params: {
      pageIndex,
      pageSize
    }
  });
}
