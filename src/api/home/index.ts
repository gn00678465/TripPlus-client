import { request } from '../../config/axios';

export function apiGetHome() {
  return request.get<ApiHome.Home>(`/home`);
}

export function apiGetHomeData() {
  return request.get<ApiHome.HomeData>(`/home/data`);
}

export function apiGetHomeBanner() {
  return request.get<ApiHome.BannerItem[]>(`/home/banner`);
}
