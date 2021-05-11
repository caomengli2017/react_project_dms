import HttpApi from '@src/utils/https';

// 获取店铺申请列表
export function getShopApplicationList(params?: any) {
  return HttpApi.request({
    url: '/admin/shopApplication/list',
    method: 'POST',
    data: params,
  });
}
