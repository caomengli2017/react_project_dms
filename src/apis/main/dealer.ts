import HttpApi from '@src/utils/https';

// 获取经销商审核列表
export function getDealerAuditList(params?: any) {
  return HttpApi.request({
    url: '/admin/dealerAudit/list',
    method: 'POST',
    data: params,
  });
}
