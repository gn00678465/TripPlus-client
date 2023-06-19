import { request } from '../../config/axios';

export function apiGetMessageMember() {
  return request.get<ApiMessage.Member[]>(`/message/member`);
}

export function apiGetMessageProject(projectId: string) {
  return request.get<ApiMessage.ProjectMsg[]>(`/message/${projectId}`);
}
