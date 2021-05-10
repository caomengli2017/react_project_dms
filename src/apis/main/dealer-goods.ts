import {
  DealerGoodsListModal,
  DealerProductsListModal,
} from '@src/types/model/dealer-goods';
import HttpApi from '@src/utils/https';

// 获取系统商品管理列表
export function getDealerGoodsList(params: any) {
  return HttpApi.request<DealerGoodsListModal>({
    url: '/admin/company/goods/list',
    method: 'POST',
    data: params,
  });
}
// 获取系统商品管理列表
export function getDealerProductList(data: any) {
  return HttpApi.request<DealerProductsListModal>({
    url: '/admin/company/products/list',
    method: 'POST',
    data: data,
  });
}

// 经销商货品批发设定
export function addDealerProducts(data: any) {
  return HttpApi.request<DealerProductsListModal>({
    url: 'admin/company/products/save',
    method: 'POST',
    data: data,
  });
}
