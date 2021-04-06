import {
  IBaseListPageProps,
  IBaseListPageState,
  IListQueryParams,
  IPageRes,
} from '@src/types/baseTypes';
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from 'react';
import HttpApi, { BaseHttpModel } from '@src/utils/https';
import _ from 'lodash';
import { FPage, FFilter, FToolBar, FTable } from '..';

type IBaseListPageAction =
  | ((e: IBaseListPageProps) => IBaseListPageProps)
  | Object;

function BaseListReducer(
  state: IBaseListPageProps,
  action: IBaseListPageAction
) {
  if (_.isFunction(action)) {
    return { ...state, ...action(state) };
  }
  if (_.isObject(action)) {
    return { ...state, ...action };
  }
  return state;
}
const initialState: IBaseListPageProps = {
  queryApi: '',
  rowKey: 'id',
  columns: [],
  pagination: {
    current: 1,
    pageSize: 10,
    showTotal: (total: number, range: [number, number]) =>
      `共 ${total} 项, 当前 ${range[0]}-${range[1]}`,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '40', '60', '100', '150', '200'],
  },
  dataSource: [],
  tableProps: {},
};
const BaseListPage = (
  props: IBaseListPageProps,
  ref: ForwardedRef<IBaseListPageState>
) => {
  const queryParams = useRef<IListQueryParams>({
    page: 1,
    size: 10,
    conditions: {},
    v: 0,
  });
  useImperativeHandle(ref, () => ({}), []);
  const pushQueryParams = (params?: any) => {
    let query = queryParams.current;
    if (params) {
      queryParams.current = _.extend({}, query, params);
    }
  };
  const onPageChange = (page: number, pageSize?: number) => {
    let obj: any = {
      page: page,
    };
    if (pageSize) {
      obj.size = pageSize;
    }
  };
  const onPageShowSizeChange = (page: number, pageSize: number) => {
    onPageChange(1, pageSize);
  };
  const getQueryParams = () => {
    let params = queryParams.current.conditions;
    if (state.pagination) {
      return {
        ...params,
        size: queryParams.current.size,
        page: queryParams.current.page,
      };
    } else {
      return params;
    }
  };
  const handleSearch = (values: any) => {
    let p: Partial<IListQueryParams> = {
      conditions: values,
      v: new Date().getTime(),
    };
    if (state.pagination) {
      p.page = 1;
    }
    pushQueryParams(p);
    query();
  };
  const query = () => {
    dispatch({ querying: true });
    let tableProps = state.tableProps;
    if (
      tableProps &&
      tableProps.rowSelection &&
      state.selectedRowKeys &&
      state.selectedRowKeys.length > 0
    ) {
      tableProps.rowSelection.selectedRowKeys = [];
      dispatch({ tableProps, selectedRows: [], selectedRowKeys: [] });
    }
    let promise: Promise<BaseHttpModel<IPageRes>>;
    if (_.isFunction(state.queryApi)) {
      promise = state.queryApi(getQueryParams());
    } else {
      promise = HttpApi.request<IPageRes>({
        url: state.queryApi as string,
        params: getQueryParams(),
      });
    }
    promise
      .then((res) => {
        let pagination = state.pagination;
        if (pagination) {
          pagination.current = res.data.number;
          pagination.pageSize = res.data.size;
          pagination.total = res.data.total * 1;
        }
        dispatch({
          dataSource: res.data.content,
          pagination,
        });
      })
      .finally(() => {
        dispatch({ querying: false });
      });
  };
  const [state, dispatch] = useReducer(BaseListReducer, initialState, (e) => {
    if (e.pagination) {
      e.pagination.onChange = onPageChange;
      e.pagination.onShowSizeChange = onPageShowSizeChange;
    }
    if (props.leftNode && props.leftNode.length > 0 && e.tableProps) {
      e.tableProps.rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          let tableProps = state.tableProps;
          if (tableProps && tableProps.rowSelection) {
            tableProps.rowSelection.selectedRowKeys = selectedRowKeys;
          }
          dispatch({ selectedRowKeys, selectedRows, tableProps });
        },
      };
    }
    return _.assign({}, e, props);
  });
  useEffect(() => {
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FPage>
      <FFilter onSearch={handleSearch} items={state.conditions} />
      <FToolBar leftNode={state.leftNode} rightNode={state.rightNode} />
      <FTable
        bordered
        loading={state.querying}
        rowKey={state.rowKey}
        columns={state.columns}
        size={'small'}
        dataSource={state.dataSource}
        {...state.tableProps}
      />
    </FPage>
  );
};
const FBaseListPage = forwardRef<IBaseListPageState, IBaseListPageProps>(
  BaseListPage
);
export default FBaseListPage;
