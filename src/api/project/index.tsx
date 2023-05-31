import { request } from '../../config/axios';

export function apiGetProject(query: string = '') {
  return request.get<ApiProject.Projects>(
    !query ? '/project' : `/project?${query}`
  );
}
