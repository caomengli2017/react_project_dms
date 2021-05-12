import HttpApi from '@src/utils/https';

// 获取店铺申请列表
export function getShopApplicationList(params?: any) {
  return HttpApi.request({
    url: '/admin/stores/application/list',
    method: 'POST',
    data: params,
  });
}
// 店铺申请处理
export function shopApplicationEdit(params?: any) {
  return HttpApi.request({
    url: '/admin/stores/application/edit',
    method: 'POST',
    data: params,
  });
}
