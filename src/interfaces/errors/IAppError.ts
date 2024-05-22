interface IAppError {
  message: string;
  statusCode?: number;
  errors?: Array<string>;
}

export type { IAppError };
