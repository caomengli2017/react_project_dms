import { IUserModel } from '@src/types/model/user';
import HttpApi from '@src/utils/https';

/**
 *
 * @author Leo
 * @desc 登录
 * @param {username,password}
 * @date 2021-03-29 16:35:07
 */
export function login(params: any) {
  return HttpApi.request<IUserModel>({
    url: '/user/login',
    method: 'POST',
    data: params,
  });
}
