import axios, { AxiosRequestConfig } from 'axios';
import { Ok, Err, Result } from 'ts-results';
import { BlacklabErrorResponse } from 'types';

type Request = {
  url: string;
  timeout?: number;
};

type Response<T> = Result<
  T,
  {
    status: number;
    body: { status: string; msg: string };
  }
>;

async function request<T>({ url, timeout = 5 * 1000 }: Request): Promise<Response<T>> {
  try {
    const config: AxiosRequestConfig = {
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout,
    };
    const response = await axios.get<T>(url, config);
    return new Ok(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return new Err({ status: 408, body: { status: 'failed', msg: 'Request Timeout' } });
      }

      if (error.response) {
        if (error.response.status >= 400) {
          const errorData = error.response.data as BlacklabErrorResponse;
          return new Err({
            status: error.response.status,
            body: { status: 'failed', msg: errorData.error.message },
          });
        }
      }
    }

    return new Err({ status: 500, body: { status: 'failed', msg: 'Internal Server Error' } });
  }
}

export default request;
