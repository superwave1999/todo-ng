import {
  LaravelErrorResponse,
  LaravelErrorResponseType,
} from '../classes/laravel-error-response';
import { HttpErrorResponse } from '@angular/common/http';

export function httpErrorHandler(e: unknown): LaravelErrorResponse | undefined {
  let data: LaravelErrorResponse | undefined;
  if (e instanceof HttpErrorResponse) {
    if (e.status === 0) {
      data = new LaravelErrorResponse(
        'Connection timeout',
        LaravelErrorResponseType.ClientError
      );
    } else if (e.status === 422) {
      data = new LaravelErrorResponse(
        e.error.message,
        LaravelErrorResponseType.ValidationError,
        e.error.errors
      );
    } else if (e.status === 401) {
      data = new LaravelErrorResponse(
        'Invalid credentials',
        LaravelErrorResponseType.AuthError
      );
    } else if (e.status === 500) {
      data = new LaravelErrorResponse(
        'Server could not complete request',
        LaravelErrorResponseType.ServerError
      );
    }
  }
  console.error(e);
  return data;
}
