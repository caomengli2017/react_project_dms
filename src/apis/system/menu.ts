import { IMenuConfigs } from '@src/types/system';
import HttpApi from '@src/utils/https';

/**
 *
 * @author Leo
 * @desc 获取菜单列表
 * @param {username,password}
 * @date 2021-03-29 16:35:07
 */
export function getMenuList() {
  return HttpApi.request<IMenuConfigs[]>({
    url: '/menu/tree',
    method: 'GET',
  });
}
