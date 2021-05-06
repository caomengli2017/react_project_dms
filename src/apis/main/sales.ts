import HttpApi from '@src/utils/https';

// 获取销售订单列表
export function getSalesOrderList(params?: any) {
  return HttpApi.request({
    url: '/sales-orders/list',
    method: 'POST',
    data: params,
  });
}
