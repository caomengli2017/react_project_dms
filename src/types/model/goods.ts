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

export interface BasePageModal<T extends Object> {
  page: number;
  size: number;
  totalpage: number;
  list: T[];
}
