import HttpApi from '@src/utils/https';

// 获取经销商审核列表
export function getDealerApplicationList(params?: any) {
  return HttpApi.request({
    url: '/admin/managers/application/list',
    method: 'POST',
    data: params,
  });
}
