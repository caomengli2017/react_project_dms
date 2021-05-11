export interface Spec {
  k: string;
  v: string;
  kid: number;
  vid: number;
}

export interface SpecListModal {
  oid: number;
  name: string;
  remark: string;
  specs: Spec[];
  specsId: number;
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

export interface TradePriceRange {
  level21Price: number[];
  level32Price: number[];
  level43Price: number[];
}

export interface ProductListModal {
  oid: number;
  productsNo: string;
  specs: Spec[];
  stock: number;
  price: number;
  tradePriceRange: TradePriceRange;
  createdAt: string;
}

export interface BrandListModal {
  oid: number;
  name: string;
  parentId: number;
  parentName: string;
  createdAt: string;
}
