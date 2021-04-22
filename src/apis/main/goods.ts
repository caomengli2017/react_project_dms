import HttpApi from '@src/utils/https';

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

export function saveSpecs(params: any) {
  return HttpApi.request({
    url: '/specs/save',
    method: 'POST',
    data: params,
  });
}
