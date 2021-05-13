import HttpApi from '@src/utils/https';

// 获取店铺列表
export function getShopList(params?: any) {
  return HttpApi.request({
    url: '/admin/stores/list',
    method: 'POST',
    data: params,
  });
}
// 获取店铺详情
export function getShopDetail(params?: any) {
  return HttpApi.request({
    url: '/admin/stores/info',
    method: 'POST',
    data: params,
  });
}
// 编辑店铺
export function ShopEdit(params?: any) {
  return HttpApi.request({
    url: '/admin/stores/edit',
    method: 'POST',
    data: params,
  });
}
// 代理经销商列表
export function getCompanyList(params?: any) {
  return HttpApi.request({
    url: 'admin/agent/company/list',
    method: 'POST',
    data: params,
  });
}
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
