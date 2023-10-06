interface ResponseErrorType {
  Success: false;
  ErrCode: number;
  ErrMsg: string;
  Data: null;
}

interface ResponseSuccessType<T> {
  Success: true;
  Data: T;
}

export type ResType<T> = ResponseErrorType | ResponseSuccessType<T>;
