export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

type ServiceResponseOkType = 'SUCCESSFUL' | 'CREATED';

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseOkType,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
