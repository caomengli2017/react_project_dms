import { ILoginProps, IUserModel } from '@src/types/model/user';
import HttpApi from '@src/utils/https';

/**
 *
 * @author Leo
 * @desc 登录
 * @param {username,password}
 * @date 2021-03-29 16:35:07
 */

export function login(data: ILoginProps) {
  return HttpApi.request<IUserModel>({
    url: '/passport/login',
    method: 'POST',
    data,
    errorAuth: false,
  });
}
/**
 *
 * @author Leo
 * @desc 发送登录短信
 * @date 2021-04-27 14:08:40
 */
export function getLoginCode(tel: string) {
  return HttpApi.request({
    url: '/passport/get/logincode',
    method: 'POST',
    data: {
      tel,
    },
    errorAuth: false,
  });
}

/**
 *
 * @author Leo
 * @desc 发送登录短信
 * @date 2021-04-27 14:08:40
 */
export function setLogout() {
  return HttpApi.request({
    url: '/passport/logout',
    method: 'POST',
  });
}
