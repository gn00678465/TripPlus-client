import { request } from '../../config/axios';

export function apiGetProject(queryParams: ApiProject.ProjectsParams) {
  return request.get<ApiProject.Projects>('/project', { params: queryParams });
}
