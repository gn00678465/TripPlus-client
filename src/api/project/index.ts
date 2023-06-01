import { request } from '@/config/axios';
import { AxiosRequestConfig } from 'axios';

export function apiGetProjectInfo(id: string, config?: AxiosRequestConfig) {
  return request.get<ApiProject.Project>(`/project/${id}`, config);
}

export function apiGetProjectNews(id: string, config?: AxiosRequestConfig) {
  return request.get<ApiProject.News[]>(`/project/${id}/news`, config);
}

export function apiGetProjectFAQs(id: string, config?: AxiosRequestConfig) {
  return request.get<ApiProject.FAQ[]>(`/project/${id}/faqs`, config);
}
