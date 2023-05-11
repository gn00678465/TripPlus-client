import { request } from '../request';

export function apiPostUpload(formData: FormData) {
  return request.post<ApiAuth.UploadFile>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
