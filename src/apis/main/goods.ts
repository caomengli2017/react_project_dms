import { BasePageModal } from '@src/types/baseTypes';
import { BrandListModal, SpecListModal } from '@src/types/model/goods';
import HttpApi from '@src/utils/https';

// 获取品牌列表
export function getBrandList(params?: any) {
  return HttpApi.request<BasePageModal<BrandListModal>>({
    url: '/admin/brand/list',
    method: 'POST',
    data: params,
  });
}

// 新增编辑品牌
export function saveBrand(params: any) {
  return HttpApi.request({
    url: '/brand/save',
    method: 'POST',
    data: params,
  });
}

// 删除品牌
export function deleteBrand(params: any) {
  return HttpApi.request({
    url: '/brand/delete',
    method: 'POST',
    data: params,
  });
}

// 获取规格列表
export function getSpecList(params?: any) {
  return HttpApi.request<BasePageModal<SpecListModal>>({
    url: '/admin/specs/list',
    method: 'POST',
    data: params,
  });
}
// 获取系统商品管理列表
export function getSystemGoodsList(params: any) {
  return HttpApi.request({
    url: '/admin/goods/list',
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
export function getSpecsValList(specsId: number) {
  return HttpApi.request({
    url: '/specs/value/list',
    method: 'POST',
    data: {
      specsId,
    },
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

//添加 编辑 商品规格
interface IAddGoodsSpecsParams {
  goodsId: string;
  specsValues: Array<number | string>;
  specsId: number;
  oid?: number;
}
export function addGoodsSpecs(data: IAddGoodsSpecsParams) {
  return HttpApi.request({
    url: '/admin/goods/specs/add',
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

/**
 * @author Leo
 * @desc 获取系统商品规格列表
 * @date 2021-04-26 09:30:38
 * @param goodsId 商品id
 */
export function getAdminGoodsSpecList(data: any) {
  return HttpApi.request<BasePageModal<SpecListModal>>({
    url: '/admin/goods/specs/list',
    method: 'POST',
    data,
  });
}
/**
 * @author Leo
 * @desc 获取系统商品货品列表
 * @date 2021-04-26 09:30:38
 * @param goodsId 商品id
 */
export function getAdminGoodsProductsList(data: any) {
  return HttpApi.request({
    url: '/admin/goods/products/list',
    method: 'POST',
    data,
  });
}

/**
 *
 * @author Leo
 * @desc 系统商品添加 货品
 * @date 2021-05-06 09:30:49
 */
export function addAdminGoodsProducts(data: any) {
  return HttpApi.request({
    url: '/admin/goods/products/add',
    method: 'POST',
    data,
  });
}

/**
 *
 * @author Leo
 * @desc 获取商品详情
 * @date 2021-05-06 14:38:15
 * @param id 商品id
 */
export function getAdminGoodsDetail(id: number) {
  return HttpApi.request({
    url: '/admin/goods/detail',
    method: 'POST',
    data: {
      oid: id,
    },
  });
}
/**
 *
 * @author Leo
 * @desc 系统商品规格删除
 * @date 2021-05-06 18:38:25
 */
export function deleteAdminGoodsSpecs(id: number) {
  return HttpApi.request({
    url: '/admin/goods/specs/delete',
    method: 'POST',
    data: {
      oid: id,
    },
  });
}
/**
 *
 * @author Leo
 * @desc 系统商品货品删除
 * @date 2021-05-06 18:38:25
 */
export function deleteAdminGoodsProduct(id: number) {
  return HttpApi.request({
    url: '/admin/products/delete',
    method: 'POST',
    data: {
      oid: id,
    },
  });
}
