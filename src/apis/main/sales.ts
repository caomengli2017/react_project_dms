import HttpApi from '@src/utils/https';

// 获取销售订单列表
export function getSalesOrderList(params?: any) {
  return HttpApi.request({
    url: '/admin/sales-orders/list',
    method: 'POST',
    data: params,
  });
}

// 获取销售订单基本信息
export function getSalesOrderDetail(orderCode: any) {
  return HttpApi.request({
    url: '/admin/sales-orders/detail',
    method: 'POST',
    data: {
      order_code: orderCode,
    },
  });
}

// 审核订单
export function orderReview(data: any) {
  return HttpApi.request({
    url: '/admin/order/review',
    method: 'POST',
    data,
  });
}

// 获取发货单列表
export function getDeliveryList(orderCode: any) {
  return HttpApi.request({
    url: '/admin/delivery/list',
    method: 'POST',
    data: {
      order_code: orderCode,
    },
  });
}

// 获取包裹详情
export function getPackageDetail(deliverCode: any) {
  return HttpApi.request({
    url: '/admin/delivery/detail',
    method: 'POST',
    data: {
      deliver_code: deliverCode,
    },
  });
}

// 获取经销商订单列表
export function getDealerOrdersList(data: any) {
  return HttpApi.request({
    url: '/admin/distributor-sales-orders/list',
    method: 'POST',
    data,
  });
}

// 获取经销商销售订单基本信息
export function getDealerOrdersDetail(orderCode: any) {
  return HttpApi.request({
    url: '/admin/distributor-sales-orders/detail',
    method: 'POST',
    data: {
      order_code: orderCode,
    },
  });
}

// 获取零售订单列表
export function getRetailOrdersList(data: any) {
  return HttpApi.request({
    url: '/admin/retail-orders/list',
    method: 'POST',
    data,
  });
}

// 获取零售订单基本信息
export function getRetailOrderDetail(orderCode: any) {
  return HttpApi.request({
    url: '/admin/retail-orders/detail',
    method: 'POST',
    data: {
      order_code: orderCode,
    },
  });
}
