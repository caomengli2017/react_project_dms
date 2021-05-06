export interface Spec {
  k: string;
  v: string;
}

export interface SpecListModal {
  oid: number;
  name: string;
  remark: string;
  specs: Spec[];
  createdAt: string;
}
export interface SystemGoodsModal {
  oid: number;
  name: string;
  picUrl: string;
  goodsNumber: string;
  brandName: string;
  stock: number;
  createdAt: string;
}
