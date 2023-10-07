export enum LaravelErrorResponseType {
  AuthError, //401
  PermissionError, //403
  ValidationError, //422
  ServerError, //500
  ClientError //Timeout
}

export class LaravelErrorResponse {
  constructor(
    public readonly message: string,
    public readonly type: LaravelErrorResponseType,
    public readonly errors: Record<string|number, Array<string>> | null = null,
  ) {}

}
