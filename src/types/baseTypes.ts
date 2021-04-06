import { TableProps } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { ColumnProps } from 'antd/lib/table';
import { ReactNode } from 'react';

export interface IColumn<T = any> extends ColumnProps<T> {}
export interface IFTableProps<T> extends TableProps<T> {}

export interface IBaseListPageProps<T = any> {
  queryApi: ((data: any) => Promise<any>) | string;
  querying?: boolean;
  conditions?: IFormItem[];
  leftNode?: (ReactNode | (() => ReactNode))[];
  rightNode?: (ReactNode | (() => ReactNode))[];
  rowKey: string | ((record: T, index?: number | undefined) => React.Key);
  columns: IColumn<T>[];
  dataSource?: T[];
  tableProps?: IFTableProps<T>;
  pagination?: PaginationConfig | false;
  selectedRowKeys?: string[] | number[] | React.Key[]; //table 表格勾选  id集合
  selectedRows?: T[]; //table 表格勾选  数据
  children?: ReactNode;
}
export interface IBaseListPageState {}
export interface IPageRes<T = any> {
  content: T[];
  number: number;
  size: number;
  total: number;
}
export interface IFormItem {
  id: string;
  label: ReactNode;
  initialValue?: any;
  span?: number;
  _node?: ReactNode;
  value?: any;
  onChange?(value: any): void;
}
export interface IListQueryParams {
  page: number;
  size: number;
  conditions: {
    [key: string]: any;
  };
  v: number;
}
