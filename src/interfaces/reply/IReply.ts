interface IReply {
  200: {
    error: boolean;
    errors: Array<string>;
    message: string;
    data?: unknown;
  };
  '4xx': {
    error: boolean;
    errors: Array<string>;
    message: string;
  };
  '5xx': {
    error: boolean;
    errors: Array<string>;
    message: string;
  };
}

export type { IReply };
