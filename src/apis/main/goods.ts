import { BasePageModal, SpecListModal } from '@src/types/model/goods';
import HttpApi from '@src/utils/https';

// 获取品牌列表
export function getBrandList(params?: any) {
  return HttpApi.request({
    url: '/admin/brand/list',
    method: 'POST',
    data: params,
  });
}

// 获取规格列表
export function getSpecList(params?: any) {
  return HttpApi.request<BasePageModal<SpecListModal>>({
    url: '/specs/list',
    method: 'POST',
    data: params,
  });
}
// 获取系统商品管理列表
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

//添加商品规格
interface IAddGoodsSpecsParams {
  goodsId: string;
  specsValues: Array<number | string>;
}
export function addGoodsSpecs(data: IAddGoodsSpecsParams) {
  return HttpApi.request({
    url: '/goods/specs/add',
    method: 'POST',
    data,
  });
}
//添加商品 基本信息
interface IAddGoodsBasicInfoParams {
  brandId: string; //品牌名称
  name: string; //商品名称
  bn: string; //商品编码
  picUrl: string; //图片地址
  desc: string; //商品描述
  stock: string; //库存
}
export function addGoodsBasicInfo(data: IAddGoodsBasicInfoParams) {
  return HttpApi.request({
    url: '/admin/goods/save',
    method: 'POST',
    data,
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