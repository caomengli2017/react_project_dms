import { notification } from 'antd';
import { AxiosRequestConfig } from 'axios';
import axios from './axios';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';
interface AxiosRequest extends AxiosRequestConfig {
  errorAuth?: boolean; // 错误验证 并弹出提示
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
    errorAuth = true,
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
          if (res.data.code === 10000) {
            const _newres: BaseHttpModel<T> = new BaseHttpModel<T>(res.data);
            resolve(_newres);
          } else {
            if (errorAuth) {
              notification.error({
                message: '提示',
                description: res.data.errorTips,
              });
            }
            reject(
              new BaseHttpModel({
                code: res.data?.code ?? -1,
                msg: res.data?.errorTips ?? '请求失败',
              })
            );
          }
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
