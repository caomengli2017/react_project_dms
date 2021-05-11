import HttpApi from '@src/utils/https';

// 获取经销商申请列表
export function getDealerApplicationList(params?: any) {
  return HttpApi.request({
    url: '/admin/managers/application/list',
    method: 'POST',
    data: params,
  });
}

// 获取经销商申请详情
export function getDealerApplicationDetail(params?: any) {
  return HttpApi.request({
    url: '/admin/managers/application/info',
    method: 'POST',
    data: params,
  });
}

// 经销商审核
export function dealerAudit(params?: any) {
  return HttpApi.request({
    url: '/admin/managers/application/audit',
    method: 'POST',
    data: params,
  });
}
