import { Spec } from './goods';

export interface DealerGoodsListModal {
  id: number;
  name: string;
  stock: string;
  brandName: string;
}
export interface DealerProductsListModal {
  oid: number;
  productsNo: string;
  specs: Spec[];
  stock: number;
  marketable: number;
  tradePrice: number;
  tradePriceRange: number[];
}
