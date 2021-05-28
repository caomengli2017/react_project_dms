import HttpApi from '@src/utils/https';

// 获取银行列表
export function getBankList() {
  return HttpApi.request({
    url: '/admin/bank/list',
    method: 'POST',
  });
}
