export interface SuccessResponse {
  status: "success";
  data: any;
}

export interface FailResponse {
  status: "fail" | "error";
  message: string;
}

type APIResponse = SuccessResponse | FailResponse;

export default APIResponse;
