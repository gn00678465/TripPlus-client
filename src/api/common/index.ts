import { request } from '../../config/axios';

export function apiPostUpload(formData: FormData) {
  return request.post<ApiUser.UploadFile>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
