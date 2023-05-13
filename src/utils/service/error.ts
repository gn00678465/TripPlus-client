import type { AxiosError } from 'axios';
import Router from 'next/router';

export function handleAxiosError(axiosError: AxiosError<Service.FailedResult>) {
  const error: Service.FailedResult = {
    status: 'Error',
    message: ''
  };
  if (!window.navigator.onLine || axiosError.message === 'Network Error') {
    Object.assign(error, { message: '網路不可用' });
  }
  if (!!axiosError.response) {
    if (axiosError.response.status === 401) {
      Router.push('/login');
    }

    Object.assign(error, { message: axiosError.response.data.message });
  }

  return error;
}
