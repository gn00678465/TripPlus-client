import { request } from '../../config/axios';

export function apiGetProposer(id: string) {
  return request.get<ApiProposer.Proposer>(`/proposer/${id}`);
}
