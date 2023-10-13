export interface ErrorResponse {
    message: String;
    statusCode: number;
    error: String;
}

export interface SuccessfulResponse<T> {
    statusCode: number;
    data: T;
}  

export type DefaultResponse<T> = SuccessfulResponse<T> | ErrorResponse;
  