import { IDealerDetailsModal } from '@src/types/model/dealer';
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

// 获取经销商列表
export function getDealerList(params?: any) {
  return HttpApi.request({
    url: '/admin/agent/company/list',
    method: 'POST',
    data: params,
  });
}

// 获取经销商详情
export function getDealerDetail(params?: any) {
  return HttpApi.request<IDealerDetailsModal>({
    url: '/admin/agent/company/info',
    method: 'POST',
    data: params,
  });
}

// 经销商编辑
export function dealerEdit(params?: any) {
  return HttpApi.request({
    url: '/admin/agent/company/edit',
    method: 'POST',
    data: params,
  });
}

// 新建经销商
export function newDealer(params?: any) {
  return HttpApi.request({
    url: '/admin/agent/company/add',
    method: 'POST',
    data: params,
  });
}

//下级代理商层级列表
export function getSublevellist() {
  return HttpApi.request({
    url: '/admin/agent/sublevel/list',
    method: 'POST',
  });
}

// 经销商货品列表
export function getDealerproudctlist(params?: any) {
  return HttpApi.request({
    url: '/admin/company/products/list',
    method: 'POST',
    data: params,
  });
}
