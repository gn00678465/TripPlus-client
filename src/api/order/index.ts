import { request } from '../../config/axios';

export function apiPostOrder(data: ApiOrder.Payment) {
  return request.post<string>(`/order/payment`, data);
}
