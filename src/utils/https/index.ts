import axios from './axios';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

interface AxiosRequest {
  baseURL?: string;
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType;
}

export class BaseHttpModel<T = any> {
  code: number;
  msg: string;
  tips: string;
  runtime: number;
  data: T;
  constructor(props: any) {
    this.code = props?.code ?? -1;
    this.msg = props?.msg ?? '';
    this.tips = props?.tips ?? '';
    this.runtime = props?.runtimer ?? 100000;
    this.data = props?.data ?? null;
  }
}

interface IHeaderProps {
  [key: string]: any;
}

class HttpApi {
  public static baseURL: string = '';
  public static header: IHeaderProps = {};
  public static request<T = any>({
    baseURL = HttpApi.baseURL,
    headers,
    method = 'GET',
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<BaseHttpModel<T>> {
    return new Promise((resolve, reject) => {
      axios({
        baseURL,
        headers: Object.assign({}, this.header, headers),
        method,
        url,
        params,
        data,
        responseType,
      })
        .then((res) => {
          const _newres: BaseHttpModel<T> = new BaseHttpModel<T>(res);
          resolve(_newres);
          // if (_newres.code === 10000) {
          // } else {
          //   reject(_newres);
          // }
        })
        .catch((err) => {
          const message =
            err?.data?.errorMessage || err?.message || url + '请求失败';
          reject(new BaseHttpModel({ code: err.status, msg: message }));
        });
    });
  }
}

export default HttpApi;
