import { IUserModel } from '@src/types/model/user';
import HttpApi from '@src/utils/https';

export function getSpecList(params: any) {
  return HttpApi.request<IUserModel>({
    url: '/specs/list',
    method: 'POST',
    data: params,
  });
}
