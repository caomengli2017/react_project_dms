export interface Money {
  unit: string;
  sign: string;
  value: string;
}

export interface PayMoney {
  unit: string;
  sign: string;
  value: string;
}

export interface TotalDiscount {
  unit: string;
  sign: string;
  value: string;
}

export interface ProductMoney {
  unit: string;
  sign: string;
  value: string;
}

export interface ProductOriginalMoney {
  unit: string;
  sign: string;
  value: string;
}

export interface ProductDiscount {
  unit: string;
  sign: string;
  value: string;
}

export interface ShipMoney {
  unit: string;
  sign: string;
  value: string;
}

export interface ShipOriginalMoney {
  unit: string;
  sign: string;
  value: string;
}

export interface ShipDiscount {
  unit: string;
  sign: string;
  value: string;
}

export interface BuyerInfo {
  store_name: string;
  store_id: number;
  company_name: string;
  company_id: number;
  level: number;
  level_name: string;
  contact?: any;
  tel?: any;
}

export interface SellerInfo {
  store_name: string;
  store_id: number;
  company_name: string;
  company_id: number;
  level: number;
  level_name: string;
  contact?: any;
  tel?: any;
}

export interface ButtonShow {
  procure_cancel: number;
  procure_pay: number;
  procure_buy: number;
  procure_receive: number;
  sale_cancel: number;
  sale_review: number;
  sale_deliver: number;
  retail_qrcode: number;
  retail_cancel: number;
  deliver_receive: number;
}

export interface Spec {
  spec_name: string;
  spec_value: string;
}

export interface OriginalPrice {
  unit: string;
  sign: string;
  value: string;
}

export interface Price {
  unit: string;
  sign: string;
  value: string;
}

export interface DiscountedPrice {
  unit: string;
  sign: string;
  value: string;
}

export interface List {
  bn: string;
  type: string;
  goods_name: string;
  goods_img: string;
  spec: Spec[];
  original_price: OriginalPrice;
  price: Price;
  discounted_price: DiscountedPrice;
  quantity: number;
  send_quantity: number;
}

export interface SalesOrderDetailModal {
  order_code: string;
  created_at: string;
  money: Money;
  pay_money: PayMoney;
  total_discount: TotalDiscount;
  pay_time: string;
  product_quantity: number;
  product_money: ProductMoney;
  product_original_money: ProductOriginalMoney;
  product_discount: ProductDiscount;
  ship_money: ShipMoney;
  ship_original_money: ShipOriginalMoney;
  ship_discount: ShipDiscount;
  buyer_info: BuyerInfo;
  seller_info: SellerInfo;
  ship_name: string;
  ship_province: string;
  ship_province_id: number;
  ship_city: string;
  ship_city_id: number;
  ship_county: string;
  ship_county_id: number;
  ship_address: string;
  ship_phone: string;
  customer_message: string;
  pay_status: number;
  review_status: number;
  ship_status: number;
  receive_status: number;
  button_show: ButtonShow;
  list: List[];
  member_tel: string;
  member_code: string;
}
export interface ProductsList {
  bn: string;
  goods_name: string;
  spec_values: string[];
  quantity: number;
  stus: string[];
}

export interface PackageDetailModal {
  order_code: string;
  transport_id: number;
  transport_name: string;
  transport_code: string;
  created_at: string;
  product_quantity: number;
  status: number;
  list: ProductsList[];
}
