import HttpApi from '@src/utils/https';

// 获取规格列表
export function getSpecList(params: any) {
  return HttpApi.request({
    url: '/specs/list',
    method: 'POST',
    data: params,
  });
}

export function getSystemGoodsList(params: any) {
  return HttpApi.request({
    url: '/goods/list',
    method: 'POST',
    data: params,
  });
}

// 新增编辑规格
export function saveSpecs(params: any) {
  return HttpApi.request({
    url: '/specs/save',
    method: 'POST',
    data: params,
  });
}
// 获取规格值列表
export function getSpecsValList(params: any) {
  return HttpApi.request({
    url: '/specs/value/list',
    method: 'POST',
    data: params,
  });
}

// 删除规格值
export function deleteSpecs(params: any) {
  return HttpApi.request({
    url: '/specs/delete',
    method: 'POST',
    data: params,
  });
}

// 获取货品管理列表
export function getProductsList(params: any) {
  return HttpApi.request({
    url: '/products/list',
    method: 'POST',
    data: params,
  });
}
