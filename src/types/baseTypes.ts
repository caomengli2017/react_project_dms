import { TableProps, TooltipProps } from 'antd';
import { Rule } from 'antd/lib/form';
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table';
import { ReactNode } from 'react';

export interface IColumn<T = any> extends ColumnProps<T> {}
export interface IFTableProps<T> extends TableProps<T> {}

export interface ITableQueryParams {
  page: number;
  size: number;
  conditions?: {
    [key: string]: any;
  };
  v: number;
}

export interface ITableViewRef<T = any> {
  query: () => void;
  getSelectedRowKeys: () => React.Key[]; // table 表格勾选  id集合
  getSelectedRows: () => T[]; // table 表格勾选  数据
  queryParams: ITableQueryParams;
  setQueryParams: (e: ITableQueryParams) => void;
}

export interface ITableViewState<T = any> {
  querying?: boolean;
  tableProps?: IFTableProps<T>;
  pagination?: TablePaginationConfig;
  selectedRowKeys?: React.Key[]; // table 表格勾选  id集合
  selectedRows?: T[]; // table 表格勾选  数据
  dataSource?: T[];
}

export interface ITableViewProps<T = any> {
  queryApi: ((data: any) => Promise<any>) | string;
  querying?: boolean;
  initalParams?: { [key: string]: any }; // 自定义初始查询数据
  rowKey: string | ((record: T, index?: number | undefined) => React.Key);
  columns: IColumn<T>[];
  tableProps?: IFTableProps<T>;
  pagination?: TablePaginationConfig;
  selector?: boolean;
  firstQuery?: boolean;
}

export interface IBaseListPageProps
  extends Omit<ITableViewProps, 'firstQuery' | 'selector'>,
    IFToolBarProps {
  conditions?: IFormItem[];
  children?: React.ReactNode;
}

export interface IBaseListPageRef<T = any> {
  query: () => void;
  getSelectedRowKeys: () => React.Key[]; // table 表格勾选  id集合
  getSelectedRows: () => T[];
}
export type IBtnsProp = ReactNode[];

export interface IFToolBarProps {
  leftNode?: IBtnsProp;
  rightNode?: IBtnsProp;
}

export interface IPageRes<T = any> {
  list: T[];
  page: number;
  size: number;
  totalPage: number;
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
export interface BasePageModal<T extends Object> {
  page: number;
  size: number;
  totalpage: number;
  list: T[];
}
