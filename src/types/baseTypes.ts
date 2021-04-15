import { TableProps, TooltipProps } from 'antd';
import { Rule } from 'antd/lib/form';
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table';
import { ReactNode } from 'react';

export interface IColumn<T = any> extends ColumnProps<T> {}
export interface IFTableProps<T> extends TableProps<T> {}

export interface IBaseListPageProps<T = any> {
  queryApi: ((data: any) => Promise<any>) | string;
  querying?: boolean;
  initalParams?: { [key: string]: any };
  conditions?: IFormItem[];
  leftNode?: (ReactNode | (() => ReactNode))[];
  rightNode?: (ReactNode | (() => ReactNode))[];
  rowKey: string | ((record: T, index?: number | undefined) => React.Key);
  columns: IColumn<T>[];
  dataSource?: T[];
  tableProps?: IFTableProps<T>;
  pagination?: TablePaginationConfig;
  selectedRowKeys?: React.Key[]; //table 表格勾选  id集合
  selectedRows?: T[]; //table 表格勾选  数据
  children?: ReactNode;
}
export interface IBaseListPageRef {}
export interface IPageRes<T = any> {
  content: T[];
  number: number;
  size: number;
  total: number;
}
export interface IFormItem {
  id: string;
  label: React.ReactNode;
  tooltip?: React.ReactNode | (TooltipProps & { icon: React.ReactNode });
  initialValue?: any;
  span?: number;
  rule?: Rule[];
  labelCol?: Object;
  _node?: React.ReactNode;
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
