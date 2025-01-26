export type IResponse = {
  status: string;
  message: string;
  statusCode: number;
  data?: any;
  token?: string;
  refreshToken?: string;
};
