import { Response } from 'express';

export interface SuccessResponse {
  status: 'success';
  data: any;
}

export interface FailResponse {
  status: 'fail' | 'error';
  message: string;
}

export type ResponseBody = SuccessResponse | FailResponse;

type APIResponse<Locals extends Record<string, any> = Record<string, any>> = Response<ResponseBody, Locals>;

export default APIResponse;
