declare namespace Service {
  type SuccessResult<T> = T extends undefined
    ? {
        status: 'Success';
        message?: string;
      }
    : {
        status: 'Success';
        message?: string;
        data: T;
        response?: any;
      };

  interface FailedResult {
    status: 'Error';
    message: string;
    data?: any;
    response?: any;
  }

  type RequestResult<T> = SuccessResult<T> | FailedResult;
}
